<template>
    <dialog-pop v-model="showDialog" v-if="!isMobile">
      <div class="dialog-pop-main">
        <div class="title">找回密码</div>
        <div class="choose-type">
          <select name="" class="sel-type" v-model="type">
            <option v-for="(item,index) in typeList" :value="item.value" :key="index">{{item.name}}</option>
          </select>
          <div class="phone" v-show="type === '1'">
            <select name="" class="area-code" v-model="areaCode">
              <option v-for="(item,index) in areaCodeList" :value="item" :key="index">{{item}}</option>
            </select>
            <input type="text" class="phone-input" ref="phone" v-number-only v-model="phoneNum" placeholder="请输入手机号码">
          </div>
          <input class="mail-input" ref="mail" v-show="type === '2'" v-model="mailAddress" placeholder="请输入邮箱地址">
        </div>
        <div class="sub-title">验证码</div>
        <div class="ver-code">
          <input type="text" class="input-verCode" ref="code" v-number-only v-model="verCode" placeholder="请输入验证码" autocomplete="off">
          <div class="send-verCode" :class="{disabled: countDown}"
               @click="countDown ? '' : sendCode()">{{countDown ? countDownTime + 's后重新发送' : '发送验证码'}}
          </div>
        </div>
        <div class="sub-title">新密码</div>
        <input type="password" class="input-def" ref="pwd" v-model="newPwd" placeholder="请输入密码" autocomplete="off">
        <div class="sub-title">确认密码</div>
        <input type="password" class="input-def" ref="cPwd" v-model="confirmPwd" placeholder="请再次输入密码" autocomplete="off">
        <div class="dialog-btn" @click="setPassword">重置密码</div>
        <p class="tips-detail">Tips：找回密码功能，暂时只支持绑定手机和邮箱的用户，其他问题请联系<get-live-service :show-icon="false"></get-live-service>！</p>
      </div>
    </dialog-pop>
</template>

<script>
  import DialogPop from 'components/dialog'
  import GetLiveService from 'components/get-live800'
  import {
    findPwd
  } from 'api/user-center'
  import {
    sendCode,
    sendEmailCode
  } from 'api/show'
  import check from "@/util/RegExp"

  export default {
    name: "find-pwd",
    data() {
      return {
        type: '1',
        typeList:[
          {
            name:'手机',
            value: '1'
          },
          {
            name:'邮箱',
            value: '2'
          }
        ],
        areaCodeList: [
          '+86',
          '+63'
        ],
        areaCode: '+86',
        phoneNum: '',
        mailAddress: '',
        verCode: '',
        countDown: false,
        countDownTime: 60,
        newPwd: '',
        confirmPwd: '',
        showDialog: true
      }
    },
    watch: {
      showDialog(val) {
        this.$store.commit('SHOW_FINDPASSWORD', val)
      },
      type(){
        this.verCode = ''
      }
    },
    components: {
      DialogPop,
      GetLiveService
    },
    methods: {
      setPassword() {
        const data = {}
        if(this.type === '1'){
          if (this.checkPhone()) {
            Object.assign(data, {
              validateType: 1,
              areaCode: this.areaCode,
              phone: this.phoneNum
            })
          }else{
            return
          }
        }else{
          if (this.checkEmail()) {
            Object.assign(data, {
              validateType: 2,
              email: this.mailAddress
            })
          }else{
            return
          }
        }
        if(this.verCode === ''){
          toast('请输入验证码')
          this.$refs.code.focus()
          return
        }else{
          if(this.type === '1'){
            Object.assign(data, {
              phoneMgs: this.verCode
            })
          }else{
            Object.assign(data, {
              emailMgs: this.verCode
            })
          }
        }
        if(this.newPwd === ''){
          toast('请输入密码')
          this.$refs.pwd.focus()
          return
        }else if(this.confirmPwd === ''){
          toast('请再次输入密码')
          this.$refs.cPwd.focus()
          return
        }else if(this.newPwd != this.confirmPwd){
          toast('两次密码不一致！请重新输入')
          return
        }
        Object.assign(data, {
          password: this.newPwd
        })
        console.log(data)
        findPwd(data).then(res => {
          if(res.code === 10000){
            toast('密码找回成功！请重新登录')
            this.$store.commit('SHOW_FINDPASSWORD',false)
            this.$store.commit('SHOW_LOGIN', true)
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      checkPhone() {  //校验手机号
        if (this.phoneNum === '') {
          toast('请输入手机号码')
          this.$refs.phone.focus()
          return false
        } else {
          let reg = ''
          if (this.areaCode === '+86') {
            reg = check.phone
          } else if (this.areaCode === '+63') {
            reg = check.php_phone
          }
          if (!reg.test(this.phoneNum)) {
            toast('请输入正确的手机号码')
            return false
          } else {
            return true
          }
        }
      },
      checkEmail() {  //校验邮箱
        if (this.mailAddress === '') {
          toast('请输入邮箱地址')
          this.$refs.mail.focus()
          return false
        } else if (!check.email.test(this.mailAddress)) {
          toast('请输入正确的邮箱地址')
          return false
        } else {
          return true
        }
      },
      sendCode() {  //发送验证码
        const data = {}
        if (this.type === '1') {
          if (this.checkPhone()) {
            Object.assign(data, {
              type: 2,
              areaCode: this.areaCode,
              phone: this.phoneNum
            })
          } else {
            return
          }
        } else {
          if (this.checkEmail()) {
            Object.assign(data, {
              type: 2,
              email: this.mailAddress
            })
          }else{
            return
          }
        }
        const api = this.type === '1' ? sendCode : sendEmailCode
        api(data).then(res => {
          if (res.code === 10000) {
            toast('验证码发送成功')
            this.countDown = true
            this.startCountDown()
          } else {
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
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
  .choose-type {
    display: flex;
    margin-bottom: 20px;
    .sel-type {
      width: 80px;
      height: 40px;
      padding: 0 10px;
    }
    .phone {
      width: 356px;
      margin-left: 10px;
      display: flex;
      justify-content: space-between;
      .area-code {
        width: 80px;
        height: 40px;
      }
      .phone-input {
        width: 266px;
        height: 40px;
        padding-left: 10px;
        border: 1px solid #E4E4E4;
      }
    }
    .mail-input {
      width: 356px;
      margin-left: 10px;
      height: 40px;
      padding-left: 10px;
      border: 1px solid #E4E4E4;
    }
  }

  .ver-code {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .input-verCode {
      height: 40px;
      padding-left: 10px;
      border: 1px solid #E4E4E4;
      flex-grow: 1;
    }
    .send-verCode {
      width: 100px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: #3573FA;
      border-radius: 5px;
      color: #ffffff;
      font-size: 16px;
      margin-left: 10px;
      cursor: pointer;
      &.disabled {
        background: #8e939e;
        cursor: default;
      }
    }
  }

  .tips-detail {
    margin-top: 10px;
  }
  /*手机端找回密码样式*/
  .m-find-container{

  }
</style>