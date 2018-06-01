<template>
  <div class="cash-info">
    <div class="info">
      <span class="title">{{$t('cash.orderNumber')}}</span>
      <span class="detail">{{data.jiuanOrderid}}</span>
    </div>
    <div class="info">
      <span class="title">{{$t('cash.amountsPayable')}}</span>
      <span class="detail">
            <span class="red">{{data.amount}} {{data.assetCode}}</span> 折合 <span class="red">{{formatCny(data.amount)}} CNY</span>
          </span>
    </div>
    <div class="info">
      <span class="title">{{$t('cash.currentExchangeRate')}}</span>
      <span class="detail">100{{data.assetCode}} = {{formatCny(100)}}CNY</span>
    </div>
    <div class="info">
      <span class="title">{{$t('cash.BusinessName')}}</span>
      <span class="detail">{{data.businessName}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "cash-info",
    data(){
      return{

      }
    },
    props:{
      data:{
        type:Object,
        default:{}
      }
    },
    mounted:{

    },
    methods:{
      formatCny(data){
        return data * this.data.exchangeRate
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .cash-info{
    width: 100%;
    .info{
      padding-left: r(10);
      @include f(15px);
      color: #333333;
      margin-top: r(15);
      .detail{
        color: #8F8F8F;
        margin-left: r(10);
      }
    }
  }
</style>