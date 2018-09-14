<template>
  <div class="detail-title cfx">
    <span v-if="isCredit" class="title-btn btn-primary">买入</span>
    <span v-else-if="isDebit" class="title-btn btn-sell">卖出</span>
    <span v-else class="title-btn btn-primary">申诉订单</span>
    <span class="order-num">
              订单号：   {{orderId}}
            </span>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    props: {
      isCredit:{
        type:Boolean,
        default:false
      },
      isDebit:{
        type:Boolean,
        default:false
      },
      orderId:{
        type:String,
        default:""
      }
    },
    methods: {},
    computed: {},
    created() {
    },
    components: {}
  };
</script>
<style lang="scss" scoped>
  .detail-title {
    height: 100px;
    line-height: 100px;
    border-bottom: 1px solid #d4d4d4;
    font-size: 16px;
    padding: 30px 42px 0;
    .title-btn {
      float: left;
      height: 40px;
      line-height: 40px;
      display: block;
      width: 9%;
      color: #fff;
      text-align: center;
      background: #5087ff;
    }
    .btn-sell {
      background: orange;
    }
    .order-num{
      float: left;
      width: 91%;
      height: 40px;
      line-height: 40px;
      background: #FFF8F7;
      color: #333333;
      padding-left: 20px;
      display: block;
    }
  }
</style>
