<template>
  <div class="main">
    <header class="header">
      <div class="header-in">
        <img src="~images/logo-blue.png" class="logo">
        <div class="logo-right">您好，欢迎使用久安支付！ <a class="blue">常见问题</a></div>
      </div>
    </header>
    <div class="content-box">
      <div class="content" id="pageOne">
        <div class="content01">
          <!--<img class="animated bounceInDown" src="images/txt1.png">-->
          <div class="book-box">
            <p class="p0 p-txt1">您正在使用即时到账交易，请在
              <strong class="orange">
                <count-down :end-time="endTime" end-text="订单已超时" @callBack="countDownEnd"></count-down>
              </strong>
              内完成支付，否则订单将会自动取消</p>
            <p class="p0 p-txt2">
              <strong>订单号：{{infoData.jiuanOrderid}}
                <span class="fr shop-user">商户名：{{infoData.businessName}}</span>
              </strong>
            </p>
            <p class="p0 p-txt3">
              应付金额：
              <span class="red">{{infoData.coinAmount}}  UET</span> 折合
              <span class="red">{{infoData.amount}} CNY </span>
              <span class="gray current-rate">当前汇率：100UET={{_(100).subtract(infoData.exchangeRate)}}CNY	</span>
              <router-link :to="infoData.notifyUrl" class="orange fr otherPay"><strong>更换其他支付方式&gt;&gt; </strong></router-link>
            </p>
          </div>
        </div>
        <div class="content02 mobile animated bounceInRight">
          <div class="c-l">
            <p class="c-l-title"> 久安扫码支付</p>
            <p> 二维码将在<span class="orange">119秒</span>后失效</p>
            <div class="qrcode-box">
              <img src="~images/qrcode.jpg">
            </div>
            <p class="i-scan">打开久安钱包<br>扫一扫</p>
          </div>
          <div class="c-r">
            <img src="~images/phone.png">
            <p>
              不会使用？请参照上图<br>
              没有久安钱包APP？ <a class="blue">前往下载 > </a>
            </p>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>

    <footer class="footer">
      <div class="footer-in">
        <span class="fl">
          久安钱包<br>支持支付方式:
        </span>
        <img src="~images/pay.png">
      </div>
    </footer>
  </div>
</template>

