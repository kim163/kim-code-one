<template>
  <div class="recent-orders">
      <h3 class="title"> {{$t('transactionHome.recentOrders')}} </h3>
      <ul>
         <li  v-for="(item,i) in dataList.data||[]">
           <div class="fl"> {{ item.debitName }}</div>
           <div class="fr"> {{ item.debitAmount }} UET</div>
         </li>
      </ul>
  </div>
</template>
<script>
  import { transaction } from 'api';
  export default {
    data() {
      return {
        dataList: {
          data: [],
          pageInfo: {}
        },
        reqData: {
          limit:10,
          offset:0,
          type: 11,
          status: 41
        }
      };
    },
    props: {},
    methods: {
      searchRecentOrd(index){
        transaction.getOrderxPage(this.reqData).then(res => {
          console.log('最近订单 OrderxPage data:', res);
          this.dataList = res;
        }).catch(error => {
          this.reset(res.message);
        });
      }
    },
    computed: {},
    created() {
        this.searchRecentOrd();
    },
    components: {}
  };
</script>
<style lang="scss">
.recent-orders{
  .title{
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #ffffff;
    background: #5087FF;
    padding: 0 19px;
  }
  ul{
    li{
      height: 110px;
      padding: 20px 19px;
      border-bottom: 1px solid #D4D4D4;
      &:last-child{
        border: none;
      }
      &:hover{
        background: #F8F8F8;
      }
    }
  }
}

</style>
