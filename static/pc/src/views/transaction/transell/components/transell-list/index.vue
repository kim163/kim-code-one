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
              <td class="txt-left"><p class="disp-inlblo" v-html="proUserAvatars(item.creditName)"> </p> {{item.creditName}} </td>
              <td></td>
              <td>0.01元</td>
              <td>{{item.creditAmount}}</td>
              <td>
                <span v-if="item.creditAccountTypeTwin === 1" class="iconfont icon-pay-alipay"></span>
                <span v-else-if="item.creditAccountTypeTwin === 2" class="iconfont icon-pay-wechat" ></span>
                <span v-else-if="item.creditAccountTypeTwin === 3" class="iconfont icon-pay-bank"></span>
                <span v-else>
                      {{item.creditAccountTypeTwin}}
                </span>
              </td>
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
  import  {SETTING} from "@/assets/data";

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
        SETTING,
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
    computed: {
      avatarDealw(){
        return this.SETTING.avatarColor.length;
      }
    },
    methods: {
      generateTitle,

      proUserAvatars(name){
        let mathRand = parseInt(Math.random()*this.avatarDealw,10);
        let avatarColor = this.SETTING.avatarColor[mathRand];
        let nameFirst = name.substr(0,1);
        let avaHtml = '<span class="avatars-item" style="background: '+avatarColor+' ">'+nameFirst+'</span>';

        return avaHtml;
      },

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
