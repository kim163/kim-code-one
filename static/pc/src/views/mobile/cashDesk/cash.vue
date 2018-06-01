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
      <cash-info :data="{}"></cash-info>
      <router-link to="http://www.baidu.com" class="other-pay">{{$t('cash.otherPay')}}&gt;&gt;</router-link>
    </div>
    <transition name="pay-type">
      <div class="quick-pay" v-show="quickPay">
        <div class="pay-btn">{{$t('cash.payment')}}</div>
        <div class="pay-btn login-pay" @click="quickPay = false">{{$t('cash.loginPay')}}</div>
      </div>
    </transition>
    <transition name="pay-type">
      <div class="pay-info" v-show="!quickPay">
        <transition name="login-animate">
          <cash-login v-if="!islogin"></cash-login>
        </transition>
        <transition name="pay-info-animate">
          <cash-pay v-if="islogin" @pay="pay"></cash-pay>
        </transition>
      </div>
    </transition>
    <router-link to="http://www.baidu.com" class="go-back" v-if="!quickPay">{{$t('cash.goBack')}}</router-link>
  </div>
</template>

<script>
  import MobileHeader from 'components/m-header'
  import CountDown from 'components/countdown'
  import {generateTitle} from '@/util/i18n'
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import CashLogin from './cash-login'
  import CashPay from './cash-pay'
  import CashInfo from './cash-info'

  export default {
    data() {
      return {
        isImmediate: false, //即时到账
        orderId: '', //订单id
        amount: '',//应付金额
        exchangeRate: 0, // 汇率
        businessName: '', //商户名
        quickPay: true,
        endTime: new Date().getTime() + 7200000,
      }
    },
    components: {
      MobileHeader,
      CashLogin,
      CashPay,
      CashInfo,
      CountDown
    },

    created() {

    },
    watch: {},

    computed: {
      ...mapGetters(["userData", "islogin"]),
    },
    methods: {
      generateTitle,
      init() {
        //调用初始化接口
      },
      pay(psd) {  //支付接口
        console.log(psd)
      },
      countDownEnd() {
        console.log('666666')
      }
    },
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
</style>
