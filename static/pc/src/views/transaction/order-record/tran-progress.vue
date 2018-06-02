<template>
  <div class="section ">
    <div class="container">

      <div class="row0">

        <div class="tran-content border-box">
             <div class="group-head">
               <span class="unit">订单类型</span>
                <span class="unit">对方</span>
                <span class="unit">交易数量</span>
                <span class="unit">交易单价</span>
                <span class="unit">交易金额</span>
                <span class="unit">状态</span>
                <span class="unit">操作 <span @click="getOrderList">(刷新)</span></span>
            </div>
          <div class="group-body" v-if="OrderList.data.length > 0">
            <div class="group-tr" v-for="order in OrderList.data">
                 <span class="unit">
                      <span class="c-blue" v-show="order.credit == userData.userId">{{$t('transactionRecord.buy')}}</span>
                      <span class="c-orange" v-show="order.debit == userData.userId">{{$t('transactionRecord.sale')}}</span>
                 </span>
              <span class="unit">{{order.creditAccountNameTwin}}</span>
              <span class="unit"> {{order.creditAmount}}   UET</span>
              <span class="unit"> 0.01 CNY</span>
              <span class="unit red">{{order.creditAmountTwin}} CNY</span>
              <span class="unit">
                 <span v-if="order.status = 45"> {{$t('transactionRecord.waitingForPayment')}}</span>
                 <span v-else-if="order.status != 45"> {{$t('transactionRecord.transactionRecord')}}UET</span>
                {{order.intervalTime-order.elapsedTime | formatDateMs}}
              </span>
              <span class="unit">  <a class="btn btn-primary"  :href="'/orderDetail/' + order.id" >详情</a>  </span>
            </div>

            <paging-by :data="OrderList.pageInfo" @search="getOrderList"></paging-by>

          </div>
          <div class="group-body" v-else>
            <no-data-tip></no-data-tip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { transaction } from 'api'
  import { generateTitle } from '@/util/i18n'
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  import pagingBy from "components/paging-by";
  import NoDataTip from 'components/no-data-tip'

  let orderHead=[
      {name: "order.orderType", value: "orderType"},
      {name: "order.otherSide", value: "otherSide"},
      {name: "order.transQuantity", value: "transQuantity"},
      {name: "order.transUnitPrice", value: "transUnitPrice"},
      {name: "order.transAmount", value: "transAmount"},
      {name: "order.transStatus", value: "transStatus"},
      {name: "order.transControl", value: "transControl"},
//    <span class="unit">订单类型</span>
//    <span class="unit">对方</span>
//    <span class="unit">交易数量</span>
//    <span class="unit">交易单价</span>
//    <span class="unit">交易金额</span>
//    <span class="unit">状态</span>
//    <span class="unit">操作</span>
  ]


  export default {
    data() {
      return {
        OrderList: {
          data: []
        }
      }
    },
    computed: {
      ...mapGetters(["userData","islogin"]),
    },
    methods: {
      getOrderList(index){
        //let userData=this.userData;
        let userId=this.userData.userId;
        //var currentTime=(new Date()).valueOf();
        this.request={
          limit:10,
          offset:0,
          credit:userId,
          debit:userId,
          types:[11,12]
        }
        if(!isNaN(index)) {
          this.request.offset = (index - 1) * this.request.limit;
        }
        transaction.getOrderxPage(this.request).then(res => {
          console.log('订单记录 OrderxPage data:');
          console.log(res.data);
          this.OrderList = res;
        }).catch(error => {
          this.reset(res.message);
        });
      },
      getOrderDetail(id){
        //let userData=this.userData;
        let orderId=id;

        //var currentTime=(new Date()).valueOf();
        this.request={
          orderId:orderId
        }
        transaction.getOrderx(this.request).then(res => {
          console.log('订单详情记录:');
          console.log(res);

        }).catch(error => {
          this.reset(res.message);
        });
      }

    },

    created() {
      if(this.islogin){
        this.getOrderList()
      }
//      islogin(val) {
//        this.getOrderList()
//      }

    },
    mounted() {
      //this.getOrderList()
    },
    components: {
        pagingBy,
        NoDataTip
    },
  };
</script>
