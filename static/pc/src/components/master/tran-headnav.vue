<template>
  <div class="section tranhome-nav">
    <div class="container">
      <div class="row">
        <a href="/transaction" class="active">{{$t('navbar.tradingHall')}}</a>
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
.tranhome-nav{
  height: 56px;
  line-height: 56px;
  min-height: auto;
  border-bottom: 1px solid #D4D4D4;
  a{
    font-size: 16px;
    color: #333333;
    &.active, &:hover{
      color: #5087ff;
    }
  }
}

</style>
