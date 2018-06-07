<template>
  <div>
    <mobile-header :back="goBack">{{title}}</mobile-header>
    <no-login v-if="!islogin"></no-login>
    <user-bind v-if="islogin"></user-bind>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {generateTitle} from '@/util/i18n'
  import MobileHeader from 'components/m-header'
  import noLogin from './no-login'
  import UserBind from './bind-user'
  export default {
    name: "business-bind",
    data() {
      return {
        title:'',
        callBackUrl: this.$route.query.callBackUrl
      }
    },
    watch:{
      islogin(){
        this.title = this.islogin ? '绑定商户' : '久安钱包'
      }
    },
    computed: {
      ...mapGetters([
        "islogin"
      ]),
    },
    components:{
      MobileHeader,
      noLogin,
      UserBind
    },
    methods:{
      generateTitle,
      goBack(){
        window.location.href = this.callbackUrl
      }
    },
    created(){
      this.title = this.islogin ? '绑定商户' : '久安钱包'
    }
  }
</script>

<style scoped>

</style>