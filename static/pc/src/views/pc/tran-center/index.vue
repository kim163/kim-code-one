<template>
  <div class="tran-main container max-width">
    <activity></activity>
    <ul class="tab-list">
      <router-link tag="li" :to="{name:item.linkName}" class="tab-info" v-for="(item,index) in tabCfg"
          :key="index"
          >{{item.name}}</router-link>
    </ul>
    <div class="tab-container">
      <transition mode="out-in"
                  name="fade-quick">
        <router-view></router-view>
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
            tabNum:0,
            linkName:'quickBuySell'
          },
          {
            name:'交易大厅',
            tabNum:1,
            linkName:'tradHall'
          },
          {
            name:'订单记录',
            tabNum:2,
            linkName:'orderRecord'
          },
          {
            name:'挂单记录',
            tabNum:3,
            linkName:'pendingRecord'
          },
          {
            name:'申诉记录',
            tabNum:4,
            linkName:'AppealRecord'
          }
        ],
      }
    },
    components: {
      Activity,
      QuickBuySell,
      TradingHall,
      OrderRecord,
      PendingRecord,
      AppealRecord,
    },
    methods:{

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
      padding-bottom: 21px;
      border: 1px solid #D3D3D3;
    }
  }
</style>