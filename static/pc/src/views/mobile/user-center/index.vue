<template>
  <div>
    <div class="panel-item">
      <router-link :to="{name:'mCardList'}" class="tool-item-href">
        <i class="iconfont icon-pay-bank"></i>{{$t('navbar.bindCard')}}
      </router-link>
      <router-link :to="{name:'mBindCard',params:{id:1}}" class="tool-item-href">
        <i class="iconfont icon-pay-alipay"></i>{{$t('navbar.bindAlipay')}}
      </router-link>
      <router-link :to="{name:'mBindCard',params:{id:2}}" class="tool-item-href">
        <i class="iconfont icon-pay-wechat"></i>{{$t('navbar.bindWeChat')}}
      </router-link>
    </div>
  </div>
</template>

<script>
  import MobileHeader from 'components/m-header'
  import {mapGetters} from 'vuex'
  export default {
    name: "user-center",
    data() {
      return {}
    },
    components:{
      MobileHeader,
    },
    computed:{
      ...mapGetters([
        'userData'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";
</style>