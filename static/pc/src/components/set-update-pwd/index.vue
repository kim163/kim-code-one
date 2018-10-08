<template>
  <dialog-pop v-model="show" v-if="show">
    <div class="dialog-pop-main">
      <div class="title">{{isFirst ? '设置账户密码，方便下次登录' : '修改账户密码'}}</div>
      <div class="sub-title">您的登录账号：</div>
      <div class="user-name-copy">
        <div class="user-name">{{checkUserName}}</div>
        <div class="copy-btn-next copy-btn" :data-clipboard-text="checkUserName"
           @click="copy">复制账号</div>
      </div>
      <div class="sub-title">密码</div>
      <input type="password" class="input-def" ref="pwd" @keyup.enter="setPwd"
             v-model="password" placeholder="请输入您的密码" autocomplete="off">
      <div class="sub-title">确认密码</div>
      <input type="password" class="input-def" ref="confirmPwd" @keyup.enter="setPwd"
             v-model="confirmPassword" placeholder="请再次输入您的密码" autocomplete="off">
      <div class="dialog-btn" @click="setPwd">确定</div>
      <div class="tips-title">温馨提示</div>
      <div v-if="isFirst">
        <p class="tips-detail">1.设置账户密码之后，退出后可以通过账号密码登录；</p>
        <p class="tips-detail">2.久安不同的合作商户，登录账户会有不同，请保存自己的账户名和密码；</p>
        <p class="tips-detail">3.若忘记密码，请通过合作商户快速登录，再修改密码</p>
      </div>
      <div v-else>
        <p class="tips-detail">久安不同的合作商户，登录账户会有不同，请保存自己的账户名和密码；</p>
      </div>
    </div>
  </dialog-pop>
</template>

<script>
  import DialogPop from 'components/dialog'
  import check from "@/util/RegExp"
  import Clipboard from 'clipboard';
  import {
    updatePassword
  } from 'api/user-center'
  export default {
    name: "set-update-pwd",
    data(){
      return{
        show:true,
        password:'',
        confirmPassword:'',
      }
    },
    computed:{
      ...mapGetters([
        'userData',
        'centerId',
      ]),
      checkUserName(){
        return !_.isNull(this.userData.userName) ? this.userData.userName
          : (!_.isNull(this.userData.email) ? this.userData.email : this.userData.phone)
      }
    },
    components:{
      DialogPop
    },
    watch:{
      show(val){
        if(!val){
          this.$emit('changeShow',false)
        }
      }
    },
    model:{
      prop:'showPop',
      event:'changeShow'
    },
    props:{
      isFirst:{
        type:Boolean,
        default:false
      },
      showPop:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      copy() {
        var clipboard = new Clipboard('.copy-btn')
        clipboard.on('success', e => {
          toast('复制成功')
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          // 释放内存
          clipboard.destroy()
        })
      },
      setPwd(){
        if(this.password === ''){
          toast('请输入您的密码')
          return
        }else if(this.confirmPassword === ''){
          toast('请再次输入您的密码')
          return
        }else if(this.password !== this.confirmPassword){
          toast('两次输入的密码不一致')
          return
        }else if(!check.password.test(this.password)){
          toast("密码需为6-16位，包含数字和字母")
          return
        }else{
          const data = {
            userId: this.userData.userId,
            password: this.password
          }
          if(this.isFirst){
            Object.assign(data,{
              centerId: this.centerId,
            })
          }
          updatePassword(data).then(res => {
            if(res.code === 10000){
              toast(`密码${this.isFirst ? '设置' : '修改'}成功`)
              this.show = false
              this.$store.dispatch('UPDATE_USERDATA')
              if(this.isFirst){
                this.$store.commit('SET_INITPWD',false)
              }
            }else{
              toast(res.message)
            }
          }).catch(err => {
            toast(err)
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-name-copy{
    width: 100%;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #E4E4E4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    color: #EC3A4E;
    font-size: 16px;
    margin-bottom: 20px;
    .copy-btn{
      font-size: 14px;
      position: relative;
      cursor: pointer;
      &:after{
        content: '';
        width: 1px;
        height: 22px;
        background: #E9E9E9;
        display: block;
        position: absolute;
        left: -20px;
        top: 0px;
      }
    }
  }
</style>