<template>
  <div class="wallet-center">
    <user-info></user-info>
    <transition mode="out-in"
                enter-active-class="animated-quick fadeIn"
                leave-active-class="animated-quick fadeOut">
      <router-view></router-view>
    </transition>
    <withdraw-tip v-if="withdrawTip" v-model="withdrawTip" :is-pc="true"></withdraw-tip>
  </div>
</template>

<script>
  import store from '@/store'
  import UserInfo from './user-info'
  import WithdrawTip from 'components/withdraw-tip'
  export default {
    name: "wallet-center",
    data(){
      return{
        withdrawTip:false
      }
    },
    components:{
      UserInfo,
      WithdrawTip
    },
    computed: {
      ...mapGetters([
        "getWithdraw"
      ])
    },
    watch:{
      getWithdraw(val){
        if(val){
          this.withdrawTip = true
          this.$store.commit('GET_WIDTHDRAW',false)
        }
      }
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