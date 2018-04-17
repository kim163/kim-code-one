<template>
  <div class="back-Call" v-show="value">
    <div class="back-call-content">
      <span class="closeBtn" @click="$emit('input',false)"> <i class="iconfont icon-close"></i> </span>
      <h1>电话回拨</h1>
      <div class="form_field_warp">
        <div class="inputbox">
          <span class="label">联系号码:</span>
          <input v-model.number="phone" type="text" maxlength="16">
        </div>
      </div>
      <div class="btn_wrap">
        <a href="javascript:void(0);" class="formbtn" @click="submit">确认回拨</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {makeCall} from "api/show"
  import  check from "@/util/RegExp"
  export default {
    data() {
      return {
        phone: ""
      };
    },
    props:{value:Boolean},
    methods: {
      submit() {
        if (!check.phone.test(this.phone)) return toast("手机格式不正确");
        makeCall({phone:this.phone}).then(res => {
          toast(res.message)
        }).catch(err => {
          toast("系统繁忙,请稍后重试...")
        })
      }
    },
    components: {}
  };
</script>
<style lang="scss">
  .back-Call {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 98;
    background-color: rgba(0, 0, 0, 0.7);
    text-align: center;
    .back-call-content {
      position:relative;
      background-color: #fff;
      display: inline-block;
      border-radius: 15px;
      margin-top: 10%;
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
          height: 40px;
          line-height: 45px;
          min-width: 112px;
          text-align: center;
        }
        input {
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
        background: #1e327e;
        border-radius: 4px;
        color: #fff;
        text-align: center;
        font-weight: bold;
      }
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
