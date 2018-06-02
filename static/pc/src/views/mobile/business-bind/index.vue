<template>
  <div>
    <mobile-header>{{title}}</mobile-header>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {generateTitle} from '@/util/i18n'
  import MobileHeader from 'components/m-header'
  import Login from '../login/login-inline'
  export default {
    name: "business-bind",
    data() {
      return {
        title:'久安钱包',
      }
    },
    watch:{
      islogin(){
        this.title = this.islogin ? '' : ''
      }
    },
    computed: {
      ...mapGetters([
        "islogin"
      ]),
    },
    components:{
      MobileHeader,
      CountDown
    },
    methods:{
      generateTitle,

      callBack() {

      }
    }
  }
</script>

<style scoped>

</style>