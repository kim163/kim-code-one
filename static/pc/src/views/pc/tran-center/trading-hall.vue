<template>
  <div class="trad-main">
    <div class="content">
      <div class="title">买币大厅</div>
      <trad-list></trad-list>
    </div>
    <div class="content">
      <div class="title">卖币大厅</div>
      <trad-list :is-sell="true"></trad-list>
    </div>
  </div>
</template>

<script>
  import TradList from './trading-list'
  export default {
    name: "trading-hall",
    components:{
      TradList
    }
  }
</script>

<style lang="scss" scoped>
  .trad-main{
    padding: 30px 40px 40px;
    display: flex;
    justify-content: space-between;
    .content{
      width: 540px;
      .title{
        font-size: 24px;
        margin-bottom: 20px;
      }
    }
  }
</style>