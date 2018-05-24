<template>
  <div class="mtrading-hall">
     <m-headnav>{{$t('navbar.tradingHall')}}</m-headnav>
     <div class="mobilenav-tabs">
        <span v-for="(item,i) in transactType" @click="transactItem=item.value" :class="{active:transactItem==item.value}" :key="item.value">
            {{generateTitle(item.name)}}
        </span>
     </div>

     <div class="account-balline">
       {{$t('navbar.accountBalance')}}：
     </div>

     <div v-show="transactItem=='buyUet'">
       <tranbuy-list></tranbuy-list>
     </div>

     <div v-show="transactItem=='saleUet'">
       <transell-list></transell-list>
     </div>

     <m-navbar></m-navbar>
  </div>
</template>
<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import mHeadnav from 'components/m-headnav';
  import mNavbar from 'components/m-navbar';
  import tranbuyList from './components/tranbuy-list';
  import transellList from './components/transell-list';

  import { generateTitle } from '@/util/i18n';

  export default {
    data() {
      return {
        transactType:[
          {name:'transactionHome.buyUet', value: 'buyUet' },
          {name:'transactionHome.saleUet', value: 'saleUet' }
        ],
        transactItem: 'buyUet',
      };
    },
    props: {},
    methods: {
      generateTitle,
    },
    computed: {
      ...mapGetters(["userData"])
    },
    created() {
    },
    components: {
      mHeadnav, mNavbar, tranbuyList, transellList
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mobile";

  .mtrading-hall{
    .account-balline{
      height: r(44);
      line-height: r(44);
      background: $white;
      @include  f(16px);
      color: $font-color;
      padding: 0 r(10);
    }

  }
</style>
