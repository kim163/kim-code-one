<template>
  <div class="error-main">
    <div id="header" class="err-header">
      <div class="wrap">
        <div class="err-content">
          <a href="/" class="logo-group"></a>
        </div>
      </div>
    </div>
    <div class="error-404">
      <div class="fbbg bg403">
        <img src="./images/403.png" height="350"/>
      </div>
      <div class="title">地区限制无法打开网页</div>
      <p class="des">如有任何疑问可通过以下方式</p>
      <p class="des">联系我们24小时专业客服</p>
      <div class="btn">
        <a :href="SETTING.live800"
           target="_blank" class="b_btn j-no">在线客服</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {SETTING} from "@/assets/data"

  export default {
    name: "",
    data() {
      return {SETTING}
    },
    props: {},
    computed: {},
    watch: {},
    methods: {},
    created() {
      document.querySelector('body').style.overflow='hidden';
    },
    beforeDestroy(){
      document.querySelector('body').style.overflow='';
    },
    activated() {
    },
    components: {}
  }
</script>
<style spcoed lang="scss">
  .error-main {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    height: 100%;
    overflow: auto;
    .err-header .wrap {
      height: 96px;
      background-color: #151b28;
    }
    .err-content {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
    }
    .err-header .wrap .logo-group {
      background: url("~images/logo.png") no-repeat;
      background-size: contain;
      width: 235px;
      height: 80px;
      margin-top: 8px;
      float: left;
    }
    .err-header .logo {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .error-404 {
    position: relative;
    z-index: 9999;
    width: 1200px;
    margin: 0 auto;
    padding-top: 100px;
    padding-bottom: 80px;
    .fbbg {
      width: 750px;
      height: 350px;
      margin: 0 auto;
    }
    .bgmaintain {
      background-size: contain;
      background-position: center center;
    }
    .title {
      font-size: 48px;
      font-weight: bold;
      color: #333;
      padding-left: 300px;
      letter-spacing: 10px;
      margin-bottom: 10px;
    }
    .des {
      color: #333;
      padding-left: 300px;
      font-size: 16px;
      letter-spacing: 4px;
      line-height: 30px;
    }
    .btn {
      padding-left: 300px;
      margin-top: 20px;
    }
    .btn a {
      display: inline-block;
      padding: 10px 40px;
      color: #fff;
      border-radius: 4px;
      font-size: 16px;
      margin: 0px 15px;
    }
    .btn .r_btn {
      background: #d0352b;
    }
    .btn .b_btn {
      background: #4a9fc6;
    }
  }
</style>
