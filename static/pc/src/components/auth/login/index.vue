<template>
  <div>
  <div class="modal fade in" v-show="value">
    <div class="modal-dialog popup">
      <div type="button" class="close" @click="$emit('input',false)">
        <i class="iconfont icon-close" style="font-size:40px;"></i>
      </div>
      <div class="pop-content">
        <h2 class="tips">{{$t('login.title')}}</h2>
        <ul class="pop-tab">
          <li v-for="item in loginType" @click="loginItem=item.value" :class="{active:loginItem==item.value}" :key="item.value">
            <a href="javascript:void(0);">{{item.name}}</a>
          </li>
        </ul>
        <div class="form-box">
          <div class="form-group" v-show="loginItem=='account'">
            <label>{{$t('login.username')}}</label>
            <input name="jsdy_account" @keyup.enter="login" v-model="data.account" type="text" class="ps-input ps-input1" :placeholder="$t('login.usernamePhd')">
          </div>
          <div class="form-group" v-show="loginItem=='phone'">
            <label>{{$t('login.mobileNum')}}</label>
            <input type="text" class="ps-input ps-input1" v-model="data.phone"
                   :placeholder="$t('login.mobileNumPhd')" maxlength="11">
          </div>
          <div class="form-group" v-show="loginItem=='email'">
            <label>{{$t('login.emailadd')}}</label>
            <input name="" @keyup.enter="login" v-model="data.email" type="text" class="ps-input ps-input1" :placeholder="$t('login.emailaddPhd')">
          </div>
          <div class="form-group">
            <label>{{$t('login.password')}}</label>
            <input ref="pwd" @keyup.enter="login" name="jsdy_password" v-model="data.password" type="password" class="ps-input ps-input1" :placeholder="$t('login.passwordPhd')">
            <!--<eyes :dom="$refs.pwd"></eyes>-->

          </div>

          <span class="validate"></span>
          <input type="button" class="submit" @click.enter="login" id="submit_user" :value="$t('login.logIn')">
          <div>
            <a href="javascript:void(0);" class="forget-btn" @click="openFindPWD">{{$t('login.forgotpwd')}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>

    <forget-password v-show="showPass"  @hide="showPass=false"></forget-password>
  </div>
</template>
<script>
  import { show } from 'api'
  import forgetPassword from "components/password/forget-password"
  import {$localStorage, $sessionStorage} from '@/util/storage';
  import {AUTH_NAME} from "@/store/types"//权限名称

  import {mapGetters,mapActions,mapMutations} from 'vuex'

  export default {
    data(){
      return {
        loginType:[
          {name: this.$t('login.accloginTitle'), value: "account"},
          {name: this.$t('login.mobloginTitle'), value: "phone"},
          {name: this.$t('login.emailloginTitle'), value: "email"}
        ],
        loginItem: 'account',
        showPass:false,
        showRig:false,
        ImgCode:"",
        isAgent:false,
        data:{
          nodeId: process.env.NODE_ID,
          account:"",
          phone:"",
          email:"",
          password:""
        }
      }
    },
    props: {
      value: Boolean
    },
    watch:{

    },
    props:{
      value:Boolean
    },
    methods:{
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
        alert(this.$t('login.accloginTitle'));
        console.log('login request data: ' ,JSON.stringify( this.data));
        console.dir(this.data);
        show.login(this.data).then(res =>{
          console.log('login res: ' + res);
          if(res.success){
            this.SHOW_LOGIN(false)
            if(this.data.isRemember){
              $localStorage.set("isRememberAccount",this.data.account);
            }else{
              $localStorage.remove("isRememberAccount");
            }
            this.$store.dispatch("UPDATE_USERDATA");
            this.$store.commit("SET_AUTH",res.data.role);

            if(res.data.role==AUTH_NAME.USER){
               this.$router.replace({path:'/user/message' });
            }

          }else{
            this.reset(res.message)
          }
        }).catch(error =>{
          this.reset("请求失败")
        });
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
    components:{
      forgetPassword
    }
  };
</script>
<style lang="scss" scoped>
  .pop-tab li{
    width: 33%;
    float: left;
  }
  .pop-tab li.active a{
    border-bottom: 1px solid #87B5FF;
  }
  .pop-tab a{
    color: #282828;
  }
  .forget-btn{
     font-size: 18px;
     color: #4c74ed !important;
  }

</style>
