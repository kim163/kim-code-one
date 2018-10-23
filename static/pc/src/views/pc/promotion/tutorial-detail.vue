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
        <swiper-slide v-for="(item,index) in detail.pc" :key="index">
          <div class="step-title">{{item.title}}</div>
          <img :src="item.img"/>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <swiper :options="swiperOptionH5" v-show="tabIndex === 1">
        <swiper-slide v-for="(item,index) in detail.h5" :key="index">
          <div class="step-title">{{item.title}}</div>
          <img :src="item.img"/>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <swiper :options="swiperOptionH5" v-show="tabIndex === 2">
        <swiper-slide v-for="(item,index) in detail.app" :key="index">
          <div class="step-title">{{item.title}}</div>
          <img :src="item.img"/>
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
          spaceBetween: 30,
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

<style lang="scss" scoped>
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
      padding: 30px 90px;
      background: #F3F7FF;
      border-radius: 5px;
    }
  }
</style>