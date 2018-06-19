<template>
  <div class="cash-main">
    <mobile-header :back="goBack">{{$t('cash.title')}}</mobile-header>
    <template v-if="!cashSuccess">
      <div class="cash-details">
        <div class="trade-time">
          {{$t('cash.realTime')}}
          <span class="red fr">
          <count-down :end-time="endTime" end-text="订单已超时" @callBack="countDownEnd"></count-down>
        </span>
        </div>
        <cash-info :data="infoData"></cash-info>
        <router-link :to="infoData.notifyUrl" class="other-pay">{{$t('cash.otherPay')}}&gt;&gt;</router-link>
      </div>
      <div class="payment-loading" v-if="showPaymentLoading">
        加载中...
      </div>
      <div v-if="!showPaymentLoading">
        <transition name="pay-type">
          <div class="quick-pay" v-show="hasApp">
            <div class="pay-btn">{{$t('cash.payment')}}</div>
            <div class="pay-btn login-pay" @click="hasApp = false">{{$t('cash.loginPay')}}</div>
          </div>
        </transition>
        <transition name="pay-type">
          <div class="pay-info" v-show="!hasApp">
            <transition name="login-animate">
              <login v-if="!islogin"></login>
            </transition>
            <transition name="pay-info-animate">
              <cash-pay v-if="islogin" :pay-info="infoData" @pay="pay"></cash-pay>
            </transition>
          </div>
        </transition>
        <router-link :to="infoData.notifyUrl" class="go-back" v-if="!hasApp">{{$t('cash.goBack')}}</router-link>
      </div>
    </template>
    <template v-else>
      <cash-success :pay-info="infoData"></cash-success>
    </template>
  </div>
</template>

