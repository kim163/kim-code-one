<template>
  <div class="tran-datalist">
      <div class="tranlist-container">
          <div class="tranlist-head">
              <p v-for="(item,i) in dataHead" :class="['head-item',item.value]">  {{generateTitle(item.name)}}  </p>
          </div>
          <div class="tranlist-body">
             <div class="tranlist-item" v-for="(item,i) in dataList.data||[]">
                 <div class="tran-message">
                   <p class="txt-left item sellers"><span class="disp-inlblo" v-html="proUserAvatars(item.debitName)"> </span> {{item.debitName}} </p>
                   <p class="item tranCountOrRate">555丨93.23％</p>
                   <p class="item">0.01元</p>
                   <p class="item quantity"> {{item.debitAmount}} UET </p>
                   <p class="item">
                     <span v-if="item.debitAccountTypeTwin === 1" class="iconfont icon-pay-alipay"></span>
                     <span v-else-if="item.debitAccountTypeTwin === 2" class="iconfont icon-pay-wechat" ></span>
                     <span v-else-if="item.debitAccountTypeTwin === 3" class="iconfont icon-pay-bank"></span>
                     <span v-else>
                      {{item.debitAccountTypeTwin}}
                      </span>
                   </p>
                   <p class="item">
                     <a href="javascript:void(0);" class="transaction-btn" @click="showView(item,i)">{{$t('transactionHome.buyUet')}}</a>
                   </p>
                 </div>
                 <transition name="message">
                    <div class="tran-contpart" v-show="item.already" :ref="item.id">
                         <p>  {{item.debitName}} </p>
                    </div>
                 </transition>
             </div>

          </div>
      </div>

    <paging-by :data="dataList.pageInfo" @search="searchDataList"></paging-by>
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
          type: 11,
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
         let avaHtml = '<a class="avatars-item" style="background: '+avatarColor+' ">'+nameFirst+'</a>';

         return avaHtml;
      },

      searchDataList(index) {
        if(!isNaN(index)) {
          this.reqData.offset = (index - 1) * this.reqData.limit;
        }
        console.log('req:',this.reqData);

        transaction.getOrderxPage(this.reqData).then(res => {
          console.log('买入UET get OrderxPageForHallSell data:', res);
          this.dataList.data = res.data.map(item => {
            item.already = false;
            return item;
          });
          this.dataList.pageInfo = res.pageInfo;
        }).catch(error => {
          this.reset(res.message);
        });
      },

      showView(item, i) {
        if (this.$refs[item.id][0].style.display == "") {
          this.$refs[item.id][0].style.display = 'block';
        }

        this.$nextTick(() => {
          item.already = !item.already;
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
