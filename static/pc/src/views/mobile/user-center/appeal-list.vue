<template>
  <div>
    <mobile-header>申诉列表</mobile-header>
    <div class="appeal-tab">
      <div class="is_cash" :class="{'active':currentShow}" @click="changeTab(1)">仲裁中</div>
      <div class="no_cash" :class="{'active':!currentShow}" @click="changeTab(2)">仲裁历史</div>
    </div>
    <!--进行中的列表-->
    <div v-if="currentShow" class="appeal-content">
      <noDataTip v-if="isNull"></noDataTip>
      <div v-else class="processArr" v-for="list in processArr">
        <p><span class="title">订单号码:</span>{{list.orderId}}</p>
        <p><span class="title">交易时间:</span>{{list.tradetime |Date('yyyy-MM-dd hh:mm:ss')}}</p>
        <p><span class="title">交易金额:</span>{{list.amountTwin}} CNY</p>
        <p><span class="title">交易数量:</span>{{list.amount}} UET</p>
        <p><span class="title">申诉人:</span>{{list.userName}}</p>
        <div class="btn look-detail" @click="goDetail(list.orderId,1)">查看详细</div>
      </div>
    </div>
    <!--已完成的列表-->
    <div v-else class="appeal-content">
      <noDataTip v-if="isNullNext"></noDataTip>
      <div v-else class="historyArr" v-for="list in historyArr">
        <p><span class="title">订单号码:</span>{{list.orderId}}</p>
        <p><span class="title">交易时间:</span>{{list.tradetime |Date('yyyy-MM-dd hh:mm:ss')}}</p>
        <p><span class="title">交易金额:</span>{{list.amountTwin}} CNY</p>
        <p><span class="title">交易数量:</span>{{list.amount}} UET</p>
        <p><span class="title">申诉人:</span>{{list.userName}}</p>
        <div class="btn look-detail" @click="goDetail(list.orderId,2)">查看详细</div>
      </div>
    </div>
  </div>
</template>

<script>
  import MobileHeader from 'components/m-header'
  import noDataTip from 'components/no-data-tip'
  import {userCenter} from 'api'
  import  scrollBottom from '../../../util/bottomScroll'
  export default {
    data() {
      return {
        currentShow: true,
        isNull: false,
        isNullNext: false,
        historyArr:[],
        processArr:[],
        totalNext:"",
        total:'',
        initPage:0,
        initPageNext:0,
        pageSize:10
      }
    },
    created() {
      this.getAppealPageInfo();
      this.getAppealDetailHistoryPageInfo();
      window.addEventListener('scroll', this.scroll);
    },
    computed: {
      ...mapGetters([
        'userId'
      ])
    },
    methods: {

      changeTab(num) {
        if (num == 1) {
          this.currentShow = true
        } else {
          this.currentShow = false
        }
      },
      getAppealPageInfo() {
        const requests = {
          'limit': this.pageSize,
          'offset': this.initPage,
          'userId': this.userId,
          'types': [1, 2, 3, 4]
        };
        console.log('进行中参数',requests);
        /*进行的列表页*/
        userCenter.getAppealPage(requests).then((res) => {
         if (res.code == 10000) {
           if (res.data.length == 0) {
             this.isNull = true
           } else {
             this.processArr = res.data;
             this.total = res.pageInfo.total;
           }
         } else {
           toast(res.message)
         }
        }).catch(err => {
          toast(err);
        });
      },
      getAppealDetailHistoryPageInfo() {
        const requests = {
          'limit': this.pageSize,
          'offset': this.initPageNext,
          'userId': this.userId,
          'types': [1, 2, 3, 4]
        };
        console.log('申诉历史参数',requests);
        /*历史的列表页*/

        userCenter.getAppealHistoryPage(requests).then((res) => {
          if (res.code == 10000) {
            if (res.data.length == 0) {
               this.isNullNext = true
            } else {
              const templateArr=res.data
              for(let i =0; i<templateArr.length;i++){
                this.historyArr.push(templateArr[i])
              }
              this.totalNext = res.pageInfo.total
            }
          } else {
            toast(res.message)
          }
        }).catch(err => {
          toast(err);
        });
      },
      goDetail(id,num){
        this.$router.push({name:'mAppealDetail',params:{id},query:{num}})
      },
      scroll(){
         if(scrollBottom.getScrollTop()+scrollBottom.getWindowHeight() == scrollBottom.getScrollHeight()){
           const IshavePage = Number(this.total)>Number(this.initPage+10)*1?true:false
           const IshavePageNext = Number(this.totalNext)>Number(this.initPageNext+10)*1?true:false
           if(this.currentShow&&IshavePage){
             this.initPage +=10
             this.getAppealPageInfo()
           }
           if(!this.currentShow&&IshavePageNext){
             this.initPageNext+=10
             this.getAppealDetailHistoryPageInfo()

           }
         }
      }
    },

    components: {MobileHeader, noDataTip}
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .appeal-tab {
    text-align: center;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    width: 80%;
    padding-top: r(28);
    .is_cash {
      width: 50%;
      height: r(35);
      font-size: r(15);
      color: #333333;
      background-color: #fff;
      line-height: r(35);
      border-radius: r(4) r(0) r(0) r(4);
      &.active {
        background-color: #86A5F8;
        color: #fff;
      }
    }
    .no_cash {
      width: 50%;
      height: r(35);
      font-size: r(15);
      color: #333333;
      line-height: r(35);
      background-color: #fff;
      border-radius: r(0) r(4) r(4) r(0);
      &.active {
        background-color: #86A5F8;
        color: #fff;
      }
    }
  }

  .appeal-content{
    padding-bottom: r(60);
  }

  .processArr {
    margin-top: r(20);
    background-color: #fff;
    p {
      width: 100%;
      height: r(40);
      color: #949494;
      @include f(14px);
      border-top: 1px solid #f5f5f5;
      line-height: r(40);
      padding-left: r(10);
    }
    .title{
      color: #333333;
      padding-right: r(10);
    }
    .look-detail{
      @include f(14px);
      background-color: #86A5F8;
      color: #fff;
      width: 100%;
      height: r(40);
      line-height: r(40);
      text-align: center;
    }
  }

  .historyArr {
    margin-top: r(20);
    background-color: #fff;
    p {
      width: 100%;
      height: r(40);
      color: #949494;
      @include f(14px);
      border-top: 1px solid #f5f5f5;
      line-height: r(40);
      padding-left: r(10);
    }
    .title{
      color: #333333;
      padding-right: r(10);
    }
    .look-detail{
      @include f(14px);
      background-color: #86A5F8;
      color: #fff;
      width: 100%;
      height: r(40);
      line-height: r(40);
      text-align: center;
    }
  }
</style>
