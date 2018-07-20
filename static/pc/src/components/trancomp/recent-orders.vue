<template>
  <div class="recent-orders">
    <h3 class="title"> {{$t('transactionHome.recentOrders')}} </h3>
    <ul v-if="OrderList.data.length > 0">
      <router-link tag="li" :to="{name:'orderDetail',params:{id: order.id}}" v-for="(order,i) in OrderList.data||[]">
        <div class="fl">
          <p>
            <span class="btn btn-border" v-show="order.credit == userData.userId">{{$t('transactionRecord.buy')}}</span>
            <span class="btn btn-orange" v-show="order.debit == userData.userId">{{$t('transactionRecord.sale')}}</span>
          </p>
          <p>
            {{order.creditName}}
          </p>
          <div>
            <div class="status" v-if="order.status != 61">
              {{(order.status === 45 ? $t('transactionRecord.waitingForPayment') :
              $t('transactionRecord.waitingForRelease'))}}
            </div>
            <div class="time" v-else>申诉锁定</div>
          </div>
        </div>
        <div class="fr">
          <p>
            <countdown v-if="order.status != 61" :end-time="order.intervalTime-order.elapsedTime"
                       end-text="过期"></countdown>
          </p>
          <p><span class="amount"> {{order.creditAmount}} </span> UET</p>
        </div>
      </router-link>
    </ul>
    <no-data-tip tip="暂无订单" v-else></no-data-tip>
  </div>
</template>
<script>
  import {transaction} from 'api';
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import Countdown from 'components/countdown'
  import NoDataTip from 'components/no-data-tip'
  export default {
    data() {
      return {
        OrderList: {
          data: []
        },
        request: {}
      };
    },
    props: {},
    methods: {
      getOrderList(index) {
        let userId = this.userData.userId;
        this.request = {
          limit: 10,
          offset: 0,
          credit: userId,
          debit: userId,
          types: [11, 12]
        }
        if (!isNaN(index)) {
          this.request.offset = (index - 1) * this.request.limit;
        }
        transaction.getOrderxPage(this.request).then(res => {
          console.log('订单记录 OrderxPage data:');
          console.log(res.data);
          this.OrderList = res;
        }).catch(error => {
          this.reset(res.message);
        });
      }

    },
    computed: {
      ...mapGetters(["userData", "islogin"])
    },
    created() {
      this.getOrderList();
    },
    components: {
      Countdown,
      NoDataTip
    }
  };
</script>
<style lang="scss">
  .recent-orders {
    .title {
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      color: #ffffff;
      background: #5087FF;
      padding: 0 19px;
    }
    ul {
      li {
        height: 110px;
        padding: 20px 19px;
        border-bottom: 1px solid #D4D4D4;
        cursor: pointer;
        &:last-child {
          border: none;
        }
        &:hover {
          background: #F8F8F8;
        }
        .btn-border {
          color: #5087ff;
        }
        .btn-orange {
          color: #ff2a00;
        }
        .amount {
          font-size: 24px;
          color: #000000;
        }
      }
    }
  }

</style>
