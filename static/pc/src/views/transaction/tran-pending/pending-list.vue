<template>
  <div>
    <template v-if="!noData">
      <div class="group-tr" v-for="order in orderList">
        <span class="unit">
            <span class="c-blue" v-if="order.type == 12">买入</span>
            <span class="c-orange" v-if="order.type == 11">卖出</span>
        </span>
        <span class="unit">{{order.createtime | Date('yyyy-MM-dd hh:mm:ss')}}</span>
        <span class="unit"> {{order.amount}}   UET</span>
        <span class="unit"> 0.01 CNY</span>
        <span class="unit unit2">
          <span class="percent-bar"><i
                  :style="'width:'+ (order.successAmount/order.amount)*100 +'%;'"></i></span>
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
    </template>
    <no-data-tip v-else></no-data-tip>
    <confirm-dialog v-model="showConfirm">
      <div slot="title">{{$t('postPend.delConfirmTitle')}}</div>
      <div slot="content">{{$t('postPend.delConfirmContent')}}</div>
      <div slot="leftBtn" class="confirm-btn-cancel">{{$t('postPend.cancel')}}</div>
      <div slot="rightBtn" @click="orderDelete">{{$t('postPend.confirmYes')}}</div>
    </confirm-dialog>
  </div>
</template>

<script>
  import PagingBy from "components/paging-by"
  import {mapGetters} from 'vuex'
  import ConfirmDialog from 'components/confirm'
  import { generateTitle } from '@/util/i18n'
  import NoDataTip from 'components/no-data-tip'
  import {
    getOrderxPendingPage,
    getOrderxPendingUnshelve,
    putToDown,
    putToUp,
    deleteUnshelve
  } from 'api/transaction'

  export default {
    name: "pending-list",
    data(){
      return{
        orderList: [],
        limit:10,
        offset:0,
        currentPage:1,
        total:0,
        showConfirm: false,
        orderId:'',
        noData:false,
        pageInfo:0
      }
    },
    watch:{
      searchKey(){

      }
    },
    props:{
      searchKey:{
        type:String,
        default:''
      },
      tabType: {  // 1是进行中 2是已下架
        type: Number,
        default: 1
      }
    },
    components:{
      ConfirmDialog,
      NoDataTip,
      PagingBy
    },
    computed:{
      ...mapGetters([
        'userId'
      ]),
    },
    methods:{
      generateTitle,
      getData(index){
        const api = this.tabType === 1 ? getOrderxPendingPage : getOrderxPendingUnshelve
        this.currentPage = !isNaN(index) ? index : this.currentPage
        const request = {
          limit: this.limit,
          offset: (this.currentPage - 1) * this.limit,
        }
        if(this.tabType === 1){
          Object.assign(request,{
            userId: this.userId,
            statuses:[1],
          })
        }else{
          Object.assign(request,{
            userId: this.userId,
            statuses:[11,12],
          })
        }
        console.log(request)
        api(request).then(res => {
          if(res.code === 10000){
            console.log('pending data:',res)
            if(res.data.length === 0 && this.currentPage === 1){
              this.noData = true
            }else{
              this.noData = false
            }
            this.orderList = [...res.data]
          }else{
            toast(res.message)
          }
        }).catch(error => {
          toast(error)
        })
      },
      putDownUpOrder(orderId,type){
        if(orderId){
          const api = type === 1 ? putToDown : putToUp
          api({orderId}).then(res => {
            if(res.code === 10000){
              toast(res.message)
              this.getData()
              if(type === 1){
                Vue.$global.bus.$emit('update:balance')
              }
            }else{
              toast(res.message)
            }
          }).catch(error => {
            toast(error)
          })
        }
      },
      deleteOrder(orderId){
        if(orderId) {
          this.orderId = orderId
          this.showConfirm = true
        }
      },
      orderDelete(){
        this.showConfirm = false
        deleteUnshelve({orderId: this.orderId}).then(res => {
          if(res.code === 10000){
            toast(res.message)
            this.getData()
          }else{
            toast(res.message)
          }
        }).catch(error => {
          toast(error)
        })
      },
    },
    mounted(){
      if (this.islogin) {
        this.getData()
      }
    }
  }
</script>

<style lang="scss" scoped>
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