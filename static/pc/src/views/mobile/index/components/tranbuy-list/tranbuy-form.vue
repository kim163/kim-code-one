<template>
  <div class="mtranbuy-form">
     <m-header>{{$t('transactionHome.mBuyUet')}}</m-header>

     <div class="mtranbuy-content">
       <div class="form-group cfx">
         <label> {{$t('transactionHome.tranUnitPrice')}} </label>
         <span>0.01 CNY</span>
       </div>
       <div class="form-group cfx">
         <label> {{$t('postPend.balance')}} </label>
         <balance></balance>
       </div>
       <div class="form-group cfx">
         <label> {{$t('transactionHome.buyableQuantity')}} </label>
         <span> {{item.amount}} UET</span>
       </div>
       <div class="form-group cfx">
         <label> {{$t('transactionHome.convertAmount')}} </label>
         <span> {{(Number(item.amount) *0.01).toFixed(2)}} CNY</span>
       </div>
       <div class="tranbuy-group">
          <div class="tranbuy-info cfx">
              <label> {{$t('transactionHome.buyQuantity')}}: </label>
              <input class="my-input" :placeholder="$t('transactionHome.miniPurchase')" v-model="buyAmountUet">
              <span> UET </span>
          </div>
         <div class="tranbuy-info cfx">
              <label> {{$t('transactionHome.convertAmount')}}: </label>
              <input class="my-input" :value="buyAmountCny" placeholder="">
              <span> CNY </span>
         </div>
         <div class="tranbuy-tips">
              <p> {{$t('transactionHome.mbuyUetTips')}} </p>
         </div>
       </div>
       <div class="transfer-group">
            <div class="transfer-info cfx">
               <label>{{$t('transactionHome.transferName')}}: </label>
               <input class="my-input" :placeholder="$t('transactionHome.transferNamephd')" v-model="transferName">
            </div>
            <div class="transfer-info">{{$t('transactionHome.transferMethod')}}: </div>
            <div class="method-part cfx">
               <p :class="{active:selTransferMeth==3}" @click="selTransferMeth=3">
                  <span class="method-icon transfer-bank"></span>
                  <span class="method-text">{{$t('transactionHome.bankTransfer')}}</span>
               </p>
              <p :class="{active:selTransferMeth==1}" @click="selTransferMeth=1">
                <span class="method-icon transfer-alipay"></span>
                <span class="method-text">{{$t('transactionHome.alipayTransfer')}} </span>
              </p>
              <p :class="{active:selTransferMeth==2}" @click="selTransferMeth=2">
                <span class="method-icon transfer-wechat"></span>
                <span class="method-text">{{$t('transactionHome.wechatTransfer')}}</span>
              </p>
            </div>
       </div>
       <div class="btn-group">
         <input type="button" class="mobile-pubtn"  :value="$t('transactionHome.nextStep')" @click="placeAnOrder()"  />
       </div>

     </div>
  </div>
