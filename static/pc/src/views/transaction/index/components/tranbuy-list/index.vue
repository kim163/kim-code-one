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
              <td> {{item.creditAccountNameTwin}} </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
        </tbody>
      </table>

    <paging-by :data="dataList.pageInfo" @search="searchDataList"></paging-by>
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
          offset:0
        }
      }
    },
    methods: {
      generateTitle,

      searchDataList(index) {
        if(!isNaN(index)) {
          this.reqData.offset = (index - 1) * this.reqData.limit;
        }

        transaction.getOrderxPageForHallSell(this.reqData).then(res => {
          console.log('买入UET get OrderxPageForHallSell data:', res);
          this.dataList = res;
        }).catch(error => {
          this.reset(res.message);
        });
      }
    },
    created() {
      this.searchDataList();
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
