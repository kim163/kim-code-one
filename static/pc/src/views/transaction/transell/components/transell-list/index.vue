<template>
  <div class="tran-datalist">
      <table>
        <thead>
           <tr>
             <th v-for="(item,i) in dataHead"> {{generateTitle(item.name)}} </th>
           </tr>
        </thead>
        <tbody>
            <tr v-for="(item,i) in dataList.data||[]">
              <td> {{item.creditName}} </td>
              <td></td>
              <td>0.01元</td>
              <td>{{item.creditAmount}}</td>
              <td>{{item.creditAccountTypeTwin}}</td>
              <td>
                 <a href="javascript:void(0);" class="transaction-btn">{{$t('transactionHome.saleUet')}}</a>
              </td>
            </tr>
        </tbody>
      </table>

    <paging-by :data="dataList.pageInfo" @search="searchTranSellList"></paging-by>
  </div>
</template>
<script>
  import { transaction } from 'api';
  import { generateTitle } from '@/util/i18n';
  import pagingBy from "components/paging-by";

  let dataHead = [
    {name: "table.sellers", value: "sellers"},
    {name: "table.tranCountOrRate", value: "tranCountOrRate"},
    {name: "table.unitPrice", value: "unitPrice"},
    {name: "table.quantity", value: "quantity"},
    {name: "table.payMethod", value: "payMethod"},
    {name: "table.operating", value: "operating"}
  ]

  export default {
    data() {
      return {
        dataHead,
        dataList: {
          data: [],
          pageInfo: {}
        },
        reqData: {
          limit:10,
          offset:0,
          type: 12,
          status: 41
        }
      }
    },
    methods: {
      generateTitle,

      searchTranSellList(index) {
        if(!isNaN(index)) {
          this.reqData.offset = (index - 1) * this.reqData.limit;
        }

        transaction.getOrderxPage(this.reqData).then(res => {
          console.log('卖出UET OrderxPage data:', res);
          this.dataList = res;
        }).catch(error => {
          this.reset(res.message);
        });
      }
    },
    created() {
      this.searchTranSellList();
    },
    mounted() {
    },
    activated() {
    },
    components: {
      pagingBy
    }
  };
</script>
<style lang="scss">

</style>
