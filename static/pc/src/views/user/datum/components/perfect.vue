<template>
  <div class="form-rowbox perfect-data">
    <div class="inputbox">
      <span class="label">真实姓名：</span>
      <input type="text" v-model="Data.accountName" placeholder="填写后无法修改，与银行卡持卡人一致"/>
    </div>
    <div class="inputbox">
      <span class="label">手机号码：</span>
      <input type="text" v-model="userData.phone" readonly placeholder=""/>
    </div>
    <div class="inputbox">
      <span class="label">电子邮箱：</span>
      <input type="text" v-model="Data.email" placeholder="填写邮箱地址，方便帐号找回" value=""/>
    </div>
    <div class="inputbox">
      <span class="label">出生日期：</span>
      <datepicker class="input" v-model="Data.birthday"></datepicker>
      <!--<input type="date" v-model="Data.birthday" placeholder="填写后有机会获得专属生日礼金" class="inpt Wdate"/>-->
    </div>
    <div class="inputbox">
      <span class="label">银行卡号：</span>
      <input type="text" v-model="Data.bankno" @input="verifyBankNumber(Data.bankno)" placeholder="输入卡号后，系统智能识别银行"/>
    </div>
    <div v-show="banktxt!=''" class="inputbox txt-bankname">
      <span style="white-space:nowrap">{{banktxt}}</span>
    </div>
    <div class="inputbox">
      <span class="label">微信号码：</span>
      <input type="text" v-model="Data.wechat" placeholder="用于接收优惠信息，非必填项"/>
    </div>
    <div class="inputbox">
      <span class="label">Q Q号码：</span>
      <input type="text" v-model="Data.qq" placeholder="用于接收优惠信息，非必填项"/>
    </div>
    <div>
      <a href="javascript:void(0);" class="formbtn" @click="submit">提交</a>
    </div>
  </div>
</template>
<script>
  import {completeUserInfo} from "api/user"
  import {validateBankNo} from "api/payment"
  import datepicker from "base/datepicker";
  import {mapGetters} from 'vuex'
  import check from "@/util/RegExp"
  import {bank} from "@/vue-extend/mixins/bank"
  export default {
    mixins:[bank],
    data() {
      return {
        Data: {
          birthday: "", //true string
          accountName: "", //true string
          bankno: "", //true string
          email: "", //true string
          qq: "",
          wechat: ""
        }
      }
    },
    methods: {
      checked() {
        if (this.Data.accountName == "") toast("请输入真实姓名");
        else if (!check.name.test(this.Data.accountName)) toast("请输入中文姓名");
        else if (this.Data.email != "" && !check.email.test(this.Data.email)) {
          toast("请输入正确的电子邮箱")
        }
        else if (this.Data.birthday == "") toast("请输入生日");
        else if (this.Data.bankno == "") toast("请输入银行卡号");
        else if (!this.validateBankNo) toast("银行卡号检测未通过");
        else {
          return true;
        }
      },
      submit() {
        if (!this.checked()) return;
        completeUserInfo(this.Data).then(data => {
          if (data.success) {
            this.$store.dispatch("UPDATE_USERDATA");
            $confirm("完善资料成功!领取体验金<br>请注意，检测如有同ip同姓名，或银行卡已被使用时，将无法领取体验金，感谢您的理解。", "提示", {
              confirmText: "立刻领取"
            }).then(() => {
              this.$router.push("/user/discount/experience");
            });
          } else {
            toast(data.message)
          }
        }).catch(err => {
          toast("请稍后重试");
        })
      }
    },
    created() {
    },
    computed: {
      ...mapGetters(["userData"])
    },
    components: {
      datepicker
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .perfect-data {
    margin: 20px;
    border: solid 1px #ccc;
    padding: 20px 0;
  }
  .form-rowbox .txt-bankname{
    font-size: 14px;
    padding-left: 112px;
    color: #FF1E1E;
  }
</style>
