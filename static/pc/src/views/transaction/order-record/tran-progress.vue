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
                <span class="unit">操作</span>
            </div>
             <!--<div class="group-body">-->
               <!--<div class="group-tr">-->
                 <!--<span class="unit">-->
                      <!--<span class="btn btn-border">买入</span>-->
                 <!--</span>-->
                  <!--<span class="unit">王大爷</span>-->
                  <!--<span class="unit">20000 UET</span>-->
                  <!--<span class="unit">0.001 CNY</span>-->
                  <!--<span class="unit red">20000 CNY</span>-->
                  <!--<span class="unit">等待付款 09:45</span>-->
                  <!--<span class="unit">  <a class="btn btn-primary">详情</a>  </span>-->
              <!--</div>-->
               <!--<div class="group-tr">-->
                 <!--<span class="unit">-->
                      <!--<span class="btn btn-orange">卖出</span>-->
                 <!--</span>-->
                  <!--<span class="unit">王大爷</span>-->
                  <!--<span class="unit">20000 UET</span>-->
                  <!--<span class="unit">0.001 CNY</span>-->
                  <!--<span class="unit red">20000 CNY</span>-->
                  <!--<span class="unit">等待付款 09:45</span>-->
                  <!--<span class="unit">  <a class="btn btn-primary">详情</a>  </span>-->
              <!--</div>-->
            <!--</div>-->

          <div class="group-body">
            <div class="group-tr" v-for="order in OrderList.data">
                 <span class="unit">
                      <span class="btn btn-border">买入</span>
                 </span>
              <span class="unit">{{order.creditAccountNameTwin}}</span>
              <span class="unit"> {{order.creditAmount}}   UET</span>
              <span class="unit"> 0.01 CNY</span>
              <span class="unit red">{{order.creditAmountTwin}} CNY</span>
              <span class="unit">等待付款 09:45</span>
              <span class="unit">  <a class="btn btn-primary">详情</a>  </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { transaction } from 'api'
  import { generateTitle } from '@/util/i18n'

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
        },
        requestData:{
          limit:20,
          offset:0
        }
      }
    },
    methods: {
      getOrderList(){
        transaction.getOrderxPage(this.requestData).then(res => {
          console.log('订单记录 OrderxPage data:', res);
          this.OrderList = res;
        }).catch(error => {
          this.reset(res.message);
        });
      }
    },
    computed: {},
    created() {
      this.getOrderList()
    },
    mounted() {
    },
    components: {
    }
  };
</script>
<style lang="scss">
  .tran-content{
    border-top:0;
  }
.group-head,.group-body{
  /*display:table;*/
  width:100%;
  overflow: hidden;
}
.group-head{
  background: #f2f6ff;
  color:#000;
}
.group-head .unit,.group-body .unit{
  /*display:table-cell;*/
  line-height: 45px;
  padding:0 10px;
  text-align: center;

  display:inline-block;
  float:left;
  width:14.28%;
}
  .group-tr{
    border-bottom: 1px solid #ccc;
    overflow: hidden;
    &:last-child{
    border:0;
     }
  }
  .group-body .unit{
    margin:10px 0;
  }
  .btn{
    display:inline-block;
    border:1px solid #5087ff;
    color:#5087ff;
    border-radius: 4px;
    height:35px;
    line-height: 34px;
    padding:0 20px;
    margin:10px 0 0 0;
    cursor: pointer;
    &:hover{opacity: .8;}
  }
  .btn-blue{
    border:1px solid #5087ff;
    color:#5087ff;
  }
  .btn-orange{
    border:1px solid #ffa500;
    color:#ffa500;
  }
  .btn-primary{
    border:1px solid #5087ff;
    background:#5087ff ;
    color:#fff;
  }


</style>
