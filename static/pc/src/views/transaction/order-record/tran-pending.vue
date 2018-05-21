<template>
  <div class="section ">
    <div class="container">

      <div class="row0">

        <div class="tran-content border-box">
             <div class="group-head">
               <span class="unit">订单类型</span>
                <!--<span class="unit">对方</span>-->
                <span class="unit">交易数量</span>
                <span class="unit">交易单价</span>
                <span class="unit">交易金额</span>
                <span class="unit">状态</span>
                <span class="unit">操作 <span @click="getOrderList">(刷新)</span></span>
            </div>
          <div class="group-body">

            <div class="group-tr" v-for="order in OrderList.data">
                 <span class="unit">
                      <span class="btn btn-border" v-show="order.type == 12">买入</span>
                      <span class="btn btn-orange" v-show="order.type == 11">卖出</span>
                 </span>
              <!--<span class="unit">{{order.creditAccountNameTwin}}</span>-->
              <span class="unit"> {{order.amount}}   UET</span>
              <span class="unit"> 0.01 CNY</span>
              <span class="unit red">{{order.amountTwin}} CNY</span>
              <span class="unit">
                <span v-if="order.status=='1'">挂单交易中</span>
                <span v-if="order.status=='2'">挂单交易暂停</span>
                <span v-if="order.status=='3'">挂单交易完成</span>
                <!--{{order.createtime}}-->
              </span>
              <span class="unit">  <a class="btn btn-primary" @click="getOrderDetail(id)">详情</a>  </span>
            </div>

            <paging-by :data="OrderList.pageInfo" @search="getOrderList"></paging-by>

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
          limit:20,
          offset:0,
          credit:userId,
          debit:userId,
//          type:1
        }
        if(!isNaN(index)) {
          this.request.offset = (index - 1) * this.request.limit;
        }
        transaction.getOrderxPendingPage(this.request).then(res => {
          console.log('挂单 OrderxPage data:');
          console.log(res.data);
          this.OrderList = res;
        }).catch(error => {
          this.reset(res.message);
        });
      },
      getOrderDetail(index){
        //let userData=this.userData;
        let userId=this.userData.userId;
        //var currentTime=(new Date()).valueOf();
        this.request={
          orderId:'5dc977193255441891d2baed13755ec2'
//          type:1
        }

        transaction.getOrderxPending(this.request).then(res => {
          console.log('挂单详情 OrderxPage data:');
          console.log(res.data);
          //this.OrderList = res;
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
        pagingBy
    }
  };
</script>
