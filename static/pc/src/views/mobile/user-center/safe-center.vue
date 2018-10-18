<template>
  <div class="safe-main">
    <div class="top-header" :class="{high: safeLevel === 1}">
      <div class="nav">
        <i class="iconfont icon-left-arrow" @click="$router.back()"></i>
        安全中心
      </div>
      <i class="iconfont icon-mark icon-safe-level-high" v-if="safeLevel === 1"></i>
      <i class="iconfont icon-mark icon-safe-level-low" v-else></i>
      <div class="text">账号安全等级{{safeLevel === 1 ? '高' : '低'}}</div>
    </div>
    <div class="link-list">
      <router-link :to="{name:'mSetUserInfo'}" class="item-ink">
        <div class="item-text">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-complete-material"></use>
          </svg>
          完善资料
        </div>
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
      <router-link :to="{name:'mSetPassword',query:{c: '1'}}" class="item-ink">
        <div class="item-text">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-change-password"></use>
          </svg>
          修改密码
        </div>
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
      <router-link :to="{name:'mSetUserInfo'}" class="item-ink">
        <div class="item-text">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bind-phone"></use>
          </svg>
          绑定手机
        </div>
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
      <router-link :to="{name:'mSetUserInfo'}" class="item-ink">
        <div class="item-text">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bind-email"></use>
          </svg>
          绑定邮箱
        </div>
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "m-safe-center",
    data() {
      return {
        safeLevel: 0, //账户安全等级 0表示低 1表示高
      }
    },
    computed: {
      ...mapGetters([
        'userData'
      ])
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .safe-main {
    .top-header {
      background: #E95752;
      transition: all .5s;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      color: #ffffff;
      &.high {
        background: #3FB044;
      }
      .nav {
        width: 100%;
        height: r(44);
        text-align: center;
        line-height: r(44);
        @include f(18px);
        color: #ffffff;
        position: relative;
        .iconfont {
          position: absolute;
          left: r(10);
        }
      }
      .icon-mark {
        margin: r(21) 0;
        @include f(80px);
      }
      .text {
        @include f(18px);
        margin-bottom: r(41);
      }
    }
    .link-list{
      padding-left: r(20);
      background: #ffffff;
      .item-ink{
        width: 100%;
        height: r(50);
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #E4E4E4;
      }
      .item-text{
        display: flex;
        justify-content: center;
      }
      .icon{
        width: r(25);
        height: r(25);
        margin-right: r(10);
      }
      .icon-right-arrow{
        margin-right: r(20);
      }
    }
  }

</style>