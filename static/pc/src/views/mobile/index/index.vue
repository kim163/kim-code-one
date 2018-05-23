<template>
  <div class="mtrading-hall">
     <m-headnav>{{$t('navbar.tradingHall')}}</m-headnav>
     <div class="mobilenav-tabs">
        <span v-for="(item,i) in transactType" @click="transactItem=item.value" :class="{active:transactItem==item.value}" :key="item.value">
            {{generateTitle(item.name)}}
        </span>
     </div>

      交易大厅

     <m-navbar></m-navbar>
  </div>
</template>
<script>
  import mHeadnav from 'components/m-headnav';
  import mNavbar from 'components/m-navbar';

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
    computed: {},
    created() {
    },
    components: {
      mHeadnav, mNavbar
    }
  };
</script>
<style lang="scss">
  .mtrading-hall{

  }
</style>
