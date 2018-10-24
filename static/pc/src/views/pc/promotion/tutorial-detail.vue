<template>
  <div class="tutorial-detail">
    <div class="tab-list">
      <div class="tab-item" v-for="(item,index) in tabList"
           :key="index"
           :class="{active: tabIndex === index}"
           @click="tabIndex = index" v-show="item.show">
        <i class="iconfont" :class="item.icon"></i>
        {{item.name}}
      </div>
    </div>
    <div class="detail-step">
      <swiper :options="swiperOptionPc" v-show="tabIndex === 0">
        <swiper-slide v-for="(item,index) in detail.pc" :key="index" class="step-pc">
          <div class="step-title">{{item.title}}</div>
          <img :src="item.img"/>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <swiper :options="swiperOptionH5" v-show="tabIndex === 1">
        <swiper-slide v-for="(item,index) in detail.h5" :key="index">
          <img :src="item.img"/>
          <div class="step-title">{{item.title}}</div>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <swiper :options="swiperOptionH5" v-show="tabIndex === 2">
        <swiper-slide v-for="(item,index) in detail.app" :key="index">
          <img :src="item.img"/>
          <div class="step-title">{{item.title}}</div>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  export default {
    name: "tutorial-detail",
    data(){
      return{
        tabIndex:0,
        tabList:[
          {
            name:'电脑网站',
            icon:'icon-pc',
            show: this.detail.pc.length > 0 && !_.isMobile()
          },
          {
            name:'手机(H5)网站',
            icon:'icon-h5',
            show: this.detail.h5.length > 0
          },
          {
            name:'APP原生态',
            icon:'icon-app',
            show: this.detail.app.length > 0
          }
        ],
        isMobile: _.isMobile(),
        swiperOptionPc: {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        swiperOptionH5: {
          slidesPerView: 4,
          spaceBetween: 10,
          slidesPerGroup: 4,
          loopFillGroupWithBlank: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    },
    props:{
      detail:{
        type:Object,
        default(){
          return {
            pc:[],
            h5:[],
            app:[]
          }
        }
      }
    },
    components:{
      swiper,
      swiperSlide,
    }
  }
</script>

<style lang="scss">
  @import "~assets/scss/mobile";
  .tutorial-detail{
    width: 100%;
    .tab-list{
      margin-top: 30px;
      display: flex;
    }
    .tab-item{
      width: 130px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #ffffff;
      background: #86A5F8;
      border-radius: 3px;
      transition: all .5s;
      margin-right: 30px;
      cursor: pointer;
      font-size: 14px;
      &.active{
        background: #3573FA;
      }
    }
    .detail-step{
      width: 100%;
      margin-top: 30px;
      padding: 30px 0px;
      background: #F3F7FF;
      border-radius: 5px;
      position: relative;
      .step-pc{
        .step-title{
          width: 80%;
          margin: 0 auto;
          font-size: 14px;
          color: #333333;
        }
        img{
          width: 80%;
          margin-left: 10%;
          margin-top: 20px;
        }
      }
      .swiper-button-prev{
        background-image: url("~images/left-arrow.svg");
        left: 30px;
      }
      .swiper-button-next{
        background-image: url("~images/right-arrow.svg");
        right: 30px;
      }
    }
  }

  @media only screen and (max-width: 1199px) and (min-width: 800px) {
    .tutorial-detail{
      .detail-step{
        .step-title{
          width: 90%;
        }
        img{
          width: 90%;
          margin-left: 5%;
        }
        .swiper-button-prev{
          left: 2px;
        }
        .swiper-button-next{
          right: 2px;
        }
      }
    }
  }
  @media only screen and (max-width: 799px) {
    .tutorial-detail{
      .detail-step{
        .step-title{
          width: 95%;
        }
        img{
          width: 95%;
          margin-left: 2.5%;
        }
        .swiper-button-prev{
          display: none;
        }
        .swiper-button-next{
          display: none;
        }
      }
    }
  }
</style>