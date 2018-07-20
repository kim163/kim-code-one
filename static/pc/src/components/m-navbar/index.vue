<template>
  <div class="m-navbar-main">
    <router-link :to="{name: item.link}" class="link-item"
                 tag="div" v-for="(item,num) in linkList"
                 :key="num" v-on:click.native="isConversationList(item.name)"
                 :class="{'talk-list':num==2}"
    >
      <i class="iconfont" :class="item.icon"></i>
      <p class="unread-count" v-show="num==2&&unreadCountUpdate>0">{{unreadCountUpdate}}</p>
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
            icon: 'icon-tab-home',
            name: 'navbar.tradingHall',
            link: 'mIndex'
          },
          {
            icon: 'icon-tab-shop',
            name: 'transactionRecord.fastSale',
            link: 'mPendingBuy'
          },
          {
            icon: 'icon-tab-talk',
            name: 'transactionRecord.talkhistory',
            link: 'mtalkList'
          },

          {
            icon: 'icon-tab-money',
            name: 'navbar.transactionRecord',
            link: 'mTranRecord'
          }
        ],

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
      margin-top: r(5);
    }
    .iconfont {
      @include f(18px);
      margin-top: r(5);
    }
  }
</style>
