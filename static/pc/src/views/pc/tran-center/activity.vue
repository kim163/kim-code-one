<template>
  <transition name="fade">
    <div class="container min-width activity-main" v-if="activityList.length > 0">
      <swiper ref="mySwiper" :options="swiperOption">
        <swiper-slide v-for="(item,index) in activityList" :key="index" >
          <div class="act-item" :class="`item-${index}`" @click="quickBuyOrSell(item)">
            <div class="info-item left">
              <img class="icon-img" :src="item.iconUrl">
              <div>
                <p class="title">{{item.title}}</p>
                <p class="des-title">{{item.subtitle}}</p>
              </div>
            </div>
            <div class="info-item center">
              <div class="content-info" v-for="(info,i) in item.contentList" :key="i">{{info}}</div>
            </div>
            <div class="info-item right">
              <p class="balance-last">赠币活动剩余：</p>
              <p>
                <span class="balance">
                  <animated-integer :value="coinBalance"></animated-integer>
                </span>
                <span>UET</span>
              </p>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination activity-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </transition>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {getAwardInfo} from 'api/activity'
  import AnimatedInteger from 'components/animated-integer'

  export default {
    name: "pc-activity",
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          // loop: true,
          simulateTouch : true,//禁止鼠标模拟
          preventLinksPropagation : false
        },
        activityList: [],
        coinBalance: 0,
      }
    },
    components: {
      swiper,
      swiperSlide,
      AnimatedInteger
    },
    methods: {
      getActivityList() {
        getAwardInfo({}).then(res => {
          if (res.code === 10000) {
            this.coinBalance = Number(res.data.coinBalance)
            this.activityList = [...res.data.awardList]
            if(this.coinBalance > 0){
              this.timer = setTimeout(() => {
                clearTimeout(this.timer)
                this.getActivityList()
              },20000)
            }
          } else {
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      quickBuyOrSell(data){
        let openSell = data.type === 'sellCoins' ? true : false
        this.$store.commit('OPEN_QUICKSELL',openSell)
        this.$router.push({name:'quickBuySell'})
      }
    },
    mounted() {
      this.getActivityList()
      // this.timer = setInterval(() => {
      //   this.getActivityList()
      // },20000)
    },
    beforeDestroy(){
      clearTimeout(this.timer)
    }
  }
</script>

<style lang="scss" scoped>
  .activity-main {
    margin-top: 30px;
    .swiper-container {
      height: 165px;
    }
    .act-item {
      width: 100%;
      height: 140px;
      position: relative;
      display: flex;
      cursor: pointer;
      &:after {
        content: '';
        position: absolute;
        background: url(~images/act-border.png);
        width: 10px;
        height: 130px;
        left: -5px;
        top: 5px;
        background-size: 100% 100%;
      }
      &:before {
        content: '';
        position: absolute;
        background: url(~images/act-border.png);
        width: 10px;
        height: 130px;
        right: -5px;
        top: 5px;
        background-size: 100% 100%;
      }
      &.item-0{
        background-image: linear-gradient(45deg, #AD7EFD 0%, #69EDFF 100%);
      }
      &.item-1{
        background-image: linear-gradient(44deg, #FA709A 0%, #FCA96D 50%, #FCA96D 50%, #FEE140 100%);
      }
      &.item-2 {
        background-image: linear-gradient(-236deg, #FB9F75 0%, #FA709A 100%);
      }
      &.item-3 {
        background-image: linear-gradient(47deg, #EE69FF 0%, #955AF9 100%);
      }
      .info-item {
        /*width: 25%;*/
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        position: relative;
        font-size: 16px;
        &:after {
          content: '';
          width: 1px;
          height: 100px;
          position: absolute;
          background: #ffffff;
          right: 0;
          top: 20px;
          opacity: 0.3;
        }
        &.left{
          width: 455px;
        }
        &.center {
          width: 530px;
          flex-direction: column;
        }
        &.right{
          width: 213px;
          flex-direction: column;
        }
      }
      .icon-img {
        width: 131px;
        height: 83px;
        margin-right: 40px;
      }
      .title {
        font-size: 24px;
        margin-bottom: 12px;
      }
      .des-title{
        font-size: 18px;
      }
      .content-info {
        width: 450px;
        text-align: left;
        line-height: 24px;
        font-size: 14px;
      }
      .balance-last{
        font-size: 18px;
        margin-bottom: 12px;
      }
      .balance {
        font-size: 24px;
      }
      .f-md {
        font-size: 14px;
      }
    }
  }

  /*.swiper-pagination {*/
    /*bottom: 0px;*/
    /*> .swiper-pagination-bullet {*/
      /*width: 14px !important;*/
      /*height: 14px !important;*/
    /*}*/
  /*}*/
</style>