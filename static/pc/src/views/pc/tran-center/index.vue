<template>
  <div class="tran-main container">
    <div>
      订单通知功能模块 待开发
    </div>
    <activity></activity>
    <transition mode="out-in"
                enter-active-class="animated-quick fadeIn"
                leave-active-class="animated-quick fadeOut">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import Activity from './activity'

  export default {
    name: "tran-center",
    data() {
      return {}
    },
    components: {
      Activity
    }
  }
</script>

<style lang="scss" scoped>
  .tran-main {

  }
</style>