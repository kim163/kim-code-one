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
  </div>
</template>
<script>
  import { transaction } from 'api'
  import { generateTitle } from '@/util/i18n'

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
          data: []
        },
        reqData: {
          limit:10,
          offset:0
        }
      }
    },
    methods: {
      generateTitle,

      searchTranSellList(index) {
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
    }
  };
</script>
<style lang="scss">

</style>
