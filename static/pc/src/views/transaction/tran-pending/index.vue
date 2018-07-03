<template>
  <div>
    <div class="top-header"></div>
    <nav-menu></nav-menu>
    <bread-crumbs :bread-list="breadList"></bread-crumbs>
    <transact-menu></transact-menu>
    <div class="section pengding-orders">
      <div class="container">
        <div class="row0">
          <div class="tran-content border-box">
            <div class="row border-bottom">
              <a v-for="item in pendingType" @click="pendingItem=item.value" class="s tab-link-a"
                 :class="{active:pendingItem==item.value}" :key="item.value">
                {{generateTitle(item.name)}}
              </a>
              <a class="back-hall" href="/transaction"> 返回交易大厅</a>
              <div class="search-box">
                <input type="text" class="search-input" placeholder="请输入对方昵称、账号"><span class="search-btn">搜索</span>
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

            <div class="group-body" v-if="pendingItem=='tranPendingOrder'">
              <div class="group-tr" v-for="order in OrderList.data">
                   <span class="unit">
                        <span class="c-blue" v-if="order.type == 12">买入</span>
                        <span class="c-orange" v-if="order.type == 11">卖出</span>
                   </span>
                <span class="unit">{{order.createtime | Date('yyyy-MM-dd hh:mm:ss')}}</span>
                <span class="unit"> {{order.amount}}   UET</span>
                <span class="unit"> 0.01 CNY</span>
                <span class="unit unit2">
                    <span class="percent-bar"><i :style="'width:'+ (order.successAmount/order.amount)*100 +'%;'"></i></span>
                    <span class="s-percent"> {{(order.successAmount/order.amount)*100 | toFixed(2) }}% </span>
                  </span>
                <span class="unit">  <a class="btn btn-primary" @click="putToDown(order)">下架</a>  </span>
              </div>

              <paging-by :data="OrderList.pageInfo" @search="getOrderList"></paging-by>

            </div>

            <div class="group-body" v-if="pendingItem=='tranPendingRemoved'">

              <div class="group-tr" v-for="order in OrderListRemoved.data">
                   <span class="unit">
                        <span class="c-blue" v-if="order.type == 12">买入</span>
                        <span class="c-orange" v-if="order.type == 11">卖出</span>
                   </span>
                <span class="unit">{{order.createtime | Date('yyyy-MM-dd hh:mm:ss')}}</span>
                <span class="unit"> {{order.amount}}   UET</span>
                <span class="unit"> 0.01 CNY</span>
                <span class="unit unit2">
                    <span class="percent-bar"><i :style="'width:'+ (order.successAmount/order.amount)*100 +'%;'"></i></span>
                    <span class="s-percent">{{(order.successAmount/order.amount)*100 | toFixed(2) }}%  </span>
                </span>
                <span class="unit">
                  <span v-if="order.status == 11">下架中</span>
                  <span v-if="order.status == 12">
                    <a class="btn btn-primary" @click="putToUp(order)">恢复上架</a>
                  <a class="btn btn-danger" @click="orderDelete(order)">删除</a>
                  </span>

                </span>
              </div>

              <paging-by :data="OrderListRemoved.pageInfo" @search="getRemovedOrderList"></paging-by>

            </div>
          </div>
        </div>
      </div>

    </div>
    <v-footer></v-footer>
  </div>

