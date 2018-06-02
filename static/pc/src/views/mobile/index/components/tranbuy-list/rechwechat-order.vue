<template>
  <div class="rechwechat-order">
     <m-header>{{$t('transactionHome.mBuyUet')}}</m-header>

     <div class="rechwechat-content">
        <div class="recharge-group">
           <h2>转账提示</h2>
           <p>由于微信转账到账确认程序的特殊性，需要根据您的转账金额来匹配确认是否到账，所以您必须在原基础上多转入系统给您分配的0.01-0.99元。</p>
           <h2>您需转账的金额为：</h2>
           <p>1+0.05(系统分配) = <span> 1.05 CNY </span></p>
           <h2>到账后将为您充值：<span> 105 UET </span></h2>
        </div>
        <div class="agree-group">
          <input type="checkbox" class="agree-checkbox">
          我已明白需要转账
          <span> 0.001 CNY</span>
        </div>
        <div class="btn-group">
          <input type="button" class="mobile-pubtn"  value="我已详细阅读转账提示，进入下一步" @click="nextStep"  />
          <input type="button" class="mobile-pubtn cancel-order"  value="我不想充值了，放弃该订单" @click="cancelOrder" v-if="DetailList.status =='45'"  />
        </div>
     </div>

  </div>
</template>
<script>
  import mHeader from "components/m-header";

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
      //  this.searchOrderDetail();
      }
    },
    props: {},
    methods: {
      nextStep(){
        this.$router.push({name: 'rechargeOrder',params:{ id: this.orderId}});
      },
      cancelOrder(){
        let request={
          orderId: this.orderId
        }
        transaction.cancelOrder(request).then(res => {
          console.log('cancel order: ', res);
          toast(res.message);
        }).catch(error => {
          this.reset(res.message);
        });
      }
    },
    computed: {},
    created() {
      if (this.$route.params.id) {
        this.orderId = this.$route.params.id;
      //  this.searchOrderDetail();
      }
    },
    components: {
      mHeader
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mobile";

  .rechwechat-order{
     .rechwechat-content{
        padding-bottom: r(50);
        .recharge-group{
          background: $white;
          padding: r(10);
          @include  f(14px);
          border-bottom: 1px solid #D8D8D8;
          h2{
            font-weight: normal;
            @include  f(15px);
            color: $font-color;
            line-height: r(30);
            span{
              color: #FF0000;
            }
          }
          p{
            color: #8F8F8F;
            line-height: r(22);
            margin: r(6) 0;
            span{
              color: #FF0000;
            }
          }
        }
       .agree-group{
         background: $white;
         line-height: r(44);
         padding: 0 r(10);
         margin: r(10) 0 r(20);
         @include  f(15px);
         color: $font-color;
         border-top: 1px solid #D8D8D8;
         border-bottom: 1px solid #D8D8D8;
         span{
           color: #FF0000;
         }
         .agree-checkbox{
           width: r(16);
           height: r(16);
           border: 1px solid #D8D8D8;
           vertical-align: middle;
           margin-right: r(5);
         }
       }
       .btn-group{
         padding:0 r(10);
       }
       .cancel-order{
         background: #E4E4E4;
         color: #787876;
         margin-top: r(10);
       }
     }

  }

</style>
