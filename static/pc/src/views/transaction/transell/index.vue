<template>
  <div class="transell-main">
    <nav-menu></nav-menu>
    <tran-headnav></tran-headnav>
    <transact-menu></transact-menu>

    <div class="section transaction-content">
      <div class="container">
        <div class="row">
          <div class="col-18 fl">
             <transell-list></transell-list>
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
  import tranHeadnav from 'components/master/tran-headnav';
  import transactMenu from 'components/transact-menu';
  import transellList from './components/transell-list';

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
      navMenu, vFooter, tranHeadnav, transactMenu, transellList
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
