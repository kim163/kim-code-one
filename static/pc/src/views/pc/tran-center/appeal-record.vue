<template>
  <div class="appeal-container">
    <div class="appeal-title">
      <span @click="getData" :class="{active:currentShow}">交易中</span>
      <span @click="getHistoryData" :class="{active:!currentShow}">交易完成</span>
    </div>
    <div class="appeal-content" v-if="currentShow">
      <noDataTip v-if="isNull"></noDataTip>
      <div v-else>
        <div class="content-title">
          <span v-for="list in titleArr" class="title-list">{{list}}</span>
        </div>
        <div class="content-item" v-for="list in processArr">
          <div>{{list.orderType==0? '对方':'我方'}}</div>
          <div>{{list.orderType==0? '卖出':'买入'}}</div>
          <div>{{list.userId==list.debit?list.debitName:list.creditName}}</div>
          <div>{{list.amount}}</div>
          <div style="color: red">0.01CNY</div>
          <div>{{list.amountTwin}}</div>
          <div>申诉锁定</div>
          <div><span class="btn">详情</span></div>
        </div>
      </div>
    </div>
    <div class="history-content" v-else>
      <noDataTip v-if="isNullNext"></noDataTip>
      <div v-else>
        <div class="content-title">
          <span v-for="list in titleArr" class="title-list">{{list}}</span>
        </div>
        <div class="content-item" v-for="list in historyArr">
          <div>{{list.orderType==0? '对方':'我方'}}</div>
          <div>{{list.orderType==0? '卖出':'买入'}}</div>
          <div>{{list.userId==list.debit?list.debitName:list.creditName}}</div>
          <div>{{list.amount}}</div>
          <div style="color: red">0.01CNY</div>
          <div>{{list.amountTwin}}</div>
          <div>申诉锁定</div>
          <div><span class="btn">详情</span></div>
        </div>
      </div>
        <pageBy></pageBy>
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
        processArr: [],
        isNull: false,
        isNullNext: false,
        historyArr: [],
        currentShow: false,
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
      getData() {

        this.currentShow = true
        const requests = {
          'limit': 10,
          'offset': 0,
          'userId': this.userId,
          'types': [1, 2, 3, 4]
        }
        userCenter.getAppealPage(requests).then((res) => {
          if (res.data.length == 0) {
            this.isNull = true
          } else {
            this.processArr = res.data
          }
        })
      },

      getHistoryData() {
        this.currentShow = false
        const requests = {
          'limit': 10,
          'offset': 0,
          'userId': this.userId,
          'types': [1, 2, 3, 4]
        }
        userCenter.getAppealHistoryPage(requests).then((res) => {
          if (res.data.length == 0) {
            this.isNullNext = true
          } else {
            this.historyArr = res.data
            console.log(this.historyArr, '四大皆空')
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
       padding-top: 30px;
       padding-left: 41px;
        span{
           display: inline-block;
           font-size: 16px;
           color: #333;
           width: 100px;
           height: 60px;
           text-align: center;
           line-height: 60px;
           cursor: pointer;
            &.active{
               color: #3573FA;
               border-bottom: 1px solid #3573FA;
            }
        }
    }
    .appeal-content {
      margin-left: 41px;
      margin-top: 20px;
      .content-title {
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
    }
    .history-content {
      margin-left: 41px;
      margin-top: 20px;
      .content-title {
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
        }
      }
    }
  }
</style>
