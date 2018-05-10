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
  import tranHeadnav from 'components/master/tran-headnav';
  import transactMenu from 'components/transact-menu';
  import transellList from './components/transell-list';

  import userWalletass from 'components/trancomp/user-walletass';
  import recentOrders from 'components/trancomp/recent-orders';

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
      navMenu, vFooter, tranHeadnav, transactMenu, transellList, userWalletass, recentOrders
    }
  };
</script>
<style lang="scss">
  .transell-main{
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
