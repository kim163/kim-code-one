<template>
  <header class="mobile-header">
    <a @click="doClick" class="back-link"><i class="iconfont icon-left-arrow"></i></a>
    <slot></slot>
  </header>
</template>
<script>
  export default {
    data() {
      return {};
    },
    props: {
      back: {
        type: Function
      }
    },
    methods: {
      doClick(){
        if (this.back && typeof this.back == 'function') {
          this.back();
        } else {
          this.$router.back();
        }
      }
    },
    computed: {},
    created() {
    },
    components: {}
  };
</script>
<style lang="scss">
  @import "~assets/scss/mobile";

  header.mobile-header{
    position: relative;
    z-index: 99;
    height: r($header-hg);
    line-height: r($header-hg);
    background: $main-color;
    @include  f(18px);
    color: $white;
    text-align: center;
    .back-link{
      position: absolute;
      height: 100%;
      left:0;
      width:r(66);
      top:50%;
      transform:translateY(-50%);
      text-align: left;
      padding-left: r(8);
    }
    .icon-left-arrow{
      @include f(18px)
    }
  }

</style>
