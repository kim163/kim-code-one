<template>
  <div>
    <div>订单通知</div>
    <div class="detail">
      <div class="detail-content">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "order-notice",
    data(){
      return{

      }
    },
  }
</script>

<style lang="scss" scoped>
  .detail{
    width: 1200px;
    background: repeating-linear-gradient(135deg, transparent, transparent 3px, #E75D53 3px, #E75D53 8px);
    animation: shine 1s infinite linear;
    overflow: hidden;
    .detail-content{
      height: 60px;
      margin: 1px;
      background-color: #fff;
    }
  }
  @keyframes shine {
    0% { background-position: -1px -1px;}
    100% { background-position: -12px -12px;}
  }
</style>