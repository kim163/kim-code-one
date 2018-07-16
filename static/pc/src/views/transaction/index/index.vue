<template>
  <div class="transaction-main">
    <nav-menu></nav-menu>
    <bread-crumbs :bread-list="breadList"></bread-crumbs>
    <transact-menu v-if="islogin"></transact-menu>
    <guide-page v-if="!islogin"></guide-page>

    <div class="section transaction-content" v-if="islogin">
      <div class="container min-width">
        <div class="row">
          <div class="col-18 fl">
               <tranbuy-list></tranbuy-list>
          </div>

          <div class="col-19 fr">
            <h1 class="asset-title"> {{$t('transactionHome.assetManage')}} </h1>
            <user-walletass></user-walletass>
            <recent-orders></recent-orders>
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
  import BreadCrumbs from 'components/bread-crumbs'
  import transactMenu from 'components/transact-menu';
  import guidePage from './components/guide-page';
  import tranbuyList from './components/tranbuy-list';

  import userWalletass from 'components/trancomp/user-walletass';
  import recentOrders from 'components/trancomp/recent-orders';

  import {mapGetters,mapActions,mapMutations} from 'vuex'

  export default {
    data() {
      return {
        breadList:[
          {
            urlName:'transaction',
            name:'navbar.tradingHall'
          }
        ]
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
      navMenu, vFooter, BreadCrumbs, transactMenu, guidePage, tranbuyList, userWalletass, recentOrders
    }
  };
</script>
<style lang="scss">
  .transaction-main {
     padding-top: 100px;
     .transaction-content{
       margin-bottom: 30px;
       .row{
         border: 1px solid #D4D4D4;
       }
       .col-18,.col-19{
         margin: 0;
       }
       .col-19{
         border-left: 1px solid #D4D4D4;
       }
       .asset-title{
          line-height: 60px;
          font-size: 20px;
          color: #333333;
          padding-left: 19px;
         font-weight: normal;
       }
     }

  }
</style>
