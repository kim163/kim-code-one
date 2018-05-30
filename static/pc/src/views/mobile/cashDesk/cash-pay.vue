<template>
  <div class="pay-main">
    <div class="amout-info">
      <div class="title">UET钱包支付</div>
      <div class="amount-detail">
        <div class="blance">{{$t('cash.balance')}}：<balance></balance></div>
        <div class="amount-status" :class="amountStatus === 0 ? 'green' : 'red'">
          {{ amountStatus === 0 ? $t('cash.enough') : $t('cash.notEnough')}}
        </div>
      </div>
    </div>
    <div class="pay-password">
      <div class="title">{{$t('cash.payPassWord')}}:</div>
      <input class="input-password" v-model="payPassword" :placeholder="$t('cash.psdInputPlaceholder')"/>
      <div class="pay-btn">{{$t('cash.confirmPayment')}}</div>
      <router-link :to="{name: 'mIndex'}" class="go-tran">{{$t('cash.goTran')}}</router-link>
    </div>
  </div>
</template>

<script>
  import Balance from 'components/balance'
  export default {
    name: "cash-pay",
    data(){
      return{
        amountStatus:0, //余额状态 0是充足 1是不足
        payPassword:'',
      }
    },
    components:{
      Balance
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .pay-main{
    width: 100%;
    background: $white;
    .amout-info{
      padding: r(20);
      @include f(15px);
      border-bottom: 1px solid #D8D8D8;

      .amount-detail{
        margin-top: r(15);
        display: flex;
        justify-content: space-between;
      }
      .blance{
        color: #787876;
      }
    }
    .pay-password{
      padding: r(20);
      @include f(15px);
      .input-password{
        width: 100%;
        height: r(40);
        background: #FFFFFF;
        border: 1px solid #DEDEDE;
        margin-top: r(10);
        padding-left: r(10);
      }
      .pay-btn,.go-tran{
        width: 100%;
        height: r(40);
        background: #4982FF;
        text-align: center;
        line-height: r(40);
        color: $white;
        @include f(18px);
        margin-top: r(20);
        &.disable{
          background: #E4E4E4;
          color: #787876;
        }
      }
      .go-tran{
        display: block;
        background: #86A5F8;
      }
    }
    .title{
      color: #333333;
    }
    .green{
      color: #14CA39;
    }
    .red{
      color: #FF0000;
    }
  }
</style>