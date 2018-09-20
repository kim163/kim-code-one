<template>
  <div class="record-main">
    <tranred-subnav :nav-list="pendingType"
                     :show-search="false"
                     @changeTab="pendingItem = $event"
    ></tranred-subnav>
    <div class="pending-list">
      <div class="group-head">
        <span class="unit">挂单类型</span>
        <span class="unit">挂单时间</span>
        <span class="unit">挂单数量</span>
        <span class="unit">交易单价</span>
        <span class="unit unit2">已完成</span>
        <span class="unit">操作 <span @click="">(刷新)</span></span>
      </div>
      <transition name="list-animate">
        <pend-list :tab-type="1" v-if="pendingItem === 'tranPendingOrder'"></pend-list>
      </transition>
      <transition name="list-animate">
        <pend-list :tab-type="2" v-if="pendingItem === 'tranPendingRemoved'"></pend-list>
      </transition>
    </div>
  </div>
</template>

<script>
  import TranredSubnav from 'components/transact-menu/tranred-subnav';
  import PendList from './pending-list'
  export default {
    name: "pending-order-record",
    data(){
      return{
        pendingType: [
          {name: "transactionRecord.tranPendingOrder", value: "tranPendingOrder"},
          {name: "transactionRecord.tranPendingRemoved", value: "tranPendingRemoved"}
        ],
        pendingItem: 'tranPendingOrder',
      }
    },
    components:{
      TranredSubnav,
      PendList
    }
  }
</script>

<style lang="scss" scoped>
  .pending-list{
    margin-top: 20px;
  }
  .unit2 {
    width: 26%;
  }
</style>