<template>
  <div class="tran-main container max-width">
    <div>
      订单通知功能模块 待开发
    </div>
    <activity></activity>
    <ul class="tab-list">
      <li class="tab-info" v-for="(item,index) in tabCfg"
          :key="index"
          :class="{active: item.tabNum === tabIndex}"
          @click="tabIndex = item.tabNum">{{item.name}}</li>
    </ul>
    <div class="tab-container">
      <transition mode="out-in"
                  enter-active-class="animated-quick fadeIn"
                  leave-active-class="animated-quick fadeOut">
        <quick-buy-sell v-if="tabIndex === 0"></quick-buy-sell>
        <trading-hall v-if="tabIndex === 1"></trading-hall>
        <order-record v-if="tabIndex === 2"></order-record>
        <pending-record v-if="tabIndex === 3"></pending-record>
        <appeal-record v-if="tabIndex === 4"></appeal-record>
      </transition>
    </div>
  </div>
</template>

<script>
  import Activity from './activity'
  import QuickBuySell from './quick-buy-sell'
  import TradingHall from './trading-hall'
  import OrderRecord from './order-record'
  import PendingRecord from './pending-record'
  import AppealRecord from './appeal-record'

  export default {
    name: "tran-center",
    data() {
      return {
        tabIndex:0,
        tabCfg:[
          {
            name:'快速买卖',
            tabNum:0
          },
          {
            name:'交易大厅',
            tabNum:1
          },
          {
            name:'订单记录',
            tabNum:2
          },
          {
            name:'挂单记录',
            tabNum:3
          },
          {
            name:'申诉记录',
            tabNum:4
          }
        ]
      }
    },
    components: {
      Activity,
      QuickBuySell,
      TradingHall,
      OrderRecord,
      PendingRecord,
      AppealRecord,
    }
  }
</script>

<style lang="scss" scoped>
  .tran-main {
    width: 1200px;
    .tab-list{
      width: 100%;
      height: 50px;
      margin-top: 20px;
      .tab-info{
        width: 150px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #ffffff;
        font-size: 16px;
        background: #86A5F8;
        float: left;
        margin-right: 10px;
        cursor: pointer;
        transition: all .5s;
        &.active{
          background: #3573FA;
        }
      }
    }
    .tab-container{
      width: 100%;
      margin-bottom: 30px;
      border: 1px solid #D3D3D3;
    }
  }
</style>