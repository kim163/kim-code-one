<template>
  <div class="appeal-container">
    <div class="appeal-title">
      <span @click="getData" :class="{active:currentShow}">仲裁中</span>
      <span @click="getHistoryData(0)" :class="{active:!currentShow}">仲裁历史</span>
    </div>
    <div class="appeal-content" v-if="currentShow">
      <div>
        <div class="bind-title">
          <span v-for="list in titleArr" class="title-list">{{list}}</span>
        </div>
        <noDataTip v-if="isNull"></noDataTip>
        <div class="content-item" v-for="list in processArr" v-else>
          <div>{{list.orderType==0? '对方':'我方'}}</div>
          <div>{{list.orderType==0? '卖出':'买入'}}</div>
          <div>{{list.userId==list.debit?list.debitName:list.creditName}}</div>
          <div>{{list.amount}}</div>
          <div style="color: red">0.01CNY</div>
          <div>{{list.amountTwin}}</div>
          <div>{{list.statusText}}</div>
          <div><router-link :to="{name:'orderDetailAppeal',params:{id:list.orderId}}" class="btn">详情</router-link></div>
        </div>
        <pageBy :data="pageInfoNext" @search="getData"></pageBy>
      </div>
    </div>
    <div class="history-content" v-else>
      <div>
        <div class="bind-title">
          <span v-for="list in titleHistory" class="title-list">{{list}}</span>
        </div>
        <noDataTip v-if="isNullNext"></noDataTip>
        <div class="content-item" v-for="list in historyArr" v-else>
          <div>{{list.orderType==0? '对方':'我方'}}</div>
          <div>{{list.orderType==0? '卖出':'买入'}}</div>
          <div>{{list.userId==list.debit?list.debitName:list.creditName}}</div>
          <div>{{list.amount}}</div>
          <div style="color: red">0.01CNY</div>
          <div>{{list.amountTwin}}</div>
          <div>{{list.resultTypeText}}</div>
          <div><router-link :to="{name:'orderDetailAppeal',params:{id:list.orderId},query:{name:2}}" class="btn">详情</router-link></div>
        </div>
        <pageBy :data="pageInfo" @search="getHistoryData"></pageBy>
      </div>

    </div>
  </div>
</template>

<script>
  import {userCenter} from 'api'
  import {mapGetters} from 'vuex';
  import noDataTip from 'components/no-data-tip'
  import pageBy from 'components/paging-by'
  export default {
    name: "appeal-record",
    data() {
      return {
        titleArr: ['申诉类型', '订单类型', '对方', '交易数量', '交易单价', '交易金额', '状态', '操作'],
        titleHistory: ['申诉类型', '订单类型', '对方', '交易数量', '交易单价', '交易金额', '结果类型', '操作'],
        processArr: [],
        isNull: false,
        isNullNext: false,
        historyArr: [],
        currentShow: false,
        pageInfo:{},
        pageInfoNext:{}
      }
    },
    created() {
      this.getData()
    },
    computed: {
      ...mapGetters(['userId'])
    },
    components: {
      noDataTip,
      pageBy
    },
    methods: {
      getData(val) {
        this.currentShow = true
        const requests = {
          'limit': 10,
          'offset': val>=1?(val-1)*10:val*10,
          'userId': this.userId,
          'types': [1, 2, 3, 4]
        }
        userCenter.getAppealPage(requests).then((res) => {
          if (res.data.length == 0) {
            this.isNull = true
          } else {
            this.processArr = res.data
            this.pageInfoNext = res.pageInfo
          }
        })
      },
      getHistoryData(val) {
        this.currentShow = false
        const requests = {
          'limit': 10,
          'offset': val>=1?(val-1)*10:val*10,
          'userId': this.userId,
          'types': [1, 2, 3, 4]
        }
        userCenter.getAppealHistoryPage(requests).then((res) => {
          if (res.data.length == 0) {
            this.isNullNext = true
          } else {
            this.historyArr = res.data
            this.pageInfo = res.pageInfo
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .appeal-container{
    margin: 0 auto;
    .appeal-title {
       padding-top: 20px;
       padding-left: 41px;
        span{
           display: inline-block;
           font-size: 16px;
           color: #333;
           width: 100px;
           height: 40px;
           text-align: center;
           line-height: 40px;
           cursor: pointer;
          margin-right: 40px;
            &.active,&:hover{
               color: #3573FA;
               border-bottom: 1px solid #3573FA;
            }
        }
    }
    .appeal-content {
      margin-left: 41px;
      margin-top: 20px;
      .bind-title {
        width: 1118px;
        height: 50px;
        background-color: #86A5F8;
        display: flex;
        flex-direction: row;
        .title-list {
          font-size: 16px;
          color: #fff;
          text-align: center;
          line-height: 50px;
          flex: 1;
        }
      }
      .content-item {
        width: 1118px;
        height: 50px;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        &:nth-child(odd) {
          background: #F8FAFF;
        }
        div {
          flex: 1;
          font-size: 14px;
          color: #787876;
          text-align: center;
          line-height: 50px;
        }
        .btn {
          display: inline-block;
          width: 70px;
          height: 25px;
          background-color: #86A5F8;
          color: #fff;
          line-height: 25px;
          cursor: pointer;
          &:hover{
            background: #3573FA;
          }
        }
      }
    }
    .history-content {
      margin-left: 41px;
      margin-top: 20px;
      .bind-title {
        width: 1118px;
        height: 50px;
        background-color: #86A5F8;
        display: flex;
        flex-direction: row;
        .title-list {
          font-size: 16px;
          color: #fff;
          text-align: center;
          line-height: 50px;
          flex: 1;
        }
      }
      .content-item {
        width: 1118px;
        height: 50px;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        &:nth-child(odd) {
          background: #F8FAFF;
        }
        div {
          flex: 1;
          font-size: 14px;
          color: #787876;
          text-align: center;
          line-height: 50px;
        }
        .btn {
          display: inline-block;
          width: 70px;
          height: 25px;
          background-color: #86A5F8;
          color: #fff;
          line-height: 25px;
          cursor: pointer;
          &:hover{
            background: #3573FA;
          }
        }
      }
    }
  }
</style>
