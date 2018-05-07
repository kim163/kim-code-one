<template>
  <div class="tran-datalist">
      <table>
        <thead>

        </thead>
        <tbody>
            <tr>
              <td></td>
            </tr>
        </tbody>
      </table>
  </div>
</template>
<script>
  import { transaction } from 'api'

  export default {
    data() {
      return {
        reqData: {
          limit:10,
          offset:0
        }
      }
    },
    methods: {
      searchTranBuyList(index) {
        transaction.getOrderxPageForHallSell(this.reqData).then(res => {
          console.log('data:', res);

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
  padding: 0 20px;

}

</style>
