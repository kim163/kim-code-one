<template>
  <div class="content">
    <div class="content-warp show-register">
      <div class="form-rowbox" style="padding:250px 0px;">
        <div class="inputbox">
          <span class="label">用户名：</span>
          <input type="text" name="password" v-model="data.account" placeholder="长度介于6-10字符之间">
        </div>
        <div class="inputbox">
          <span class="label">密码：</span>
          <input ref="pwd" type="password" v-model="data.password" placeholder="密码为6-16位，包含数字和字母，且不能和账号相同">
          <eyes :dom="$refs.pwd"></eyes>
        </div>
        <div class="inputbox">
          <span class="label">确认密码：</span>
          <input ref="pwd1" type="password" v-model="data.confirmPassword" placeholder="确认密码">
          <eyes :dom="$refs.pwd1"></eyes>
        </div>
        <div class="inputbox">
          <span class="label">手机号码：</span>
          <input type="text" v-model="data.phone" placeholder="取款唯一凭证，请正确填写手机号" class="eyecheck">
        </div>
        <div class="inputbox yzm">
          <span class="label">验证码：</span>
          <input type="text" v-model='data.imageCode' placeholder="验证码" class="eyecheck">
          <img class="" @click="getimg" :src="authImg">
        </div>
        <button type="submit" class="formbtn" @click="register">确定</button>
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
        authImg:getAuthImg(),
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
          if (res.success) {
            this.$router.replace({name: "user_index", query: {account: this.data.account}});
          } else {
            this.getimg()
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
    components:{
      eyes
    }
  }
</script>
<style lang="scss">
  .show-register {
    .form-rowbox {
      .yzm.inputbox {
        input {
          width: 320px;
        }
        img {
          width: 100px;
          height: 46px;
          vertical-align: top
        }
      }
    }
  }

</style>
