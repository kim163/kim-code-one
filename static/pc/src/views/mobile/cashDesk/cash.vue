<template>
  <div class="cash-main">
    <mobile-header>{{$t('cash.title')}}</mobile-header>
    <div class="cash-details">
      <div class="trade-time">
        {{$t('cash.realTime')}}
        <span class="red fr">1小时59份59秒</span>
      </div>
      <div class="cash-info">
        <div class="info">
          <span class="title">{{$t('cash.orderNumber')}}</span>
          <span class="detail">DSJW92JF00IDFKSPKFM020409232</span>
        </div>
        <div class="info">
          <span class="title">{{$t('cash.amountsPayable')}}</span>
          <span class="detail">
            <span class="red">5000 UET</span> 折合 <span class="red">50 CNY</span>
          </span>
        </div>
        <div class="info">
          <span class="title">{{$t('cash.currentExchangeRate')}}</span>
          <span class="detail">100UET = 1CNY</span>
        </div>
        <div class="info">
          <span class="title">{{$t('cash.BusinessName')}}</span>
          <span class="detail">千赢国际</span>
        </div>
        <router-link to="http://www.baidu.com" class="other-pay">{{$t('cash.otherPay')}}&gt;&gt;</router-link>
      </div>
    </div>
    <div class="pay-info">
      <cash-login v-if="!islogin"></cash-login>
      <cash-pay v-else></cash-pay>
    </div>

    <div>
      <a class="go-back btn-block">返回</a>
    </div>

  </div>
</template>

<script>
  import MobileHeader from 'components/m-header';
  import {generateTitle} from '@/util/i18n'
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import CashLogin from './cash-login'
  import CashPay from './cash-pay'

  export default {
    data() {
      return {

      }
    },
    methods: {
      generateTitle,
      ...mapMutations(["SHOW_LOGIN"]),
    },
    created() {

    },
    watch: {},

    computed: {
      ...mapGetters(["userData", "islogin"]),
    },

    components: {
      MobileHeader,
      CashLogin,
      CashPay
    }
  };

</script>

<style lang="scss">
  @import "~assets/scss/mobile";

  .cash-details{
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

  .cash-info{
    width: 100%;
    .info{
      padding-left: r(10);
      @include f(15px);
      color: #333333;
      margin-top: r(15);
      .detail{
        color: #8F8F8F;
        margin-left: r(10);
      }
    }
  }
  .other-pay{
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

    .go-back {
      display: inline-block;
      text-align: center;
      height: 50px;
      line-height: 50px;
      background: #86A5F8;
      color: #fff;
      font-size: 18px;
      margin-top: r(30);
    }
    .btn-block {
      display: block;
    }
  }
  .pay-info{
    width: 90%;
    padding-top: r(20);
    margin: 0 auto;
  }
</style>
