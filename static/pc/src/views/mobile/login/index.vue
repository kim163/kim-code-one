<template>
  <div class="mobile-login">
      <m-header>{{$t('login.title')}}</m-header>

      <div class="login-content">
        <ul class="mobile-navtabs cfx">
          <li v-for="item in loginType" @click="loginItem=item.value" class="s" :class="{active:loginItem==item.value}" :key="item.value">
            {{generateTitle(item.name)}}
          </li>
        </ul>
        <div class="mobile-form-box form-box-phone">
          <div class="form-group" v-show="loginItem=='account'">
             <label class="form-subtitle">{{$t('login.username')}}</label>
             <div class="form-input">
                <input name="account" @keyup.enter="login" v-model="data.account" type="text" class="ps-input ps-input1" :placeholder="$t('login.usernamePhd')">
             </div>
            </div>
          <div class="form-group" v-show="loginItem=='phone'">
            <label class="form-subtitle">{{$t('login.mobileNum')}}</label>
            <div class="form-input">
               <select class="select-country" v-model="data.areaCode">
                     <option v-for="areacd in areaCodeData" :value="areacd.value" :key="areacd.value" > {{areacd.name}} </option>
               </select>
               <input type="text" class="ps-input ps-input1" v-model="data.phone"
                   :placeholder="$t('login.mobileNumPhd')" maxlength="11" name="phone">
            </div>
          </div>
          <div class="form-group" v-show="loginItem=='email'">
            <label class="form-subtitle">{{$t('login.emailadd')}}</label>
            <div class="form-input">
               <input name="email" @keyup.enter="login" v-model="data.email" type="text" class="ps-input ps-input1" :placeholder="$t('login.emailaddPhd')">
            </div>
          </div>
          <div class="form-group">
            <label class="form-subtitle">{{$t('login.password')}}</label>
            <div class="form-input posit-rel">
              <input ref="pwd" @keyup.enter="login" name="password" v-model="data.password" type="password" class="ps-input ps-input1" :placeholder="$t('login.passwordPhd')">
               <eyes :dom="$refs.pwd"></eyes>
            </div>
          </div>

          <span class="validate"></span>
          <input type="button" class="submit btn btn-block" @click.enter="login" id="submit_user" :value="$t('login.logIn')">
          <div>
            <a href="javascript:void(0);" class="forget-btn" @click="openFindPWD">{{$t('login.forgotpwd')}}</a>
          </div>
        </div>
      </div>

    <forget-password v-show="showPass"  @hide="showPass=false"></forget-password>
  </div>
</template>
<script>
  import { show } from 'api'
  import forgetPassword from "components/password/forget-password"
  import eyes from "components/eyes"
  import mHeader from "components/m-header"
  import {$localStorage, $sessionStorage} from '@/util/storage'
  import { generateTitle } from '@/util/i18n'
  import aesutil from '@/util/aesutil';
  import {mapGetters,mapActions,mapMutations} from 'vuex'

  export default {
    data(){
      return {
        loginType:[
          {name: "login.accloginTitle", value: "account"},
          {name: "login.mobloginTitle", value: "phone"},
          {name: "login.emailloginTitle", value: "email"}
        ],
        loginItem: 'phone',
        areaCodeData: [
          {name:"+63", value: "+63" },
          {name:"+86", value: "+86" }
        ],
        showPass:false,
        showRig:false,
        ImgCode:"",
        isAgent:false,
        data:{
          account:"",
          phone:"9950180120",
          areaCode:"+63",
          email:"",
          password:"a123456"
        },
        requestda: {}
      }
    },
    props: {
      value: Boolean
    },
    watch:{

    },
    methods:{
      generateTitle,
      ...mapMutations(["SHOW_LOGIN"]),
      openFindPWD(findType){
        this.showPass=true;
        this.$emit('input',false);
      },
      reset(msg){
        this.data.imageCode=""

        toast(msg);
      },
      login() {
      //  if(!this.check())return;
       if(this.loginItem=='phone'){
          this.requestda = {
            type:4,
            areaCode: this.data.areaCode,
            phone: this.data.phone,
            password: this.data.password
          }
       }

        if(this.loginItem=='phone' || this.loginItem=='email') {
          show.login(this.requestda).then(res => {
            console.log('login res: ', res);
            if (res.code == 10000) {
              this.$emit('input',false);
              this.SHOW_LOGIN(false);

              let {rquest} = this.$route.query;
              $localStorage.set('tokenInfo', JSON.stringify(res.data.tokenVo));
              $localStorage.set('userData', JSON.stringify(aesutil.encrypt(res.data.userId)))
              this.$store.dispatch('UPDATE_USERDATA');

             // this.$router.replace({path:"/mh/"});
                this.$router.push({name: 'mIndex'});

              //  window.location.href = "/mh/";
            } else {
              this.reset(res.message)
            }
          }).catch(error => {
            this.reset("请求失败");
          });
        }
      },
      check() {
        if(this.data.account=="")
          toast("用户名不能为空")
        else if(this.data.password=="")
          toast("密码不能为空")
        else if(this.data.imageCode=="")
          toast("验证码不能为空")
        else
          return true;
      },
    },
    created(){

    },
    computed: {

    },
    components:{
      forgetPassword, eyes, mHeader
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mobile";

  .forget-btn{
     font-size: 18px;
     color: #4c74ed !important;
  }

</style>
