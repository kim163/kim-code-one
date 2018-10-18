<template>
  <div class="bind-main">
    <mobile-header>绑定{{bindType === 1 ? '手机' : '邮箱'}}</mobile-header>
    <div class="bind-info" v-if="bindType === 1">
      <label class="title">手机号</label>
      <select class="select-areaCode" v-model="areaCode">
        <option :value="item" v-for="(item,index) in areaCodeList" :key="index">{{item}}</option>
      </select>
      <input type="text" class="bind-input" v-number-only v-model="phone" placeholder="请输入您绑定号码">
    </div>
    <div class="bind-info" v-if="bindType === 2">
      <label class="title">邮箱绑定</label>
      <input type="text" class="bind-input" v-model="email" placeholder="请输入邮箱账号">
    </div>
    <div class="bind-info">
      <label class="title">验证码</label>
      <input type="text" class="bind-input" v-model="verCode" placeholder="请输入验证码">
      <div class="send-code cl-red" @click="countDown ? '' : sendCodeMsg()">{{countDown ? countDownTime + 's后重新发送' : '发送验证码'}}</div>
    </div>
    <div class="bind-btn" @click="toBind">确定</div>
  </div>
</template>

<script>
  import MobileHeader from 'components/m-header'
  import check from "@/util/RegExp"
  import {
    sendCode,
    sendEmailCode
  } from 'api/show'
  import {
    bindEmail,
    bindPhone
  } from 'api/cashier'
  export default {
    name: "m-bind-phone-email",
    data(){
      return{
        areaCodeList: [
          '+86',
          '+63'
        ],
        areaCode:'+86',
        phone:'',
        email:'',
        verCode: '',
        countDown: false,
        countDownTime: 60,
      }
    },
    props:{
      bindType:{ //绑定类型 1是手机 2是邮箱
        type:Number,
        default:1
      }
    },
    components:{
      MobileHeader
    },
    computed:{
      ...mapGetters([
        'userData'
      ])
    },
    methods:{
      checkInfo(){
        const val = this.bindType === 1 ? this.phone : this.email
        const text = this.bindType === 1 ? '手机号码' : '邮箱地址'
        const reg = this.bindType === 1 ? (this.areaCode === '+86' ? check.phone :check.php_phone) : check.email
        if(val === ''){
          toast(`请输入${text}`)
          return false
        }
        if(!reg.test(val)){
          toast(`请输入正确的${text}`)
          return false
        }
        return true
      },
      toBind(){
        if(this.checkInfo()){
          if(this.verCode === ''){
            toast('请输入验证码')
            return
          }
          const data = {
            userId: this.userData.userId
          }
          if(this.bindType === 1){
            Object.assign(data, {
              areaCode: this.areaCode,
              phone: this.phone,
              phoneMgs: this.verCode
            })
          }else{
            Object.assign(data, {
              email: this.email,
              emailMgs: this.verCode
            })
          }
          const api = this.bindType === 1 ? bindPhone : bindEmail
          api(data).then(res => {
            if(res.code === 10000){
              toast('绑定成功')
              this.$store.dispatch('UPDATE_USERDATA')
              this.$router.replace({name: 'mSafeCenter'})
            }else{
              toast(res.message)
            }
          }).catch(err => {
            toast(err)
          })
        }
      },
      sendCodeMsg(){
        if(this.checkInfo()){
          const data = {
            type:3
          }
          if(this.bindType === 1){
            Object.assign(data, {
              areaCode: this.areaCode,
              phone: this.phone
            })
          }else{
            Object.assign(data, {
              email: this.email
            })
          }
          const api = this.bindType === 1 ? sendCode : sendEmailCode
          api(data).then(res => {
            if(res.code === 10000){
              toast('验证码发送成功')
              this.countDown = true
              this.startCountDown()
            }else{
              toast(res.message)
            }
          }).catch(err => {
            toast(err)
          })
        }
      },
      startCountDown(){
        setTimeout(() => {
          this.countDownTime -= 1
          if(this.countDownTime > 0){
            this.startCountDown()
          }else{
            this.countDown = false
            this.countDownTime = 60
          }
        },1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";
  .bind-main{
    .bind-info{
      width: 100%;
      height: r(44);
      border-top: 1px solid #E9E9E9;
      border-bottom: 1px solid #E9E9E9;
      background: #ffffff;
      display: flex;
      align-items: center;
      margin-top: r(10);
      @include f(15px);
      &:first-child{
        margin-top: r(20);
      }
    }
    .title{
      width: r(80);
      height: 100%;
      line-height: r(44);
      text-align: right;
      color: #333333;
    }
    .select-areaCode{
      width: r(80);
      height: 100%;
      border: none;
      padding: 0 3%;
    }
    .send-code{
      width: r(110);
      height: 100%;
      text-align: center;
      line-height: r(44);
      position: relative;
      &:before{
        content: '';
        width: 1px;
        height: r(22);
        background: #E9E9E9;
        display: block;
        position: absolute;
        left: 0;
        top: r(11);
      }
    }
    .bind-input{
      height: 100%;
      border: none;
      flex-grow: 1;
      padding-left: r(10);
      @include f(15px);
      margin: 0 r(10);
    }
    .bind-btn{
      width: 90%;
      height: r(44);
      background: #3573FA;
      border-radius: 3px;
      text-align: center;
      line-height: r(44);
      @include f(18px);
      color: #ffffff;
      margin: r(20) auto;
    }
  }
</style>