<template>
  <div>
    <div class="bing-container" v-if="!bindSuccess">
      <div class="bing-info">
        <i class="iconfont icon-user-login"></i>
        <div class="text">
          您将绑定<img :src="merchantInfo.logo" class="business-logo"/>的账号至久安钱包
        </div>
      </div>
      <div class="user-account">
        您的{{merchantInfo.name}}账号：qycs004783
      </div>
      <div class="bind-content">
        <div class="has-bind-tip">
          提示：您的{{merchantInfo.name}}账号已被绑定或已在久安注册，不能重复操作
        </div>
        <div class="btn-list">
          <div class="bind-def-btn">立即绑定</div>
          <router-link tag="div" class="bing-list" :to="{name:'mBindList'}">商户绑定记录</router-link>
        </div>
        <div class="tip-info">
          <p>1，久安钱包不会获取您{{merchantInfo.name}}上除账号以外的任何信息。</p>
          <p>2，绑定后，您在{{merchantInfo.name}}网站的九安钱包入口进入久安钱包，可自动登录钱包。</p>
        </div>
      </div>
    </div>
    <bind-success v-else></bind-success>
  </div>
</template>

<script>
  import BindSuccess from './bind-success'
  import BusinessCfg from '../misc/merchant-config'
  export default {
    name: "user-bind",
    data(){
      return{
        bindSuccess: false,
        merchantId:0, //商户id
        merchantInfo:{
          logo:'',
          name:''
        }, //商户基本信息
      }
    },
    components:{
      BindSuccess
    },
    created(){
      this.merchantId = _.getUrlParam('merchantId')
      if(this.merchantId != 0){
        this.merchantInfo = BusinessCfg.getDeail(this.merchantId)
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .bing-info{
    width: 100%;
    height: r(156);
    text-align: center;
    color: #333333;
    @include f(15px);
    padding-top: r(38);
    border-bottom: 1px solid #d8d8d8;
    background: $white;
    .text{
      margin-top: r(20);
    }
    .iconfont{
      @include f(50px);
    }
    .business-logo{
      height: r(28);
      margin-left: r(8);
      margin-right: r(8);
    }
  }
  .user-account{
    width: 100%;
    height: r(50);
    line-height: r(50);
    text-align: center;
    background: $white;
    color: #333333;
    @include f(15px);
    border-bottom: 1px solid #d8d8d8;
    border-top: 1px solid #d8d8d8;
    margin-top: r(10);
  }
  .bind-content{
    padding: r(10);
    .has-bind-tip{
      width: 90%;
      @include f(15px);
      color: #FF0000;
      margin: r(10) r(20);
      line-height: r(25);
    }
    .bing-list{
      width: 100%;
      text-align: center;
      @include f(18px);
      margin-top: r(20);
      color: #333333;
    }
    .tip-info{
      @include f(15px);
      color: #787876;
      margin-top: r(30);
      p{
        margin-bottom: r(10);
      }
    }
  }
</style>