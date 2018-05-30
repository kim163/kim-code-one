<template>
  <div class="m-login-box">
    <ul class="pop-tab tab-box">
      <li v-for="item in loginType" @click="loginItem=item.value" class="tab-info" :class="{active:loginItem==item.value}"
          :key="item.value">
        {{generateTitle(item.name)}}
      </li>
    </ul>
    <div class="form-box form-box-phone">
      <div class="form-group" v-show="loginItem=='account'">
        <label class="form-subtitle">{{$t('login.username')}}</label>
        <div class="form-input">
          <input name="account" @keyup.enter="login" v-model="data.account" type="text" class="ps-input ps-input1"
                 :placeholder="$t('login.usernamePhd')">
        </div>
      </div>
      <div class="form-group" v-show="loginItem=='phone'">
        <label class="form-subtitle">{{$t('login.mobileNum')}}</label>
        <div class="form-input">
          <select class="select-country area-box" v-model="data.areaCode">
            <option v-for="areacd in areaCodeData" :value="areacd.value" :key="areacd.value"> {{areacd.name}}</option>
          </select>
          <input type="text" class="ps-input ps-input1" v-model="data.phone"
                 :placeholder="$t('login.mobileNumPhd')" maxlength="11" name="phone">
        </div>
      </div>
      <div class="form-group" v-show="loginItem=='email'">
        <label class="form-subtitle">{{$t('login.emailadd')}}</label>
        <div class="form-input">
          <input name="email" @keyup.enter="login" v-model="data.email" type="text" class="ps-input ps-input1"
                 :placeholder="$t('login.emailaddPhd')">
        </div>
      </div>
      <div class="form-group">
        <label class="form-subtitle">{{$t('login.password')}}</label>
        <div class="form-input posit-rel">
          <input ref="pwd" @keyup.enter="login" name="password" v-model="data.password" type="password"
                 class="ps-input ps-input1" :placeholder="$t('login.passwordPhd')">
        </div>
      </div>
      <span class="validate"></span>
      <div class="text-center">
        <div class="next-btn" @click.enter="login">{{$t('cash.nextBtn')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {login} from 'api/show'
  import {$localStorage, $sessionStorage} from '@/util/storage'
  import {generateTitle} from '@/util/i18n'
  import aesutil from '@/util/aesutil';
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: "cash-login",
    data() {
      return {
        loginType: [
          {name: "login.accloginTitle", value: "account"},
          {name: "login.mobloginTitle", value: "phone"},
          {name: "login.emailloginTitle", value: "email"}
        ],
        loginItem: 'account',
        areaCodeData: [
          {name: "+63", value: "+63"},
          {name: "+86", value: "+86"}
        ],
        showPass: false,
        showRig: false,
        ImgCode: "",
        isAgent: false,
        data: {
          account: "",
          phone: "9950180120",
          areaCode: "+63",
          email: "",
          password: "a123456"
        },
        requestda: {}
      }
    },
    methods: {
      generateTitle,
      reset(msg) {
        this.data.imageCode = ""
        toast(msg);
      },
      login() {
        //  if(!this.check())return;
        if (this.loginItem == 'phone') {
          this.requestda = {
            type: 4,
            areaCode: this.data.areaCode,
            phone: this.data.phone,
            password: this.data.password
          }
        }

        if (this.loginItem == 'phone' || this.loginItem == 'email') {
          login(this.requestda).then(res => {
            console.log('login res: ', res);
            if (res.code == 10000) {
              this.$emit('input', false);
              this.SHOW_LOGIN(false);

              let {rquest} = this.$route.query;
              $localStorage.set('tokenInfo', JSON.stringify(res.data.tokenVo));
              this.$store.dispatch('UPDATE_USERDATA');

              this.$router.push({path: rquest});
            } else {
              this.reset(res.message)
            }
          }).catch(error => {
            this.reset("请求失败");
          });
        }
      },
      check() {
        if (this.data.account == "")
          toast("用户名不能为空")
        else if (this.data.password == "")
          toast("密码不能为空")
        else if (this.data.imageCode == "")
          toast("验证码不能为空")
        else
          return true;
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";
  /* login */
  .m-login-box {
    padding: r(20);
  }

  /* tab */
  .tab-box {
    border-bottom: 0;
    display: flex;
    justify-content: space-between;
    .tab-info {
      display: inline-block;
      height: r(40);
      width: r(105);
      line-height: r(40);
      text-align: center;
      border: 1px solid #D8D8D8;
      background: $white;
      color: #787876;
      &.active {
        /*border-bottom:3px solid #87b5ff;*/
        background: #4982FF;
        color: #fff;
        border-color: #4982FF;
      }
    }
  }
  .next-btn{
    width: r(294);
    height: r(40);
    background: #4982FF;
    color: $white;
    line-height: r(40);
    text-align: center;
    @include f(18px);
    margin-top: r(20);
  }

  .text-center {
    text-align: center;
  }

  .ps-input {
    height: 40px;
    border: 1px solid #DEDEDE;
    padding: 0 10px;
    width: 90%;
  }

  .form-box-phone {
    border: 1px solid #DEDEDE;
    padding: r(20);
    background: $white;
  }

  .area-box {
    background: #FFEFCE;
  }

  .form-group {
    /*padding:0 15px;*/
  }

  .form-subtitle {
    padding: 0 0 8px 0;
  }
</style>