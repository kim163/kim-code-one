<template>
  <div class="match-container" v-if="show">
    <div class="title" v-if="!newArr">匹配中...</div>
    <div class="title" v-else>匹配成功...</div>
    <div class="map"></div>
    <div class="dot">
      <i class="iconfont icon-magnifier"></i>
    </div>
    <div class="pulse pulse1"></div>
    <div class="pulse pulse2"></div>
    <div class="pulse pulse3"></div>
    <div class="pulse pulse4"></div>
    <div class="back-pro" @click="hide">后台运行</div>
    <div class="user-list">
      <div class="user" v-for="(item,index) in randomUser" :key="index"
           :style="{left: `${item.left}%`,top:`${item.top}%`}">{{item.name}}
      </div>
    </div>
    <div class="match-success" v-if="newArr">
      <p class="main-title">
        为您匹配到订单...
      </p>
      <p class="title-description">
        为了您的资金安全,您的订单可能被拆分成多单进行交易,造成您的不便敬请见谅。
      </p>
      <div class="list-container">
        <!--背景色固定为三种颜色-->
        <div class="content-list" v-for="(list,num) in newArr" :class="{'bgOne':num%3==0,'bgSecond':num%3==1,'bgThird':num%3==2}">
          <div class="content-left">
            <p v-if="list.credit==userId">卖家: {{list.debitAccountNameTwin}}</p>
            <p v-else>买家: {{list.creditAccountNameTwin}}</p>
            <p>卖出数量: {{list.creditAmount}}</p>
           <!--对方是卖家-->
            <p v-if="list.credit==userId">订单状态: <span v-if="list.status==45">等待我付款</span> <span v-if="list.status==47">等待对方放币</span></p>
            <!--对方是买家-->
            <p v-else>订单状态: <span v-if="list.status==45">等待对方付款</span> <span v-if="list.status==47">对方已完成付款</span></p>
          </div>
          <div class="content-right" @click="goDetailPage(list.id)">
            查看详情
          </div>
        </div>
      </div>
      <div class="backgroundProcess" @click="goIndex">后台运行</div>
    </div>

  </div>
</template>

