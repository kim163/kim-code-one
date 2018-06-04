<template>
  <div>
    <div v-if="!createSuccess">
      <div class="set-info">
        <i class="iconfont icon-danger"></i>
        <div class="text">
          您的账户当前未设置任何安全信息，请务必完善
        </div>
      </div>
      <div class="user-account">
        您的{{merchantInfo.short}}账号：qycs004783
      </div>
      <div class="set-account-info">
        <div class="set-password">
          <div class="title-tip"><span class="red">*</span>登陆密码：</div>
          <input type="password" class="psd-input" v-model.trim="password" @mouseout="checkPwdReg" placeholder="请设置您的登录密码"/>
          <input type="password" class="psd-input" v-model.trim="confirmPassword" placeholder="请再次输入您的登录密码"/>
          <div class="error" v-show="pwdError">提示：{{pwdErrorText}}</div>
        </div>
        <div class="set-phone">
          <div class="title-tip">安全绑定：</div>
          <div class="select-type">
            <select class="select" v-model.number="type">
              <option value="1">手机号</option>
              <option value="2">邮箱</option>
            </select>
            <input type="text" class="type-input" v-model="typeNumber" :placeholder="typePlaceholder"/>
          </div>
          <div class="code-info">
            <input type="text" class="code-input" v-model="code" placeholder="验证码"/>
            <get-verify-code v-model="startCountDown" class="get-code" @sendAuthCode="getCode()"></get-verify-code>
          </div>
          <div class="error" v-show="bindError">提示：{{bindErrorText}}</div>
        </div>
      </div>
      <div class="submit">
        <div class="bind-def-btn" @click="submit()">确认提交</div>
      </div>
    </div>
    <create-success v-if="createSuccess"></create-success>
  </div>
</template>

<script>
  import GetVerifyCode from 'components/get-verify-code'
  import CreateSuccess from './create-success'
  import RegExp from '@/util/RegExp'
  import {
    sendCode,
    sendEmailCode
  } from 'api/show'

  export default {
    name: "create-set-password",
    data(){
      return {
        createSuccess:false,
        password:'',
        confirmPassword:'',
        pwdError: false,
        pwdErrorText:'',
        type:1,  //1是手机号 2是邮箱
        typeNumber:'',
        typePlaceholder:'请输入您常用的手机号码',
        code:'',//验证码
        bindError:false,
        bindErrorText:'',
        startCountDown:false,
      }
    },
    components:{
      GetVerifyCode,
      CreateSuccess
    },
    watch:{
      type(){
        this.typePlaceholder = this.type === 1 ? '请输入您常用的手机号码' : '请输入您常用的邮箱地址'
        this.typeNumber = ''
      }
    },
    props:{
      merchantInfo:{
        type:Object,
        default:{}
      }
    },
    methods:{
      checkPwd(){
        if(this.password === ''){
          this.pwdError = true
          this.pwdErrorText = '请设置您的登录密码'
          return false
        }else if(this.confirmPassword === ''){
          this.pwdError = true
          this.pwdErrorText = '请再次输入您的登录密码'
          return false
        }else if(this.password != this.confirmPassword){
          this.pwdError = true
          this.pwdErrorText = '两次密码不一致，请重新输入'
          return false
        }else{
          //差一步校验密码强度
          this.pwdError = false
          this.pwdErrorText = ''
          return true
        }
      },
      checkPwdReg(){
        if(this.password === ''){
          this.pwdError = true
          this.pwdErrorText = '请设置您的登录密码'
          return false
        }else if(!RegExp.password.test(this.password)){
          this.pwdError = true
          this.pwdErrorText = '您输入的密码不符合规则，请重新输入'
          return false
        }else{
          this.pwdError = false
          this.pwdErrorText = ''
          return true
        }
      },
      checkNumber(){
        if(this.typeNumber === ''){
          this.bindError = true
          this.bindErrorText = this.type === 1 ? '请输入您常用的手机号' : '请输入您常用的邮箱地址'
          return false
        }else {
          let reg = ''
          if(this.type === 1){
            reg = RegExp.phone
          }else{
            reg = RegExp.email
          }
          if(!reg.test(this.typeNumber)){
            this.bindError = true
            this.bindErrorText = this.type === 1 ? '请输入您常用的手机号' : '请输入您常用的邮箱地址'
          }
        }
      },
      getCode(){ //获取验证码
        //校验手机号或者邮箱是否为空  并且是否符合规则
        if(this.checkNumber()){
          this.startCountDown = true
        }
      },
      submit(){
        //各种校验
        if(this.checkPwd()){
          if(this.checkNumber()){

          }
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  @mixin def-input{
    height: r(40);
    line-height: r(10);
    background: #FFFFFF;
    border: 1px solid #D8D8D8;
    padding-left: r(10);
  }
  .set-info{
    width: 100%;
    height: r(156);
    text-align: center;
    /*color: #333333;*/
    @include f(15px);
    padding-top: r(38);
    border-bottom: 1px solid #d8d8d8;
    background: $white;
    .text{
      margin-top: r(20);
      color: #FF0000;
    }
    .iconfont{
      @include f(50px);
    }
    .business-logo{
      height: r(28);
      margin-left: r(8);
      margin-right: r(8);
    }
  }
  .user-account{
    width: 100%;
    height: r(50);
    line-height: r(50);
    text-align: center;
    background: $white;
    color: #333333;
    @include f(15px);
    border-bottom: 1px solid #d8d8d8;
    border-top: 1px solid #d8d8d8;
    margin-top: r(10);
  }
  .set-account-info{
    width: 100%;
    border-bottom: 1px solid #d8d8d8;
    border-top: 1px solid #d8d8d8;
    background: $white;
    margin-top: r(10);
    padding: r(20);
    .title-tip{
      color: #000000;
      @include f(15px);
      .red{
        color: #FF0000;
        margin-right: r(5);
      }
    }
    .psd-input{
      width: 100%;
      @include def-input;
      margin-top: r(10);
    }
    .error{
      width: 100%;
      color: #FF0000;
      @include f(15px);
      margin-top: r(10);
    }
    .set-phone{
      margin-top: r(20);
      .select-type,.code-info{
        margin-top: r(10);
        display: flex;
        justify-content: space-between;
      }
      .select{
        width: 24%;
        height: r(40);
        background: url("~images/select-up-down.svg") no-repeat scroll 90% center transparent;
        background-size: r(10) r(12);
        padding: 0 3%;
        color: #4982FF;
        border: 1px solid #4982FF;
        @include f(15px);
      }
      .type-input{
        width: 74%;
        @include def-input;
      }
      .code-input{
        width: 72%;
        @include def-input;
      }
      .get-code{
        width: 26%;
      }
    }
  }
  .submit{
    padding: r(20) r(10);
  }
</style>