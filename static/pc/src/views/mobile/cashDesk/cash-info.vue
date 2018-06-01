<template>
  <div class="cash-info">
    <div class="info">
      <span class="title">{{$t('cash.orderNumber')}}</span>
      <span class="detail">DSJW92JF00IDFKSPKFM020409232</span>
    </div>
    <div class="info">
      <span class="title">{{$t('cash.amountsPayable')}}</span>
      <span class="detail">
            <span class="red">5000 UET</span> 折合 <span class="red">50 CNY</span>
          </span>
    </div>
    <div class="info">
      <span class="title">{{$t('cash.currentExchangeRate')}}</span>
      <span class="detail">100UET = 1CNY</span>
    </div>
    <div class="info">
      <span class="title">{{$t('cash.BusinessName')}}</span>
      <span class="detail">千赢国际</span>
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