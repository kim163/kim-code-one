<template>
  <div class="order-payment-main">
    <popup class="payment-list">
      <div class="container">


      </div>
      <a class="close-btn-radius" @click=""></a>
    </popup>


  </div>
</template>
<script>
  import Popup from 'components/common-popup';

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
      Popup
    }
  };
</script>
<style lang="scss" scoped>
  @import "~assets/scss/mixin";

  .order-payment-main{
     .payment-list{
        .container{
          width: 70%;
          background: #FFFFFF;
          padding: r(20);
        }


     }


  }

</style>
