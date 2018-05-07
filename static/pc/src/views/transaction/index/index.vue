<template>
  <div class="transaction-main">
    <nav-menu></nav-menu>
    <div class="tranheader-part"></div>
    <head-nav></head-nav>
    <transact-menu v-if="islogin"></transact-menu>
    <guide-page v-if="!islogin"></guide-page>

    <div class="section " v-if="islogin">
      <div class="container">
        <div class="row">
          <div class="col-18 fl">
               <tranbuy-list></tranbuy-list>
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
  import guidePage from './components/guide-page';
  import tranbuyList from './components/tranbuy-list';

  import {mapGetters,mapActions,mapMutations} from 'vuex'

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
      ...mapGetters([ "islogin" ])
    },
    components: {
      navMenu, vFooter, headNav, transactMenu, guidePage, tranbuyList
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
