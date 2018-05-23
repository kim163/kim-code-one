<template>
  <header class="mobile-headnav">
    <a @click="doClick" class="back-link"><i class="iconfont icon-transaction"></i></a>
    <slot></slot>
  </header>
</template>
<script>
  export default {
    data() {
      return {};
    },
    props: {

    },
    methods: {
      doClick(){

      }
    },
    computed: {},
    created() {
    },
    components: {}
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin";

  header.mobile-headnav{
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
      padding-left: r(15);
    }
    .icon-transaction{
      @include f(20px)
    }
  }

</style>
