<template>
  <div class="header ">
     <div v-if="!islogin">
       <div class="col-2">
          <a href="javascript:void(0);" @click="showLoginDialog=true">{{$t('navbar.login')}}</a>
       </div>
       <div class="col-2">
         <a href="javascript:void(0);" @click="showRegisterDialog=true">{{$t('navbar.register')}}</a>
       </div>
     </div>

        <span v-if="islogin" class="islogin-info">

          Hi,{{userData.loginname}}&nbsp;&nbsp;&nbsp;<span v-show='isUser'> 主账户余额：{{userData.accountMoney}}
          <i class="iconfont icon-shuaxin" style="cursor:pointer;" @click="getGameMoney('MAIN',$event)"></i>

              <router-link :to="{name:'user_deposit'}" class="cl-red server header-fast-btn">存款</router-link>
              <router-link :to="{name:'user_drawmoney'}" class="cl-red server header-fast-btn">取款</router-link>
          </span>
           <router-link class="btn-other" v-if="isUser" :to="{name:'user'}">用户中心</router-link>
            <router-link class="btn-other" v-else :to="{name:'agent'}">代理中心</router-link>
          <a href="javascript:void(0);" @click="$store.dispatch('LOGIN_OUT')" class="btn-other">退出</a>
        <!--  <a href="javascript:void(0);" v-if='isUser' @click="doSignRecord"  class="btn-other">签到</a>-->
        </span>
    <v-login v-if="!islogin" v-model="showLoginDialog" ></v-login>
    <v-register v-if="!islogin" v-model="showRegisterDialog"></v-register>
  </div>
</template>
<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
 // import {getNewAnnouncement} from "api/show"
  import vLogin from "components/auth/login"
  import vRegister  from "components/auth/register"
 // import {doSignRecord, getGameMoney} from "api/user"
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
      ...mapMutations(["SHOW_LOGIN"]),
     /* doSignRecord() {
        doSignRecord().then(res => {
          toast(res.message)
        })
      },*/
      getGameMoney(val,e) {
        let dom=e.currentTarget
        dom.addClass("xuanzhuan")
       /* getGameMoney({gameCode: val}).then(res => {
          if (res.success) {
            this.userData.accountMoney =res.data;
          }
          setTimeout(()=>{
            dom.removeClass("xuanzhuan")
          },500)
        })*/
      }
    },
    computed: {
      ...mapGetters(["userData", "islogin", "isAgent", 'isUser', 'showLogin'])
    },
    created() {
     // this.UPDATE_USERDATA();
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
      color: #09edff;
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
      position: relative;
      display: inline;
      padding: 2px 24px;
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
</style>
