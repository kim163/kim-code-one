<template>
  <transition name="toolSlideRight">
    <div class="payment-info-popup">
      <div class="container">
         <div class="header white-bg">
           <div class="trade-time">
             <img src="~images/order_time.png" alt="" class="order_time">
             <span>倒计时</span>
             <count-down v-if="DetailList.status !='61'"
                         :end-time="DetailList.intervalTime-DetailList.elapsedTime<=0 ? 0 : DetailList.intervalTime-DetailList.elapsedTime"
                         @callBack="countDownEnd" class="count_time">
             </count-down>
           </div>
           <div class="paymethod cfx">
             <label class="fl">您选择了</label>
             <p class="fl">
               <span v-if="selPlatPaymentInfo.selPaymentType==1"><i class="iconfont icon-pay-type-ali"></i> 支付宝转账</span>
               <span v-if="selPlatPaymentInfo.selPaymentType==2"><i class="iconfont icon-pay-type-wechat"></i> 微信转账</span>
               <span v-if="selPlatPaymentInfo.selPaymentType==3"><i class="iconfont icon-pay-type-bank"></i> 银行卡转账</span>
             </p>
           </div>
           <div class="money cfx">
             <label class="fl">应付金额</label>
             <p class="fl">&yen;
                <animated-integer :value="Number(selPlatPaymentInfo.payAmount)"></animated-integer>
             </p>
           </div>
         </div>
        <div class="split-point">
          <img src="~images/order-dashedbg.png" alt=""/>
        </div>
        <div class="payment-details white-bg">
            <div class="pay-tips" v-if="selPlatPaymentInfo.selPaymentType==1">
              请打开您的支付宝，选择转账到银行卡，输入以下信息进行转账：
            </div>
            <div class="pay-tips" v-if="selPlatPaymentInfo.selPaymentType==2">
              请打开您的微信，进入微信钱包，选择“收付款”，选择“转账到银行卡”功能，并输入以下信息进行转账：
            </div>
            <div class="pay-tips" v-if="selPlatPaymentInfo.selPaymentType==3">
              请打开您的网上银行，进入转账页面，并输入以下信息进行转账：
            </div>

            <div class="bank-card-infor">
               <ul>
                 <li>
                   <span class="l-title">卡号：</span>
                   <div class="fr0">
                     {{DetailList.debitAccountTwin}}
                     <a href="javascript:void(0);" class="copy-btn" :data-clipboard-text="DetailList.debitAccountTwin"
                        @click="$emit('copy')">{{$t('transactionHome.copyBtn')}}</a>
                   </div>
                 </li>
                 <li>
                   <span class="l-title">姓名：</span>
                   <div class="fr0">{{DetailList.debitAccountNameTwin}}
                     <a href="javascript:void(0);" class="copy-btn" :data-clipboard-text="DetailList.debitAccountNameTwin"
                        @click="$emit('copy')">{{$t('transactionHome.copyBtn')}}</a>
                   </div>
                 </li>
                 <li>
                   <span class="l-title">银行：</span>
                   <div class="fr0">
                     {{DetailList.debitAccountMerchantTwin}}
                     <a href="javascript:void(0);" class="copy-btn" :data-clipboard-text="DetailList.debitAccountMerchantTwin"
                        @click="$emit('copy')">{{$t('transactionHome.copyBtn')}}</a>
                   </div>
                 </li>
                 <li class="heightauto"
                     v-if="DetailList.debitAccountMerchantTwin == '支付宝' || DetailList.debitAccountMerchantTwin == '微信'">
                   <span class="l-title">收款二维码 : </span>
                   <div class="qrcode-box">
                     <img src="~images/qrcode.jpg" :src="DetailList.debitAccountQrCodeUrlTwin" class="qrcode-img"/>
                     <span class="qrcode-tips copy-btn"></span>
                   </div>
                 </li>
                 <li>
                   <span class="l-title">金额：</span>
                   <div class="fr0">
                     &yen; {{selPlatPaymentInfo.payAmount}}
                     <a href="javascript:void(0);" class="copy-btn" :data-clipboard-text="selPlatPaymentInfo.payAmount"
                        @click="$emit('copy')">{{$t('transactionHome.copyBtn')}}</a>
                   </div>
                 </li>
               </ul>
            </div>

            <div class="paybtn-groups">
              <input type="button" class="btn btn-block btn-primary" @click="$emit('confirmPayOrder')" value="付款完成，点击这里">
            </div>

            <div class="pay-warning">
              请在倒计时内完成付款，并保证转账的金额与应付金额一致，否则该笔订单将会匹配失败。
            </div>
        </div>
      </div>
      <a class="close-btn-radius" @click="$emit('hideOrderPayinfo')"></a>
    </div>
  </transition>
