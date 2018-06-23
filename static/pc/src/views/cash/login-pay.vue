<template>
  <div class="login-pay-main">
    <div class="left-container">
      <div class="logo"></div>
      <div class="title">久安钱包 </div>
      <div class="des">开启数字货币金融新时代</div>
    </div>
    <div class="right-container">
      <cash-login v-if="!islogin" @appPay="$emit('appPay')"></cash-login>
      <cash-pay v-else :pay-info="data" @appPay="$emit('appPay')"></cash-pay>
    </div>
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
  }
  .left-container{
    width: 40%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .logo{
      width: 96px;
      height: 109px;
      /*margin: 125px auto 0px;*/
      background: url("~images/logo-big.png");
    }
    .title{
      font-size: 36px;
      line-height: 36px;
      color: #353535;
      margin-top: 24px;
    }
    .des{
      font-size: 24px;
      line-height: 36px;
      color: #8a8a8a;
      margin-top: 21px;
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