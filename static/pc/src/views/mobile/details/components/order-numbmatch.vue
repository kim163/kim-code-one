<template>
  <div class="order-numbmatch-main">
    <router-link :to="{name:'mMatch'}" class="matching-orderbtn">
      <span v-if="homeInforma.tradingOrderCount>0">{{homeInforma.tradingOrderCount}}</span>
      匹配的订单数
    </router-link>
  </div>
</template>
<script>
  import {transaction} from 'api';

  export default {
    data() {
      return {
        homeInforma: {}
      };
    },
    props: {},
    methods: {
      searchHomeInfo() {
        const requestdata = {
          userId: this.userId
        };
        transaction.getHomeInfo(requestdata).then(res => {
          if (res.code == '10000') {
            this.homeInforma = res.data;
          }
        }).catch(err => {
          toast(err.message);
        })
      }
    },
    computed: {
      ...mapGetters([
        'userId'
      ])
    },
    created() {
      this.searchHomeInfo();
    },
    components: {}
  };
</script>
<style lang="scss" scoped>
  @import "~assets/scss/mixin";

  .order-numbmatch-main{
    background: #FFFFFF;
    border-bottom: 1px solid #d8d8d8;
    padding: r(10);
    .matching-orderbtn{
       display: inline-block;
       height: r(30);
       line-height: r(30);
       border: 1px solid #FF799E;
       @include f(14px);
       color: #FF799E;
       border-radius: r(40);
       padding-right: r(17);
       span{
         display: inline-block;
         background: #FF799E;
         border-radius: r(40);
         @include f(16px);
         color: #FFFFFF;
         padding: r(1) r(12);
         margin:0 r(8) 0 r(-1);
       }
    }
  }
</style>
