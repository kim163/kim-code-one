<template>
  <div class="cash-main">

    <header class="m-header">
      <span class="i-back"> &lt; </span>
      久安收银台
    </header>
    <div class="cash-details">
        <div class="trade-time">
          正在使用即时到账交易
          <span class="red fr">1小时59份59秒</span>
        </div>
         <ul class="trade-ul">
           <li>
             <span class="l-title">订单号 :</span>
             <span class="fr">DSJW92JF00IDFKSPKFM020409232</span>
           </li>
           <li>
             <span class="l-title">应付金额 :</span>
             <span class="fr">
                 <span class="red">5000 UET</span> 折合 <span class="red">50 CNY</span>
             </span>
           </li>
           <li>
             <span class="l-title">当前汇率 :</span> <span class="fr">100UET = 1CNY</span>
           </li>
           <li>
              <span class="l-title">商户名 :</span> <span class="fr"> 千赢国际 </span>
           </li>
           <li>
              <span class="l-title"></span> <span class="fr"> 更换其他支付方式&gt;&gt; </span>
           </li>
         </ul>
    </div>
    <div class="m-login-box">
      <ul class="pop-tab tab-box">
        <li v-for="item in loginType" @click="loginItem=item.value" class="s" :class="{active:loginItem==item.value}" :key="item.value">
          {{generateTitle(item.name)}}
        </li>
      </ul>
      <div class="form-box form-box-phone">
        <div class="form-group" v-show="loginItem=='account'">
          <label class="form-subtitle">{{$t('login.username')}}</label>
          <div class="form-input">
            <input name="account" @keyup.enter="login" v-model="data.account" type="text" class="ps-input ps-input1" :placeholder="$t('login.usernamePhd')">
          </div>
        </div>
        <div class="form-group" v-show="loginItem=='phone'">
          <label class="form-subtitle">{{$t('login.mobileNum')}}</label>
          <div class="form-input">
            <select class="select-country area-box" v-model="data.areaCode">
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

        <div class="text-center">
          <input type="button" class="submit btn" @click.enter="login" id="submit_user" :value="$t('login.logIn')" />
          <p><a class="submit" href="/mobile/tranbuy">前往交易大厅买币</a> </p>
        </div>

        <div>
          <a href="javascript:void(0);" class="forget-btn" @click="openFindPWD">{{$t('login.forgotpwd')}}</a>
        </div>
      </div>
    </div>

    <br>
    <div>
        <a class="pay-btn btn-block">使用手机APP支付</a>
    </div>


  </div>
</template>

<script>
//  import navMenu from 'components/nav';
//  import vFooter from 'components/footer';
//  import tranHeadnav from 'components/master/tran-headnav';
  import { generateTitle } from '@/util/i18n'
  import { transaction } from 'api'
  import {mapGetters,mapActions,mapMutations} from 'vuex'

  export default {
    data() {
      return {
        loginType:[
          {name: "login.accloginTitle", value: "account"},
          {name: "login.mobloginTitle", value: "phone"},
          {name: "login.emailloginTitle", value: "email"}
        ],
        loginItem: 'account',
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
      };
    },
    methods: {
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
              this.$store.dispatch('UPDATE_USERDATA');

              this.$router.push({path:rquest});
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
    created() {
    },
    watch: {

    },
    computed: {
      ...mapGetters(["userData","islogin"]),
    },
    components: {
    },
    filters: {

    }
  };

</script>

<style lang="scss">
  /*@import '@/assets/scss/base.scss';*/
  .cas-main{
    background: #F5F5F5;
  }
.m-header{
  height:44px;
  line-height: 44px;
  background: #BB9A55;
  color:#fff;
  text-align: center;
  position:relative;
  .i-back{
    position:absolute;
    left:0;
    font-size:24px;
    display:inline-block;
    padding:0 15px;
    cursor: pointer;
  }
}
.red{color:red;}
.trade-time{
  padding:20px 15px;
  height:60px;
  border-bottom:1px solid #d8d8d8;
}
.trade-ul{

  li{
    height:50px;
    padding:15px 15px;
    border-bottom:1px solid #d8d8d8;
    font-size:15px;
    color:#8f8f8f;
    .l-title{
      display:inline-block;
      width:75px;
      text-align: right;
      color:#333;
    }
  }
}

.pay-btn{
  display:inline-block;
  text-align: center;
  height:50px;
  line-height: 50px;
  background: #BB9A55;
  color:#fff;
  font-size:18px;
}
  .btn-block{
    display:block;
  }

  /* login */
  .m-login-box{
    padding:20px;
  }
  /* tab */
  .tab-box{
    color:#6b6b6b;
    border-bottom:0;
  .s{
    display:inline-block;
    height:42px;
    padding:0 10px;
    line-height: 42px;
    margin-right:10px;
    cursor: pointer;
    background: #D8D8D8;
    color:#333;
  &.active{
     /*border-bottom:3px solid #87b5ff;*/
     background: #BB9A55;
    color:#fff;
   }
   &:hover,&:link,&:active{
    opacity: .8;
    }
  }
  }


  .text-center{
    text-align: center;
  }
  .ps-input{
    height:40px;
    border: 1px solid #DEDEDE;
    padding:0 10px;
    width:90%;
  }
  .form-box-phone{
    border: 1px solid #DEDEDE;
    padding:15px;
  }
  .area-box{
    background: #FFEFCE;
  }
  .form-group{
    /*padding:0 15px;*/
  }
  .form-subtitle{
    padding:0 0 8px 0;
  }
</style>
