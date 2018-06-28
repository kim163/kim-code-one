<template>
  <div class="recharge-order">
     <m-header>{{$t('transactionHome.mBuyUet')}}</m-header>

     <div class="recharge-content">
        <div class="recharge-item ordetail-group">
            <p><label> UET充值 </label> <span> {{DetailList.debitAmount}} UET</span> </p>
            <p><label> 订单编号 </label> {{DetailList.id}} </p>
            <p><label> 创建时间 </label> {{DetailList.createtime | Date('yyyy-MM-dd hh:mm:ss')}} </p>
            <p><label> 订单状态 </label>  </p>
        </div>
        <h2 class="recharge-title">我们的收款账户</h2>
        <div class="recharge-item accountrec-group">
           <p><label> 请使用XXX转账方式，转账至以下收款账户</label></p>
           <p><label> 收款银行 </label> </p>
           <p><label> 银行账号 </label> </p>
           <p><label> 收款人姓名</label> </p>
        </div>
        <h2 class="recharge-title">您的转账信息</h2>
        <div class="recharge-item transfer-group">
            <p><label> 转账方式 </label> </p>
            <p><label> 转账人姓名</label> </p>
            <p><label> 转账金额</label> </p>
            <p><label> 转账成功将充值</label>  </p>
        </div>
       <div class="tips-group">
         <span>温馨提示：</span>请务必转账 1.0 CNY，多转或少转都会延迟24小时以上到账。
       </div>
       <div class="btn-group">
         <input type="button" class="mobile-pubtn"  value="我已完成转账" @click="payCompleted"  />
         <input type="button" class="mobile-pubtn cancel-order"  value="我不想充值了，放弃该订单"  @click="cancelOrder" v-if="DetailList.status =='45'"  />
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
           toast(error.message);
         });
       },
      cancelOrder(){
        let request={
          orderId: this.orderId
        }
        transaction.cancelOrder(request).then(res => {
          console.log('cancel order: ', res);
          toast(res.message);
        }).catch(error => {
          toast(error.message);
        });
      },
      payCompleted(){
        let request={
          orderId: this.orderId
        }
        console.log('req pay complete:',request);
        transaction.payCompleted(request).then(res => {
           console.log('pay completed: ' , res);

        }).catch(error => {
          toast(error.message);
        });
      }

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

  .recharge-order{
     .recharge-content{
        padding-bottom: r(50);
        .recharge-item{
           background: $white;
           padding: r(12) r(10);
           @include  f(15px);
           color: #8F8F8F;
           p{
              line-height: r(31);
             span{
               color: #FF0000;
             }
           }
          label{
            display: inline-block;
            color: $font-color;
          }
        }
       .recharge-title{
          line-height: r(40);
          background: #F5F5F5;
          text-align: center;
          @include  f(15px);
          color: $font-color;
       }
       .tips-group{
          padding: r(10);
          line-height: r(30);
          @include  f(15px);
          color: #787876;
          span{
            color: $font-color;
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
