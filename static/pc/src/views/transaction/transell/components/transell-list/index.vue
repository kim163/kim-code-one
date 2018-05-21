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
                      <span class="s s1">
                         <p>数量 {{item.amount}} UET</p>
                         <p>单价 0.01 元</p>
                      </span>
                      <span  class="s s2">总值 {{item.amount}}UET</span>
                      <span class="input-box">
                          <input type="text" v-model="buyAmountUet" > UET
                      </span>
                      <span class="input-box">
                          <input type="text" :value="buyAmountCny" readonly>CNY
                      </span>
                      <span class="btns">
                          <span class="btn btn-primary" @click="placeAnOrder(item)">下单</span>
                          <span class="btn btn-cancel gray">取消</span>
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
  import {mapGetters,mapActions,mapMutations} from 'vuex'


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
        },
        buyAmountUet:'',
      }
    },
    computed: {
      ...mapGetters(["userData"]),
       avatarDealw(){
         return this.SETTING.avatarColor.length;
       },
      buyAmountCny:function(){
        return Number(this.buyAmountUet) *0.01;
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
      },

      placeAnOrder(item){
        console.log('this.buyAmountUet:', this.buyAmountUet)
        console.log(this.buyAmountCny)
        console.log('item')
        console.log(item)
        console.log(this.userData)
        this.requestda={
          orderId:item.id,
          userId: this.userData.userId,
          accountChainVo:{
            name:this.userData.nickname,
            address:this.userData.accountChainVos[0].address,
            assetCode:'UET', //资产编码 默认 UET,登录后资产的编码
            amount:this.buyAmountUet //uet的数量
          },
          accountCashVo:{
            account :item.accountTwin,
            bank : item.accountMerchantTwin, //机构名称
            name : item.accountNameTwin,
            type : item.accountTypeTwin,
            amount : this.buyAmountCny
          }
        }
        console.log(this.requestda)
        transaction.placeAnOrder(this.requestda).then((res) => {

          console.log(res)


        }).catch(err => {

        })
      },


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
.tran-contpart{
  padding:20px 0;
  overflow:hidden;
  .input-box{
    display:inline-block;
    margin-top:12px;
      input{
        height:40px;
        border:1px solid #ddd;
        padding:0 10px;
      }
  }

  .s{
    display:inline-block;
    width:19%;
    float:left;

  }
  .s1{padding:20px;  width:140px;}
  .s2{margin-top:20px;}
  .s1 p{font-size:15px;}
.btn {
  display: inline-block;
  height:40px;
  line-height: 40px;
  padding: 0 15px;
  margin-top: 6px;
  font-size: 18px;
  background: orange;
  border:0;
  cursor: pointer;
  vertical-align: top;
  border-radius: 3px;
  color: #fff;
  transition: all .3s;
  &.blue{
     background: #5087ff;
   }
   &.gray{
      background: #fff;
     color:#333;
    }
}
.btn-block{width:100%;}
}


</style>
