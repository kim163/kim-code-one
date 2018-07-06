<template>
  <div class="tranrecord-main">
    <nav-menu></nav-menu>
    <BreadCrumbs :bread-list="breadList"></BreadCrumbs>
    <transact-menu></transact-menu>
    <div class="container">
      <div class="row0">
        <div class="tran-content border-box">
          <div class="row border-bottom">
            <tranred-subnav :nav-list="navListData" ></tranred-subnav>
          </div>
        </div>
      </div>
    </div>

    <v-footer></v-footer>
  </div>
</template>
<script>
  import navMenu from 'components/nav';
  import transactMenu from 'components/transact-menu';
  import vFooter from 'components/footer';
  import tranredSubnav from 'components/transact-menu/tranred-subnav';
  import BreadCrumbs from 'components/bread-crumbs'

  export default {
    data() {
      return {
        breadList: [
          {
            urlName: 'transaction',
            name: 'navbar.tradingHall'
          },
          {
            urlName: 'tranRecord',
            name: 'transactionHome.orderRecord'
          },
        ],
        navListData: [
          {name: 'transactionRecord.tranProgress', value: 'tranProgress'},
          {name: 'transactionRecord.tranComplete', value: 'tranComplete'},
          {name: 'transactionRecord.appealRecord', value: 'appealRecord'}
        ]
      };
    },
    props: {},
    methods: {},
    computed: {},
    created() {
    },
    components: {
      navMenu, transactMenu, vFooter, tranredSubnav, BreadCrumbs
    }
  };
</script>
<style lang="scss">
  .tranrecord-main {
    padding-top: 100px;

  }

</style>
