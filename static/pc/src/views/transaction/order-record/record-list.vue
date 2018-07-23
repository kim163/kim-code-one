<template>
  <div>
    <div class="group-head">
      <span class="unit">订单类型</span>
      <span class="unit">对方</span>
      <span class="unit">交易数量</span>
      <span class="unit">交易单价</span>
      <span class="unit">交易金额</span>
      <span class="unit">状态</span>
      <span class="unit">操作 <span>(刷新)</span></span>
    </div>
    <div class="group-body">
      <div v-if="!noData">
        <div class="group-tr" v-for="(item,index) in dataList" :key="index">
          <span class="unit" v-if="tabType != 3">
            <span class="c-blue type blue-border" v-if="item.credit == userData.userId">{{$t('transactionRecord.buy')}}</span>
            <span class="c-orange type orange-border" v-if="item.debit == userData.userId">{{$t('transactionRecord.sale')}}</span>
          </span>
          <span class="unit">{{getUserName(item)}}</span>
          <span class="unit"> {{tabType === 3 ? item.amount : item.creditAmount}}   UET</span>
          <span class="unit"> 0.01 CNY</span>
          <span class="unit red">{{tabType === 3 ? item.amountTwin : item.creditAmountTwin}} CNY</span>
          <span class="unit" v-if="tabType === 1">
            <span v-if="item.status != 61">
              {{(item.status === 45 ? $t('transactionRecord.waitingForPayment') : $t('transactionRecord.waitingForRelease'))}}
            </span>
            <span v-else-if="item.status != 61">
              <countdown :end-time="item.intervalTime-item.elapsedTime" end-text="已过期"></countdown>
            </span>
            <span v-else>申诉锁定</span>
          </span>
          <span class="unit" v-if="tabType === 2">
            <span v-if="item.status =='204'">交易取消</span>
            <span v-else>交易完成</span>
          </span>
          <span class="unit" v-if="tabType === 3">
            {{item.statusText}}
          </span>
          <span class="unit">
            <router-link :to='orderDetailLink(item)' class="btn btn-primary">详情</router-link>
          </span>
        </div>
        <paging-by :data="pageInfo" @search="getDataList"></paging-by>
      </div>
      <no-data-tip v-else></no-data-tip>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import NoDataTip from 'components/no-data-tip'
  import PagingBy from "components/paging-by"
  import CountDown from 'components/countdown'
  import {
    getAppealHistoryPage,
    getTransactionPage,
    getOrderxPage
  } from 'api/transaction'
  export default {
    name: "record-list",
    data() {
      return {
        dataList: [],
        limit: 10,
        offset: 0,
        currentPage: 1,
        noData: false,
        pageInfo: {}
      }
    },
    watch:{
      search(val){
        if(val){
          this.getDataList()
        }
      },
    },
    model:{
      prop: 'search',
      event: 'change'
    },
    props: {
      tabType: {  //1交易中  2交易完成  3申诉记录
        type: Number,
        default: 1,
        request: true
      },
      searchKey:{
        type:String,
        default:''
      },
      search:{
        type:Boolean,
        default:false
      }
    },
    computed: {
      ...mapGetters([
        'userId',
        'userData'
      ])
    },
    components: {
      NoDataTip,
      PagingBy,
      CountDown,
    },
    methods: {
      getDataList(index){
        this.currentPage = !isNaN(index) ? index : this.currentPage
        const request={
          limit: this.limit,
          offset: (this.currentPage - 1) * this.limit,
        }
        if(this.tabType != 3){
          Object.assign(request,{
            credit: this.userId,
            debit: this.userId,
            types:[11,12]
          })
        }else {
          Object.assign(request,{
            userId: this.userId
          })
        }
        if(this.searchKey != ''){
          if(this.tabType != 3){
            Object.assign(request,{
              debitName: this.searchKey,
              creditName: this.searchKey
            })
          }else{
            Object.assign(request,{
              nickname: this.searchKey
            })
          }
        }
        console.log('record request',request)
        let api = _.noop()
        switch (this.tabType){
          case 1:
            api = getOrderxPage
            break
          case 2:
            api = getTransactionPage
            break
          case 3:
            api = getAppealHistoryPage
            break
          default:
            break
        }
        api(request).then(res => {
          console.log('record list',res)
          if(res.code === 10000){
            if(res.data.length === 0 && this.currentPage === 1){
              this.noData = true
            }else{
              this.noData = false
            }
            this.dataList = [...res.data]
            this.pageInfo = res.pageInfo
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        }).finally(() => {
          this.$emit('change',false)
        })
      },
      orderDetailLink(item){
        let routerName = ''
        if(this.tabType === 0){
          routerName = item.status === 61 ? 'orderDetailAppeal' : 'orderDetail'
        }else{
          routerName = 'orderDetailOver'
        }
        return {name: routerName, params:{ id: item.id}}
      },
      getUserName(item){
        if(this.tabType === 3){
          return item.credit == this.userData.userId ? item.debitName : item.creditName
        }else{
          return item.credit == this.userData.userId ? item.debitName : item.creditName
        }
      }
    },
    mounted(){
      this.getDataList()
    },
    activated() {
      Vue.$global.bus.$on('update:tranList',() => {
        this.getDataList()
      })
    },
    deactivated(){
      Vue.$global.bus.$off('update:tranList')
    }
  }
</script>

<style lang="scss" scoped>
  .red{
  }
  .type{
    display: block;
    width: 80%;
    border-radius: 5px;
    margin: 0 auto;
  }
  .blue-border{
    border: 1px solid #5087ff;
  }
  .orange-border{
    border: 1px solid #ff9600;
  }
</style>