<script>
  import MobileHeader from 'components/m-header'
  import CountDown from 'components/countdown'
  import ConfirmDialog from 'components/confirm'
  import {generateTitle} from '@/util/i18n'
  import {mapGetters} from 'vuex'
  import Login from '../login/login-inline'
  import CashPay from './cash-pay'
  import CashInfo from './cash-info'
  import CashSuccess from './cash-success'
  import merchantCfg from '../../misc/merchant-config'

  import aesutil from '@/util/aesutil';
  import {$localStorage} from '@/util/storage'

  import {
    cashierInit,
    loginH5,
    paymentPay,
  } from 'api/cashier'
  import {login} from 'api/show'

  export default {
    data() {
      return {
        infoData: {
          exchangeRate: 0, // 汇率
          businessName: '', //商户名
          jiuanOrderid: '',  //久安订单号
          amount: this.$route.query.amount || '',//应付金额
          assetCode: this.$route.query.assetCode || '', //资产代码
          merchantId: this.$route.query.merchantId || '', //商户号
          merchantOrderid: this.$route.query.merchantOrderid || '', //商户订单号
          merchantCallbackurl: this.$route.query.merchantCallbackurl || '', //商户回调地址
          sign: this.$route.query.sign || '', //商户请求签名
          notifyUrl:this.$route.query.notifyUrl || '',//返回商户地址
          customerAddress: '', //钱包地址
          createtime:0,//订单时间
        },
        hasApp: false, //商户是否安装app
        endTime: 0, //订单结束倒计时
        payPassword: '',
        token: this.$route.query.token,//授权token
        cashSuccess:false,  //充值成功
        showPaymentLoading: true
      }
    },
    components: {
      MobileHeader,
      Login,
      CashPay,
      CashInfo,
      CountDown,
      ConfirmDialog,
      CashSuccess
    },

    created() {
     //判断是否安装app  如果没有  就用授权码登录
      this.infoData.businessName = merchantCfg.getDeail(this.infoData.merchantId).name
      this.checkInstallApp()
      if(!this.islogin && this.token != ''){
        this.tokenLogin()
      }
    },
    watch: {},

    computed: {
      ...mapGetters([
        "userData",
        "islogin"
      ]),
    },
    methods: {
      generateTitle,
      goBack(){
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
          if(res.code === 10000){
            const data = res.data
            this.infoData.jiuanOrderid = data.payOrder.jiuanOrderid
            this.infoData.exchangeRate = data.payOrder.rate
            this.infoData.createtime = data.payOrder.createtime
            const nowTime = _.now()
            if(nowTime > _(data.payOrder.createtime).add(3600000)){
              this.endTime = 0
            }else{
              this.endTime = _(data.payOrder.createtime).add(3600000) - nowTime
            }
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      checkInstallApp(){
        let timeout, t = 1000, hasApp = true;
        setTimeout(() => {
          this.hasApp = hasApp
          this.showPaymentLoading = false
          document.body.removeChild(ifr);
        }, 2000)

        const t1 = Date.now();
        const ifr = document.createElement("iframe");
        ifr.setAttribute('src', 'scheme="jiuanapp"');
        ifr.setAttribute('style', 'display:none');
        document.body.appendChild(ifr);
        timeout = setTimeout(function () {
          var t2 = Date.now();
          if (!t1 || t2 - t1 < t + 100) {
            hasApp = false;
          }
        }, t);
      },
      tokenLogin(){//用授权码登录
        const request = {
          type:11,
          token: this.token,
          merchantId: this.infoData.merchantId
        }
        console.log(request)

        login(request).then(res => {
          if(res.code === 10000){
            $localStorage.set('tokenInfo', JSON.stringify(res.data.tokenVo));
            $localStorage.set('userData', JSON.stringify(aesutil.encrypt(res.data.userId)));
            this.$store.dispatch('CHECK_ONLINE', true);
            this.$store.dispatch('UPDATE_TOKEN_INFO', res.data.tokenVo);
            this.$store.commit('SET_USERDATA',res.data);
            this.$router.replace({name:'mIndex'})
          }else{
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
          payPassword:password,
          assetCode: this.infoData.amount,
          customerAddress: this.infoData.customerAddress,
          securityToken: this.token
        }
        console.log(request)
        paymentPay(request).then(res => {
          if(res.code === 10000){
            this.cashSuccess = true
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      countDownEnd() {
        //toast('该订单已超时')
      },
    },
    mounted() {
      this.init()
    }
  };

</script>

<style lang="scss">
  @import "~assets/scss/mobile";

  .login-animate-enter {
    opacity: 0;
  }

  .pay-info-animate-enter {
    transform: translateX(100%);
  }

  .login-animate-enter-active, .pay-info-animate-enter-active {
    transition: all .5s;
  }

  .pay-type-enter {
    transform: translateX(100%);
  }

  .pay-type-enter-active {
    transition: all .5s;
  }

  .cash-details {
    background: $white;
  }

  .red {
    color: red;
  }

  .trade-time {
    height: r(44);
    line-height: r(44);
    padding: 0 r(10);
    border-bottom: 1px solid #d8d8d8;
  }

  .other-pay {
    display: block;
    width: 100%;
    height: r(44);
    line-height: r(44);
    border-top: 1px solid #d8d8d8;
    border-bottom: 1px solid #d8d8d8;
    @include f(15px);
    color: #333333;
    padding-left: r(10);
    margin-top: r(20);
  }

  .cash-main {
    overflow-x: hidden;
    overflow-y: auto;
    .go-back {
      display: block;
      text-align: center;
      height: r(50);
      line-height: r(50);
      background: #86A5F8;
      color: #fff;
      @include f(18px);
      position: fixed;
      width: 100%;
      bottom: 0;
    }
  }

  .quick-pay {
    padding: r(20) r(10);
    .pay-btn {
      width: 100%;
      height: r(50);
      line-height: r(50);
      background: #4982FF;
      border-radius: r(4);
      text-align: center;
      margin-bottom: r(20);
      color: $white;
      @include f(18px);
      &.login-pay {
        background: #86A5F8;
      }
    }
  }

  .pay-info {
    width: 90%;
    padding-top: r(20);
    padding-bottom: r(50);
    margin: 0 auto;
  }

  .pay-psd-input {
    width: 80%;
    height: r(40);
    padding-left: 2%;
    margin: 0 auto;
    background: #FFFFFF;
    border: 1px solid #D8D8D8;
  }

  .btn-cancel, .btn-yes {
    width: 100%;
    height: 100%;
  }

  .btn-cancel {
    background: #D8D8D8;
    color: #333333;
  }

  .btn-yes {
    background: #4982FF;
    color: $white;
  }
  .payment-loading{
    text-align: center;
    padding-top: r(30);
    animation: looming 2s infinite;
  }
  @keyframes looming {
    from {
      opacity: 0;
    }to{
      opacity: 1;
    }
  }
</style>
