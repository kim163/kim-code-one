<template>
  <div class="modal" v-show="value != 0">
    <div class="modal-dialog findback">
      <div type="button" class="close" @click="$emit('change', 0)">
        <i class="iconfont icon-close" style="font-size:40px;"></i>
      </div>
      <div class="pop-content">
        <ul class="pop-tab">
          <li v-for="item in getType" @click="type=item" :class="{active:type==item}">{{item}}</li>
            <!-- <li><a target="_blank" :href="SETTING.live800">客服找回</a></li> -->
        </ul>
        <div class="form-box">
          <div class="form-group" v-show="type=='短信重置'">
            <i class="iconfont icon-shouji"></i>
            <input type="text" autocomplete="off" class="ps-input" v-model="phone.phone" placeholder="请输入绑定手机号码" maxlength="11"/>
          </div>
          <div class="form-group" v-show="type=='邮箱重置'">
            <i class="iconfont icon-youjian"></i>
            <input type="text" autocomplete="off" class="ps-input" v-model="phone.email" placeholder="请输入邮箱"/>
          </div>
          <div class="form-group">
            <i class="iconfont icon-yanzhengma"></i>
            <input type="text" class="ps-input ps-input2" v-model="phone.code" placeholder="验证码" maxlength="4">
            <a href="javascript:;" class="captcha-code icon_popup">
              <img @click="getimg" :src="authImg"></a>
          </div>

          <input type="submit" class="submit" @click.prevent="verify" value="发送信息">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getLoginNameByEmailOrPhone} from "api/show";
  import {getWithdrawPW} from "api/user";
  import {getAuthImg} from 'api/authService';
  import cover from 'base/cover/cover';
  import  {SETTING} from "@/assets/data";
  import  check from "@/util/RegExp";

  export default {
    mixins: [cover],
    data() {
      return {
        SETTING,
        authImg: '',
        getType: ["短信重置", '邮箱重置'],
        type: "短信重置",
        showVerify: false, //显示验证
        phone: {
          phone: "",
          email: "",
          code: "",
        }
      }
    },
    watch:{
      type(val){
        if(val=="邮箱重置")this.getimg();
      },
      value(val){
        if (val != 0) {
          this.getimg();
        }
      }
    },
    props: {
      value: 0,
    },
    methods: {
      getimg(e) {
        this.authImg = getAuthImg();
      },
      verify() {
        if(this.type == '短信重置'){
          if (!check.phone.test(this.phone.phone)){
            toast("手机号码格式不正确");
            return;
          }
        }
        else{
          if (this.phone.email == ""){
            toast("请输入对应的邮箱");
            return;
          }
          else if(!check.email.test(this.phone.email)) {
            toast("邮箱格式不正确");
            return;
          }
        }

        if(this.type == '短信重置'){
          this.phone.pipe = 'PHONE';
        }
        else{
          this.phone.pipe = 'EMAIL';
        }

        if (this.value == 1) {
          getLoginNameByEmailOrPhone(this.phone).then(res => {
            if (res.code == '10000') {
              this.phone.phone = '';
              this.phone.email = '';
              this.phone.code = '';
            }
            this.getimg();
            toast(res.message)
          }).catch(err => {
            toast("请求失败");
          })
        }
        else if (this.value == 2) {
          getWithdrawPW(this.phone).then(res => {
            if (res.code == '10000') {
              this.phone.phone = '';
              this.phone.email = '';
              this.phone.code = '';
            }
            this.getimg();
            toast(res.message)
          }).catch(err => {
            toast("请求失败");
          })
        }
      }
    },
    components: {
    }
  }
</script>
<style lang="scss">
  .modal-dialog {
    position: relative;
    width: 700px;
    margin: 180px auto;
    padding-bottom: 20px;
    background: #fff;
    border-radius: 8px;
    transition: transform 0.15s ease-out;
    .close {
      position: absolute;
      z-index: 1;
      top: 10px;
      right: 10px;
      cursor: pointer;
      color: #ccc;
    }
  }

  .findback .pop-content {
    height: 300px;
    position: relative;
    padding-top: 34px;
    h2 {
      font-size: 24px;
      color: #282828;
      margin-bottom: 15px;
      text-align: center;
      font-weight: normal;
    }
  }

  .findback .form-box {
    width: 300px;
    margin: 0 auto;
    margin-top: 20px;
    .form-group {
      height: 34px;
      line-height: 34px;
      position: relative;
      margin-bottom: 14px;
      width: 100%;
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
      font-size: 18px;
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
      font-size: 18px;
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
      color: #333;
    }
  }

  .findback .icon_popup {
    position: absolute;
    display: block;
  }

  .findback .submit {
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
    font-weight: bold;
    position: absolute;
    bottom: 20px;
  }

  .findback .pop-tab {
    overflow: hidden;
    text-align: center;
    width: 350px;
    margin: 0 auto;
    li {
      cursor: pointer;
      display: inline-block;
      font-size: 16px;
      color: #666;
      padding: 0 6px;
      line-height: 42px;
      display: inline-block;
      height: 42px;
      margin: 0 15px;
      &.active, &:hover {
        color: #13a1ca;
        border-bottom: 2px solid #13a1ca;
      }
    }
  }

</style>
