<template>
  <div>
    <mobile-header>快速创建久安账号</mobile-header>
    <create-user-info :merchantInfo="merchantInfo" @createNow="setPassword = true" v-if="!setPassword"></create-user-info>
    <create-set-account :merchantInfo="merchantInfo" v-if="setPassword"></create-set-account>
  </div>
</template>

<script>
  import BusinessCfg from '../misc/merchant-config'
  import {generateTitle} from '@/util/i18n'
  import MobileHeader from 'components/m-header'
  import CreateUserInfo from './create-user-info'
  import CreateSetAccount from './create-set-account-info'


  export default {
    name: "quick-create",
    data() {
      return {
        createSuccess:false,
        merchantId:0, //商户id
        merchantInfo:{},
        setPassword:false
      }
    },
    components:{
      MobileHeader,
      CreateUserInfo,
      CreateSetAccount,
    },
    created(){
      this.merchantId = _.getUrlParam('merchantId')
      if(this.merchantId != 0){
        Object.assign(this.merchantInfo,BusinessCfg.getDeail(this.merchantId))
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .create-info{
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
  .create-content{
    padding: r(10);
    .has-create-tip{
      width: 90%;
      @include f(15px);
      color: #FF0000;
      margin: r(10) r(20);
      line-height: r(25);
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