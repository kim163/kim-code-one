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
          <div class="group-body">
               <!--<span class="unit">-->
                    <!--<span class="btn btn-border">买入</span>-->
               <!--</span>-->
            <!--<span class="unit">王大爷</span>-->
            <!--<span class="unit">20000 UET</span>-->
            <!--<span class="unit">0.001 CNY</span>-->
            <!--<span class="unit red">20000 CNY</span>-->
            <!--<span class="unit">交易完成</span>-->
            <!--<span class="unit">  <a class="btn btn-primary">详情</a>  </span>-->

            <div class="group-tr" v-for="order in OrderList.data || '暂无交易数据'">
                 <span class="unit">
                      <span class="btn btn-border" v-show="order.credit == userData.userId">买入</span>
                      <span class="btn btn-orange" v-show="order.debit == userData.userId">卖出</span>
                 </span>
              <span class="unit">{{order.creditAccountNameTwin}}</span>
              <span class="unit"> {{order.creditAmount}}   UET</span>
              <span class="unit"> 0.01 CNY</span>
              <span class="unit red">{{order.creditAmountTwin}} CNY</span>
              <span class="unit">

                <span v-if="order.status =='204'">交易取消</span>
                <span v-else>交易完成</span>
                <!--{{order.createtime}}-->
              </span>
              <span class="unit">  <a class="btn btn-primary">详情</a>  </span>
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
          //status:41
          types:[11,12]
        }
        if(!isNaN(index)) {
          this.request.offset = (index - 1) * this.request.limit;
        }
        transaction.getTransactionPage(this.request).then(res => {
          console.log('订单记录-已完成 OrderxPage data:');
          console.log(res.data);
          this.OrderList = res  ;
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
<style lang="scss">


</style>
