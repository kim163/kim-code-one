<template>
  <div class="tran-record-main cfx">
    <m-headnav>{{$t('navbar.transactionRecord')}}</m-headnav>
    <div class="nav-list">
      <div class="nav-item" :class="{active: navIndex === 0}" @click="navIndex = 0">{{$t('transactionRecord.tranProgress')}}</div>
      <div class="nav-item" :class="{active: navIndex === 1}" @click="navIndex = 1">{{$t('transactionRecord.tranComplete')}}</div>
      <router-link tag="div" class="nav-item" :to="{name: 'cashDesk'}">{{$t('transactionRecord.tranPending')}}</router-link>
    </div>
    <div class="amount-balance">{{$t('navbar.accountBalance')}}：{{userData.amount}} UET</div>
    <div class="tran-list">
      <transition name="tran-animate">
        <transcation-list :data="tranInList" :type="0" v-show="navIndex === 0"></transcation-list>
      </transition>
      <transition name="tran-animate">
        <transcation-list :data="tranOverList" :type="1" v-show="navIndex === 1"></transcation-list>
      </transition>
    </div>
    <m-navbar></m-navbar>
  </div>
</template>

<script>
  import mHeadnav from 'components/m-headnav';
  import mNavbar from 'components/m-navbar';
  import TranscationList from './transaction-list';
  import {mapGetters} from 'vuex'
  import {
    getOrderxPage,
    getTransactionPage
  } from 'api/transaction'
  export default {
    name: "transaction-record",

    components: {
      mHeadnav,
      mNavbar,
      TranscationList
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
        offsetIn:0,//交易中页数
        tranInList:[],//交易中列表
        offsetOver:0,//交易完成页数
        tranOverList:[]//交易完成列表
      }
    },
    watch:{
      navIndex(){
        //this.offset = 0,
        this.getTranList()
      }
    },
    methods: {
      getTranList(){
        const api = this.navIndex === 0 ? getOrderxPage : getTransactionPage
        const request = {
          limit:this.limit,
          offset:this.navIndex === 0 ? this.offsetIn : this.offsetOver,
          credit:this.userData.userId,
          debit:this.userData.userId,
          types:[11,12]
        }
        api(request).then(res => {
          if(res.code === 10000){
            console.log(res)
            if(this.navIndex === 0){
              this.tranInList = res.data
            }else{
              this.tranOverList = res.data
            }
          }else{
            this.reset(res.message)
          }
        }).catch(error => {
          this.reset("请求失败")
        })
      },
      addPageIndex(){
        if(this.navIndex === 0){
          this.offsetIn += 1
        }else{
          this.offsetOver += 1
        }
        this.getTranList()
      }
    },
    mounted() {
      this.getTranList()
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .tran-animate-enter{ //临时添加点小动画
    opacity: 0;
    transform: translateX(100%);
  }
  .tran-animate-leave{
    opacity: 0;
    transform: translateX(-100%);
  }
  .tran-animate-enter-active,.tran-animate-leave-active{
    transition:all 0.5s
  }
  $otherHeight: r(173);
  .tran-record-main {
    width: 100%;
    height: 100%;
    overflow: hidden;
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
      width: 100%;
      height: calc(100% - $otherHeight);
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
</style>
