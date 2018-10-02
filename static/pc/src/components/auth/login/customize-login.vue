<template>
  <dialog-pop v-model="showPop">
    <div class="dialog-main">
      <div class="title">欢迎回来</div>
      <div class="sub-title">账号</div>
      <input type="text" class="input-def" ref="name" v-model="account" placeholder="请输入账号 / 手机 / 邮箱" autocomplete="off">
      <div class="sub-title">账号</div>
      <input type="password" class="input-def" ref="pwd" v-model="password" placeholder="请输入您的密码" autocomplete="off">
      <div class="dialog-btn" @click="toLogin">登录钱包</div>
      <div class="tips-title">温馨提示</div>
      <p class="tips-detail">1.久安旧用户可以输入账号、手机或者邮箱进行登录。</p>
      <p class="tips-detail">2.通过合作商户跳转打开的用户，设置了账户密码后，也可以使用账号登录。</p>
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
      }
    },
    components:{
      DialogPop
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
        chainLogin(data).then(res => {
          if(res.code === 10000){
            this.$store.commit('SHOW_LOGIN', false)
            $localStorage.set('tokenInfo', JSON.stringify(res.data.tokenVo));
            this.$store.dispatch('CHECK_ONLINE', true);
            this.$store.dispatch('UPDATE_TOKEN_INFO', res.data.tokenVo);
            this.$store.dispatch('INIT_INFO');
            this.$store.commit('SET_USERDATA', res.data);
            _.initRongyun()
            this.$router.push({name: 'walletCenter'});
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dialog-main{
    color: #333333;
    .title{
      font-size: 24px;
      margin-bottom: 20px;
    }
    .sub-title{
      font-size: 16px;
      margin-bottom: 10px;
    }
    .input-def{
      width: 446px;
      height: 40px;
      background: #FFFFFF;
      border: 1px solid #E4E4E4;
      font-size: 16px;
      padding-left: 10px;
      margin-bottom: 10px;
    }
    .dialog-btn{
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: #3573FA;
      border-radius: 5px;
      text-align: center;
      color: #FFFFFF;
      font-size: 18px;
      margin-top: 20px;
      cursor: pointer;
    }
    .tips-title{
      margin-top: 20px;
      margin-bottom: 15px;
    }
    .tips-detail{
      font-size: 14px;
      line-height: 20px;
    }
  }
</style>