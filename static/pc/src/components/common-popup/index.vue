<template>
    <div class="popup-container">
        <div class="popup-content">
          <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";
  .popup-container {
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .popup-content {
      width: 100%;
      animation: fadeInDown .5s;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
</style>
