<template>
  <div>
    <div class="top-tip">

    </div>
    <login></login>
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
  }
</style>