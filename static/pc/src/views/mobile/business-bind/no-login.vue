<template>
  <div>
    <div class="top-tip">
      <div class="text">您尚未登陆，请先登录久安钱包</div>
    </div>
    <div class="bottom-login">
      <login></login>
    </div>
  </div>
</template>

<script>
  import Login from '../login/login-inline'
  export default {
    name: "no-login",
    components:{
      Login
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";
  .top-tip{
    width: 100%;
    height: r(156);
    background: $white;
    padding-top: r(40);
    text-align: center;
    @include f(15px);
    color: #333333;
    border-bottom: 1px solid #D8D8D8;
    .text{
      margin-top: r(10);
    }
  }
  .bottom-login{
    padding: r(20);
  }
</style>