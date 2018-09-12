<template>
    <div class="popup_container">
        <div class="popup_content">
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
  @import "~assets/scss/mixin";
  .popup_container {
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    .popup_content {
      background-color: #fff;
      width: auto;
      height: auto;
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translate(-50%);
      padding: r(20);
    }
  }
</style>
