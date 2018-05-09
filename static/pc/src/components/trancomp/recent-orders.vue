<template>
  <div class="recent-orders">
      <h3 class="title"> {{$t('transactionHome.recentOrders')}} </h3>

  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    props: {},
    methods: {},
    computed: {},
    created() {
    },
    components: {}
  };
</script>
<style lang="scss">
.recent-orders{
  .title{
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #ffffff;
    background: #5087FF;
    padding: 0 19px;
  }

}

</style>
