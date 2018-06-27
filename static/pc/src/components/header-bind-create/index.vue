<template>
  <div class="header">
    <div class="container">
      <div class="container-left">
        <div class="logo"></div>
        <div class="name">久安钱包</div>
      </div>
      <div class="container-right">
        <span>登录</span>
        <span class="line"></span>
        <span>注册</span>
        <a class="language j-languageSel" href="javascript:void(0);" data-i18n-html="languageSel">ENGLISH</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return{

      }
    }
  }
</script>

<style lang="scss" scoped>
  .header{
    width: 100%;
    height: 100px;
    line-height: 100px;
    background-color: #5087ff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .container{
    width: 80%;
    height: 100%;
    margin: 0 auto;
    .container-left{
      float: left;
      display: flex;
      align-items: center;
      .logo{
        width: 80px;
        height: 80px;
        background: url("~images/logo.png");
        background-size: contain;
      }
      .name{
        font-size: 24px;
        color: #ffffff;
        margin-left: 15px;
      }
    }
    .container-right{
      float: right;
      font-size: 20px;
      color: #FFFFFF;
      .line{
        width: 2px;
        height: 25px;
        background-color: #c9daff;
        display: inline-block;
        vertical-align: middle;
        margin: 0 20px;
      }
      .language{
        width: 114px;
        height: 45px;
        border-radius: 22px;
        border: solid 2px #ffffff;
        display: inline-block;

      }
    }
  }
</style>