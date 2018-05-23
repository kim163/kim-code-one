<template>
  <div class="tran-record-main cfx">
    <div class="nav-list">
      <div class="nav-item" :class="{active: navIndex === 0}" @click="navIndex = 0">{{$t('transactionRecord.tranProgress')}}</div>
      <div class="nav-item" :class="{active: navIndex === 1}" @click="navIndex = 1">{{$t('transactionRecord.tranComplete')}}</div>
      <router-link tag="div" class="nav-item" :to="{name: 'cashDesk'}">{{$t('transactionRecord.tranPending')}}</router-link>
    </div>
    <div class="amount-balance">{{$t('navbar.accountBalance')}}：{{userData.amount}} UET</div>
    <ul class="tran-list">
      <router-link tag="li" :to="{name:'cashDesk',query:'111'}" class="tran-item" v-for="(item,index) in 3" :key="index">
        <div class="type-status">
          <div class="type">买入</div>
          <div class="status-time">
            <div class="status">等待付款</div>
            <div class="time">09:06:03</div>
          </div>
        </div>
        <div class="user-amount">
          <div class="user">马化腾</div>
          <div class="amount">
            <span class="text-red">3000</span> UET
          </div>
        </div>
      </router-link>
    </ul>
    <mobile-nav-bar></mobile-nav-bar>
  </div>
</template>

<script>
  import MobileNavBar from 'components/m-navbar'
  import {mapGetters} from 'vuex'
  import {
    getOrderxPage,
    getTransactionPage
  } from 'api/transaction'
  export default {
    name: "transaction-record",

    components: {
      MobileNavBar
    },
    computed: {
      ...mapGetters([
        "userData"
      ])
    },
    data() {
      return {
        navIndex:0,
        limit:10,
        offset:0,
        tranList:[],
      }
    },
    methods: {
      getTranList(){
        const api = this.navIndex === 0 ? getOrderxPage : getTransactionPage
        const request = {
          limit:this.limit,
          offset:this.offset,
          credit:this.userData.userId,
          debit:this.userData.userId,
          types:[11,12]
        }
        api(request).then(res => {
          if(res.code === 10000){
            this.tranList = res
          }else{
            this.reset(res.message)
          }
        }).catch(error => {
          this.reset("请求失败")
        })
      }
    },
    mounted() {
      this.getTranList()
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixin";
  .tran-record-main {
    width: 100%;
    background: #F5F5F5;
    .nav-list{
      width: 100%;
      height: r(50);
      line-height:r(50);
      background: #FFFFFF;
      display: flex;
      justify-content: space-around;
      border-bottom: 1px solid #D8D8D8;
    }
    .nav-item{
      flex-grow: 1;
      text-align: center;
      @include f(15px);
      color: #787876;
      position: relative;
      &.active{
        color: #4982FF;
        &:after{
          content: '';
          width: 100%;
          height: 1px;
          background: #4982FF;
          position: absolute;
          left: 0;
          bottom: -1px;
        }
      }
    }
    .amount-balance{
      @include f(16px);
      color: #333333;
      padding: r(15) 0 r(15) r(10);
    }
    .tran-list{
      display: block;
    }
    .tran-item{
      width: 100%;
      height: r(88);
      background: $white;
      border-top: 1px solid;
      border-bottom: 1px solid;
      border-color: #D8D8D8;
      margin-bottom: r(12);
      padding: r(20) r(10) 0;
      @include f(15px);
      .type-status{
        display: flex;
        justify-content: space-between;
        .status-time{
          display: flex;
          justify-content: center;
        }
        .status{
          margin-right: r(5);
        }
      }
      .user-amount{
        display: flex;
        justify-content: space-between;
        margin-top: r(10);
        .text-red{
          color: #FF0000;
          @include f(18px)
        }
      }
    }
  }
</style>
