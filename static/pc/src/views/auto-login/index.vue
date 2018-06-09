<template>
  <div class="main">
    正在跳转...
  </div>
</template>

<script>
  import aesutil from '@/util/aesutil';
  import {$localStorage} from '@/util/storage'
  import {
    login
  } from 'api/show'
  export default {
    name: "index",
    created(){
      const request = {
        type:11,
        token: this.$route.query.token,
        merchantId: this.$route.query.merchantId
      }
      console.log(request)

      login(request).then(res => {
        if(res.code === 10000){
          $localStorage.set('tokenInfo', JSON.stringify(res.data.tokenVo));
          $localStorage.set('userData', JSON.stringify(aesutil.encrypt(res.data.userId)));
          this.$store.dispatch('CHECK_ONLINE', true);
          this.$store.dispatch('UPDATE_TOKEN_INFO', res.data.tokenVo);
          this.$store.commit('SET_USERDATA',res.data);
          this.$router.replace({name:'mIndex'})
        }else{
          toast(res.message)
          this.$router.replace({name:'mobileLogin'})
        }
      }).catch(err => {
        toast(err)
        this.$router.replace({name:'mobileLogin'})
      })
    },
    methods:{
      jumpLink(success){
        const tranAddress = _.isMobile() ? 'mIndex' : 'transaction'
        const loginAddress = _.isMobile() ? 'mobileLogin' : 'aindex'
        if(success){
          this.$router.replace({name:tranAddress})
        }else{
          this.$router.replace({name:loginAddress})
        }
      }
    }
  }
</script>

<style scoped>

</style>