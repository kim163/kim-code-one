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
        <swiper-slide v-for="(item,index) in detail.h5" :key="index" class="step-app">
          <div class="step-title" v-show="isMobile">{{item.title}}</div>
          <img :src="item.img"/>
          <div class="step-title pc-model" v-show="!isMobile">{{item.title}}</div>
        </swiper-slide>
        <div class="swiper-button-prev button-prev-app" slot="button-prev"></div>
        <div class="swiper-button-next button-next-app" slot="button-next"></div>
      </swiper>
      <swiper :options="swiperOptionApp" v-show="tabIndex === 2" :class="detail.swiperClass">
        <swiper-slide v-for="(item,index) in detail.app" :key="index" class="step-app">
          <div class="step-title" v-show="isMobile">{{item.title}}</div>
          <img :src="item.img"/>
          <div class="step-title pc-model" v-show="!isMobile">{{item.title}}</div>
        </swiper-slide>
        <div class="swiper-button-prev button-prev-app" slot="button-prev"></div>
        <div class="swiper-button-next button-next-app" slot="button-next"></div>
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
        tabIndex: _.isMobile() ? 1 : 0,
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
          slidesPerView: _.isMobile() ? 1 : 3,
          spaceBetween: 0,
          slidesPerGroup: _.isMobile() ? 1 : 3,
          loopFillGroupWithBlank: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          observer:true,
          observeParents:true,
          breakpoints: {
            1200: {
              slidesPerView: 2,
              spaceBetween: 0,
              slidesPerGroup:2
            },
            800: {
              slidesPerView: 1,
              spaceBetween: 0,
              slidesPerGroup:1
            },
          }
        },
        swiperOptionApp: {
          slidesPerView: _.isMobile() ? 1 : 3,
          spaceBetween: 0,
          slidesPerGroup: _.isMobile() ? 1 : 3,
          loopFillGroupWithBlank: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          observer:true,
          observeParents:true,
          centeredSlides: true,
          breakpoints: {
            1200: {
              slidesPerView: 2,
              spaceBetween: 0,
              slidesPerGroup:2
            },
            800: {
              slidesPerView: 1,
              spaceBetween: 0,
              slidesPerGroup:1
            },
          }
        },
      }
    },
    props:{
      detail:{
        type:Object,
        default(){
          return {
            pc:[],
            h5:[],
            app:[],
            slidesPerViewH5:null,
            swiperOptionApp:null,
            swiperClass:''
          }
        }
      }
    },
    components:{
      swiper,
      swiperSlide,
    },
    created(){
      if(this.isMobile){
        this.tabIndex = this.detail.h5.length > 0 ? 1 : 2
      }else{
        this.tabIndex = this.detail.pc.length > 0 ? 0 : (this.detail.h5.length > 0 ? 1 : 2)
      }
      if(!_.isNull(this.detail.slidesPerViewH5)){
        Object.assign(this.swiperOptionH5,this.detail.slidesPerViewH5)
      }
      if(!_.isNull(this.detail.swiperOptionApp)){
        Object.assign(this.swiperOptionApp,this.detail.swiperOptionApp)
      }
    },
    mounted(){
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
      .swiper-container{
        padding: 0 20px;
      }
      .swiper-button-prev{
        background-image: url("~images/left-arrow.svg");
        left: 30px;
        &.button-prev-app{
          left: 10px;
        }
      }
      .swiper-button-next{
        background-image: url("~images/right-arrow.svg");
        right: 30px;
        &.button-next-app{
          right:10px;
        }
      }
      .step-pc{
        img{
          width: 90%;
          margin-left: 5%;
          margin-top: 20px;
        }
        .step-title{
          width: 90%;
          margin: 0 auto;
        }
      }
      .step-app{
        text-align: center;
        img{
          width: 80%;
        }
        .step-title{
          width: 80%;
          margin-left: 10%;
        }
        .pc-model{
          margin-top: 10px;
        }
      }
      .step-title{
        font-size: 16px;
        color: #333333;
      }
      .login-swiper{
        .swiper-slide{
          width: 100%;
          &:nth-child(n+3){
            width: 33.3%;
          }
        }
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
        .swiper-container{
          padding: 0 10px;
        }
        .swiper-button-prev{
          left: 2px;
          &.button-prev-app{
            left: 0px;
          }
        }
        .swiper-button-next{
          right: 2px;
          &.button-next-app{
            right: 0px;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 799px) {
    .tutorial-detail{
      .detail-step{
        margin-top: 10px;
        padding: 10px 0px;
        .swiper-container{
          padding: 0;
        }
        .step-title{
          width: 95%;
        }
        img{
          width: 95%;
        }
        .swiper-button-prev{
          left: 0px;
          &.button-prev-app{
            left: 0px;
          }
        }
        .swiper-button-next{
          right: 0px;
          &.button-next-app{
            right: 0px;
          }
        }
        .step-app{
          img{
            width: 95%;
          }
          .step-title{
            width: 95%;
            margin-left: 2.5%;
            text-align: left;
            @include f(16px);
            margin-bottom: r(10);
          }
        }
      }
    }
  }
</style>