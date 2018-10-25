<template>
  <div class="match-container" v-if="show">
    <div class="title">{{title}}</div>
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
    <!--加了v-if对数组的判断导致transition delay 动画gg-->
    <div class="match-success" v-show="newArr.length>0">
      <p class="main-title">
        为您匹配到订单...
      </p>
      <p class="title-description">
        为了您的资金安全,您的订单可能被拆分成多单进行交易,造成您的不便敬请见谅。
      </p>
      <div class="list-container">
        <!--背景色固定为三种颜色-->
        <transition-group v-on:before-enter="beforeEnter">
          <div class="content-list" v-for="(list,num) in newArr" v-bind:key="num"
               :class="{'bgOne':num%3==0,'bgSecond':num%3==1,'bgThird':num%3==2}" :animate-delay="num*0.1+'s'">
            <div class="content-left">
              <p v-if="list.credit==userId">卖家: {{list.debitName}}</p>
              <p v-else>买家: {{list.creditName}}</p>
              <p v-if="list.credit==userId">卖出数量: {{list.creditAmount}}</p>
              <p v-else>买入数量: {{list.creditAmount}}</p>
              <!--对方是卖家-->
              <p v-if="list.credit==userId">订单状态: <span v-if="list.status==45">等待付款</span> <span
                v-if="list.status==47">等待放币</span>
                <span v-if="list.status==61">申诉中</span></p>
              <!--对方是买家-->
              <p v-else>订单状态: <span v-if="list.status==45">等待付款</span> <span v-if="list.status==47">完成付款</span>
                <span v-if="list.status==61">申诉中</span>
              </p>
            </div>
            <div class="content-right" @click="goDetailPage(list.id)">
              查看详情
            </div>
          </div>
        </transition-group>

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
        isBuyState: '',
        leftArr: _.shuffle(_.range(10, 30, 4).concat(_.range(60, 80, 4))),
        topArr: _.shuffle(_.range(10, 40, 6).concat(_.range(60, 90, 6))),

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
    created() {
      this.getOrderIng()
    },
    methods: {
      beforeEnter(el) {
        const delay = el.getAttribute('animate-delay')
        const cssObj = {
          "animation-delay": delay,
          '-webkit-animation-delay': delay,
          'visibility': "visible"
        }
        const getCssText = (obj) => {
          var text = [];
          for (var o in obj) {
            text.push(o + ":" + obj[o])
          }
          return text.join(';')
        }
        el.style.cssText = getCssText(cssObj);
      },
      changeFormate(value) {
        const TransferArr = []
        /*交易数量 因为type==4和3的时候ordex 为null*/
        if (value.type == 4 || value.type == 3) {
          TransferArr.creditAmount = 0
           const FilterArr = this.newArr.filter((item) => {
            return item.id !== value.orderId
          })
          this.newArr = FilterArr
          return
        } else {
          TransferArr.creditAmount = value.orderx.creditAmount
        }

        /*交易类型 3和4 */
        if (value.type == 1) {
          TransferArr.status = 45
        } else if (value.type == 2) {
          TransferArr.status = 47
        } else if (value.type == 11) {
          TransferArr.status = 61
        }
        /*交易名称*/
        if (value.orderx) {
          TransferArr.creditName = value.orderx.creditName
          TransferArr.debitName = value.orderx.debitName
        }
        /*订单id*/
        TransferArr.id = value.orderId
        /*判断用户角色*/
        TransferArr.credit = value.orderx.credit
        TransferArr.debit = value.orderx.debit
        if (this.newArr.findIndex((item) => item.id === value.orderId) == -1) {
          this.newArr.unshift(TransferArr)
        }
      },
      hide() {
         this.$router.back();
      },
      getOrderIng() {
        const request = {
          limit: 10,
          offset: 0,
          credit: this.userId,
          debit: this.userId,
          types: [11, 12],
          loading: false
        }
        getOrderxPage(request).then(res => {
          if (res.code === 10000) {
            /*为了展现转圈的效果*/
            setTimeout(() => {
              this.newArr = res.data
            }, 1500)

          }
        })
      },
      goBack() {
        this.$router.back();
      },
      goIndex() {
        this.$router.back();
      },
      goDetailPage(id) {
        this.$router.push({name: 'mOrder', params: {id: id}})
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
      ...mapGetters(['getNewOrder', 'userId']),
    },
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
      padding-top: r(60);
    }
    .title-description {
      @include f(14px);
      margin-top: r(30);
      padding: r(0) r(40);
      text-align: center;
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
      transform: translateX(150%);
      animation: fadeInRight 1s forwards;
      .content-left {
        flex: 1;
        padding: r(10) 0 r(15) r(15);
        text-align: left;
        p {
          padding-bottom: r(5);
        }
      }
      .content-right {
        width: r(90);
        height: r(30);
        border: 1px solid #fff;
        border-radius: r(3);
        @include f(12px);
        line-height: r(30);
        margin-top: r(25);
        margin-right: r(15);
      }
      &.bgOne {
        background-color: #3e6697;
      }
      &.bgSecond {
        background-color: #4c3e97;
      }
      &.bgThird {
        background-color: #3e9775;
      }
    }
    .list-container {
      margin-top: r(15);
      height: calc(100% - #{r(325)});
      overflow-y: scroll;
    }
    .backgroundProcess {
      position: fixed;
      width: r(90);
      bottom: 5%;
      left: 39%;
      height: r(30);
      background: #3573FA;
      border-radius: r(4);
      color: #fff;
      text-align: center;
      line-height: r(30);
      @include f(14px)
    }
  }

  ::-webkit-scrollbar-thumb {
    min-width: 150px;
    min-height: 150px;
    border-radius: 10px;
    background: transparent;
    opacity: 0;
  }

  ::-webkit-scrollbar-track-piece {
    margin: -2px;
    background-color: transparent;
    opacity: 0;
  }

</style>
