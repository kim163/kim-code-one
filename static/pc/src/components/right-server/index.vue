<template>
  <transition name="fade">
    <div class="right-server" v-show="showMyself">
      <div class="close hide" @click="showMyself=false">
        <i class="iconfont icon-guanbi"></i>
      </div>
      <a class="cont-item" target="_blank" :href="SETTING.live800"><img src="./images/online.png">在线客服<img
        src="./images/rigth.png"></a>
      <a class='cont-item' @click="showBackCall=true"><img src="./images/phone.png">电话回拨<img
        src="./images/rigth.png"></a>

      <!--<div class='cont-qq'>-->
        <!--<a href="cont-item"><img src="./images/qq.png">QQ客服</a>-->
        <!--<div class="cont-qq-num">{{SETTING.qq}}</div>-->
      <!--</div>-->
      <div class='cont-wechat hide' style="margin:2.5em 0;">
        <a href="javascript:void(0)"><img src="./images/wechat.png">微信客服</a>
        <img src="./images/code.jpg" alt="" width="100%">
      </div>
      <router-link class="down-client" target="_blank" :to="{name:'download'}">
        <i class="iconfont icon-xiazai"></i>
        下载客户端
      </router-link>
      <back-call v-model="showBackCall"></back-call>
    </div>
  </transition>
</template>
<script>
  import {SETTING} from "@/assets/data"
  import backCall from "components/back-Call"

  export default {
    name: "",
    data() {
      return {
        SETTING
        ,
        showBackCall: false,
        showMyself: true
      }
    },
    props: {},
    computed: {},
    watch: {},
    methods: {},
    created() {
    },
    activated() {
    },
    components: {backCall}
  }
</script>
<style lang="scss" spcoed>
  .right-server {
    position: fixed;
    z-index: 100;
    right: 10px;
    top: 50%;
    margin-top: -257px;
    width: 141px;
    height: 315px;
    padding: 166px 17px 0;
    background: url(./images/bg.png) no-repeat;
    .close {
      position: absolute;
      top: -35px;
      left: 50%;
      margin-left: -18px;
      cursor: pointer;
      color: #c70d22;
      .iconfont {
        font-size: 36px;
      }
    }
    .cont-item {
      display: block;
      text-align: center;
      background: #e1192f;
      line-height: 29px;
      color: #fff;
      font-size: 14px;
      margin-top: 1px;
      img {
        margin: 0 5px;
      }
    }
    .cont-qq {
      margin-top: 32px;
      font-size: 16px;
      font-weight: bold;
      img {
        margin-top: -20px;
        margin-right: 6px;
      }
      .cont-qq-num {
        text-align: center;
        background-color: #ed7e12;
        border-radius: 15px;
        line-height: 30px;
        color: #fff;
        margin-top: 5px;
      }
    }
    .cont-wechat {
      margin-top: 10px;
      font-size: 16px;
      font-weight: bold;
      line-height: 38px;
      a img {
        margin-right: 5px;
      }
      img {
        vertical-align: top;
      }
    }
    .down-client {
      line-height: 30px;
      font-size: 14px;
      color: #fff;
      background-color: #ed7e12;
      text-align: center;
      display: block;
      margin-top: 10px;
      border-radius: 15px;
    }
  }

</style>
