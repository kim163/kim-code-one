<template>
  <div>
    <m-headnav>优惠活动</m-headnav>
    <div class="header">
      <div class="activity-balance">
        <div class="title">赠币活动剩余</div>
        <div>
          <span class="balance">239104</span> UET
        </div>
      </div>
      <div class="adv-marquee">
        <i class="iconfont"></i>
        <div class="msg-list">用户“我是周星驰”在快速交易中获得优惠券1000...</div>
      </div>
    </div>
    <div class="activity-list p-def">
      <div class="activity-item" v-for="(item,index) in 4" :key="index">
        <div class="title" :class="`item-${index}`" @click="showDetail(index + 1)">
          <div class="left">
            <div class="main-title">
              <span class="icon-hot"></span>
              每笔快速卖币赠币
            </div>
            <div class="des-title">赠币力度大</div>
          </div>
          <img class="icon" src="~images/activity-buy.png">
        </div>
        <transition name="">
          <div class="detail" v-show="showIndex === index + 1">
            <div class="content-info">每一笔快速卖币的成功交易，在限定时间内都可以获得赠币优惠!</div>
            <router-link class="link" :class="`link-${index}`" to="{name: 'aindex'}">买币</router-link>
          </div>
        </transition>
      </div>
    </div>
    <m-navbar></m-navbar>
  </div>
</template>

<script>
  import mHeadnav from 'components/m-headnav';
  import mNavbar from 'components/m-navbar';

  import { getAwardInfo } from 'api/activity'

  export default {
    name: "activity-center",
    data(){
      return{
        activityList:[],
        announcementList:[],
        showIndex:0
      }
    },
    components:{
      mHeadnav,
      mNavbar
    },
    methods:{
      getActivityList(){
        getAwardInfo().then(res => {
          console.log(res)
        })
      },
      showDetail(num){
        this.showIndex = this.showIndex === num ? 0 : num
      }
    },
    mounted(){
      this.getActivityList()
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";
  .header{
    width: 100%;
    .activity-balance{
      width: 100%;
      color: $white;
      background: #3573FA;
      @include f(18px);
      text-align: center;
      padding:r(30) 0;
      .title{
        margin-bottom: r(15);
      }
      .balance{
        @include f(30px);
      }
    }
    .adv-marquee{
      width: 100%;
      height: r(40);
      padding: 0 r(10);
      display: flex;
      align-items: center;
      .iconfont{
        width: r(14);
        height: r(16);
        background: url("~images/system-info.png") no-repeat;
        background-size: cover;
      }
      .msg-list{
        width: calc(100% - #{r(14)});
        height: 100%;
        @include f(14px);
        line-height: r(40);
        padding-left: r(10);
      }
    }
  }
  .activity-list{
    padding-bottom: r(49);
    .activity-item{
      width: 100%;
      margin-bottom: r(15);
      background: $white;
      .title{
        height: r(90);
        border-radius: r(6);
        display: flex;
        justify-content: space-around;
        align-items: center;
        &.item-0{
          background-image: linear-gradient(44deg, #FEE140 0%, #FCA96D 50%, #FCA96D 50%, #FA709A 100%);
        }
        &.item-1{
          background-image: linear-gradient(45deg, #69EDFF 0%, #AD7EFD 100%);
        }
        &.item-2{
          background-image: linear-gradient(47deg, #EE69FF 0%, #955AF9 100%);
        }
        &.item-3{
          background-image: linear-gradient(-236deg, #FB9F75 0%, #FA709A 100%);
        }
        .left{
          display: flex;
          height: 100%;
          justify-content: center;
          flex-direction: column;
        }
        .main-title{
          color: $white;
          @include f(18px);
        }
        .icon-hot{
          display: inline-block;
          width: r(14);
          height: r(16);
          background: url(~images/hot-activity.png);
          background-size: cover;
        }
        .des-title{
          color: $white;
          @include f(14px);
          padding-left: r(20);
        }
        .icon{
          width: 30%;
          height: 80%;
          /*background: url(~images/activity-buy.png);*/
          background-size: cover;
        }
      }
      .detail{
        padding: r(10);
      }
      .content-info{
        width: 100%;
        @include f(14px);
        line-height: r(22);
        color: #787876;
        position: relative;
        padding-bottom: r(10);
        &:after{
          content: '';
          display: block;
          width: 100%;
          height: 1px;
          background: #d8d8d8;
          position: absolute;
          bottom: 0;
        }
      }
      .link{
        width: 100%;
        height: r(40);
        @include f(16px);
        text-align: center;
        line-height: r(40);
        color: $white;
        margin-top: r(10);
        display: block;
        border-radius: r(3);
        &.link-0{
          background-image: linear-gradient(44deg, #FEE140 0%, #FCA96D 50%, #FCA96D 50%, #FA709A 100%);
        }
        &.link-1{
          background-image: linear-gradient(45deg, #69EDFF 0%, #AD7EFD 100%);
        }
        &.link-2{
          background-image: linear-gradient(47deg, #EE69FF 0%, #955AF9 100%);
        }
        &.link-3{
          background-image: linear-gradient(-236deg, #FB9F75 0%, #FA709A 100%);
        }
      }
    }
  }
</style>