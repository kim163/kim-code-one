<template>
  <header class="mobile-header">
       交易大厅
  </header>

</template>
<script>
  export default {
    data() {
      return {};
    },
    props: {},
    methods: {},
    computed: {},
    created() {
    },
    components: {}
  };
</script>
<style lang="scss">
  @import "~assets/scss/mixin";

  header.mobile-header{
    height: r($header-hg);
    line-height: r($header-hg);
    background: $main-color;
    @include  f(18px);
    color: $white;
    text-align: center;
  }

</style>
