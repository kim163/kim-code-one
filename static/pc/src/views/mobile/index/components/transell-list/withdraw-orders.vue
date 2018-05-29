<template>
  <div class="withdraw-orders">
    <m-header>{{$t('transactionHome.withdrawOrders')}}</m-header>

    <div class="withdraword-content">
        <div class="ordernum-group">
            <p class="order-text"> {{$t('transactionHome.orderNumber')}} </p>
            <p class="order-num"></p>
            <p class="order-status"></p>
        </div>
       <div class="form-group">
          <label> {{$t('transactionHome.tranAmount')}} </label>
          <span></span>
       </div>
       <div class="form-group">
          <label> {{$t('transactionHome.tranNumber')}} </label>
          <span></span>
       </div>
       <div class="form-group">
          <label> {{$t('transactionHome.tranUnitPrice')}} </label>
          <span>&yen;  0.01</span>
       </div>
       <div class="form-group">
          <label> {{$t('transactionHome.buyer')}} </label>
          <span></span>
       </div>
       <div class="form-group">
          <label> {{$t('transactionHome.seller')}} </label>
          <span></span>
       </div>
       <div class="bankinfo-group">
         <p>{{$t('transactionHome.bankCategory')}} </p>
         <p>{{$t('transactionHome.accountName')}} </p>
         <p>{{$t('transactionHome.accCardNum')}} </p>
       </div>
       <div class="btn-group">
          <input type="button" class="mobile-pubtn"  :value="$t('transactionHome.order')" @click="publishSell()" />
       </div>
    </div>

  </div>
</template>
<script>
  import mHeader from "components/m-header";

  export default {
    data() {
      return {};
    },
    props: {},
    methods: {},
    computed: {},
    created() {
    },
    components: {
      mHeader
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mobile";

</style>
