<template>
  <div class="main">
    <header class="header">
      <div class="header-in">
        <div class="logo-left">
          <img src="~images/logo-blue.png" class="logo">
          <div class="title">久安钱包</div>
          <div class="line"></div>
          <div class="des">商户收银台</div>
        </div>
        <div class="logo-right">您好，欢迎使用久安支付！ <a class="blue hidden">常见问题</a></div>
      </div>
    </header>
    <div class="content-box" v-if="!cashSuccess">
      <div class="content" id="pageOne">
        <div class="content01">
          <div class="book-box">
            <p class="p0 p-txt1">您正在使用即时到账交易，
              <span v-if="endTime > 0">
                请在
                <strong class="orange">
                  <count-down :end-time="endTime" end-text="订单已超时" @callBack="countDownEnd"></count-down>
                </strong>
              内完成支付，否则订单将会自动取消
              </span>
              <span v-else><strong class="orange">订单已超时</strong></span>
            </p>
            <p class="p0 p-txt2">
              <strong>订单号：{{infoData.jiuanOrderid}}
                <span class="fr shop-user">商户名：{{infoData.businessName}}</span>
              </strong>
            </p>
            <p class="p0 p-txt3">
              应付金额：
              <span class="red">{{infoData.coinAmount}}  {{infoData.assetCode}}</span> 折合
              <span class="red">{{infoData.amount}} CNY </span>
              <span class="gray current-rate">当前汇率：100{{infoData.assetCode}}={{formatCny(100)}}CNY	</span>
              <a :href="infoData.notifyUrl" class="orange fr otherPay"><strong>更换其他支付方式&gt;&gt; </strong></a>
            </p>
          </div>
        </div>
        <div class="content02 mobile animated bounceInRight">
          <transition name="pay-type">
            <div v-if="!loginPay">
              <div class="c-l">
                <p class="c-l-title"> 久安扫码支付</p>
                <div v-if="endTime > 0">
                  <p v-show="qrCodeStatus != 1"> 二维码将在<span class="orange">{{qrCodeTime}}秒</span>后失效</p>
                  <p v-show="qrCodeStatus === 1">支付中</p>
                </div>
                <div v-else>该笔订单已超时</div>
                <div class="qrcode-box">
                  <div v-if="endTime > 0">
                    <div class="pay-mask" v-show="qrCodeStatus === 1">正在支付......</div>
                    <div class="pay-mask" v-show="qrCodeStatus === 2">
                      <div>二维码已失效</div>
                      <div class="qrcode-refresh" @click="init()">重新获取</div>
                    </div>
                  </div>
                  <div class="pay-mask" v-else>订单已超时</div>
                  <qrcode :value="infoData.qrCodeImg" v-if="infoData.qrCodeImg" :options="{ size: 248 }"></qrcode>
                </div>
                <p class="i-scan">打开久安钱包<br>扫一扫</p>
              </div>
              <div class="c-r">
                <img src="~images/phone.png">
                <p>
                  不会使用？请参照上图<br>
                  没有久安钱包APP？ <a href="https://9anapp.com/app/9anapp.html" class="blue">前往下载 > </a>
                </p>
                <div class="login-pay" @click="loginPay = true">登录网页版支付</div>
              </div>
            </div>
          </transition>
          <transition name="pay-type">
            <login-pay :data="infoData" :token="token" v-if="loginPay" @appPay="loginPay = false"></login-pay>
          </transition>
          <div class="clear"></div>
        </div>
      </div>
    </div>
    <cash-success :data="infoData" v-else></cash-success>

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
  // import Login from '../mobile/login/login-inline'
  import CashSuccess from './cash-success'
  import merchantCfg from '../misc/merchant-config'
  import Qrcode from '@xkeshi/vue-qrcode';
  import LoginPay from './login-pay'

  import aesutil from '@/util/aesutil';
  import {$localStorage} from '@/util/storage'

  import {
    cashierInit,
    paymentPay,
    getOrderStatus,
  } from 'api/cashier'
  import {login} from 'api/show'
  export default {
    name: "pc-cash",
    data() {
      return {
        infoData: {
          exchangeRate: 100, // 汇率
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
          bindUserid: this.$route.query.bindUserid || '',
          bindPhone: this.$route.query.bindPhone || '',
          bindName: this.$route.query.bindName || '',
          bindAreacode: this.$route.query.bindAreacode || '',
          bindUserLevel: this.$route.query.bindUserLevel || '',
          spareFields: this.$route.query.spareFields || '',
          customerAddress: '', //钱包地址
          createtime: 0,//订单时间
          qrCodeImg:'', //二维码地址
        },
        endTime: 0, //订单结束倒计时
        payPassword: '',
        payBtnStatus: true, //确定付款按钮状态
        token: this.$route.query.token || '',//授权token
        cashSuccess: false,  //充值成功
        showPaymentLoading: true,
        qrCodeStatus:0,//二维码状态 0 正常显示 1支付中 2二维码失效
        qrCodeTime:180, //二维码倒计时
        loginPay:false, // 登录支付
      }
    },
    watch:{
      islogin(){
        if(this.islogin){
          this.infoData.customerAddress = this.userData.accountChainVos[0].address
          _.merchantOrderidWs(this.infoData.jiuanOrderid,this.userData)
        }
      },
      cashSuccess(){
        if(this.cashSuccess){
          clearInterval(this.timer)
        }
      }
    },
    components: {
      CountDown,
      CashSuccess,
      Qrcode,
      LoginPay
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
      formatCny(data) {
        return data / this.infoData.exchangeRate
      },
      qrCodeCountDown(){
        setTimeout(() => {
          this.qrCodeTime -= 1
          if(this.qrCodeTime <= 0){
            this.qrCodeStatus = 2
          }else{
            this.qrCodeCountDown()
          }
        },1000)
      },
      init() { //调用初始化接口
        const data = {
          amount: this.infoData.amount,
          merchantOrderid: this.infoData.merchantOrderid,
          assetCode: this.infoData.assetCode,
          merchantId: this.infoData.merchantId,
          merchantCallbackurl: this.infoData.merchantCallbackurl,
          sign: this.infoData.sign,
          bindUserid: this.infoData.bindUserid,
          bindPhone: this.infoData.bindPhone,
          bindName: this.infoData.bindPhone,
          bindAreacode: this.infoData.bindAreacode,
          bindUserLevel: this.infoData.bindUserLevel,
          spareFields: this.infoData.spareFields,
        }
        cashierInit(data).then(res => {
          console.log('cash init res: ', res)
          if (res.code === 10000) {
            const data = res.data
            this.infoData.jiuanOrderid = data.payOrder.jiuanOrderid
            this.infoData.exchangeRate = data.payOrder.exchangeRate
            this.infoData.createtime = data.payOrder.createtime
            this.infoData.coinAmount = data.payOrder.coinAmount
            this.infoData.qrCodeImg = data.qrCode
            this.qrCodeStatus = 0
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
              this.qrCodeTime = 180
              this.qrCodeCountDown()
              if(this.islogin){
                _.merchantOrderidWs(this.infoData.jiuanOrderid,this.userData)
              }
              //this.getOrderStatus()
            }
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
              if(Number(res.data) === 1){
                this.qrCodeStatus = Number(res.data)
              }
              if(Number(res.data) === 2){
                this.cashSuccess = true
              }
            }else{
              toast(res.message)
            }
          }).catch(err => {
            toast(err)
          })
        },3000)
      },
      // tokenLogin() {//用授权码登录
      //   const request = {
      //     type: 11,
      //     token: this.token,
      //     merchantId: this.infoData.merchantId
      //   }
      //   console.log(request)
      //
      //   login(request).then(res => {
      //     if (res.code === 10000) {
      //       $localStorage.set('tokenInfo', JSON.stringify(res.data.tokenVo));
      //       $localStorage.set('userData', JSON.stringify(aesutil.encrypt(res.data.userId)));
      //       this.$store.dispatch('CHECK_ONLINE', true);
      //       this.$store.dispatch('UPDATE_TOKEN_INFO', res.data.tokenVo);
      //       this.$store.dispatch('INIT_INFO');
      //       this.$store.commit('SET_USERDATA',res.data);
      //     } else {
      //       toast(res.message)
      //     }
      //   }).catch(err => {
      //   })
      // },
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
            clearInterval(this.timer)
            this.unSubscribe()
            this.saveLocal()
          } else {
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      saveLocal(){
        this.$store.dispatch("UPDATE_USERDATA")
        let paySuccessList = $localStorage.get('paySuccessList') //获取本地支付成功列表
        if(!_.isUndefined(paySuccessList) && !_.isNull(paySuccessList)){
          paySuccessList = JSON.parse(aesutil.decrypt(paySuccessList))
          paySuccessList.push(this.infoData)
          $localStorage.set('paySuccessList',aesutil.encrypt(JSON.stringify(paySuccessList)))
        }else{
          const arr = []
          arr.push(this.infoData)
          $localStorage.set('paySuccessList',aesutil.encrypt(JSON.stringify(arr)))
        }
      },
      countDownEnd() {
        toast('该订单已超时')
        this.payBtnStatus = false
        clearInterval(this.timer)
        this.unSubscribe()
      },
      unSubscribe(){
        Vue.$global.bus.$emit('merchantOrderidUnsubscribe')
      }
    },
    created() {
      if(_.isMobile()){
        this.$router.replace({name: 'mCashDesk',query:{
            amount: this.infoData.amount,
            assetCode: this.infoData.assetCode,
            merchantId: this.infoData.merchantId,
            merchantOrderid: this.infoData.merchantOrderid,
            merchantCallbackurl: this.infoData.merchantCallbackurl,
            sign: this.infoData.sign,
            notifyUrl: this.infoData.notifyUrl,
            token: this.token
        }})
      }
      let paySuccessList = $localStorage.get('paySuccessList') //获取本地支付成功列表
      if(!_.isUndefined(paySuccessList) && !_.isNull(paySuccessList)){
        paySuccessList = JSON.parse(aesutil.decrypt(paySuccessList))
        const info = paySuccessList.find((item) => {
          return item.merchantOrderid === this.infoData.merchantOrderid
        })
        if(info){
          console.log(info)
          Object.assign(this.infoData,info)
          this.cashSuccess = true
        }
      }
     // Vue.$global.bus.$emit('merchantOrderid',this.infoData.merchantOrderid)
      this.infoData.businessName = merchantCfg.getDeail(this.infoData.merchantId).name
      // if (!this.islogin && this.token != '') {
      //   this.tokenLogin()
      // }
      if(this.islogin){
        this.infoData.customerAddress = this.userData.accountChainVos[0].address
      }
    },
    mounted() {
      if(!this.cashSuccess){
        this.init()
        Vue.$global.bus.$on('cash:payPassword',(pwd) => {
          this.pay(pwd)
        });
        Vue.$global.bus.$on('update:paying',() => {
          this.qrCodeStatus = 1
        })
        Vue.$global.bus.$on('update:paySuccess',() => {
          this.cashSuccess = true
          this.saveLocal()
          this.unSubscribe()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pay-type-enter{
    opacity: 0;
  }
  .pay-type-leave{
    opacity: 0;
  }
  .pay-type-enter-active,.pay-type-leave-active{
    transition: all .5s;
  }
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
    width: 100%;
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
  .logo-left{
    float: left;
    display: flex;
    justify-content: center;
    .title{
      font-size: 24px;
      color: #333333;
      margin-left: 15px;
      margin-top: 30px;
    }
    .line{
      margin-left: 15px;
      height: 50px;
      width: 1px;
      background: #666666;
      margin-top: 20px;
    }
    .des{
      font-size: 24px;
      color: #999999;
      margin-left: 15px;
      margin-top: 30px;
    }
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
    height: 660px;
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
  .login-pay{
    width: 150px;
    margin: 15px auto;
    cursor: pointer;
  }
  .qrcode-box {
    width: 250px;
    height: 250px;
    border: 1px solid #ececec;
    margin: 20px auto;
    position: relative;
    .pay-mask{
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      background: rgba(0,0,0,.8);
      color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .qrcode-refresh{
      margin-top: 20px;
      width: 120px;
      height: 30px;
      background: #619eff;
      border-radius: 5px;
      font-size: 16px;
      line-height: 30px;
      cursor: pointer;
    }
  }


  .i-scan {
    background: url(~images/scan.png) no-repeat left center;
    padding-left: 52px;
    width: 170px;
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