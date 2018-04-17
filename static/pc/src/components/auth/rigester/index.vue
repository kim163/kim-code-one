<template>
  <div class="modal fade in" v-show="value">
    <div class="modal-dialog popup">
      <div type="button" class="close" @click="$emit('input',false)">
        <i class="iconfont icon-close" style="font-size:40px;"></i>
      </div>
      <div class="pop-content">
        <h2 class="tips">注册成为会员</h2>
        <div class="form-box">
          <div class="form-group">
            <i class="iconfont icon-yonghu"></i>
            <input type="text" class="ps-input ps-input1" v-model="data.account" placeholder="用户名(6-10位数字和字母)"
                   maxlength="20">
          </div>
          <div class="form-group">
            <i class="iconfont icon-mima"></i>
            <input ref="pwd" type="password" autocomplete="off" class="ps-input inpt-pwd"
                   v-model="data.password" placeholder="密   码(6-16位数字或字母）" maxlength="16">
            <eyes :dom="$refs.pwd"></eyes>

          </div>
          <div class="form-group">
            <i class="iconfont icon-shouji"></i>
            <input type="text" class="ps-input ps-input1" v-model="data.phone"
                   placeholder="取款唯一凭证，请正确填写手机号" maxlength="11">
          </div>
          <div class="form-group">
            <i class="iconfont icon-yanzhengma"></i>
            <input type="text" class="ps-input ps-input2" v-model="data.imageCode" placeholder="验证码"
                   maxlength="4">
            <a href="javascript:;" class="captcha-code icon_popup">
              <img @click="getimg" :src="authImg"></a>
          </div>
          <span class="validate"></span>
          <input type="submit" class="submit" @click.prevent="register" id="submit_user" value="提交">
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import {getAuthImg, register} from 'api/authService';
  import eyes from "components/eyes"
  import  check from "@/util/RegExp"
  export default {
    props: {
      value: Boolean
    },
    data() {
      return {
        authImg: '',
        data: {
          aliasName: "", //true string
          phone: "", //true string
          confirmPassword: "",// true string
          email: "", //true string
          name: "", //true string
          account: "", //true string
          birthDate: "", //true string
          imageCode: "", //true string
          password: "", //true string
          qq: "", //true string
          intro: "",
          friendcode:""
        }
      }
    },
    watch: {
      value(val) {
        val && this.getimg()
      }
    },
    created() {
      let name="friendcode"
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r!= null) {
        this.data.intro=this.data.friendcode=unescape(r[2]);
      }
    },
    methods: {
      checked() {
        if (!check.account.test(this.data.account)) toast("登入账号的长度请介于6-10字符之间！");
        else if (!check.password.test(this.data.password)) toast("密码需为6-16位，包含数字和字母");
        else if (!check.phone.test(this.data.phone)) toast("手机号格式不正确");
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
      getimg(e) {
        this.authImg = getAuthImg();
      }
    },
    components: {
      eyes
    }
  }
</script>
<style lang="scss">

  .modal-dialog .close {
    position: absolute;
    z-index: 1;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: #ccc;
  }

  .popup .pop-content {
    position: relative;
    padding-bottom: 30px;
    padding-top: 54px;
    h2 {
      font-size: 24px;
      color: #282828;
      margin-bottom: 15px;
      text-align: center;
      font-weight: normal;
    }
  }

  .popup .form-box {
    width: 300px;
    margin: 0 auto;
    .form-group {
      height: 34px;
      line-height: 34px;
      position: relative;
      margin-bottom: 14px;
      width: 100%;
    }
    .validate {
      display: block;
      margin: 10px 0;
      font-size: 12px;
      color: #13a1ca;
      min-height: 16px;
      text-align: center;
    }
    p {
      text-align: center;
      color: #999;
    }
    .captcha-code {
      width: 90px;
      height: 34px;
      float: left;
      display: block;
      position: relative;
      background: no-repeat;

      img {
        height: 34px;
        width: 90px;
        vertical-align: top;
      }
    }
    .ps-input {
      width: 300px;
      height: 34px;
      border: 0;
      background: 0 0;
      border-bottom: 1px solid #ccc;
      outline: 0;
      line-height: 34px;
      font-size: 16px;
      color: #333;
      padding: 0 20px 0 30px;
    }
    .ps-input2 {
      width: 210px;
      float: left;
      height: 34px;
      border-bottom: 1px solid #ccc;
      outline: 0;
      line-height: 34px;
      font-size: 16px;
      color: #333;
      padding: 0 20px 0 30px;
    }
    i.iconfont {
      position: absolute;
      height: 100%;
      line-height: 34px;
      top: 0;
      left: 0;
      font-size: 24px;
      display: inline-block;
    }
    span.iconfont {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 24px;
      cursor: pointer;
      line-height: 34px;
      height: 100% !important;
      color: #f66;
    }
  }

  .popup .icon_popup {
    position: absolute;
    display: block;
  }

  .popup .submit {
    width: 300px;
    height: 40px;
    background: #13a1ca;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    font-size: 16px;
    color: #fff;
    text-align: center;
    display: block;
    border-radius: 4px;
  }
</style>