<script>
  import CountDown from 'components/countdown'
  import {generateTitle} from '@/util/i18n'
  import {mapGetters} from 'vuex'
  import Login from '../mobile/login/login-inline'
  import CashSuccess from './success'
  import merchantCfg from '../misc/merchant-config'

  import aesutil from '@/util/aesutil';
  import {$localStorage} from '@/util/storage'

  import {
    cashierInit,
    loginH5,
    paymentPay,
    getOrderStatus,
  } from 'api/cashier'
  import {login} from 'api/show'
  export default {
    name: "pc-cash",
    data() {
      return {
        infoData: {
          exchangeRate: 0, // 汇率
          businessName: '', //商户名
          jiuanOrderid: '',  //久安订单号
          amount: this.$route.query.amount || '',//应付金额
          coinAmount:'', //对应uet金额
          assetCode: this.$route.query.assetCode || '', //资产代码
          merchantId: this.$route.query.merchantId || '', //商户号
          merchantOrderid: this.$route.query.merchantOrderid || '', //商户订单号
          merchantCallbackurl: this.$route.query.merchantCallbackurl || '', //商户回调地址
          sign: this.$route.query.sign || '', //商户请求签名
          notifyUrl: this.$route.query.notifyUrl || '',//返回商户地址
          customerAddress: '', //钱包地址
          createtime: 0,//订单时间
          qrCodeImg:'', //二维码地址
        },
        hasApp: false, //商户是否安装app
        endTime: 0, //订单结束倒计时
        payPassword: '',
        payBtnStatus: true, //确定付款按钮状态
        token: this.$route.query.token || '',//授权token
        cashSuccess: false,  //充值成功
        showPaymentLoading: true
      }
    },
    watch:{
      islogin(){
        if(this.islogin){
          this.infoData.customerAddress = this.userData.accountChainVos[0].address
        }
      },
      cashSuccess(){
        if(this.cashSuccess){
          clearInterval(this.timer)
        }
      }
    },
    components: {
      Login,
      CountDown,
      CashSuccess
    },
    computed: {
      ...mapGetters([
        "userData",
        "islogin",
        "userId"
      ]),
    },
    methods: {
      generateTitle,
      goBack() {
        window.location.href = this.infoData.notifyUrl
      },
      init() { //调用初始化接口
        const data = {
          amount: this.infoData.amount,
          merchantOrderid: this.infoData.merchantOrderid,
          assetCode: this.infoData.assetCode,
          merchantId: this.infoData.merchantId,
          merchantCallbackurl: this.infoData.merchantCallbackurl,
          sign: this.infoData.sign,
        }
        cashierInit(data).then(res => {
          console.log('cash init res: ', res)
          if (res.code === 10000) {
            const data = res.data
            this.infoData.jiuanOrderid = data.payOrder.jiuanOrderid
            this.infoData.exchangeRate = data.payOrder.exchangeRate
            this.infoData.createtime = data.payOrder.createtime
            this.infoData.coinAmount = data.payOrder.coinAmount
            if(data.payOrder.status === 1){
              this.cashSuccess = true
            }
            const nowTime = _.now()
            console.log(nowTime,data.payOrder.createtime)
            if (nowTime > _(data.payOrder.createtime).add(3600000)) {
              this.endTime = 0
              this.payBtnStatus = false
            } else {
              const endTime = _.chain(data.payOrder.createtime).add(3600000).subtract(nowTime).value()
              this.endTime = endTime > 3600000 ? 3600000 : endTime
            }
            this.getOrderStatus()
          } else {
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      getOrderStatus(){
        const data = {
          jiuanOrderid: this.infoData.jiuanOrderid,
          merchantId: this.infoData.merchantId,
          merchantOrderid: this.infoData.merchantOrderid
        }
        this.timer = setInterval(() => {
          getOrderStatus(data).then(res => {
            if(res.code === 10000){
              this.cashSuccess = res.data
            }else{
              toast(res.message)
            }
          }).catch(err => {
            toast(err)
          })
        },3000)
      },
      tokenLogin() {//用授权码登录
        const request = {
          type: 11,
          token: this.token,
          merchantId: this.infoData.merchantId
        }
        console.log(request)

        login(request).then(res => {
          if (res.code === 10000) {
            $localStorage.set('tokenInfo', JSON.stringify(res.data.tokenVo));
            $localStorage.set('userData', JSON.stringify(aesutil.encrypt(res.data.userId)));
            this.$store.dispatch('CHECK_ONLINE', true);
            this.$store.dispatch('UPDATE_TOKEN_INFO', res.data.tokenVo);
            this.$store.dispatch('INIT_INFO');
            this.$store.commit('SET_USERDATA',res.data);
          } else {
            toast(res.message)
          }
        }).catch(err => {
        })
      },
      checkPayPassWord() {
        if (this.payPassword === '') {
          toast(this.generateTitle('cash.psdInputPlaceholder'))
        } else {
          this.pay(this.payPassword)
        }
      },
      pay(password) {
        //调用支付接口
        const request = {
          jiuanOrderid: this.infoData.jiuanOrderid,
          userId: this.userId,
          payPassword: password,
          assetCode: this.infoData.assetCode,
          customerAddress: this.infoData.customerAddress,
          amount: this.infoData.amount,
        }
        console.log(request)
        paymentPay(request).then(res => {
          if (res.code === 10000) {
            this.cashSuccess = true
          } else {
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      countDownEnd() {
        toast('该订单已超时')
        this.payBtnStatus = false
        clearInterval(this.timer)
      },
    },
    created() {
      this.infoData.businessName = merchantCfg.getDeail(this.infoData.merchantId).name
      if (!this.islogin && this.token != '') {
        this.tokenLogin()
      }
      this.infoData.customerAddress = this.userData.accountChainVos[0].address
    },
    mounted() {
      this.init()
    }
  }
</script>

<style lang="scss" scoped>
  .main{
    height:100%;
    min-height:100%;
    background: #f7f7f7;
    color:#616161;
  }
  .clear {
    clear: both;
  }

  .blue {
    color: #138bd9;
  }

  .red {
    color: #ff0000;
  }

  .orange {
    color: #ff9200;
  }

  .gray {
    color: #909090;
  }

  .text-right {
    text-align: right;
  }

  .header {
    height: 96px;
    background: rgba(255, 255, 255, .99);
    border-bottom: 1px solid #e3e3e3;
  }

  .header-in, .content {
    width: 1200px;
    margin: 0 auto;
  }

  .header-in {
    overflow: hidden;
  }

  .logo {
    margin-top: 20px;
  }

  .logo-right {
    float: right;
    margin-top: 40px;
  }

  .book-box {
    padding: 40px 0;
  }

  .book-box .p0 {
    line-height: 37px;
  }

  .book-box .p-txt1 {
    font-size: 18px;
  }

  .book-box .p-txt2,
  .book-box .p-txt3 {
    font-size: 20px;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .otherPay {
    font-size: 16px;
  }

  .shop-user {
    font-size: 18px;
  }

  .content02 {
    background: #fff;
    padding: 25px 0;
    overflow: hidden;
    text-align: center;
    margin: 0 auto 50px;
    box-shadow: 0 5px 5px 5px #efefef;
    border-radius: 5px;
  }

  .content02 .c-l {
    float: left;
    width: 500px;
    padding: 0 30px 45px 69px;
    font-weight: lighter;
    font-size: 20px;
    border-right: 1px solid #e6e6e6;
    margin: 105px 0 60px 0;
  }

  .c-l-title {
    font-size: 26px;
    padding: 8px 0;
  }

  .content02 .c-r {
    float: left;
    width: 600px;
    text-align: center;
  }

  .qrcode-box {
    width: 248px;
    height: 248px;
    border: 1px solid #ececec;
    padding: 3px;
    margin: 20px auto;
  }

  .qrcode-box img {
    width: 248px;
    height: 248px;
  }

  .i-scan {
    background: url(~images/scan.png) no-repeat left center;
    padding-left: 52px;
    width: 120px;
    margin: 0 auto;
    text-align: left;
    font-size: 18px;
  }

  .footer {
    width: 100%;
    background: #464646;
    padding: 42px 0;
    height: 60px;
    /*position: fixed;*/
    /*bottom: 0;*/
  }

  .footer-in {
    text-align: center;
    width: 460px;
    margin: 0 auto;
    font-size: 18px;
    color: #a5a5a5;
  }
</style>