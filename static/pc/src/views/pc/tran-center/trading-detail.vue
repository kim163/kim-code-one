<template>
  <div class="trad-detail" :class="[{active: showBuySell,sell:isSell}]">
    <div class="detail-info">
      <div class="info-item">
        <div>
          <div class="avatars-item" :style="{'background':item.avatarColor}"> {{(item.userName).substring(0, 1)}} </div>
          <div v-if="item.sponsorOnlineStatus === 1" class="avatar-online now-online">在线</div>
          <div v-else-if="item.sponsorOnlineStatus === 0" class="avatar-online not-online">离线</div>
        </div>
        <span>{{item.userName}}</span>
      </div>
      <div class="info-item">{{item.amount}}</div>
      <div class="info-item">
        <i class="iconfont" :class="getPayInfo(item.accountTypeTwin).className"></i>
        {{$t(getPayInfo(item.accountTypeTwin).name)}}支付
      </div>
      <div class="info-item">
        <div class="buy-sell-btn" :class="{sell:isSell}">
          {{isSell ? '卖币给ta' : '向ta买币'}}
        </div>
      </div>
    </div>
    <div class="buy-sell"></div>
  </div>
</template>

<script>
  export default {
    name: "trading-detail",
    data(){
      return{
        showBuySell:false
      }
    },
    props:{
      item:{
        type:Object,
        default:{}
      },
      isSell:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      getPayInfo(data) {
        const obj = {
          name: '',
          className: ''
        }
        switch (data) {
          case 1:
            obj.name = 'transactionHome.payAlipay'
            obj.className = 'icon-pay-type-ali'
            break
          case 2:
            obj.name = 'transactionHome.payWechat'
            obj.className = 'icon-pay-type-wechat'
            break
          case 3:
            obj.name = 'transactionHome.payBank'
            obj.className = 'icon-pay-type-bank'
            break
        }
        return obj
      },
    }
  }
</script>

<style lang="scss" scoped>
  .trad-detail{
    width: 100%;
    transition: all .5s;
    &.active,&:hover{
      background: #F3F7FF;
    }
    &.sell{
      &.active,&:hover{
        background: #FFF8F7;
      }
    }
    .detail-info{
      width: 100%;
    }
  }
</style>