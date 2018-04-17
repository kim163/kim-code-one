<template>
  <div>
    <div>
      <img width="100%" src="~images/banner/about-banner.jpg" alt="">
    </div>

    <div class="content about-us">
      <div class="content-warp">
        <div class="tab-menu">
          <router-link  to="aboutustab1"  class="tab-menu-item">
            <i class="i1"></i>
            关于我们
          </router-link >
          <router-link  to="aboutustab2" class="tab-menu-item ">
            <i class="i2"></i>
            用户协议
          </router-link>
          <router-link  to="aboutustab3" class="tab-menu-item ">
            <i class="i3"></i>
            关于博彩
          </router-link >
          <router-link  to="aboutustab4" class="tab-menu-item ">
            <i class="i4"></i>
            免责条款
          </router-link >
          <router-link  to="aboutustab5" class="tab-menu-item ">
            <i class="i5"></i>
            联系我们
          </router-link >
          <router-link  to="aboutustab6" class="tab-menu-item ">
            <i class="i6"></i>
            用户隐私
          </router-link >
          <!-- <router-link  to="aboutustab7" class="tab-menu-item ">
            <i class="i7"></i>
            联系我们
          </router-link > -->
        </div>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "",
    data() {
      return {}
    },
    props: {},
    computed: {},
    watch: {},
    methods: {},
    created() {
    },
    activated() {
    },
    components: {}
  }
</script>
<style lang="scss">
  .about-us {
    padding-bottom: 75px;
    .content-warp {
      width: 1140px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 0px 2px 4px #dde2e7;
      padding-bottom: 38px;
    }
    .tab-menu {
      height: 116px;
      text-align: center;
      .tab-menu-item {
        display: inline-block;
        width: 80px;
        height: 80px;
        padding-top: 45px;
        border: 1px solid #cfcfcf;
        border-radius: 40px;
        margin: 15px 20px 0;
        box-sizing: border-box;
        font-size: 14px;
        color: #333333;
        cursor: pointer;
        position: relative;
        &.active, &:hover {
          border: 0;
          background: -prefix-linear-zgradient(top, #ffb600, #ed7f12);
          background: linear-gradient(to bottom, #ffb600, #ed7f12);
          color: #fff;
          i {
            background-position: center -24px !important;
          }
          i.i6{
            background-position: center -25px !important;
          }
        }
        i {
          position: absolute;
          width: 24px;
          height: 24px;
          left: 28px;
          top: 13px;
          &.i1 {
            background: url(~images/about/a1.png) no-repeat center top;
          }
          &.i2 {
            background: url(~images/about/a2.png) no-repeat center top;
          }
          &.i3 {
            background: url(~images/about/a3.png) no-repeat center top;
          }
          &.i4 {
            background: url(~images/about/a4.png) no-repeat center top;
          }
          &.i5 {
            background: url(~images/about/a5.png) no-repeat center top;
            height: 25px;
          }
          &.i6 {
            background: url(~images/about/a6.png) no-repeat center top;
          }
          &.i7 {
            background: url(~images/about/a7.png) no-repeat center top;
          }
        }
      }
    }
    .content-warp .content-info {
      margin: 0 18px;
      background: #f0f0f0;
      padding: 44px;
      line-height: 1.4;
      font-size: 14px;
      h3 {
        margin: 20px 0;
        line-height: 1;
        font-size: 16px;
        color: #ed7e12;
        position: relative;
        padding-left: 10px;
        &::before {
          display: block;
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 15px;
          border-left: 2px solid #ed7e12;
        }
      }
      p,ol{
        font-size: 14px;
        overflow: hidden;
        line-height: 30px;
        color: #333333;
        text-indent: 2em;
        margin-bottom: 20px;
      }
    }
  }
</style>
