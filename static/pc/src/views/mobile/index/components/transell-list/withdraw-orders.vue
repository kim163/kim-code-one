<template>
  <div class="withdraw-orders">
    <m-header>{{$t('transactionHome.withdrawOrders')}}</m-header>

    <div class="withdraword-content">
        <div class="ordernum-group">
            <p class="order-text"> {{$t('transactionHome.orderNumber')}} </p>
            <p class="order-num"> {{DetailList.id}} </p>
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
          <input type="button" class="mobile-pubtn pubtn-white"  value="倒计时06:30等待买家付款" @click="publishSell()" />
       </div>
    </div>

  </div>
</template>
<script>
  import mHeader from "components/m-header";
  import { transaction } from 'api';

  export default {
    data() {
      return {
        DetailList: {},
        orderId: ''
      };
    },
    watch: {
      "$route"(val) {
        this.orderId = val.params.id;
        this.searchOrderDetail();
      }
    },
    props: {},
    methods: {
      searchOrderDetail(){
        let request={
          orderId: this.orderId
        }
        transaction.getOrderx(request).then(res => {
          console.log('订单详情记录:');
          console.log(res);
          this.DetailList = res.data;
        }).catch(error => {
          this.reset(res.message);
        });
      },

    },
    computed: {},
    created() {
      if (this.$route.params.id) {
        this.orderId = this.$route.params.id;
        this.searchOrderDetail();
      }
    },
    components: {
      mHeader
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mobile";

 .withdraw-orders{
   .withdraword-content{
     padding: r(10) 0 r(50);
     @include  f(15px);
     color: $font-color;
     .ordernum-group{
       background: $white;
       border-top: 1px solid #D8D8D8;
       border-bottom: 1px solid #D8D8D8;
       padding: r(5) r(10);
     }
     .form-group{
       height: r(44);
       line-height: r(44);
       background: $white;
       border-bottom: 1px solid #D8D8D8;
       padding: 0 r(10);
       label{
         display: block;
       }
       span{
         float: right;
         color: #787876;
       }
     }
     .bankinfo-group{
       background: $white;
       padding: r(6) r(10);
       p{
         line-height: r(26);
       }
     }
     .btn-group{
       margin: r(20) auto 0;
       width: 90%;
     }
   }

 }

</style>
