<template>
  <div class="withdraw-orders">
    <m-header>{{$t('transactionHome.withdrawOrders')}}</m-header>

    <div class="withdraword-content">
        <div class="ordernum-group">
            <p class="order-text"> {{$t('transactionHome.orderNumber')}} </p>
            <p class="order-num"> {{DetailList.id}} </p>
            <p class="order-status txt-right red">
              <span v-if="DetailList.status == 41">订单已发布...</span>
              <span v-else-if="DetailList.status == 43">订单下架...</span>
              <span v-else-if="DetailList.status == 45">下单付款中...</span>
              <span v-else-if="DetailList.status == 47">订单支付发币中...</span>
              <span v-else-if="DetailList.status == 61">申诉锁定...</span>
              <span v-else>
                {{DetailList.status}}
              </span>
            </p>
        </div>
       <div class="form-group cfx">
          <label> {{$t('transactionHome.tranAmount')}} </label>
          <span>{{DetailList.debitAmountTwin}} CNY</span>
       </div>
       <div class="form-group">
          <label> {{$t('transactionHome.tranNumber')}} </label>
          <span>{{DetailList.debitAmount}} UET</span>
       </div>
       <div class="form-group">
          <label> {{$t('transactionHome.tranUnitPrice')}} </label>
          <span>0.01 CNY</span>
       </div>
       <div class="form-group">
          <label> {{$t('transactionHome.buyer')}} </label>
          <span>{{DetailList.creditName}}</span>
       </div>
       <div class="form-group">
          <label> {{$t('transactionHome.seller')}} </label>
          <span>{{DetailList.debitName}}</span>
       </div>
       <div class="bankinfo-group">
         <ul class="details-ul pay-detail">
           <li>
             <span class="l-title">{{$t('transactionHome.bankCategory')}} : </span>
             <div class="fr0">
               <span v-if="DetailList.debitAccountMerchantTwin == '支付宝'"><i class="iconfont icon-pay-alipay"></i></span>
               <span v-else-if="DetailList.debitAccountMerchantTwin == '微信'"><i class="iconfont icon-pay-wechat"></i></span>
               <span v-else><i class="iconfont icon-pay-bank"></i></span>
               {{DetailList.debitAccountMerchantTwin}}
             </div>
           </li>
           <li>
             <span class="l-title">{{$t('transactionHome.accountName')}} : </span>
             <div class="fr0">
               {{DetailList.debitAccountNameTwin}}
             </div>
             <a href="javascript:void(0);" class="copy-btn" @click="copystr(DetailList.debitAccountNameTwin)" >{{$t('transactionHome.copyBtn')}}</a>
           </li>
           <li>
             <span class="l-title">{{$t('transactionHome.accCardNum')}} : </span>
             <div class="fr0">
               <span class="">{{DetailList.debitAccountTwin}}</span>
             </div>
             <a href="javascript:void(0);" class="copy-btn" @click="copystr(DetailList.debitAccountTwin)" >{{$t('transactionHome.copyBtn')}}</a>
           </li>
         </ul>
       </div>
       <div class="btn-group">
         <a v-if="DetailList.status == 41" href="javascript:void(0);" class="mobile-pubtn pubtn-white">订单已发布</a>
         <a v-else-if="DetailList.status == 43" href="javascript:void(0);" class="mobile-pubtn pubtn-white">订单下架</a>
         <a v-else-if="DetailList.status == 45" href="javascript:void(0);" class="mobile-pubtn pubtn-white">
           倒计时
           <countdown :end-time="endTime" @callBack="countDownEnd"></countdown>
           等待买家付款
         </a>
         <a v-else-if="DetailList.status == 47" href="javascript:void(0);" class="mobile-pubtn pubtn-white">订单支付发币中</a>
         <a v-else-if="DetailList.status == 61" href="javascript:void(0);" class="mobile-pubtn pubtn-white">申诉锁定</a>
         <a v-else href="javascript:void(0);" class="mobile-pubtn pubtn-white">
                {{DetailList.status}}
         </a>
       </div>
    </div>

  </div>
</template>
<script>
  import mHeader from "components/m-header";
  import { transaction } from 'api';
  import countdown from "components/countdown";

  export default {
    data() {
      return {
        DetailList: {},
        orderId: '',
        endTime: 600000
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
          if(res.data.createtime + 600000 < new Date().getTime() ){
            this.endTime = 0;
          }else{
            this.endTime = res.data.createtime + 600000 - new Date().getTime();
          }
        }).catch(error => {
          this.reset(res.message);
        });
      },

      countDownEnd(){
        console.log('倒计时已完毕');
      },

      copystr(text) {
        text.$copy();
        toast(this.$t('transactionHome.successCopy'));
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
      mHeader, countdown
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
     .red{
       color: #FF0000;
     }
     .ordernum-group{
       background: $white;
       border-top: 1px solid #D8D8D8;
       border-bottom: 1px solid #D8D8D8;
       padding: r(6) r(10);
       p{
         line-height: r(28);
       }
     }
     .form-group{
       height: r(44);
       line-height: r(44);
       background: $white;
       border-bottom: 1px solid #D8D8D8;
       padding: 0 r(10);
       label{
         display: inline-block;
       }
       span{
         float: right;
         color: #787876;
       }
     }
     .bankinfo-group{
       .details-ul{
         border-bottom:1px solid #d8d8d8;
         margin-bottom:r(10);
         li{
           background: #fff;
           min-height:r(35);
           padding:r(8) r(15);
           color:#8f8f8f;
           overflow:hidden;
           &.heightauto{
             height:180px;
           }
           .qrcode-img{
             width:130px;
           }
           .fr0{
             display:inline-block;
             padding:0 0 0 r(10);
           }
           .qrcode-tips{
             display:inline-block;
             width:r(99);
             word-break: break-all;
             font-size:r(12);
           }
           .l-title{
             display:inline-block;
             float:left;
             color:#333;
           }
           .copy-btn{
             float: right;
             color: #4982FF;
             padding:0 r(10);
           }
         }
       }
       .iconfont{
         @include  f(16px);
       }
       .icon-pay-bank{
         color: #B764FE;
       }
       .icon-pay-wechat{
         color:#14CA39;
       }
       .icon-pay-alipay{
         color:#03A9F3;
       }
     }
     .btn-group{
       margin: r(20) auto 0;
       width: 90%;
     }
   }

 }

</style>
