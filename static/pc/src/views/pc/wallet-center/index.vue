<template>
  <div class="center">
    <user-info></user-info>
    <router-view></router-view>
  </div>
</template>

<script>
  import UserInfo from './user-info'
  export default {
    name: "wallet-center",
    data(){
      return{

      }
    },
    components:{
      UserInfo
    }
  }
</script>

<style lang="scss" scoped>

</style>