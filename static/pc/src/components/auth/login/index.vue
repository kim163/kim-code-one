<template>
  <div class="login-form">
    <p><label>用户名:</label> <input name="jsdy_account" @keyup.enter="login" v-model="data.account" type="text"></p>
    <p><label>密码:</label> <input @keyup.enter="login" name="jsdy_password" v-model="data.password" type="password"></p>
    <p class="identifying-code"><label @click="getimg" style="left: 0;">
      <img v-lazy="ImgCode" style="vertical-align: top"       height="23" width="80" alt=""> </label>
      <input @keyup.enter="login" v-model="data.imageCode"   type="text"></p>
    <div @click.enter="login"  class="btn">立刻登陆</div>
    <a href="javascript:void(0);"  class="btn btn-register" @click="showRig=true">免费注册</a>
    <vRigester v-model="showRig"></vRigester>
  </div>
</template>
<script>
  import  {getAuthImg,login}  from "api/authService"

  import {$localStorage, $sessionStorage} from '@/util/storage';
  import {AUTH_NAME} from "@/store/types"//权限名称
  import vRigester  from 'components/auth/rigester'
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
    data(){
      return {
        showRig:false,
        ImgCode:"",
        isAgent:false,
        data:{
          account:"",
          password:"",
          imageCode:"",
          isRemember:false
        }
      }
    },
    watch:{
      showRig(val){
        !val&&this.getimg();
      }
    },
    props:{
      value:Boolean
    },
    methods:{
      ...mapMutations(["SHOW_LOGIN"]),
      getimg(){
        this.ImgCode=getAuthImg()
      },
      reset(msg){
        this.data.imageCode=""
        this.getimg()
        toast(msg);
      },
      login() {
        if(!this.check())return;
        login(this.data).then(res =>{
          if(res.success){
            this.SHOW_LOGIN(false)
            this.data.imageCode='';
            if(this.data.isRemember){
              $localStorage.set("isRememberAccount",this.data.account);
            }else{
              $localStorage.remove("isRememberAccount");
            }
            this.$store.dispatch("UPDATE_USERDATA");
            this.$store.commit("SET_AUTH",res.data.role);

            if(res.data.role==AUTH_NAME.USER){
               this.$router.replace({path:'/user/finance/deposit' });
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
      this.getimg()
    },
    components:{vRigester}
  };
</script>
<style>
</style>
