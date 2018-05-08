<template>
  <div class="section tranred-headnav">
    <div class="container">
      <div class="row">
        <a href="/transaction" >{{$t('navbar.tradingHall')}}</a> &gt;
        <a href="/tranRecord" class="active">{{$t('transactionHome.orderRecord')}}</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    methods: {},
    created() {
    },
    mounted() {
    },
    activated() {
    },
    components: {
    }
  };
</script>
<style lang="scss">
.tranred-headnav{
  height: 56px;
  line-height: 56px;
  min-height: auto;
  border-bottom: 1px solid #D4D4D4;
  a{
    font-size: 16px;
    color: #333333;
    &.active{
      color: #5087ff;
    }
  }
}

</style>
