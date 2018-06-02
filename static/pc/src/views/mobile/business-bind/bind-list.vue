<template>
  <div>
    <mobile-header>我的商户列表</mobile-header>
    <div class="header-list">
      <div class="header" v-for="(item,index) in headerList" :key="index">{{item}}</div>
    </div>
    <div class="info-item">
      <div class="info-detail">dsjflwjlfwom</div>
      <div class="info-detail">千赢国际</div>
      <div class="info-detail untie" @click="showConfirmDialog(1)">解绑</div>
    </div>

    <confirm-dialog v-model="showConfirm">
      <div slot="title">温馨提示</div>
      <div slot="content">
        <div class="dialog-content">您是否确定解绑该商户？</div>
        <div class="dialog-content">解绑后，从该商户进入久安钱包将无法自动登录</div>
      </div>
      <div slot="leftBtn" class="confirm-btn-cancel dialog-cancel">暂不解绑</div>
      <div slot="rightBtn" class="dialog-btn-yes" @click="unBind">确定解绑</div>
    </confirm-dialog>
  </div>
</template>

<script>
  import {generateTitle} from '@/util/i18n'
  import MobileHeader from 'components/m-header'
  import ConfirmDialog from 'components/confirm'

  export default {
    name: "bind-list",
    data(){
      return{
        headerList:[
          '商户账号',
          '商户名称',
          '操作'
        ],
        bingList:[],
        showConfirm:false,
        itemId:0
      }
    },
    components:{
      MobileHeader,
      ConfirmDialog
    },
    methods:{
      showConfirmDialog(id){
        this.itemId = id
        this.showConfirm = true
      },
      unBind(){
        this.showConfirm = false
        toast('调用解绑接口')
        //调用解绑接口
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  @mixin detail-info{
    width: 30%;
    text-align: center;
    @include f(15px);
    &:first-child{
      width: 40%;
    }
  }
  .header-list{
    width: 100%;
    height: r(46);
    line-height: r(46);
    background: $white;
    display: flex;
    justify-content: space-between;
    .header{
      @include detail-info;
      color: #333333;
    }
  }
  .info-item{
    width: 100%;
    height: r(45);
    line-height: r(45);
    border-top: 1px solid #d8d8d8;
    background: $white;
    display: flex;
    justify-content: space-between;
    .info-detail{
      @include detail-info;
      color: #787876;
      &.untie{
        color: #4982FF;
      }
    }
  }
  .dialog-content{
    @include f(14px);
    color: #787876;
    width: 80%;
    margin: 0 auto;
    line-height: r(25);
  }
  .dialog-cancel{
    @include f(15px);
    color: #787876;
  }
  .dialog-btn-yes{
    @include f(15px);
  }
</style>