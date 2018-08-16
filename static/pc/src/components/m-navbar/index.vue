<template>
  <div class="m-navbar-main">
    <router-link :to="{name: item.link}" class="link-item"
                 tag="div" v-for="(item,num) in linkList"
                 :key="num" v-on:click.native="isConversationList(item.name)"
                 :class="{'talk-list':num == 3,'hot': item.hot}"
    >
      <i class="iconfont" :class="tabIndex === num ? item.iconAct : item.iconDef"></i>
      <p class="unread-count" v-show="num == 3 && unreadCountUpdate > 0">{{unreadCountUpdate}}</p>
      <div class="link-name">{{generateTitle(item.name)}}</div>
    </router-link>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {generateTitle} from '@/util/i18n'

  export default {
    name: "mobile-navbar",
    data() {
      return {
        linkList: [
          {
            iconDef: 'icon-home-def',
            iconAct: 'icon-home-active',
            name: 'navbar.mNavHome',
            link: 'mIndex'
          },
          {
            iconDef: 'icon-tran-def',
            iconAct: 'icon-tran-active',
            name: 'navbar.mTradingHall',
            link: 'mIndex'
          },
          {
            iconDef: 'icon-car-red',
            iconAct: 'icon-car-red',
            name: 'transactionRecord.fastSale',
            link: 'mPendingBuy',
            hot: true
          },
          {
            iconDef: 'icon-msg-def',
            iconAct: 'icon-msg-active',
            name: 'transactionRecord.talkhistory',
            link: 'mtalkList'
          },
          {
            iconDef: 'icon-my-def',
            iconAct: 'icon-my-active',
            name: 'navbar.mNavMy',
            link: 'mUserCenter' //mTranRecord
          }
        ],
        tabIndex:0,//当前导航
      }
    },


    computed: {
      ...mapGetters([
        'unreadCount'
      ]),
      unreadCountUpdate() {
        if (this.unreadCount < 0) {
          return 0
        } else if (this.unreadCount > 99) {
          return 99
        } else {
          return this.unreadCount
        }
      }
    },

    methods: {
      generateTitle,
      isConversationList(name) {
        if (name == 'transactionRecord.talkhistory') {
          this.$store.commit('CHANGE_CONNECTSTATE', true)
        }
      }
    },
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
      width: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      &.active {
        color: $main-color;
        .link-name {
          color: $main-color;
        }
      }
      &.hot{
        border: r(2) solid $white;
        border-radius: 50%;
        background: #ff7cac;
        position: relative;
        top: r(-25);
        height: r(70);
        /*width: r(70);*/
        padding-top: r(10);
        color: $white;
        .link-name {
          color: $white;
        }
      }
    }
    .unread-count {
      display: inline-block;
      border-radius: 50%;
      width: r(16);
      height: r(16);
      background-color: red;
      font-size: r(10);
      text-align: center;
      margin: 0 auto;
      color: #fff;
      position: absolute;
      top: 10%;
      right: 28%;
      .add_symbol {
        font-size: r(10);
      }
    }
    .link-name {
      @include f(12px);
      color: #787876;
      margin-top: r(3);
    }
    .iconfont {
      @include f(24px);
      margin-top: r(2);
    }
  }
</style>
