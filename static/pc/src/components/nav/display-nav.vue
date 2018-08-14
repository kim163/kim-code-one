<template>
  <div class="display-nav">
    <div class="dispnav-announce">
      <div class="container f-white max-width">
        <div class="row">
          <div class="col-12 left">
             中心化区块链记账，钱包账目无法篡改造假，再也不用担心支付厂商做假账了
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Nav Menu -->
    <div class="m-nav-container">
      <input id="toggle" type="checkbox">
      <label class="toggle-container" for="toggle"><span class="button button-toggle"></span></label>
      <div class="m-nav-title">
        <router-link :to="{name:'promIndex'}">
          <i class="iconfont icon-prom-logo"></i>
        </router-link>
      </div>
      <div class="mobile-nav-bar">
        <router-link :to="{name:'promIndex'}" class="nav-item">久安优势</router-link>
        <router-link :to="{name:'promHelp'}" class="nav-item">帮助中心</router-link>
        <router-link :to="{name:'promContact'}" class="nav-item">联系我们</router-link>
      </div>
    </div>

    <!-- Desktop Nav Menu -->
    <div class="dispnav-content">
      <div class="container max-width">
        <div class="row cfx">
          <div class="logo fl">
            <router-link :to="{name:'promIndex'}">
              <i class="iconfont icon-prom-logo"></i>
            </router-link>
          </div>
          <div class="link-part fr">
            <div class="col-2">
              <router-link :to="{name:'promIndex'}">久安优势</router-link>
            </div>
            <div class="col-2">
              <router-link :to="{name:'promHelp'}">帮助中心</router-link>
            </div>
            <div class="col-2 posit-rel" @mouseover="showAppDown=true" @mouseout="showAppDown=false">
              <a href="javascript:void(0);">APP下载</a>
              <div class="appdown-popup" v-show="showAppDown">
                 <span class="down-jiantou">
                   <i class="iconfont icon-uparrow"></i>
                 </span>
                 <div class="qrcode-part">
                   <qrcode :text="SETTING.appUrl" v-if="SETTING.appUrl" :logoSrc="Logo" :logoScale="0.2" :size="176"></qrcode>
                 </div>
                 <p class="tips">支持 IOS 和 Android</p>
              </div>
            </div>
            <div class="col-2">
              <router-link :to="{name:'promContact'}">联系我们</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import {SETTING} from "@/assets/data"
  import VueQrcode from 'vue-qr';
  import Logo from '@/assets/images/logo-blue.png'

  export default {
    data() {
      return {
        SETTING,
        Logo,
        showAppDown:false
      };
    },
    props: {},
    methods: {},
    computed: {},
    created() {
    },
    components: {
      qrcode: VueQrcode
    }
  };
</script>
<style lang="scss">
  @import "./style/mobile-nav-bar.scss";

  .dispnav-announce{
   display: block;
   height: 30px;
   line-height: 30px;
   background: #3A3A3A;
   font-size: 12px;
   .col-12{
     min-height: auto;
     margin: 0;
   }
 }

 .m-nav-container{
   display: none;
 }

.dispnav-content{
  display: block;
  width: 100%;
  height: 60px;
  background: #FFFFFF;
  .logo a{
    display: block;
    font-size: 40px;
    color: #3573FA;
  }
  .link-part{
    [class^="col"]{
      margin: 0 32px;
      width: auto;
      &:last-child{
        margin: 0 0 0 32px;
      }
    }
    a{
      display: block;
      height: 58px;
      line-height: 58px;
      font-size: 16px;
      color: #333333;
      text-align: center;
      padding: 0 18px;
      &.active,&:hover{
        color: #3573FA;
        border-bottom: 2px solid #3573FA;
      }
    }
  }
  .appdown-popup{
    position: absolute;
    top: 58px;
    left: -28px;
    width: 160px;
    padding: 10px 10px 0;
    background: #FFFFFF;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.50);
    z-index: 9999;
    .down-jiantou{
      position: absolute;
      left: 50%;
      top: -19px;
      margin-left: -10px;
      .iconfont{
        font-size: 20px;
        color: #2AADE0;
      }
    }
    .qrcode-part{
      width: 140px;
      height: 140px;
      overflow: hidden;
    }
    .tips{
      font-size: 14px;
      color: #333333;
      line-height: 34px;
      text-align: center;
    }
  }
}

 @media only screen and (max-width: 900px) and (min-width: 800px) {
   .dispnav-content .link-part [class^="col"]{
     margin: 0 14px;
     &:last-child{
       margin: 0 0 0 14px;
     }
   }
 }

  @media only screen and (max-width: 799px) {
   .dispnav-announce{
     display: none;
   }
   .m-nav-container{
     display: block;
   }
   .dispnav-content{
     display: none;
   }

  }

</style>
