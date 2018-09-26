<template>
  <div class="wallet-center">
    <user-info></user-info>
    <order-notice></order-notice>
    <transition mode="out-in"
                name="fade-quick">
      <router-view></router-view>
    </transition>
    <withdraw-tip v-model="withdrawTip" :is-pc="true"></withdraw-tip>
  </div>
</template>

<script>
  import store from '@/store'
  import UserInfo from './user-info'
  import WithdrawTip from 'components/withdraw-tip'
  import OrderNotice from './order-notice'
  export default {
    name: "wallet-center",
    data(){
      return{
        withdrawTip:false
      }
    },
    components:{
      UserInfo,
      WithdrawTip,
      OrderNotice,
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