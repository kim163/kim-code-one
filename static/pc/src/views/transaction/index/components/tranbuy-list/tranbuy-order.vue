<template>
     <div class="tran-contpart">
          <span class="s s1">
             <p>数量 {{item.amount}} UET</p>
             <p>单价 0.01 元</p>
          </span>
          <span  class="s s2">总值 {{item.amount}}UET</span>
          <span class="input-box">
             <input type="text" v-model="buyAmountUet" :key="item.id"> UET
          </span>
          <span class="input-box">
             <input type="text" :value="buyAmountCny" readonly>CNY
          </span>
          <span class="btns">
             <span class="btn btn-primary" @click="placeAnOrder(item)">下单</span>
             <span class="btn btn-cancel gray">取消</span>
          </span>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        buyAmountUet:'',
      };
    },
    props: {},
    methods: {},
    computed: {
      buyAmountCny(){
        return (Number(this.buyAmountUet) *0.01).toFixed(2);
      }
    },
    created() {
    },
    components: {}
  };
</script>
<style lang="scss">

</style>