<script>
  import {
    getOrderxPendingPage,
    getOrderxPage
  } from 'api/transaction'
  import {mapGetters} from 'vuex'

  export default {
    name: "order-match",
    data() {
      return {
        title: '匹配中...',
        userList: [],
        randomUser: [],
        newArr: [],
        leftArr: _.shuffle(_.range(10, 30, 4).concat(_.range(60, 80, 4))),
        topArr: _.shuffle(_.range(10, 40, 6).concat(_.range(60, 90, 6)))
      }
    },
    model: {
      prop: "show",
      event: 'change'
    },
    watch: {
      'getNewOrder': {
        handler(newValue, oldValue) {
          this.changeFormate(newValue)
           console.log(newValue,'洒家扩大')
        },
        deep: true
      }
    },
    props: {
      type: { //类型  0代表买 1代表卖
        type: Number,
        default: 0
      },
      show: {
        type: Boolean,
        default: true
      }
    },
    created(){
      this.getOrderIng()
    },
    methods: {
      changeFormate(value){
        console.log(value,'时间跨度')
         const TransferArr = []
        /*交易数量*/
         TransferArr.creditAmount = value.orderx.creditAmount
        /*交易类型*/
         TransferArr.creditType = value.type
         /*交易名称*/
         TransferArr.creditAccountNameTwin = value.orderx.creditName
         TransferArr.debitAccountNameTwin = value.orderx.debitName
         /*订单id*/
         TransferArr.id = value.orderId
         this.newArr.unshift(TransferArr)
      },
      hide() {
        this.$emit('change', false)
      },
      getOrderIng(){
        const request={
          limit:1,
          offset:0,
          credit:this.userId,
          debit:this.userId,
          types:[11,12],
          loading:false
        }
        getOrderxPage(request).then(res=>{
          if(res.code === 10000){
            this.newArr = res.data
            console.log(this.newArr,'撒赖扩大就')
          }
        })
      },
      goBack() {
        this.$router.back();
      },
      goIndex(){
        this.$router.push({name:'mAindex'})
      },
      goDetailPage(id){
        this.$router.push({name:'mOrder',params:{id:id}})
      },
      getUserList() {
        const data = {
          limit: 10,
          offset: 0,
          currentPage: 1,
          type: this.type === 0 ? 11 : 12,
          startBalance: 0,
          status: 1
        }
        getOrderxPendingPage(data).then(res => {
          console.log(res)
          if (res.code === 10000 && res.data.length > 0) {
            this.userList = res.data.map((item, index) => {
              return {
                name: item.userName,
                left: this.leftArr[index],
                top: this.topArr[index]
              }
            })
            this.randomUserList()
          }
        })
      },
      randomUserList() {
        setTimeout(() => {
          const r = _.random(1, 3)
          for (let i = 0; i < r; i++) {
            this.randomUser.push(this.userList[this.randomUser.length])
          }
          if (this.randomUser.length > this.userList.length) {
            this.randomUser = []
            this.leftArr = _.shuffle(this.leftArr)
            this.topArr = _.shuffle(this.topArr)
            this.userList.forEach((item, index) => {
              item.left = this.leftArr[index]
              item.top = this.topArr[index]
            })
            this.userList = _.shuffle(this.userList)
          }
          this.randomUserList()
        }, 2000)
      },
    },
    mounted() {
      this.getUserList()
    },
    computed: {
      ...mapGetters(['getNewOrder','userId'])
    }
    // beforeRouteEnter(to,from,next){
    //   next(vm => {
    //     if(from.name === 'mIndex' || from.name === 'mPendingBuy'){
    //       next()
    //     }else{
    //       vm.$router.go(-2)
    //     }
    //   })
    // }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .match-container {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    background-image: linear-gradient(-225deg, #212939 0%, #161A24 100%);
  }

  .title {
    text-align: center;
    @include f(18px);
    color: $white;
    margin-top: r(20);
  }

  .back-pro {
    width: r(90);
    height: r(30);
    background: #3573FA;
    border-radius: 5px;
    text-align: center;
    line-height: r(30);
    color: $white;
    position: absolute;
    bottom: 5%;
    left: 50%;
    margin-left: r(-45);
    cursor: pointer;
  }

  .map {
    position: absolute;
    width: 100%;
    height: 80%;
    background: url("~images/map-bg.png") no-repeat center center;
    opacity: 0.2;
    background-size: 200%;
    z-index: 1;
    top: 10%;
  }

  .dot {
    position: absolute;
    width: r(90);
    height: r(90);
    background-image: linear-gradient(-45deg, #4634A9 0%, #F63669 100%);
    box-shadow: 0 r(10) r(40) 0 rgba(0, 0, 0, 0.20);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    margin-top: r(-45);
    margin-left: r(-45);
    z-index: 3;
    .iconfont {
      position: absolute;
      left: 25%;
      top: 25%;
      color: $white;
      @include f(30px);
      animation: searchBtn 3s infinite;
    }
  }

  .pulse {
    position: absolute;
    width: r(450);
    height: r(450);
    top: 50%;
    left: 50%;
    margin-top: r(-225);
    margin-left: r(-225);
    border: r(1) solid #3a455a;
    border-radius: 50%;
    z-index: 1;
    opacity: 0;
    background: rgba(255, 255, 255, .05);
    animation: warn 2s linear infinite;
    &.pulse2 {
      animation-delay: .5s;
    }
    &.pulse3 {
      animation-delay: 1s;
    }
    &.pulse4 {
      animation-delay: 1.5s;
    }
  }

  .user-list {
    position: relative;
    width: 100%;
    height: 70%;
    z-index: 1;
    left: 0;
    top: 10%;
    .user {
      position: absolute;
      color: $white;
      @include f(14px);
      animation: fadeIn .5s;
    }
  }

  @keyframes warn {
    0% {
      transform: scale(0);
      -webkit-transform: scale(0);
      opacity: 0.0;
    }

    25% {
      transform: scale(0.25);
      -webkit-transform: scale(0.25);
      opacity: 1;
      background: rgba(255, 255, 255, .05);
    }

    50% {
      transform: scale(0.5);
      -webkit-transform: scale(0.5);
      opacity: 1;
      background: rgba(255, 255, 255, .05);
    }

    75% {
      transform: scale(0.75);
      -webkit-transform: scale(0.75);
      opacity: 1;
      background: transparent;
    }

    100% {
      transform: scale(1);
      -webkit-transform: scale(1);
      opacity: 1;
      background: transparent;
    }
  }

  @keyframes searchBtn {
    0%, 100% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(50%, 0);
    }
    50% {
      transform: translate(50%, 50%);
    }
    75% {
      transform: translate(0%, 50%);
    }
  }

  .match-success {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    color: #fff;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.9);
    height: 100%;
    width: 100%;
    .main-title {
      @include f(20px);
      padding-top: r(100);
    }
    .title-description {
      @include f(14px);
      margin-top: r(30);
      padding: r(0) r(40);
      text-align: left;
      line-height: r(30);
    }
    .content-list {
      width: r(300);
      height: r(82);
      color: #fff;
      border-radius: r(5);
      @include f(12px);
      display: flex;
      flex-direction: row;
      margin: 0 auto;
      margin-bottom: r(20);
      .content-left{
        flex: 1;
        padding: r(10) 0 r(15) r(15);
        text-align: left;
        p{
          padding-bottom: r(5);
        }
      }
      .content-right{
        width: r(90);
        height: r(30);
        border: 1px solid #fff;
        border-radius: r(3);
        @include f(12px);
        line-height: r(30);
        margin-top: r(25);
        margin-right: r(15);
      }
      &.bgOne{
          background-color: #3e6697;
      }
      &.bgSecond{
        background-color: #4c3e97;
      }
      &.bgThird{
        background-color: #3e9775;
      }
    }
    .list-container{
        margin-top: r(15);

    }
    .backgroundProcess{
       position: fixed;
       bottom: r(40);
       right: r(40);
       width: r(100);
       height: r(30);
       background-color: #fff;
       border-radius: r(4);
       color: #333;
      text-align: center;
      line-height: r(30);
      @include f(14px)
    }
  }
</style>
