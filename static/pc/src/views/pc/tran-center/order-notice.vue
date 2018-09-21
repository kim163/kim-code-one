<template>
  <transition name="fade">
    <div class="order-main" v-if="show">
      <div class="title" :class="{animation: hasNew}">订单通知</div>
      <div class="detail">
        <div class="detail-content">
          <div>{{orderType === 1 ? '购买' : '卖出'}}{{amount}}UET</div>
          <div class="color-blue">{{orderStatus === 1 ? '等待付款' : (orderStatus === 2 ? '等待放币' : '申诉锁定')}}...</div>
          <div class="color-red" v-if="isAward">立即付款预计获赠{{couponValueStr}}UET</div>
          <div class="go-detail" @click="toLink(1)">前去交易</div>
          <div class="more" @click="toLink(2)">更多订单 >></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {
    getOrderxPage,
    getCouponAmount,
    getOrderx
  } from 'api/transaction'
  export default {
    name: "order-notice",
    data(){
      return{
        show:false,
        orderId:'',
        orderType:1, // 1买入 2卖出
        orderStatus:1,//1 等待付款  2 等待放币  3申诉锁定
        amount:0,
        isAward:false,
        couponValueStr:0,
        hasNew:false,
      }
    },
    computed:{
      ...mapGetters([
        'userId',
        'getNewOrder'
      ])
    },
    watch:{
      "getNewOrder":{
        handler(newVal,oldVal){
          if(newVal.orderId != oldVal.orderId){
            this.orderId = newVal.orderId
            this.getOrderDetail()
          }else{
            if(newVal.type === 1 || newVal.type === 2 || newVal.type === 11){
              this.orderId = newVal.orderId
              this.getOrderDetail()
            }
          }
        },
        deep: true
      },
      hasNew(val){
        if(val){
          setTimeout(() => {
            this.hasNew = false
          },1000)
        }
      }
    },
    methods:{
      getOrderIng(){  //获取交易中的最新订单
        const request={
          limit: 1,
          offset: 0,
          credit: this.userId,
          debit: this.userId,
          types:[11, 12]
        }
        getOrderxPage(request).then(res => {
          if(res.code === 10000){
            if(res.data && res.data.length > 0){
              const data = res.data[0]
              this.show = true
              this.hasNew = true
              this.orderType = this.userId === data.debit ? 2 : 1
              this.orderStatus = data.status === 61 ? 3 : (data.status === 45 ? 1 : 2)
              this.amount = this.orderType === 1 ? data.creditAmount : data.debitAmount
              this.orderId = data.id
              this.getDiscountNum()
            }
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      getDiscountNum(){
        const req = {
          orderId:this.orderId,
          traderType: this.orderType
        }
        getCouponAmount(req).then(res => {
          console.log('getCouponAmount',res)
          if(res.code === 10000){
            if(!_.isNull(res.data)){
              this.couponValueStr = Number(res.data.couponValueStr)
              this.isAward = this.couponValueStr > 0 ? res.data.isAward : false
            }
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      getOrderDetail(){
        getOrderx({orderId: this.orderId}).then(res => {
          console.log('order-notice',res)
          if(res.code === 10000){
            this.show = true
            this.hasNew = true
            if(res.data.status === '61'){
              this.orderStatus = 3
            }else if(res.data.status === '45'){
              this.orderStatus = 1
            }else if(res.data.status === '47'){
              this.orderStatus = 2
            }
            if (res.data.credit === this.userId) {
              this.orderType = 1;
            } else if (res.data.debit === this.userId) {
              this.orderType = 2;
            }
            this.amount = res.data.debitAmount
            this.getDiscountNum()
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      toLink(type){
        this.show = false
        if(type === 1){
          let routerName = 'orderDetail'
          if(this.orderStatus === 3){
            routerName = 'orderDetailAppeal'
          }
          this.$router.push({name:routerName,params:{id: this.orderId}})
        }else{
          this.$router.push({name:'orderRecord'})
        }
      }
    },
    mounted(){
      this.getOrderIng()
    }
  }
</script>

<style lang="scss" scoped>
  .order-main{
    margin-top: 20px;
  }
  .title{
    font-size: 24px;
    margin-bottom: 15px;
    &.animation{
      animation: flash 1s;
    }
  }
  .detail{
    width: 1200px;
    background: repeating-linear-gradient(135deg, transparent, transparent 3px, #E75D53 3px, #E75D53 8px);
    animation: shine 1s infinite linear;
    overflow: hidden;
    .detail-content{
      height: 60px;
      margin: 1px;
      background-color: #FFF8F7;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 16px;
    }
    .color-blue{
      color: #3573FA;
    }
    .go-detail{
      display: block;
      width: 100px;
      height: 30px;
      background: #3573FA;
      border-radius: 3px;
      line-height: 30px;
      text-align: center;
      color: #FFFFFF;
      cursor: pointer;
    }
    .more{
      cursor: pointer;
      text-decoration: underline;
    }
  }
  @keyframes shine {
    0% { background-position: -1px -1px;}
    100% { background-position: -12px -12px;}
  }
</style>