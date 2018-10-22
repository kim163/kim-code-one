<template>
  <div>
    <transition name="fade">
      <div class="order-main" v-if="show">
        <div class="title" :class="{animation: hasNew}">订单通知</div>
        <div class="detail">
          <div class="detail-content">
            <div>{{orderType === 1 ? '购买' : '卖出'}}{{amount}}UET</div>
            <div class="color-blue">{{orderStatus === 1 ? '等待付款' : (orderStatus === 2 ? '等待放币' : '申诉锁定')}}...</div>
            <div class="color-red" v-if="isAward">立即付款预计获赠{{couponValueStr}}UET</div>
            <div v-if="countDownTime > 0">
              <div>交易倒计时:
                <span class="cl-red">
                <count-down :end-time="countDownTime" @callBack="getOrderIng"></count-down>
              </span>
              </div>
            </div>
            <div class="go-detail" @click="toLink(1)">前去交易</div>
            <div class="more" @click="toLink(2)">更多订单 >></div>
          </div>
        </div>
      </div>
    </transition>
    <audio ref="music">
      <source src="~assets/music/ding-tips.ogg" type="audio/ogg"/>
      <source src="~assets/music/ding-tips.mp3" type="audio/mpeg"/>
    </audio>
  </div>
</template>

<script>
  import {
    getOrderxPage,
    getCouponAmount,
    getOrderx
  } from 'api/transaction'
  import CountDown from 'components/countdown'
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
        countDownTime:0
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
          if(newVal.orderId === ''){
            this.show = false
            this.orderId = newVal.orderId
          }else{
            if(newVal.orderId != this.orderId){
              this.orderId = newVal.orderId
              this.$refs.music.play()
              this.getOrderDetail()
            }else{
              if(newVal.type === 1 || newVal.type === 2 || newVal.type === 11){
                this.orderId = newVal.orderId
                this.getOrderDetail()
              }else{
                this.getOrderIng()
              }
            }
          }
        },
        deep: true
      },
      hasNew(val){
        if(val){
          document.documentElement.scrollTop = 0
          setTimeout(() => {
            this.hasNew = false
          },1000)
        }
      },
      '$route':{
        handler(val){
          if(val.name === 'orderDetail' || val.name === 'orderDetailAppeal'){
            this.show = this.checkRouter()
          }else if(val.name === 'orderDetailOver'){
            this.getOrderIng()
          }else if(this.orderId != ''){
            this.show = true
          }
        }
      },
      userId(){
        this.orderId = ''
        this.getOrderIng()
      }
    },
    components:{
      CountDown
    },
    methods:{
      getOrderIng(){  //获取交易中的最新订单
        const request={
          limit: 1,
          offset: 0,
          credit: this.userId,
          debit: this.userId,
          types:[11, 12],
          loading:false
        }
        getOrderxPage(request).then(res => {
          if(res.code === 10000){
            if(res.data && res.data.length > 0){
              const data = res.data[0]
              this.hasNew = true
              this.orderType = this.userId === data.debit ? 2 : 1
              this.orderStatus = data.status === 61 ? 3 : (data.status === 45 ? 1 : 2)
              this.amount = this.orderType === 1 ? data.creditAmount : data.debitAmount
              this.orderId = data.id
              if(!_.isNull(data.intervalTime)){
                this.countDownTime = data.intervalTime - data.elapsedTime
                this.show = this.checkRouter()
              }else if(_.isNull(data.intervalTime) && data.status != 61){
                this.show = false
              }else{
                this.show = this.checkRouter()
              }
              this.getDiscountNum()
            }else{
              this.show = false
              this.$store.commit('UPDATE_NEWORDER',{
                type: 0,
                orderId: ''
              })
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
          if(res.code === 10000){
            this.show = this.checkRouter()
            this.hasNew = true
            if(res.data.status === 61){
              this.orderStatus = 3
            }else if(res.data.status === 45){
              this.orderStatus = 1
            }else if(res.data.status === 47){
              this.orderStatus = 2
            }
            if (res.data.credit === this.userId) {
              this.orderType = 1;
            } else if (res.data.debit === this.userId) {
              this.orderType = 2;
            }
            this.amount = res.data.debitAmount
            if(!_.isNull(res.data.intervalTime)){
              this.countDownTime = res.data.intervalTime - res.data.elapsedTime
            }
            this.getDiscountNum()
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      toLink(type){
        if(type === 1){
          this.getOrderIng()
          let routerName = 'orderDetail'
          if(this.orderStatus === 3){
            routerName = 'orderDetailAppeal'
          }
          this.$router.push({name:routerName,params:{id: this.orderId}})
        }else{
          this.show = false
          this.$router.push({name:'orderRecord'})
        }
      },
      checkRouter(){
        const val = this.$route
        if(val.name === 'orderDetail' || val.name === 'orderDetailAppeal'){
          if(this.orderId === '' || (this.orderId === val.params.id)){
            return false
          }
        }
        return true
      }
    },
    mounted(){
      this.getOrderIng()
    }
  }
</script>

<style lang="scss" scoped>
  .order-main{
    margin: 20px auto 0;
    width: 1200px;
  }
  .title{
    font-size: 24px;
    &.animation{
      animation: flash 1s;
    }
  }
  .detail{
    width: 1200px;
    background: repeating-linear-gradient(135deg, transparent, transparent 3px, #E75D53 3px, #E75D53 8px);
    animation: shine 1s infinite linear;
    overflow: hidden;
    margin-top: 20px;
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