<template>
  <div class="center">
    <user-info></user-info>
    <router-view></router-view>
  </div>
</template>

<script>
  import store from '@/store'
  import UserInfo from './user-info'
  export default {
    name: "wallet-center",
    data(){
      return{

      }
    },
    components:{
      UserInfo
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