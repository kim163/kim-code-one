<template>
  <div>
    <mobile-header>个人中心</mobile-header>
    <div class="panel-item">
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
  export default {
    name: "m-user-center",
    data() {
      return {
        showConfirm:false
      }
    },
    components:{
      MobileHeader,
      ConfirmDialog,
      mNavbar,
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