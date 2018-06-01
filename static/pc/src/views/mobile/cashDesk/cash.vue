<template>
  <div class="cash-main">
    <mobile-header>{{$t('cash.title')}}</mobile-header>
    <div class="cash-details">
      <div class="trade-time">
        {{$t('cash.realTime')}}
        <span class="red fr">
          <count-down :end-time="endTime" :callback="countDownEnd"></count-down>
        </span>
      </div>
      <cash-info :data="infoData"></cash-info>
      <router-link :to="infoData.merchantCallbackurl" class="other-pay">{{$t('cash.otherPay')}}&gt;&gt;</router-link>
    </div>
    <transition name="pay-type">
      <div class="quick-pay" v-show="isBind">
        <div class="pay-btn">{{$t('cash.payment')}}</div>
        <div class="pay-btn login-pay" @click="isBind = false">{{$t('cash.loginPay')}}</div>
      </div>
    </transition>
    <transition name="pay-type">
      <div class="pay-info" v-show="!isBind">
        <transition name="login-animate">
          <cash-login v-if="!islogin"></cash-login>
        </transition>
        <transition name="pay-info-animate">
          <cash-pay v-if="islogin" @pay="pay"></cash-pay>
        </transition>
      </div>
    </transition>
    <router-link :to="infoData.merchantCallbackurl" class="go-back" v-if="!isBind">{{$t('cash.goBack')}}</router-link>

    <confirm-dialog v-model="showPayPsdDialog">
      <div slot="title">{{$t('cash.psdInputPlaceholder')}}</div>
      <div slot="content">
        <input type="password" class="pay-psd-input" v-model.trim="payPassword"
               :placeholder="$t('cash.psdInputPlaceholder')"/>
      </div>
      <div slot="leftBtn" class="btn-cancel">{{$t('postPend.cancel')}}</div>
      <div slot="rightBtn" class="btn-yes" @click="checkPayPassWord()">{{$t('cash.yesBtn')}}</div>
    </confirm-dialog>
  </div>
</template>

<script>
  import MobileHeader from 'components/m-header'
  import CountDown from 'components/countdown'
  import ConfirmDialog from 'components/confirm'
  import {generateTitle} from '@/util/i18n'
  import {mapGetters} from 'vuex'
  import CashLogin from './cash-login'
  import CashPay from './cash-pay'
  import CashInfo from './cash-info'
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
          amount: '',//应付金额
          exchangeRate: 0, // 汇率
          businessName: '', //商户名
          assetCode: '', //资产代码
          merchantId: '', //商户号
          merchantOrderid: '', //商户订单号
          merchantCallbackurl: '', //商户回调地址
          sign: '', //商户请求签名
          jiuanOrderid: '',  //久安订单号
        },
        isBind: false, //商户是否绑定
        endTime: new Date().getTime() + 7200000,
        showPayPsdDialog: false,
        payPassword: '',
        token: ''
      }
    },
    components: {
      MobileHeader,
      CashLogin,
      CashPay,
      CashInfo,
      CountDown,
      ConfirmDialog
    },

    created() {
      const data = {
        amount: this.getUrlParam('amount'),
        merchantOrderid: this.getUrlParam('merchantOrderid'),
        assetCode: this.getUrlParam('assetCode'),
        merchantId: this.getUrlParam('merchantId'),
        merchantCallbackurl: this.getUrlParam('merchantCallbackurl'),
        sign: this.getUrlParam('sign')
      }
      this.token = this.getUrlParam('token')
      Object.assign(this.infoData, data)
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
      init() {
        //调用初始化接口
        cashierInit(this.infoData).then(res => {
          if(res.code === 10000){

          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      login(){

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
      },
      countDownEnd() {
        console.log('666666')
      },
      getUrlParam(name, href) {
        const params = {}
        const match = (href || window.location.href).match(/#?.*\?(.*)/)

        if (!match) {
          return match
        }

        match[1].split('&').forEach((arg) => {
          arg = arg.split('=')
          params[arg[0]] = decodeURI(arg[1])
        })

        if (name) {
          return params[name]
        }
        return params
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
</style>
