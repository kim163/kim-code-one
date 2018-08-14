<template>
  <div class="mtrading-hall">
     <m-headnav>{{$t('navbar.tradingHall')}}</m-headnav>
     <div class="mobilenav-tabs">
        <span v-for="(item,i) in transactType" @click="transactItem=item.value" :class="{active:transactItem==item.value}" :key="item.value">
            {{generateTitle(item.name)}}
        </span>
     </div>

     <div class="account-balline">
       {{$t('navbar.accountBalance')}}：<balance></balance>
     </div>
      <div class="tran-container">
       <tranbuy-list v-if="islogin && transactItem=='buyUet'"></tranbuy-list>

       <transell-list v-if="islogin && transactItem=='saleUet'"></transell-list>
      </div>

     <m-navbar></m-navbar>
     <withdraw-tip v-if="withdrawTip" v-model="withdrawTip"></withdraw-tip>
  </div>
</template>
<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import mHeadnav from 'components/m-headnav';
  import mNavbar from 'components/m-navbar';
  import balance from 'components/balance';
  import WithdrawTip from 'components/withdraw-tip';
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
        withdrawTip:false
      };
    },
    props: {
      value: Boolean
    },
    methods: {
      generateTitle,
    },
    watch: {
      islogin(val) {
        if (!val) {
          this.$router.push({name: 'mobileLogin'});
        }
        console.log('mindex islogin:', val);
      }
    },
    computed: {
      ...mapGetters(["userData", "islogin"])
    },
    created() {
      if (!this.islogin) {
        this.$router.push({name: 'mobileLogin'});
      }
      console.log('m index create');
      const withdraw = this.$route.query.withdraw
      if(withdraw && !_.isUndefined(withdraw) && withdraw === 'true'){
        this.withdrawTip = true
      }
    },
    components: {
      mHeadnav, mNavbar,balance, tranbuyList, transellList,WithdrawTip
    },
    beforeRouteEnter(to,from,next){
      next(vm => {
        if(vm.islogin){
          next()
        }else{
          if(_.customize()){
            next({name: 'mobileLogin',replace: true})
          }else{
            next({name: 'mobileCusLogin',replace: true})
          }
        }
      })
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
      border-top: 1px solid #D8D8D8;
      border-bottom: 1px solid #D8D8D8;
    }
    .tran-container{
      position: absolute;
      width: 100%;
      height: calc(100% - #{r(202)});
      top: r(153);
      left: 0;
      overflow: hidden;
    }
  }
</style>
