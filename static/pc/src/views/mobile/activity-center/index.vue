<template>
  <div>
    <m-headnav></m-headnav>
    <div class="header">
      <div class="activity-balance">
        <div class="title">赠币活动剩余</div>
        <div>
          <span class="balance">239104</span> UET
        </div>
      </div>
      <div class="marquee">
        <i class="iconfont"></i>
        <div class="msg-list"></div>
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
  }
</style>