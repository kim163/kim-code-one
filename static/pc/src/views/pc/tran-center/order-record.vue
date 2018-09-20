<template>
  <div class="record-main">
    <tranred-subnav :nav-list="navListData"
                    @changeTab="tabItem = $event"
                    @search="search = $event"
                    @searchKey="searchKey = $event"></tranred-subnav>
    <div class="order-list">
      <div class="group-head">
        <span class="unit">订单类型</span>
        <span class="unit">对方</span>
        <span class="unit">交易数量</span>
        <span class="unit">交易单价</span>
        <span class="unit">交易金额</span>
        <span class="unit">状态</span>
        <span class="unit">操作 <span>(刷新)</span></span>
      </div>
      <transition name="leftIn">
        <order-list  v-if="tabItem === 'tranProgress'" v-model="search" :tab-type="1" :search-key="searchKey"></order-list>
      </transition>
      <transition name="rightIn">
        <order-list v-if="tabItem === 'tranComplete'" v-model="search" :tab-type="2" :search-key="searchKey"></order-list>
      </transition>
    </div>
  </div>
</template>

<script>
  import TranredSubnav from 'components/transact-menu/tranred-subnav';
  import OrderList from './order-list'
  export default {
    name: "order-record",
    data(){
      return{
        navListData: [
          {name: 'transactionRecord.tranProgress', value: 'tranProgress'},
          {name: 'transactionRecord.tranComplete', value: 'tranComplete'},
        ],
        tabItem: 'tranProgress',
        tabType: 1,
        searchKey: "",
        search:false,
      }
    },
    components:{
      TranredSubnav,
      OrderList
    }
  }
</script>

<style lang="scss" scoped>
  .order-list{
    margin-top: 20px;
  }
</style>