</template>
<script>
  import {transaction} from 'api';
  import mHeader from "components/m-header";
  import balance from 'components/balance';
  import {mapGetters, mapActions, mapMutations} from 'vuex';

  export default {
    data() {
      return {
        buyAmountUet: '',
        selTransferMeth: 0,
        transferName: '',
        item: {
          amount: 0
        },
        orderId: ''
      };
    },
    watch: {
      "$route"(val) {
        console.log('$route')
        this.orderId = val.params.id;
        this.searchTranDetail();
      }
    },
    props: {},
    methods: {
      searchTranDetail(){
        let requestda = {
          orderId: this.orderId
        };
        transaction.getOrderxPending(requestda).then(res => {
          console.log(res)
          if (res.code == 10000) {
            this.item = res.data;
          }
        }).catch(err => {
          toast(res.message);
        })
      },

      placeAnOrder() {
        let requestda = {
          orderId: this.item.id,
          userId: this.userData.userId,
          accountChainVo: {
            name: this.userData.nickname,
            address: this.userData.accountChainVos[0].address,
            assetCode: 'UET', //资产编码 默认 UET,登录后资产的编码
            amount: this.buyAmountUet //uet的数量
          },
          accountCashVo: {
            account: this.item.accountTwin,
            bank: this.item.accountMerchantTwin, //机构名称
            name: this.transferName,
            type: this.selTransferMeth,
            amount: this.buyAmountCny
          }
        }
        console.log(requestda)
        transaction.placeAnOrder(requestda).then(res => {
          console.log(res)
          if (res.code == 10000) {
            this.$router.push({name: 'mOrder',params:{ id: res.data.key}});
          }

        }).catch(err => {
          toast(res.message);
        })
      }
    },
    computed: {
      ...mapGetters(["userData"]),
      buyAmountCny(){
        return (Number(this.buyAmountUet) *0.01).toFixed(2);
      }
    },
    created() {
      if (this.$route.params.id) {
        console.log('created')
        this.orderId = this.$route.params.id;
        this.searchTranDetail();
      }
    },
    components: {
      mHeader, balance
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mobile";

  .mtranbuy-form{
     .mtranbuy-content{
       padding: r(10) 0 r(50);
       @include  f(15px);
       color: $font-color;
       .form-group{
         height: r(44);
         line-height: r(44);
         background: $white;
         border-bottom: 1px solid #D8D8D8;
         padding: 0 r(10);
         &:first-child{
           border-top: 1px solid #D8D8D8;
         }
         label{
           margin-right: r(10);
           display: inline-block;
         }
         span{
           float: right;
           color: #787876;
         }
       }
       .tranbuy-group{
         background: $white;
         border-bottom: 1px solid #D8D8D8;
         padding: r(20);
         .tranbuy-info{
           position: relative;
           line-height: r(40);
           &:first-child{
             margin-bottom: r(20);
           }
           label{
             display: inline-block;
             float: left;
             width: 25%;
           }
           .my-input{
              width: 75%;
              height: r(40);
              line-height: r(40);
              float: left;
              border: 1px solid #D8D8D8;
              padding: 0 r(10);
           }
           span{
             position: absolute;
             right: 0;
             display: block;
             width: 13%;
           }
         }
         .tranbuy-tips{
           margin-top: r(10);
            p{
              color: #FF0000;
              text-align: right;
              line-height: r(20);
            }
         }
       }
       .transfer-group{
          border-top: 1px solid #D8D8D8;
          border-bottom: 1px solid #D8D8D8;
          margin-top: r(10);
          padding: r(20);
          background: $white;
          .transfer-info{
            position: relative;
            line-height: r(40);
            label{
              display: inline-block;
              float: left;
              width: 25%;
            }
            .my-input{
              width: 75%;
              height: r(40);
              line-height: r(40);
              float: left;
              border: 1px solid #D8D8D8;
              padding: 0 r(10);
            }
          }
         .method-part{
           p{
             width: 33.33%;
             display: block;
             float: left;
             &.active{
               .transfer-bank{
                 background: url("./images/transfer-banksel.svg") no-repeat center center;
               }
               .transfer-alipay{
                 background: url("./images/transfer-alipaysel.svg") no-repeat center center;
               }
               .transfer-wechat{
                 background: url("./images/transfer-wechatsel.svg") no-repeat center center;
               }
             }
             .method-icon{
               display: block;
               text-align: center;
               width: r(64);
               height: r(64);
               margin: auto;
             }
             .transfer-bank{
                background: url("./images/transfer-bank.svg") no-repeat center center;
             }
             .transfer-alipay{
               background: url("./images/transfer-alipay.svg") no-repeat center center;
             }
             .transfer-wechat{
               background: url("./images/transfer-wechat.svg") no-repeat center center;
             }
             .method-text{
               line-height: r(26);
               text-align: center;
               display: block;
             }
           }
         }

       }
       .btn-group{
         width: 90%;
         margin: r(20) auto 0;
       }
     }

  }

</style>
