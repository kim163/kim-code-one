<template>
  <div class="header ">
     <div v-if="!islogin">
       <div class="col-2">
          <a href="javascript:void(0);" @click="showLogin">{{$t('navbar.login')}}</a>
       </div>
       <div class="col-2">
         <a href="javascript:void(0);" @click="showRegisterDialog=true">{{$t('navbar.register')}}</a>
       </div>
     </div>

        <span v-if="islogin" class="islogin-info login-user">
          {{userData.name}}
          <a href="javascript:void(0);" @click="$store.dispatch('LOGIN_OUT')" class="btn-other">退出</a>
        </span>
    <v-login v-if="!islogin" v-model="showLoginDialog" @show="showLoginDialog=true" v-on:refreshbizlines="showLoginDialog=true"></v-login>
    <v-register  @showLogin="showLogin" v-if="!islogin" v-model="showRegisterDialog"></v-register>

  </div>
</template>
<script>
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  import vLogin from "components/auth/login"
  import vRegister  from "components/auth/register"
  import {SETTING} from "@/assets/data"

  export default {
    data() {
      return {
        SETTING,
        showLoginDialog: false,
        showRegisterDialog: false
      };
    },
    methods: {
      ...mapActions(["UPDATE_USERDATA", "LOGIN_OUT"]),

      showLogin: function(e){
        console.log('事件通讯成功了')
        if(this.showLoginDialog='false'){
          this.showLoginDialog='true';
        }

      },

    },
    watch: {

    },
    computed: {
      ...mapGetters(["userData", "islogin"])
    },
    created() {
      this.UPDATE_USERDATA();
    },
    components: {
      vLogin, vRegister
    }

  };
</script>
<style lang="scss">

  .header {
    .xuanzhuan{
      animation:rotate11 2s linear infinite ;
      display: inline-block;
    }
    display: inline-block;
    .fl > a {
      margin: 0 15px;
    }
    .islogin-info{
      /*color: #09edff;*/
      background: url('~images/user.png') no-repeat;
      padding-left:45px;
      height:40px;
      line-height: 40px;
      display:inline-block;
      color:#333;
      margin-top:6px;
    }
    .login-form {
      line-height: 27px;
      display: inline-block;
    }
    .login-form p {
      border: 1px solid #293758;
      padding-left: 60px;
      padding-right: 5px;
      display: inline-block;
      margin-right: 9px;
      vertical-align: middle;
      position: relative;
      height: 25px;
      width: 135px;
    }
    .login-form p input {
      color: #a4a3a7;
      width: 100%;
      background: none;
      height: 25px;
      outline: none;
      vertical-align: top;
    }
    .login-form p label {
      position: absolute;
      left: 9px;
      top: 0px;
      line-height: 25px;;
    }
    .login-form p.identifying-code {
        width: 145px;
        padding-left: 85px;
    }
    .login-form .btn {
      display: inline-block;
      width: 68px;
      height: 24px;
      line-height: 22px;
      border: 1px solid #ff4242;
      background: #d90000;
      color: #fff;
      box-sizing: border-box;
      text-align: center;
      font-size: 12px;
      vertical-align: middle;
    }
    .login-form .btn-register {
      background: #ffd300;
      border-color: #ffcb5a;
      margin-left: 6px;
      color: #121212;
    }
    .free-try-play {
      display: inline-block;
      margin: 0 17px;
      vertical-align: middle;
    }
    .cl-yelow {
      color: #ffd924 !important;
    }
    .cl-red {
      color: #ff1e1e !important;
    }

    .btn-other {
      border: solid 1px #fff;
      color: #fff;
      display: inline-block;
      height:26px;
      line-height: 26px;
      position: relative;
      padding: 0 14px;
      font-size: 14px;
      margin-left: 10px;
      text-align: center;
      border-radius: 3px;
      font-weight: 500;
    }
    .server{
      margin: 0;
      animation:flashs 0.6s infinite; ;
    }
    @keyframes flashs {
      0%{ color: #f00;}
      100%{color:yellow;}
    }
    .header-fast-btn{
        display: inline-block;
        margin: 0 6px;
    }
  }
  .nav-start{
    .islogin-info{
      color:#fff;
    }
  }

  @media(max-width:1330px) {
    .navbar .link-part .col-2 {
      margin: 30px 10px 0;
    }
    .header .islogin-info{
      margin-top: 20px;
    }
    .navbar .link-part .col-2 a {
      font-size: 16px;
    }
    .navbar .link-part .lang-icons a{
      font-size: 15px;
      padding:4px 10px;
      border: 2px solid #ffffff;
      -webkit-border-radius: 35px;
      -moz-border-radius: 35px;
      border-radius: 35px;
      display: block;
    }
  }
  @media(max-width:1072px) {

    .nav-start .nav-logo-link{
      width:50px;
    }
  }
</style>
