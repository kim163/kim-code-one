<template>
  <div class="tran-record-main">
    <m-headnav>{{$t('navbar.transactionRecord')}}</m-headnav>
    <div class="nav-list">
      <div class="nav-item" :class="{active: navIndex === 0}" @click="navIndex = 0">
        {{$t('transactionRecord.tranProgress')}}
      </div>
      <div class="nav-item" :class="{active: navIndex === 1}" @click="navIndex = 1">
        {{$t('transactionRecord.tranComplete')}}
      </div>
      <router-link tag="div" class="nav-item" :to="{name: 'mMyPending'}">{{$t('transactionRecord.tranPending')}}
      </router-link>
    </div>
    <div class="amount-balance">{{$t('navbar.accountBalance')}}：<balance></balance></div>
    <div class="tran-list">
      <transition name="tran-animate">
          <transcation-list :type="0"
                            v-if="navIndex === 0"></transcation-list>
      </transition>
      <transition name="tran-animate">
          <transcation-list :type="1"
                            v-if="navIndex === 1"></transcation-list>
      </transition>
    </div>
    <m-navbar></m-navbar>
  </div>
</template>

<script>
  import mHeadnav from 'components/m-headnav';
  import mNavbar from 'components/m-navbar';
  import balance from 'components/balance'
  import TranscationList from './transaction-list';
  import {mapGetters} from 'vuex'

  export default {
    name: "transaction-record",

    components: {
      mHeadnav,
      mNavbar,
      TranscationList,
      // Scroll,
      balance
    },
    computed: {
      ...mapGetters([
        "userData"
      ]),
    },
    data() {
      return {
        navIndex: 0,
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .tran-animate-enter { //临时添加点小动画
    opacity: 0;
    //transform: translateX(100%);
  }

  .tran-animate-leave {
    opacity: 0;
    //transform: translateX(-100%);
  }

  .tran-animate-enter-active, .tran-animate-leave-active {
    transition: all .8s;
  }

  $otherHeight: r(189);
  .tran-record-main {
    width: 100%;
    background: #F5F5F5;
    .nav-list {
      width: 100%;
      height: r(50);
      line-height: r(50);
      background: #FFFFFF;
      display: flex;
      justify-content: space-around;
      border-bottom: 1px solid #D8D8D8;
    }
    .nav-item {
      flex-grow: 1;
      text-align: center;
      @include f(15px);
      color: #787876;
      position: relative;
      &.active {
        color: #4982FF;
        &:after {
          content: '';
          width: 100%;
          height: 1px;
          background: #4982FF;
          position: absolute;
          left: 0;
          bottom: -1px;
        }
      }
    }
    .amount-balance {
      @include f(16px);
      color: #333333;
      padding: r(15) 0 r(15) r(10);
    }
    .tran-list {
      width: 100%;
      height: calc(100% - #{$otherHeight});
      overflow: hidden;
      position: absolute;
      top: r(140)
    }
  }
</style>
