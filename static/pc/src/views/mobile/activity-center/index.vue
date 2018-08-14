<template>
  <div>
    <m-headnav>优惠活动</m-headnav>
    <div class="header">
      <div class="activity-balance">
        <div class="title">赠币活动剩余</div>
        <div>
          <span class="balance">{{coinBalance}}</span> UET
        </div>
      </div>
      <div class="adv-marquee">
        <i class="iconfont"></i>
        <div class="msg-list" ref="msgList">
          <marquee :speed="40000" :scroll-width="scrollWidth" v-if="awardLiveInfoList.length" :content="awardLiveInfoList">
            <template slot-scope="props">
              <a v-for="(item, index) in props.content" :key="index">
                {{item.title}}
                <span class="m-LR-sm" v-if="index <  props.content.length -1">/</span>
              </a>
            </template>
          </marquee>
        </div>
      </div>
    </div>
    <div class="activity-list p-def">
      <div class="activity-item" v-for="(item,index) in activityList" :key="index">
        <div class="title" :class="`item-${index}`" @click="showDetail(index + 1)">
          <div class="left">
            <div class="main-title">
              <span class="icon-hot"></span>
              {{item.title}}
            </div>
            <div class="des-title">{{item.subtitle}}</div>
          </div>
          <img class="icon" :src="item.iconUrl">
        </div>
        <transition name="panel">
          <div class="detail" v-show="showIndex === index + 1">
            <div class="content-info" v-for="(info,i) in item.contentList" :key="i">{{info}}</div>
            <router-link class="link" :class="`link-${index}`"
                         v-if="item.schemeUrl" :to="checkLink(item.type)">买币</router-link>
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
  import Marquee from 'components/marquee'
  import { getAwardInfo } from 'api/activity'

  export default {
    name: "activity-center",
    data(){
      return{
        activityList:[],
        awardLiveInfoList:[],
        showIndex:0,
        coinBalance:0,
      }
    },
    components:{
      mHeadnav,
      mNavbar,
      Marquee,
    },
    computed:{
      scrollWidth(){
        return this.$refs.msgList.offsetWidth
      }
    },
    methods:{
      getActivityList(){
        getAwardInfo({}).then(res => {
          console.log(res)
          if(res.code === 10000){
            this.coinBalance = res.data.coinBalance
            this.activityList = [...res.data.awardList]
            this.awardLiveInfoList = [...res.data.awardLiveInfoList]
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      showDetail(num){
        this.showIndex = this.showIndex === num ? 0 : num
      },
      checkLink(type){
        let routerTo = ''
        switch (type){
          case 'sellCoins':
            routerTo = {name:'mPendingBuy',query:{mode:3}}
            break
          case 'buyCoins':
            routerTo = {name:'mPendingBuy'}
            break
          default:
            break
        }
        return routerTo
      }
    },
    mounted(){
      this.getActivityList()
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";
  .panel-enter{
    opacity: 0;
  }
  .panel-enter-active{
    transition: all .5s;
  }
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
      &:nth-child(odd){
        animation: fadeInLeft .5s forwards;
      }
      &:nth-child(even){
        animation: fadeInRight .5s forwards;
      }
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
        padding: r(10) 0;
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