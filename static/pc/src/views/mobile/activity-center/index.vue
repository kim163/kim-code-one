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
    <div class="activity-list">

    </div>
  </div>
</template>

<script>
  import mHeadnav from 'components/m-headnav';
  export default {
    name: "activity-center",
    data(){
      return{
        activityList:[],
      }
    },
    components:{
      mHeadnav
    },
    methods:{

    },

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
</style>