<template>
  <div class="modal fade in" v-show="showPostpd">
    <div class="modal-dialog popup">
      <div type="button" class="close" @click="showPostpd=false">
        <i class="iconfont icon-close"></i>
      </div>

      <div class="pop-content">
        <h2 class="alert-title">发布挂单</h2>

      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        showPostpd: true
      }
    },
    methods: {},
    created() {
    },
    mounted() {
    },
    activated() {
    },
    components: {
    }
  };
</script>
<style lang="scss">

</style>
