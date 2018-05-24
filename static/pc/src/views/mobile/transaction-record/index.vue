<template>
  <div class="tran-record-main cfx">
    <m-headnav>{{$t('navbar.transactionRecord')}}</m-headnav>
    <div class="nav-list">
      <div class="nav-item" :class="{active: navIndex === 0}" @click="navIndex = 0">{{$t('transactionRecord.tranProgress')}}</div>
      <div class="nav-item" :class="{active: navIndex === 1}" @click="navIndex = 1">{{$t('transactionRecord.tranComplete')}}</div>
      <router-link tag="div" class="nav-item" :to="{name: 'cashDesk'}">{{$t('transactionRecord.tranPending')}}</router-link>
    </div>
    <div class="amount-balance">{{$t('navbar.accountBalance')}}：{{userData.amount}} UET</div>
    <ul class="tran-list">
      <router-link tag="li" :to="{name:'cashDesk',query:{ id: 111}}" class="tran-item" v-for="(item,index) in tranList" :key="index">
        <div class="type-status">
          <div class="type bule-text" v-show="item.credit == userData.userId">{{$t('transactionRecord.buy')}}</div>
          <div class="type red-text" v-show="item.debit == userData.userId">{{$t('transactionRecord.sale')}}</div>
          <div class="status-time">
            <div class="status">
              {{item.status === 45 ? $t('transactionRecord.waitingForPayment') : $t('transactionRecord.transactionRecord') + 'UET'}}
            </div>
            <div class="time">{{item.intervalTime-order.elapsedTime | formatDateMs}}</div>
          </div>
        </div>
        <div class="user-amount">
          <div class="user">{{item.creditAccountNameTwin}}</div>
          <div class="amount">
            <span class="text-red">{{item.creditAmount}}</span> UET
          </div>
        </div>
      </router-link>
    </ul>
    <m-navbar></m-navbar>
  </div>
</template>

<script>
  import mHeadnav from 'components/m-headnav';
  import mNavbar from 'components/m-navbar'
  import {mapGetters} from 'vuex'
  import {
    getOrderxPage,
    getTransactionPage
  } from 'api/transaction'
  export default {
    name: "transaction-record",

    components: {
      mHeadnav,
      mNavbar
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
    watch:{
      navIndex(){
        this.offset = 0,
        this.getTranList()
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
            this.tranList = res.data
          }else{
            this.reset(res.message)
          }
        }).catch(error => {
          this.reset("请求失败")
        })
      },
      addPageIndex(){
        this.offset += 1
        this.getTranList()
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
        .type{
          &.red-text{
            color: #FF0000;
          }
          &.blue-text{
            color: #5087FF;
          }
        }
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
