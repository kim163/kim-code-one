<template>
  <div>
    <div class="flex_1" v-show="model=='0'">
      <p><i class="iconfont icon-youjian"></i> 点击获取验证码，系统将向您的注册手机号发送一个验证码</p>
      <div class="inputbox">
        <span class="label">&nbsp;&nbsp;&nbsp;验证码：</span>
        <input type="text" v-model="code" placeholder="请输入验证码" maxlength="">
        <a href="javascript:void(0);" class="btn-submit" @click="showVerify=true" v-show="forbidtime == 0">获取验证码</a>
        <a href="javascript:void(0);" v-show="forbidtime != 0"><span class="red">{{forbidtime}}</span>秒后可重新获取验证码</a>
        <a href="javascript:void(0);" class="btn-submit" @click="verify">验证</a>
      </div>
      <v-touclick style="width: 320px" v-model="showVerify" @success="success"></v-touclick>
    </div>
    <div class="lines" v-show="model=='1'">
      <span class="label">&nbsp;</span>
      <div style="line-height: 1.4">
        请使用注册时填写的手机，<br>发送短信“<span class="red">{{reverse.code}}</span>”到<span class="red">
          {{reverse.showGet}}
        </span><br>
        发送成功<span class="red">15</span>秒后,点击<span class="red">验证</span>
      </div>
      <br>
      <a href="javascript:;" class="btn-submit" @click="verifyTo">立即验证</a>
    </div>
  </div>
</template>
<script>
  import vTouclick from 'components/touclick'
  import {sendSms4TYJ, checkPhoneCode, getPhoneAndCode} from "api/user";

  export default {
    data() {
      return {
        forbidtime: 0,
        interval: null,
        code: "",
        reverse: {
          code: "0000",
          showGet: ""
        },
        showVerify: false,
        isSendMsg: false,
        myData: {
          sid: "",//true string
          check_address: "", //true string
          check_key: "", //true string
        }
      };
    },
    props: ['data'],
    methods: {
      verify() {

        if (!this.isSendMsg) return toast("请先获取验证码");
        if (this.code == "") return toast("请填写验证码");
        checkPhoneCode({code: this.code}).then(res => {
          toast(res.message)
          if (res.success) {
            this.$store.commit("SET_USERDATA",{phoneValidStatus:1});
            this.$emit("input", false)
          }
        }).catch(err => {
          toast("验证失败");
        })
      },
      verifyTo(){
        checkPhoneCode().then(res=>{
          toast(res.message)
        }).catch(err => {
          toast("验证失败");
        })
      },
      success(obj, tc) {
        tc.destory();
        this.showVerify = false;
        this.myData.check_key = obj.token;
        this.myData.check_address = obj.checkAddress;
        this.myData.sid = obj.sid;
        sendSms4TYJ(this.myData).then(res => {
          toast(res.message);
          this.isSendMsg = res.success;
          this.forbidtime = 120;

          let self = this;
          this.interval = setInterval(function(){
            self.forbidtime --;
            if (self.forbidtime == 0) {
              clearInterval(self.interval);
            }
          }, 1000);
        }).catch(err => {
          toast("发送失败")
        });
      }
    },
    computed: {
      model(){
        switch (this.data.type) {
          case "sms":
            return '0';
          case "reverse-sms":
            this.reverse.showGet=this.data.phone;
            this.reverse.code=this.data.code;
            return '1';
          default :
            return "0"
        }
      }
    },
    created() {
    },
    beforeDestroy() {
      window.clearInterval(this.interval)
    },
    components: {
      vTouclick
    }
  };
</script>
<style>
</style>
