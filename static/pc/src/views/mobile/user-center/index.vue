<template>
  <div>
    <mobile-header :show-left-btn="false">个人中心</mobile-header>

    <div class="mcenter-userinfo">
       <div class="login-user">
         {{$t('navbar.nickName')}}：{{userData.nickname}}
       </div>
       <div class="assets">
          UET资产：<balance @getBalance="getBalance"></balance> ≈ &yen;{{formatCny()}}
       </div>
    </div>

    <div class="panel-item">
      <router-link :to="{name:'mBindList'}" v-if="userData.nodeId < 10000" class="item-href">
        <i class="iconfont icon-busine-list"></i>
        {{$t('navbar.busineList')}}
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
      <router-link :to="{name:'mMyPending'}" class="item-href">
        <i class="iconfont icon-gift"></i>
        {{$t('transactionRecord.tranPending')}}
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
      <router-link :to="{name:'mTranRecord'}" class="item-href">
        <i class="iconfont icon-gift"></i>
        {{$t('userCenter.transactionRecord')}}
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
      <router-link :to="{name:'mMyGift'}" class="item-href">
        <i class="iconfont icon-gift"></i>
        {{$t('userCenter.myGift')}}
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
      <router-link :to="{name:'mCardList'}" class="item-href">
        <i class="iconfont icon-pay-bank"></i>
        {{$t('userCenter.bindCard')}}
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
      <router-link :to="{name:'mBindCard',params:{id:1}}" class="item-href">
        <i class="iconfont icon-pay-alipay"></i>
        {{$t('userCenter.bindAlipay')}}
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
      <router-link :to="{name:'mBindCard',params:{id:2}}" class="item-href">
        <i class="iconfont icon-pay-wechat"></i>
        {{$t('userCenter.bindWeChat')}}
        <i class="iconfont icon-right-arrow"></i>
      </router-link>

      <router-link :to="{name:'mSetUserInfo'}" class="item-href">
        <i class="iconfont icon-juan-logo1"></i>
        完善资料
        <i class="iconfont icon-right-arrow"></i>
      </router-link>

      <get-live800></get-live800>
      <a class="item-href" target="_blank" :href="SETTING.appUrl">
        <i class="iconfont icon-download"></i>
        {{$t('navbar.juanApp')}}
        <i class="iconfont icon-right-arrow"></i>
      </a>
      <router-link :to="{name:'index'}" class="item-href">
        <i class="iconfont icon-juan-logo1"></i>
        前往久安首页
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
      <div class="item-href border-bot" v-if="userData.nodeId < 10000" @click="$store.dispatch('LOGIN_OUT')">
        <i class="iconfont icon-log-out"></i>
        {{$t('navbar.logOut')}}
      </div>
    </div>
    <m-navbar></m-navbar>
    <confirm-dialog v-model="showConfirm">
      <div slot="title">温馨提示</div>
      <div slot="content">
        <div class="dialog-content">请前往设置您的真实姓名</div>
      </div>
      <div slot="leftBtn" class="confirm-btn-cancel dialog-cancel">取消</div>
      <div slot="rightBtn" class="dialog-btn-yes" @click="toSetInfo">确定</div>
    </confirm-dialog>
  </div>
</template>

<script>
  import MobileHeader from 'components/m-header'
  import {mapGetters} from 'vuex'
  import ConfirmDialog from 'components/confirm'
  import mNavbar from 'components/m-navbar';
  import {SETTING} from "@/assets/data";
  import Balance from 'components/balance';
  import getLive800 from 'components/get-live800';

  export default {
    name: "m-user-center",
    data() {
      return {
        SETTING,
        userBalance:0,
        showConfirm:false
      }
    },
    components:{
      MobileHeader,
      ConfirmDialog,
      mNavbar,
      Balance,
      getLive800
    },
    watch:{
      'userData.name':function(val){
        this.userData.name = val
      },
    },
    computed:{
      ...mapGetters([
        'userData'
      ])
    },
    methods:{
      toSetInfo(){
        this.showConfirm = false
        this.$router.push({name:'mSetUserInfo'})
      },
      formatCny(){
        return !_.isNaN(Number(this.userBalance)) ? (Number(this.userBalance)*0.01).toFixed(2) : '0.00'
      },
      getBalance(data){
        this.userBalance = data
      }
    },
    beforeRouteLeave (to, from , next) {
      if(to.name === 'mBindCard'){
        if(_.isNull(this.userData.name)){
          this.showConfirm = true
        }else{
          next()
        }
      }else{
        next()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";
  .mcenter-userinfo{
    min-height: r(150);
    background: #3573FA;
    padding: r(20) r(10);
    color: $white;
    margin-bottom: r(10);
    .login-user{
      background: url('~images/user.png') no-repeat left center;
      background-size: contain;
      line-height: r(40);
      padding-left: r(50);
      @include  f(18px);
    }
    .assets{
      line-height: r(40);
      @include  f(18px);
      span{
        @include  f(30px);
      }
    }
  }

  .panel-item{
    width: 100%;
    background: $white;
    .item-href{
      height: r(40);
      line-height: r(40);
      padding: 0 r(10);
      display: block;
      border-bottom: 1px solid #d1d1d1;
      .icon-right-arrow{
        float: right;
      }
    }
  }
</style>
