<template>
  <div class="m-navbar-main">
    <router-link :to="{name: item.link}" class="link-item" tag="div" v-for="item in linkList" :key="item.icon">
      <i class="iconfont" :class="item.icon"></i>
      <div class="link-name">{{generateTitle(item.name)}}</div>
    </router-link>
  </div>
</template>

<script>
  import { generateTitle } from '@/util/i18n'
  export default {
    name: "mobile-navbar",
    data() {
      return {
        linkList: [
          {
            icon: 'icon-transaction',
            name: 'navbar.tradingHall',
            link: 'mIndex'
          },
          {
            icon: 'icon-tran-buy',
            name: 'postPend.buyer',
            link: 'mPendingBuy'
          },
          {
            icon: 'icon-tran-sell',
            name: 'postPend.seller',
            link: 'mPendingSell'
          },
          {
            icon: 'icon-tran-record',
            name: 'navbar.transactionRecord',
            link: 'mTranRecord'
          }
        ]
      }
    },
    methods: {
      generateTitle
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixin";

  .m-navbar-main {
    width: 100%;
    height: r($footer-hg);
    background: $white;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    border-top: 1px solid #EBEBEB;
    z-index: 99;
    .link-item {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      &.active {
        color: $main-color;
        .link-name {
          color: $main-color;
        }
      }
    }
    .link-name {
      @include f(12px);
      color: #787876;
      margin-top: r(5);
    }
    .iconfont {
      @include f(18px);
      margin-top: r(5);
    }
  }
</style>
