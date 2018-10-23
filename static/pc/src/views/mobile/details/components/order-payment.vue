<template>
    <popup class="order-payment-main">
      <div class="container">
        <p class="tips-info">
          请您慎重选择付款方式，选择后不能更改！
        </p>
        <a href="javascript:void(0);" v-for="(item,i) in transferMethod" :key="i" @click="setPaytype(item.type)" v-show="item.show" :class="item.style">
          <i :class="['iconfont', item.icon]"></i>
          {{item.name}}
        </a>
      </div>
      <a class="close-btn-radius" @click="$emit('hideOrderPay')"></a>
    </popup>
</template>
<script>
  import Popup from 'components/common-popup';
  import {transaction} from 'api'

  export default {
    data() {
      return {
        transferMethod:[
          {
            name:"我用支付宝转账",
            type:1,
            icon:"icon-pay-type-ali",
            style:"alipay",
            show:true
          },
          {
            name:"我用微信转账",
            type:2,
            icon:"icon-pay-type-wechat",
            style:"wechat",
            show:true
          },
          {
            name:"我用银行卡转账",
            type:3,
            icon:"icon-pay-type-bank",
            style:"bank",
            show:true
          }
        ]
      };
    },
    props:{
      orderId:{
        type:String,
        default:""
      }
    },
    methods: {
      setPaytype(type){
        const selPlatPaymentInfo = {
          selPaymentType:type,
          payAmount:0
        };
        const data = {
          orderId: this.orderId,
          accountCashVo:{
            type: type
          }
        };
        const selectPay = this.bankCardInfo.find(item => {
          return item.type === type
        });
        if(selectPay){
          Object.assign(data.accountCashVo,{
            account: selectPay.account
          })
        }
        transaction.recommendedAmount(data).then(res => {
          console.log('实际支付金额',res);
          if(res.code === 10000){
            selPlatPaymentInfo.payAmount = res.data.key;
            this.$emit('hideOrderPay');
            this.$emit("openPayinfoPopup",selPlatPaymentInfo);
          }else {
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        });
      }
    },
    computed: {
      ...mapGetters([
        'bankCardInfo'
      ])
    },
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
      .container{
        width: 67%;
        background: #FFFFFF;
        padding: r(20);
        .tips-info{
          @include f(14px);
          color: #EC3A4E;
          line-height: r(26);
          margin-bottom: r(14);
        }
        a{
          display: block;
          height: r(40);
          line-height: r(40);
          border-radius: r(3);
          margin-bottom: r(20);
          padding-left: r(40);
          @include f(14px);
          color: #FFFFFF;
          i{
            @include f(18px);
            margin-right: r(10);
          }
          &:last-child{
            margin-bottom: 0;
          }
          &.alipay{
            background: #3573FA;
          }
          &.wechat{
            background: #24DB5A;
          }
          &.bank{
            background: #EC3A4E;
          }
        }
      }
  }
</style>
