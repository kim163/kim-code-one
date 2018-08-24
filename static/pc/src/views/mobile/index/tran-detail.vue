<template>
  <div class="mtran-detail cfx">
    <div class="fl mtran-itemleft">
        <span class="disp-inlblo posit-rel">
             <a class="avatars-item" :style="{'background':item.avatarColor}" href="javascript:void(0);"> {{(item.userName).substring(0, 1)}} </a>
             <!--<a :class="['avatar-onlineicon',item.sponsorOnlineStatus === 1?'online-icon':'notonline-icon']" href="javascript:void(0);"></a>-->
        </span>
        <a v-if="item.sponsorOnlineStatus === 1" href="javascript:void(0);" class="avatar-onlinebtn now-online">在线</a>
        <a v-else-if="item.sponsorOnlineStatus === 0" href="javascript:void(0);" class="avatar-onlinebtn not-online">离线</a>
        <a v-else href="javascript:void(0);" class="avatar-onlinebtn not-online">
           {{item.sponsorOnlineStatus}}
        </a>
    </div>
    <div class="fr mtran-itemright">
      <p class="item user-info">
        <span class="user-name"> {{item.userName}}</span>
        <!--<span v-if="item.accountTypeTwin === 1" class="mpay alipay">{{$t('transactionHome.payAlipay')}}</span>-->
        <!--<span v-else-if="item.accountTypeTwin === 2"-->
              <!--class="mpay wechat">{{$t('transactionHome.payWechat')}}</span>-->
        <!--<span v-else-if="item.accountTypeTwin === 3" class="mpay bank">{{$t('transactionHome.payBank')}}</span>-->
        <!--<span v-else class="mpay">-->
                         <!--{{item.accountTypeTwin }}-->
         <!--</span>-->
        <i class="iconfont" :class="{'icon-pay-type-ali':item.accountTypeTwin === 1,
                                     'icon-pay-type-wechat':item.accountTypeTwin === 2,
                                     'icon-pay-type-bank':item.accountTypeTwin === 3}"></i>
      </p>
      <p class="item tranCountOrRate">
        <span class="tradeTotal">{{$t('transactionHome.monthlyTran')}} {{item.tradeTotal}} {{$t('transactionHome.tradeTotal')}}</span>
        <span>{{$t('transactionHome.completionRate')}}</span>
        <span v-if="item.tradeTotal"> {{ ((item.finishedTotal/item.tradeTotal)*100).toFixed(2)}}</span>
        <span v-if="!item.tradeTotal">0 </span>％
      </p>
      <p class="item amount-line">
        <span class="unit-price">{{$t('transactionHome.unitPrice')}}：</span>0.01 CNY
        <span class="quantity-txt">{{$t('transactionHome.remainBuy')}}：</span>
        <span class="amount"> {{item.balance}} UET </span>
      </p>

      <p class="item hide">
        <a href="javascript:void(0);" class="transaction-btn" >{{$t('transactionHome.buyUet')}}</a>
      </p>
      <p class="right-arrow">
        <i class="iconfont icon-right-arrow"></i>
      </p>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    props: {
      item: {
        type: Object
      }
    },
    methods: {},
    computed: {},
    created() {
    },
    components: {}
  };
</script>
<style lang="scss">

</style>