</template>
<script>
  import CountDown from 'components/countdown';
  import AnimatedInteger from 'components/animated-integer';

  export default {
    data() {
      return {};
    },
    props: {
      DetailList:{
        type: Object,
        default:{}
      },
      selPlatPaymentInfo:{
        type: Object,
        default:{}
      }
    },
    methods: {
      countDownEnd(){

      }
    },
    computed: {},
    created() {
    },
    components: {
      CountDown,
      AnimatedInteger
    }
  };
</script>
<style lang="scss" scoped>
  @import "~assets/scss/mixin";

  .payment-info-popup{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    background: #4A90E2;
    padding: r(34) r(0);
    overflow-y: auto;
    .container{
       width: 80%;
       border-radius: r(4);
       .header{
          padding: r(10) r(20) r(11);
          border-top-left-radius: r(4);
          border-top-right-radius: r(4);
          @include f(14px);
          color: #333333;
          .trade-time{
            line-height: r(56);
            text-align: center;
            @include f(20px);
            color: #EC3A4E;
            .order_time{
               height: r(20);
            }
          }
          .paymethod{
             line-height: r(50);
             .iconfont{
               @include f(24px);
               margin-right: r(5);
               &.icon-pay-type-ali{
                 color: #3988FF;
               }
               &.icon-pay-type-wechat{
                 color: #24DB5A;
               }
               &.icon-pay-type-bank{
                 color: #EC3A4E;
               }
             }
          }
          .money{
             line-height: r(40);
             p{
               @include f(30px);
               color: #EC3A4E;
             }
          }
         .paymethod,.money{
           label{
             width:28%;
           }
           p{
             width: 72%;
             text-align: center;
           }
         }
       }
      .white-bg{
        background: #FFFFFF;
      }
      .payment-details{
         padding: r(9) r(20) r(18);
         border-bottom-right-radius:r(4);
         border-bottom-left-radius:r(4);
      }
      .split-point{
         img{
           width: 100%;
         }
      }
      .pay-tips{
         @include f(14px);
         color: #333333;
         line-height: r(22);
         margin-bottom: r(21);
       }
      .bank-card-infor{
        background: #F6F9FF;
        border: 1px solid #E0E8F9;
        border-radius: r(4);
        padding: r(8) r(0) r(4) r(10);
        @include f(14px);
        color: #333333;
        margin-bottom: r(15);
        li{
          line-height: r(30);
          display: flex;
          flex-wrap: wrap;
          justify-content: normal;
          position: relative;
          .fr0{
            max-width: 65%;
            word-break: break-all;
          }
          .copy-btn{
            position: absolute;
            top: 0;
            right: 0;
            color: #3573FA;
            padding: 0 r(10);
          }
        }
      }
      .paybtn-groups{
        margin-bottom: r(17);
        .btn-primary{
           display: block;
           width: 100%;
           height: r(40);
           line-height: r(40);
           background: #3573FA;
           border-radius: r(4);
           text-align: center;
           @include f(16px);
           color: #FFFFFF;
           border: none;
        }
      }
      .pay-warning{
        @include f(14px);
        color: #EC3A4E;
        line-height: r(22);
      }
    }
    .close-btn-radius{
      display: block;
      margin: r(10) auto 0;
    }
  }
</style>
