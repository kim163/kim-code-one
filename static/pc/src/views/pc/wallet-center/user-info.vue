<template>
  <div class="user-info">
    <div class="main container">
      <div>我是用户信息模块</div>
      <router-link :to="{name:'walletCenter'}">交易模块</router-link>
      <router-link :to="{name:'userCenter'}">个人中心</router-link>
      <router-link :to="{name:'orderDetail'}">交易详情</router-link>
    </div>

  </div>
</template>

<script>
  export default {
    name: "user-info"
  }
</script>

<style lang="scss" scoped>
  .user-info{
    width: 100%;
    height: 100px;
    background: url(~images/user-info-bg.jpg) no-repeat center;
    background-size: 100% 100%;
  }
  .main{
    min-width: 1200px;
  }
</style>