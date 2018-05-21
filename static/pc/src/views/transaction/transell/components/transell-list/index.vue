<template>
  <div class="tran-datalist">
      <div class="tranlist-container">
          <div class="tranlist-head">
              <p v-for="(item,i) in dataHead" :class="['head-item',item.value]">  {{generateTitle(item.name)}}  </p>
          </div>
          <div class="tranlist-body">
             <div class="tranlist-item" v-for="(item,i) in dataList.data||[]">
                 <div class="tran-message">
                   <p class="txt-left item sellers"><span class="disp-inlblo" v-html="proUserAvatars(item.userName)"> </span> {{item.userName}} </p>
                   <p class="item tranCountOrRate">
                     {{item.tradeTotal}} 丨
                     <span v-if="item.tradeTotal">{{ ((item.finishedTotal/item.tradeTotal)*100).toFixed(2)}}</span>
                     <span v-if="!item.tradeTotal">0 </span>％
                   </p>

                   <p class="item">0.01元</p>
                   <p class="item quantity"> {{item.amount}} UET </p>
                   <p class="item">
                     <span v-if="item.accountTypeTwin === 1" class="iconfont icon-pay-alipay"></span>
                     <span v-else-if="item.accountTypeTwin === 2" class="iconfont icon-pay-wechat" ></span>
                     <span v-else-if="item.accountTypeTwin === 3" class="iconfont icon-pay-bank"></span>
                     <span v-else>
                         {{item.creditAccountTypeTwin}}
                     </span>
                   </p>
                   <p class="item">
                     <a href="javascript:void(0);" class="transaction-btn" @click="showView(item,i)">{{$t('transactionHome.saleUet')}}</a>
                   </p>
                 </div>
                 <transition name="message">
                    <div class="tran-contpart" v-show="item.already" :ref="item.id">
                      <span class="s">
                        数量 {{item.amount}} UET<br>
                        单价 0.01 元
                      </span>
                      <span  class="s">总值 {{item.amount}}UET</span>
                      <span class="input-box">
                          <input type="text" >CNY
                      </span>
                      <span class="input-box">
                          <input type="text" >UET
                      </span>
                      <span class="btns">
                          <span class="btn btn-primary">下单</span>
                          <span class="btn-cancel">取消</span>
                      </span>
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
          limit:3,
          offset:0,
          type: 12,
          //status: 41
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
         let nameFirst = name.substring(0,1);
         let avaHtml = '<a class="avatars-item" style="background: '+avatarColor+' ">'+nameFirst+'</a>';

         return avaHtml;
      },

      searchDataList(index) {
        if(!isNaN(index)) {
          this.reqData.offset = (index - 1) * this.reqData.limit;
        }
        console.log('reqqq:',this.reqData);

        transaction.getOrderxPendingPage(this.reqData).then(res => {
          console.log('卖出UET get OrderxPage data:', res);
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
