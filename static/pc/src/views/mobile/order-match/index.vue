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
    <div class="" style=" color: #fff">{{getNewOrder.type}}</div>
  </div>
</template>

<script>
  import {
    getOrderxPendingPage
  } from 'api/transaction'
  import {mapGetters} from 'vuex'

  export default {
    name: "order-match",
    data() {
      return {
        title: '匹配中...',
        userList: [],
        randomUser: [],
        leftArr: _.shuffle(_.range(10, 30, 4).concat(_.range(60, 80, 4))),
        topArr: _.shuffle(_.range(10, 40, 6).concat(_.range(60, 90, 6)))
      }
    },
    model: {
      prop: "show",
      event: 'change'
    },
    watch: {
      getNewOrder(val) {
        console.log(val, '速度')
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
    methods: {
      hide() {
        this.$emit('change', false)
      },
      goBack() {
        this.$router.back();
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
      ...mapGetters(['getNewOrder'])
    },
    watch: {
      'getNewOrder': {
        handler(newVal, oldVal) {
          console.log(oldVal, '萨科技的')
          console.log(newVal, '新推送过来的信息')
        },
        deep: true
      },

    },

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

</style>
