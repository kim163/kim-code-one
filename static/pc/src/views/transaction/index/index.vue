<template>
  <div class="transaction-main">
    <nav-menu></nav-menu>
    <div class="tranheader-part"></div>

    <v-footer ></v-footer>
  </div>
</template>
<script>
  import navMenu from 'components/nav'
  import vFooter from 'components/footer'

  export default {
    data() {
      return {
      };
    },
    methods: {},
    created() {
    },
    mounted() {
    },
    activated() {
    },
    deactivated(){
    },
    beforeDestroy(){
    },
    components: {
      navMenu, vFooter
    }
  };
</script>
<style lang="scss">
  .transaction-main {
     .tranheader-part{
        height: 100px;
        background: #5087FF;
     }


  }
</style>
