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

      searchTranBuyList(index) {
        transaction.getOrderxPageForHallSell(this.reqData).then(res => {
          console.log('data:', res);
          this.dataList = res;
        }).catch(error => {
          this.reset("请求失败")
        });
      }
    },
    created() {
      this.searchTranBuyList();
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
.tran-datalist{
  width: 100%;
  border: 1px solid #D4D4D4;
  table{
    width: 100%;
    thead{
      tr{
        background: #F2F6FF;
        line-height: 50px;
      }
    }
    tbody{
      tr{
        line-height: 110px;
        border-bottom: 1px solid #D4D4D4;
      }
    }
  }

}

</style>
