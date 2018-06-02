<template>
  <div>
    <div class="set-info">
      <i class="iconfont icon-user-login"></i>
      <div class="text">
        您的账户当前未设置任何安全信息，请务必完善
      </div>
    </div>
    <div class="user-account">
      您的{{merchantInfo.short}}账号：qycs004783
    </div>
    <div class="set-account-info">

    </div>
  </div>
</template>

<script>
  export default {
    name: "create-set-password",
    data(){
      return {

      }
    },
    props:{
      merchantInfo:{
        type:Object,
        default:{}
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .set-info{
    width: 100%;
    height: r(156);
    text-align: center;
    color: #333333;
    @include f(15px);
    padding-top: r(38);
    border-bottom: 1px solid #d8d8d8;
    background: $white;
    .text{
      margin-top: r(20);
      color: #FF0000;
    }
    .iconfont{
      @include f(50px);
    }
    .business-logo{
      height: r(28);
      margin-left: r(8);
      margin-right: r(8);
    }
  }
  .user-account{
    width: 100%;
    height: r(50);
    line-height: r(50);
    text-align: center;
    background: $white;
    color: #333333;
    @include f(15px);
    border-bottom: 1px solid #d8d8d8;
    border-top: 1px solid #d8d8d8;
    margin-top: r(10);
  }

</style>