<template>
  <ul>
    <li v-for="(item,i) in 3" :key="i" class="order-item">
      <div class="order-info">
        <div class="text-left">{{item.createtime | Date('yyyy-MM-dd hh:mm:ss')}}</div>
        <div class="text-right">
          <!--<span class="c-blue" v-show="item.type == 12">{{$t('postPend.buyer')}}</span>-->
          <!--<span class="c-red" v-show="item.type == 11">{{$t('postPend.seller')}}</span>-->
          <span class="c-blue">{{$t('postPend.buyer')}}</span>
        </div>
      </div>
      <div class="order-info">
        <div class="text-left">{{$t('table.quantity')}} 30000 UET</div>
        <div class="text-right">单价 0.001 CNY</div>
      </div>
      <div class="order-info">
        <div class="text-left">已完成 89.23%</div>
        <div class="text-right">
          <span class="btn drop-off" v-if="type === 'processing'">下架</span>
          <div v-else>
            <span class="btn restored">恢复上架</span>
            <span class="btn delete">删除</span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  import Scroll from 'vue-slim-better-scroll'
  import {
    getOrderxPendingPage,
    getOrderxPendingUnshelve,
    putToDown
  } from 'api/transaction'
  export default {
    name: "my-pending-list",
    data() {
      return {
        orderList:[],

      }
    },
    props:{
      type:{
        type:String,
        default:'processing'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";
  .order-item{
    width: 100%;
    height: r(127);
    background: #FFFFFF;
    border-top: 1px solid #D8D8D8;
    border-bottom: 1px solid #D8D8D8;
    margin-bottom: r(10);
  }
  .order-info{
    display: flex;
    justify-content: space-between;
    padding: 0 r(10);
    margin-top: r(15);
    @include f(16px);
    .text-right{
      .c-blue{
        color: #4982FF;
      }
      .c-red{
        color: #FF0000;
      }
    }
  }
  .btn{
    display: inline-block;
    width: r(70);
    height: r(24);
    text-align: center;
    line-height: r(24);
    @include f(15px);
    border-radius: 2px;
    color: $white;
    &.drop-off{
      background: #4982FF;
    }
    &.restored{
      background: #9D9D9D;
    }
    &.delete{
      background: #86A5F8;
    }
  }
</style>