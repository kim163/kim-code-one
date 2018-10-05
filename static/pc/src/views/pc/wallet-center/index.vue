<template>
  <div class="wallet-center">
    <user-info></user-info>
    <order-notice></order-notice>
    <transition mode="out-in"
                name="fade-quick">
      <router-view></router-view>
    </transition>
    <withdraw-tip v-model="withdrawTip" :is-pc="true"></withdraw-tip>
    <set-update-pwd v-if="showSetInitPwd" :is-first="true" v-model="showSetInitPwd"></set-update-pwd>
  </div>
</template>

<script>
  import store from '@/store'
  import UserInfo from './user-info'
  import WithdrawTip from 'components/withdraw-tip'
  import OrderNotice from './order-notice'
  import SetUpdatePwd from 'components/set-update-pwd'
  export default {
    name: "wallet-center",
    data(){
      return{
        withdrawTip:false,
        showSetInitPwd:false
      }
    },
    components:{
      UserInfo,
      WithdrawTip,
      OrderNotice,
      SetUpdatePwd
    },
    computed: {
      ...mapGetters([
        "getWithdraw",
        "setInitPwd"
      ])
    },
    watch:{
      getWithdraw(val){
        if(val){
          this.withdrawTip = true
          this.$store.commit('GET_WIDTHDRAW',false)
        }else{
          this.withdrawTip = false
        }
      },
      withdrawTip(val){
        if(!val){
          this.$store.commit('GET_WIDTHDRAW',false)
          this.showSetInitPwd = this.setInitPwd
        }
      },
      setInitPwd(val){
        this.showSetInitPwd = val
      }
    },
    created(){
      this.withdrawTip = this.getWithdraw
      if(!this.withdrawTip){
        this.showSetInitPwd = this.setInitPwd
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