<template>
  <div class="center">
    <user-info></user-info>
    <div>
      订单通知模块
    </div>
    <activity></activity>
    <router-view></router-view>
  </div>
</template>

<script>
  import store from '@/store'
  import UserInfo from './user-info'
  import Activity from './activity'
  export default {
    name: "wallet-center",
    data(){
      return{

      }
    },
    components:{
      UserInfo,
      Activity
    },
    beforeRouteEnter(to,from,next){
      if(store.getters.islogin){
        next()
      }else{
        store.commit('SHOW_LOGIN',true)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>