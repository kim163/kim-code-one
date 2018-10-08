<template>
  <dialog-pop v-model="showPop">
    <div class="dialog-pop-main">
      <div class="title">{{isAdd ? '添加账户 方便账户之间切换和转账' : '欢迎回来'}}</div>
      <div class="sub-title">账号</div>
      <input type="text" class="input-def" ref="name" v-model="account" placeholder="请输入账号 / 手机 / 邮箱" autocomplete="off">
      <div class="sub-title">密码</div>
      <input type="password" class="input-def" ref="pwd" v-model="password" @keyup.enter="toLogin" placeholder="请输入您的密码" autocomplete="off">
      <div class="dialog-btn" @click="toLogin">{{isAdd ? '关联' : '登录钱包'}}</div>
      <div class="find-register" v-if="!isAdd">
        <!--<div class="cl-red">找回密码？</div>-->
        <div class="cl-red" @click="toRegister">注册账户</div>
      </div>
      <template v-if="!isAdd">
        <div class="tips-title">温馨提示</div>
        <p class="tips-detail">1.久安旧用户可以输入账号、手机或者邮箱进行登录。</p>
        <p class="tips-detail">2.通过合作商户跳转打开的用户，设置了账户密码后，也可以使用账号登录。</p>
      </template>
    </div>
  </dialog-pop>
</template>

<script>
  import check from "@/util/RegExp"
  import DialogPop from 'components/dialog'
  import { chainLogin } from 'api/user-center'
  import { $localStorage } from '@/util/storage'
  export default {
    name: "customize-login",
    data(){
      return{
        showPop:true,
        account:'',
        password:'',
      }
    },
    watch:{
      showPop(val){
        this.$store.commit('SHOW_LOGIN', val)
        if(!val){
          this.$emit('changShow',false)
        }
      }
    },
    components:{
      DialogPop
    },
    props:{
      isAdd:{
        type:Boolean,
        default:false
      },
      show:{
        type:Boolean,
        default:false
      }
    },
    model:{
      prop:'show',
      event:'changShow'
    },
    computed:{
      ...mapGetters([
        'centerId'
      ])
    },
    methods:{
      toLogin(){
        if(this.account === ''){
          toast('请输入登录账号')
          this.$refs.name.focus()
          return false
        }
        if(this.password === ''){
          toast('请输入登录密码')
          this.$refs.pwd.focus()
          return false
        }
        let reg = ''
        if(this.account.indexOf('@') > -1){
          reg = check.email
        }else if(/^\d+$/.test(this.account)){
          const start = this.account.substring(0, 1)
          if(start === '1'){
            reg = check.phone
          }else if(start === '0' || start === '9'){
            reg = check.php_phone
          }
        }else{
          reg = check.userAccount
        }
        if(!reg.test(this.account)){
          toast('请输入正确账号')
          return false
        }
        const data = {
          userName: this.account,
          password: this.password
        }
        if(this.isAdd){
          Object.assign(data,{
            id: this.centerId
          })
        }
        chainLogin(data).then(res => {
          if(res.code === 10000){
            if(this.isAdd){
              toast('用户关联成功')
              if(this.isAdd){
                this.$emit('addSuccess')
              }
              this.$emit('changShow',false)
            }else{
              this.$store.commit('SHOW_LOGIN', false)
              $localStorage.set('tokenInfo', JSON.stringify(res.data.tokenVo));
              this.$store.dispatch('CHECK_ONLINE', true);
              this.$store.dispatch('UPDATE_TOKEN_INFO', res.data.tokenVo);
              this.$store.dispatch('INIT_INFO');
              this.$store.commit('SET_USERDATA', res.data);
              _.initRongyun()
              this.$router.push({name: 'walletCenter'});
            }
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      toRegister(){
        this.$store.commit('SHOW_LOGIN', false)
        this.$store.commit('SHOW_REGISTER', true);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .find-register{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    >div{
      cursor: pointer;
    }
  }
</style>