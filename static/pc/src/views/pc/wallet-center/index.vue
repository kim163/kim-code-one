<template>
  <div class="wallet-center">
    <user-info></user-info>
    <transition mode="out-in"
                enter-active-class="animated-quick fadeIn"
                leave-active-class="animated-quick fadeOut">
      <router-view></router-view>
    </transition>
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
      UserInfo,
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