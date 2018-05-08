<template>
  <div class="transell-main">
    <nav-menu></nav-menu>
    <head-nav></head-nav>
    <transact-menu></transact-menu>

    <div class="section transaction-content">
      <div class="container">
        <div class="row">
          <div class="col-18 fl">

          </div>

          <div class="col-19 fr">

          </div>
        </div>
      </div>
    </div>

    <v-footer ></v-footer>
  </div>
</template>
<script>
  import navMenu from 'components/nav';
  import vFooter from 'components/footer';
  import headNav from './components/head-nav';
  import transactMenu from 'components/transact-menu';

  export default {
    data() {
      return {

      };
    },
    methods: {

    },
    created() {

    },
    watch: {

    },
    computed: {

    },
    components: {
      navMenu, vFooter, headNav, transactMenu
    }
  };
</script>
<style lang="scss">
  .transell-main{
     padding-top: 100px;
     .transaction-content{
       margin-bottom: 30px;
       .col-18,.col-19{
         margin: 0;
       }

     }

  }
</style>
