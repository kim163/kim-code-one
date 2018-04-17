<template>
  <div class="addCard" v-show="value">
    <div>
      <h1>添加银行卡</h1>
      <div class="inputbox">
        <span class="label">银行卡号：</span>
        <input type="text" placeholder="输入卡号后，系统智能识别银行" @input="verifyBankNumber(bankno)" v-model="bankno" maxlength="19">
      </div>
      <div class="cardTips">{{banktxt}}</div>
      <a href="javascript:;" class="formbtn" @click="submit">保&nbsp;&nbsp;&nbsp;&nbsp;存</a>
      <span class="closeBtn" @click="$emit('input',false)"> <i class="iconfont icon-close"></i> </span>
    </div>
  </div>
</template>
<script>
  import {validateBankNo, bindBankNo} from "api/payment";
  import  check from "@/util/RegExp"
  import {bank} from "@/vue-extend/mixins/bank"
  export default {
    mixins:[bank],
    props:{value:Boolean},
    data() {
      return {
        bankno: ""
      };
    },
    methods: {
      submit() {
        if(!check.bank.test(this.bankno)) return toast("请输入正确的银行卡");
        if (!this.validateBankNo&&this.banktxt=="") return toast("银行卡校验未通过");
        bindBankNo({cardNo: this.bankno}).then(data => {
          toast(data.message);
          this.validateBankNo=false;
          if (data.success) {
            this.bankno = "";
          }
        }).catch(err => {
          toast("操作失败");
        })
      }
    }
  };
</script>
<style lang="scss">
  .addCard {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 99;
    top: 0;
    left: 0;
    & > div {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -200px;
      margin-left: -200px;
      background-color: #fff;
      border-radius: 10px;
    }
    .inputbox {
      width: 550px;
      min-height: 45px;
      margin: 0 auto 12px;
      clear: both;
      position: relative;
      .label {
        font-size: 16px;
        color: #666666;
        float: left;
        height: 45px;
        line-height: 45px;
        min-width: 112px;
        text-align: right;
      }
      input{
        width: 420px;
        height: 40px;
        float: left;
        border-radius: 4px;
        outline: none;
        background: #f8f8f8;
        border: solid 1px #cacaca;
        font-size: 14px;
        text-indent: 15px;
        color: #666;
      }
    }
    h1 {
      font-size: 24px;
      color: #282828;
      margin-bottom: 15px;
      margin-top: 15px;
      text-align: center;
      line-height: 31px;
      font-weight: normal;
    }
    .formbtn {
      margin: 10px auto 20px;
      display: block;
      width: 100px;
      cursor: pointer;
      letter-spacing: 4px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      background: #13a1ca;
      border-radius: 4px;
      color: #fff;
      text-align: center;
      font-weight: bold;
    }
    .cardTips {
      line-height: 30px;
      text-align: center;
      margin-bottom: 10px;
    }
    .closeBtn {
      display: block;
      position: absolute;
      top: 10px;
      right: 16px;
      cursor: pointer;
      color: #ccc;
      z-index: 1;
      .iconfont{
        font-size: 30px;
      }

    }
  }
</style>
