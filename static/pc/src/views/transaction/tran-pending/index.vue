<template>
  <div>
    <div class="top-header"></div>
    <nav-menu></nav-menu>
    <tran-headnav></tran-headnav>
    <transact-menu></transact-menu>
    <!--<pending-nav></pending-nav>-->

    <div class="section pengding-orders">
      <div class="container">
        <div class="row0">

          <div class="tran-content border-box">
            <div class="row">
              <a v-for="item in pendingType" @click="pendingItem=item.value" class="s tab-link-a" :class="{active:pendingItem==item.value}" :key="item.value">
                {{generateTitle(item.name)}}
              </a>


              <span class="back-hall"> 返回交易大厅</span>
              <div class="search-box">
                <input type="text" class="search-input" placeholder="请输入对方昵称、账号"><span class="search-btn" >搜索</span>
              </div>

            </div>



            <div class="group-head">
                 <span class="unit">挂单类型</span>
                  <span class="unit">挂单时间</span>
                  <span class="unit">挂单数量</span>
                 <span class="unit">交易单价</span>
                 <span class="unit unit2">已完成</span>
                  <span class="unit">操作 <span @click="getOrderList">(刷新)</span></span>

              </div>
            <div class="group-body" v-show="pendingItem=='tranPendingOrder'">

              <div class="group-tr" v-for="order in OrderList.data">
                   <span class="unit">
                        <span class="c-blue" v-show="order.type == 12">买入</span>
                        <span class="c-orange" v-show="order.type == 11">卖出</span>
                   </span>
                <span class="unit">{{order.createtime | Date('yyyy-MM-dd hh:mm:ss')}}</span>
                <span class="unit"> {{order.amount}}   UET</span>
                <span class="unit"> 0.01 CNY</span>
                <span class="unit unit2">
                    {{(order.successAmount/order.amount)*100 | toFixed(2) }}%
                </span>
                <span class="unit">  <a class="btn btn-primary" @click="putToDown(order)">下架</a>  </span>
              </div>

              <paging-by :data="OrderList.pageInfo" @search="getOrderList"></paging-by>

            </div>
            <div class="group-body" v-show="pendingItem=='tranPendingRemoved'">

              <div class="group-tr" v-for="order in OrderList.data">
                   <span class="unit">
                        <span class="c-blue" v-show="order.type == 12">买入</span>
                        <span class="c-orange" v-show="order.type == 11">卖出</span>
                   </span>
                <span class="unit">{{order.createtime | Date('yyyy-MM-dd hh:mm:ss')}}</span>
                <span class="unit"> {{order.amount}}   UET</span>
                <span class="unit"> 0.01 CNY</span>
                <span class="unit unit2">
                    {{(order.successAmount/order.amount)*100 | toFixed(2) }}%
                </span>
                <span class="unit">
                  <a class="btn btn-primary" @click="putToDown(order)">恢复上架</a>
                  <a class="btn btn-danger" @click="orderDelete(order)">删除</a>
                </span>
              </div>

              <paging-by :data="OrderList.pageInfo" @search="getOrderList"></paging-by>

            </div>
          </div>
        </div>
      </div>

    </div>
    <v-footer ></v-footer>
  </div>

</template>
<script>
  import navMenu from 'components/nav';
  import vFooter from 'components/footer';
  import tranHeadnav from 'components/master/tran-headnav';
  import transactMenu from 'components/transact-menu';
//  import pendingNav from 'components/transact-menu/pending-nav';

  import { transaction } from 'api'
  import { generateTitle } from '@/util/i18n'
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  import pagingBy from "components/paging-by";


//  let tranredNavData = [
//    {name:'transactionRecord.tranPendingOrder', value: 'tranPendingOrder', to: {name: 'tranPendingOrder'} },
//    {name:'transactionRecord.tranPendingRemoved', value: 'tranPendingRemoved', to: {name: 'tranPendingRemoved'} },
//  ]

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
        },
        pendingType:[
          {name: "transactionRecord.tranPendingOrder", value: "tranPendingOrder"},
          {name: "transactionRecord.tranPendingRemoved", value: "tranPendingRemoved"}
        ],
        pendingItem:'tranPendingOrder',
      }
    },
    computed: {
      ...mapGetters(["userData","islogin"]),
    },
    methods: {
      generateTitle,
      getOrderList(index){
        //let userData=this.userData;
        let userId=this.userData.userId;
        //var currentTime=(new Date()).valueOf();
        this.request={
          limit:10,
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
      putToDown(order){
        let userId=this.userData.userId;
        this.request={
          orderId:order.id
        }

        transaction.putToDown(this.request).then(res => {
//          console.log('挂单下架 OrderxPage data:');
//          console.log(res.data);
          toast(res.message);
          this.getOrderList()
        }).catch(error => {
          this.reset(res.message);
        });
      }

    },

    created() {
      if(this.islogin){
        this.getOrderList()
      }
    },
    mounted() {
      //this.getOrderList()
    },
    components: {
        pagingBy,navMenu, vFooter, tranHeadnav, transactMenu
    }
  };
</script>

<style lang="scss">
  .top-header{
    padding-top: 100px;
  }

  .group-head .unit2, .group-body .unit2{
    width:26%;
  }
.pengding-orders{

  .border-box{
    border:1px solid #D4D4D4;
  }
}

  .c-blue{
    color: #5087ff;
  }
  .c-orange{
    color:#ff9600;
  }

  .tab-link-a{
    display: inline-block;
    width: 200px;
    text-align: center;
    font-size: 16px;
    color: #333333;
    height: 77px;
    line-height: 77px;
    cursor:pointer;
    &.active{
       color: #5087ff;
       border-bottom: 1px solid #5087FF;
     }
  }

  .tran-content  .btn-danger{
    background: orange;
    color:#fff;
    border-color:orange;
  }

</style>
