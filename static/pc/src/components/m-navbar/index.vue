<template>
  <div class="m-navbar-main">
    <router-link :to="{name: item.link}" class="link-item" tag="div" v-for="item in linkList" :key="item.icon">
      <i class="iconfont" :class="item.icon"></i>
      <div class="link-name">{{item.name}}</div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "mobile-navbar",
    data() {
      return {
        linkList: [
          {
            icon: 'icon-transaction',
            name: '交易大厅',
            link: ''
          },
          {
            icon: 'icon-tran-buy',
            name: '买入挂单',
            link: 'tranbuy'
          },
          {
            icon: 'icon-tran-sell',
            name: '卖出挂单',
            link: 'transell'
          },
          {
            icon: 'icon-tran-record',
            name: '交易记录',
            link: 'mTranRecord'
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixin";

  .m-navbar-main {
    width: 100%;
    height: r(49);
    background: $white;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    border-top: 1px solid #EBEBEB;
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