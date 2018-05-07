<template>
  <div class="modal fade in" v-show="value">
    <div class="modal-dialog popup">
      <div type="button" class="close" @click="$emit('input',false)">
        <i class="iconfont icon-close"></i>
      </div>
      <div class="pop-content">
        <h2 class="alert-title">{{$t('register.title')}} <span class="fr smalltxt">{{$t('register.hasAccount')}}？ <a class="a-login">{{$t('register.loginNow')}}</a></span></h2>
        <div class="tab-box">
          <span v-for="item in registerType" @click="registerItem=item.value" class="s" :class="{active:registerItem==item.value}" :key="item.value">
            {{generateTitle(item.name)}}
          </span>
        </div>
        <div class="form-box form-box-phone">
          <div class="form-group" v-show="registerItem=='phone'">
            <p class="form-subtitle">{{$t('register.inputPhoneNum')}}</p>
            <div class="form-input">
              <label class="select-country" id="select-country" country_id="+86">
                中国 +86
                <a href="javascript:void(0) " class="arrow"></a>
              </label>
              <input type="text" class="ps-input cl-blue fl" v-model="data.account" :placeholder="$t('register.inputPlaceholder1')" maxlength="20" />
            </div>

          </div>
          <div class="form-group" v-show="registerItem=='email'">
            <p class="form-subtitle">{{$t('register.inputEmail')}}</p>
            <div class="form-input">
              <input type="text" class="ps-input" v-model="data.account" :placeholder="$t('register.inputPlaceholder0')" maxlength="20" />
            </div>

          </div>
          <div class="form-group">
            <p class="form-subtitle">{{$t('register.Code')}}</p>
            <div class="form-input">
            <input ref="pwd" type="text" autocomplete="off" class="ps-input fl inpt-pwd"
                   v-model="data.imageCode" :placeholder="$t('register.inputPlaceholder2')" maxlength="16" />
              <a href="javascript:;" @click="getCaptcha" class="captcha-code">
                {{$t('register.sendCode')}}</a>
            <!--<eyes :dom="$refs.pwd"></eyes>-->
            </div>
          </div>
          <div class="form-group">
            <p class="form-subtitle">{{$t('register.password')}}</p>
            <div class="form-input">
            <input ref="pwd" type="password" autocomplete="off" class="ps-input fl inpt-pwd"
                   v-model="data.password" :placeholder="$t('register.inputPlaceholder3')" maxlength="16" />
            <!--<eyes :dom="$refs.pwd"></eyes>-->
            </div>
          </div>
          <div class="form-group">
            <p class="form-subtitle">{{$t('register.AgainPassword')}}</p>
            <div class="form-input">
            <input ref="pwd" type="password" autocomplete="off" class="ps-input fl inpt-pwd"
                   v-model="data.password" :placeholder="$t('register.inputPlaceholder4')" maxlength="16" />
            <!--<eyes :dom="$refs.pwd"></eyes>-->
            </div>
          </div>
          <!--<div class="form-group">-->
            <!--<i class="iconfont icon-yanzhengma"></i>-->
            <!--<input type="text" class="ps-input ps-input2" v-model="data.imageCode" placeholder="验证码"-->
                   <!--maxlength="4">-->
            <!--<a href="javascript:;" class="captcha-code icon_popup">-->
              <!--<img @click="getimg" :src="authImg"></a>-->
          <!--</div>-->
          <div class="agreement">
            <input type="checkbox" checked>
            我已阅读并同意 <a class="a-login">服务条款</a>
          </div>
          <span class="validate"></span>
          <input type="submit" class="submit btn btn-block" @click.prevent="register" id="submit_user" value="立即注册">
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import { show } from 'api'
  import { generateTitle } from '@/util/i18n'

  export default {
    props: {
      value: Boolean
    },
    data() {
      return {
        registerType:[
          {name: "register.phoneReg", value: "phone"},
          {name: "register.emailReg", value: "email"}
        ],
        registerItem: 'phone',
        data: {
          phone: "", //true string
          email: "", //true string
          imageCode: "", //true string
          password: "", //true string
          confirmPassword: "",// true string
        }
      }
    },
    methods: {
      generateTitle,
      checked() {
        if (!check.account.test(this.data.account)) toast("登入账号的长度请介于6-10字符之间！");
        else if (!check.password.test(this.data.password)) toast("密码需为6-16位，包含数字和字母");
        //else if (!check.phone.test(this.data.phone)) toast("手机号格式不正确");
        else if (this.data.imageCode == "") toast("请输入验证码");
        else {
          return true;
        }
      },
      register() {
        if (!this.checked()) return;
        register(this.data).then((res) => {
          this.getimg()
          if (res.success) {
            this.$emit('input', false)
            this.$store.dispatch("UPDATE_USERDATA");
            this.$router.replace({path: "/user", query: {account: this.data.account}});
          } else {
            toast(res.message);
          }
        }).catch(err => {
          this.getimg()
        });
      },
      getCaptcha(e) {
        // 发送验证码  判断是否输入手机号
        //this.authImg = getAuthImg();
      },
      toggleTab: function(tab) {
        this.currentTab = tab; // tab 为当前触发标签页的组件名
      }
    },
    components: {
      //eyes
    }
  }
</script>
<style lang="scss">

</style>
