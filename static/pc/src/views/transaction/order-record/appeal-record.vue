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
            <!--<span class="unit">  <a class="btn">详情</a>  </span>-->

              <div class="group-tr" v-for="order in OrderList">
                 <span class="unit">
                      <span class="btn btn-border" v-show="order.credit == userData.userId">我方发起申诉</span>
                      <span class="btn btn-orange" v-show="order.debit == userData.userId">卖方发起申诉</span>
                 </span>
            <span class="unit">{{order.creditAccountNameTwin}}</span>
            <span class="unit"> {{order.creditAmount}}   UET</span>
            <span class="unit"> 0.01 CNY</span>
            <span class="unit red">{{order.creditAmountTwin}} CNY</span>
            <span class="unit">
                我方胜诉
              <!--{{order.createtime}}-->
              </span>
            <span class="unit">  <a class="btn btn-primary" v-if="order.id" :href="'/orderDetail/' + order.id" >详情</a>  </span>
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
  import {mapGetters,mapActions,mapMutations} from 'vuex'

  let orderHead=[
    {name: "order.orderType", value: "orderType"},
    {name: "order.otherSide", value: "otherSide"},
    {name: "order.transQuantity", value: "transQuantity"},
    {name: "order.transUnitPrice", value: "transUnitPrice"},
    {name: "order.transAmount", value: "transAmount"},
    {name: "order.transStatus", value: "transStatus"},
    {name: "order.transControl", value: "transControl"},
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
      ...mapGetters(["userData"]),
    },
    methods: {
      getOrderList(){
        var userData=this.userData;
        var userId=this.userData.userId;
        var currentTime=(new Date()).valueOf();
        this.request={
          limit:100,
          offset:0,
          userId:userId,
//          credit:userId,
//          debit:userId,
          //status:61
        }

        transaction.getAppealHistoryPage(this.request).then(res => {
          console.log('申诉记录 OrderxPage data:', res.data);
          this.OrderList = res.data;
        }).catch(error => {
          this.reset(res.message);
        });
      }

    },

    created() {
      //this.getOrderList()
    },
    mounted() {
      this.getOrderList()
    },
    components: {
    }
  };
</script>
<style lang="scss">

</style>
