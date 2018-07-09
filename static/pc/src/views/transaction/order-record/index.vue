<template>
  <div class="tranrecord-main">
    <nav-menu></nav-menu>
    <BreadCrumbs :bread-list="breadList"></BreadCrumbs>
    <transact-menu></transact-menu>
    <div class="container">
      <div class="row0">
        <div class="tran-content border-box">
          <div class="row border-bottom">
            <tranred-subnav :nav-list="navListData"
                            @changeTab="tabItem = $event"
                            @search="searchKey = $event"></tranred-subnav>
            <transition name="list-animate">
              <record-list v-if="tabItem === 'tranProgress'" :tab-type="1" :search-key="searchKey"></record-list>
            </transition>
            <transition name="list-animate">
              <record-list v-if="tabItem === 'tranComplete'" :tab-type="2" :search-key="searchKey"></record-list>
            </transition>
            <transition name="list-animate">
              <record-list v-if="tabItem === 'appealRecord'" :tab-type="3" :search-key="searchKey"></record-list>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <v-footer></v-footer>
  </div>
</template>
<script>
  import NavMenu from 'components/nav';
  import TransactMenu from 'components/transact-menu';
  import VFooter from 'components/footer';
  import TranredSubnav from 'components/transact-menu/tranred-subnav';
  import BreadCrumbs from 'components/bread-crumbs'
  import RecordList from './record-list'

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
        ],
        tabItem: 'tranProgress',
        searchKey: ""
      };
    },
    props: {},
    methods: {},
    computed: {},
    created() {
    },
    components: {
      NavMenu,
      TransactMenu,
      VFooter,
      TranredSubnav,
      BreadCrumbs,
      RecordList
    }
  };
</script>
<style lang="scss">
  .tranrecord-main {
    padding-top: 100px;

  }

</style>
