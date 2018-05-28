<template>
  <div class="mtransact-form">
     <m-header>{{$t('transactionHome.msaleUet')}}</m-header>

     <div class="mtransact-content">
       <div class="form-group">
          <label> {{$t('transactionHome.tranUnitPrice')}} </label>
          <span></span>
       </div>
       <div class="form-group">
         <label> {{$t('postPend.balance')}} </label>
         <p class="balance"> <balance></balance>  </p>
       </div>
       <div class="form-group">
         <label> {{$t('transactionHome.quantityAvailSale')}} </label>
         <span></span>
       </div>
       <div class="form-group">
         <label> {{$t('transactionHome.tranAmount')}} </label>
         <span></span>
       </div>

     </div>

  </div>
</template>
<script>
  import mHeader from "components/m-header";
  import balance from 'components/balance';

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
      mHeader, balance
    }
  };
</script>
<style lang="scss">

</style>