</template>
<script>
  import navMenu from 'components/nav';
  import vFooter from 'components/footer';
  import BreadCrumbs from 'components/bread-crumbs'
  import transactMenu from 'components/transact-menu';

  import {transaction} from 'api'
  import {generateTitle} from '@/util/i18n'
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import pagingBy from "components/paging-by";

  let orderHead = [
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
        OrderListRemoved: {
          data: []
        },
        pendingType: [
          {name: "transactionRecord.tranPendingOrder", value: "tranPendingOrder"},
          {name: "transactionRecord.tranPendingRemoved", value: "tranPendingRemoved"}
        ],
        pendingItem: 'tranPendingOrder',
        completePercent: '',
        completePercentRomove: '',
        breadList:[
          {
            urlName:'transaction',
            name:'navbar.tradingHall'
          },
        ]
      }
    },
    computed: {
      ...mapGetters([
        'userId',
        'islogin',
      ]),

    },
    watch:{
      islogin(val){
        if(val){
          this.getOrderList()
          this.getRemovedOrderList()
        }
      }
    },
    methods: {
      generateTitle,
      getOrderList(index){
        let userId = this.userId;
        this.request = {
          limit: 10,
          offset: 0,
          userId: userId,
        }
        if (!isNaN(index)) {
          this.request.offset = (index - 1) * this.request.limit;
        }
        transaction.getOrderxPendingPage(this.request).then(res => {
          console.log('挂单 OrderxPage data:');
          console.log(res.data);
          this.OrderList = res;
          this.completePercent = res.data;
        }).catch(error => {
          this.reset(res.message);
        });
      },
      getRemovedOrderList(index){
        this.request = {
          limit: 10,
          offset: 0,
          statuses: [11, 12],
          userId: userId
        }
        if (!isNaN(index)) {
          this.request.offset = (index - 1) * this.request.limit;
        }
        transaction.getOrderxPendingUnshelve(this.request).then(res => {
          console.log('已下架挂单 data:');
          console.log(res.data);
          this.OrderListRemoved = res;
        }).catch(error => {
          this.reset(res.message);
        });
      },
      putToDown(order){
        this.request = {
          orderId: order.id
        }
        transaction.putToDown(this.request).then(res => {
          toast(res.message);
          this.getOrderList()
        }).catch(error => {
          this.reset(res.message);
        });
      },
      orderDelete(order){
        let userId = this.userData.userId;
        this.request = {
          orderId: order.id
        }

        transaction.deleteUnshelve(this.request).then(res => {
          toast(res.message);
          this.getRemovedOrderList()
        }).catch(error => {
          this.reset(res.message);
        });
      },
      putToUp(order){
        let userId = this.userData.userId;
        this.request = {
          orderId: order.id
        }

        transaction.putToUp(this.request).then(res => {
          toast(res.message);
          this.getOrderList()
          this.getRemovedOrderList()
        }).catch(error => {
          this.reset(res.message);
        });
      },
//      percenetRuslt(num1,num2){ //计算百分比
//        return (num1/num2)*100;
//      },

    },

    created() {

    },
    mounted() {
      if (this.islogin) {
        this.getOrderList()
        this.getRemovedOrderList()
      }
    },
    components: {
      pagingBy, navMenu, vFooter, BreadCrumbs, transactMenu
    }
  };
</script>

<style lang="scss">
  .top-header {
    padding-top: 100px;
  }
  .percent-bar{
    display:inline-block;
    height:18px;
    border:1px solid #d4d4d4;
    border-radius: 20px;
    width:65%;
    position:relative;
    i{
      position:absolute;
      left:0;
      display:inline-block;
      height:18px;
      width:10%;
      border-radius: 20px;
      background: #5087ff;
      -webkit-transition:width .8s ease;
      -moz-transition:width .8s ease;
      transition:width .8s ease;
      -webkit-animation:progressbar 7s infinite;
      animation:progressbar 7s infinite;

    }
  }
  .border-bottom{
    border-bottom:1px solid #d5d5d5;
    height:79px;
    overflow: hidden;
  }
  .s-percent{
    display:inline-block;
    min-width:60px;
    padding:0 0 0 5px;
  }
  .group-head .unit2, .group-body .unit2 {
    width: 26%;
  }

  .pengding-orders {

      .border-box {
        border: 1px solid #D4D4D4;
      }

  }

  .c-blue {
    color: #5087ff;
  }

  .c-orange {
    color: #ff9600;
  }

  .tab-link-a {
    display: inline-block;
    width: 200px;
    text-align: center;
    font-size: 16px;
    color: #333333;
    height: 77px;
    line-height: 77px;
    cursor: pointer;

      &.active {
        color: #5087ff;
        border-bottom: 1px solid #5087FF;
      }

  }

  .tran-content .btn-danger {
    background: orange;
    color: #fff;
    border-color: orange;
  }

</style>
