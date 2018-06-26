<template>
  <div class="login-pay-main">
    <p class="title">久安账号支付</p>
    <cash-login v-if="!islogin"></cash-login>
    <cash-pay v-else :pay-info="data"></cash-pay>
  </div>
</template>

<script>
  import CashLogin from './cash-login'
  import CashPay from './cash-pay'

  import {mapGetters} from 'vuex'

  import {login} from 'api/show'
  import aesutil from '@/util/aesutil';
  import {$localStorage} from '@/util/storage'

  export default {
    name: "login-pay",
    data(){
      return{

      }
    },
    computed:{
      ...mapGetters([
        "userData",
        "islogin",
        "userId"
      ]),
    },
    props:{
      data:{
        type:Object,
        default:{}
      },
      token:{
        type:String,
        default:''
      }
    },
    components:{
      CashLogin,
      CashPay
    },
    methods:{
      tokenLogin() {//用授权码登录
        const request = {
          type: 11,
          token: this.token,
          merchantId: this.data.merchantId
        }
        console.log(request)

        login(request).then(res => {
          if (res.code === 10000) {
            $localStorage.set('tokenInfo', JSON.stringify(res.data.tokenVo));
            $localStorage.set('userData', JSON.stringify(aesutil.encrypt(res.data.userId)));
            this.$store.dispatch('CHECK_ONLINE', true);
            this.$store.dispatch('UPDATE_TOKEN_INFO', res.data.tokenVo);
            this.$store.dispatch('INIT_INFO');
            this.$store.commit('SET_USERDATA',res.data);
          } else {
            toast(res.message)
          }
        }).catch(err => {
        })
      },
    },
    created() {
      if (!this.islogin && this.token != ''  && !_(this.token).isUndefined()) {
        this.tokenLogin()
      }
    },
  }
</script>

<style lang="scss" scoped>

  .login-pay-main{
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: left;
    align-items: center;
    padding-top: 100px;
    .title{
      font-weight: lighter;
      font-size: 26px;
      padding: 8px 0;
      margin-bottom: 50px;
    }
  }
  .right-container{
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    /*padding-top: 100px;*/
  }
</style>