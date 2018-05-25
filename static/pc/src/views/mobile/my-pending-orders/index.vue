<template>
  <div class="my-pending-orders">
    <mobile-header>{{$t('transactionRecord.tranPending')}}</mobile-header>
    <div class="mobilenav-tabs">
        <span v-for="(item,i) in pendingOrdersType" @click="pendingOrdersItem = item.value"
              :class="{active:pendingOrdersItem === item.value}" :key="item.value">
            {{generateTitle(item.name)}}
        </span>
    </div>
    <div class="amount-balance">{{$t('navbar.accountBalance')}}：{{userData.amount}} UET</div>
  </div>
</template>

<script>
  import MobileHeader from 'components/m-header';
  import { generateTitle } from '@/util/i18n';
  import {mapGetters} from 'vuex'
  export default {
    name: "my-pending-orders",
    data() {
      return {
        pendingOrdersType:[
          {name:'postPend.processing', value: 'processing' },
          {name:'postPend.hasBeenRemoved', value: 'hasBeenRemoved' }
        ],
        pendingOrdersItem: 'processing',
      }
    },
    computed: {
      ...mapGetters([
        "userData"
      ]),
    },
    components:{
      MobileHeader
    },
    methods: {
      generateTitle,
    },
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .amount-balance {
    @include f(16px);
    color: #333333;
    padding: 0 0 r(15) r(10);
  }
</style>