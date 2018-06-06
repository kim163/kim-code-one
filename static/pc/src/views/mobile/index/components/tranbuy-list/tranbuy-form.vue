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
              <input class="my-input" type="number" :placeholder="buyMinUnit" v-model="buyAmountUet">
              <span> UET </span>
          </div>
         <div class="tranbuy-info cfx">
              <label> {{$t('transactionHome.convertAmount')}}: </label>
              <input class="my-input" type="text" :value="buyAmountCny" :placeholder="$t('transactionHome.convertAmount')">
              <span> CNY </span>
         </div>
         <div class="tranbuy-tips cfx">
             <input type="text" class="tips-info" :value="tipsInfo" >
             <a href="javascript:void(0);" @click="allTransact" class="all-transact">全部买入</a>
         </div>
         <div class="tranbuy-info cfx">
           <label> 支付方式： </label>
           <select class="my-input" v-model="buyTypeBuy">
             <option value="">{{$t('postPend.selectPay')}}</option>
             <option v-for="bank in bankList.data" :value="bank">
               <span  v-if="bank.type == '1'">支付宝 {{bank.account}}</span>
               <span  v-if="bank.type == '2'">微信 {{bank.account}}</span>
               <span  v-if="bank.type == '3'">{{bank.bank}} {{subData(bank.account)}}</span>
             </option>
           </select>
         </div>

       </div>
       <div class="btn-group">
         <input type="button" class="mobile-pubtn"  :value="$t('transactionHome.order')" @click="placeAnOrder()"  />
       </div>

     </div>
  </div>
</template>
<script>
  import { show } from 'api';
  import {transaction} from 'api';

  import mHeader from "components/m-header";
  import balance from 'components/balance';
  import {mapGetters, mapActions, mapMutations} from 'vuex';

  export default {
    data() {
      return {
        buyAmountUet: '',
        item: {
          amount: 0
        },
        orderId: '',
        bankList: {
          data: []
        },
        buyTypeBuy:'',
        buyTypeBuyBank:''
      };
    },
    watch: {
      "$route"(val) {
        console.log('$route')
        this.orderId = val.params.id;
        this.searchTranDetail();
        this.getBankInfo();
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
          toast(err.message);
        })
      },

      getBankInfo(){
        let requestdata={
          userId: this.userId
        }
        show.getBankInfo(requestdata).then(res => {
          if (res.code == 10000) {
            this.bankList = res;
          }
          console.log('bankList:', res);
        }).catch(err => {
          toast(err.message);
        })
      },

      subData(bank){
        return (bank.substring(bank.length-4))
      },

      allTransact(){
          this.buyAmountUet = this.item.amount;
      },

      checkVerif(){
        if(this.buyAmountUet =='' || !this.buyAmountUet){
          toast('请输入正确的购买数量');
        }else if(this.buyTypeBuy =='' || !this.buyTypeBuy){
          toast('请选择支付方式');
        }else {
          return true;
        }
      },

      placeAnOrder() {
        if(!this.checkVerif()) return;
        if(this.buyTypeBuy.type =='1'){
          this.buyTypeBuyBank='支付宝'
        }else if(this.buyTypeBuy.type =='2'){
          this.buyTypeBuyBank='微信'
        }else{
          this.buyTypeBuyBank=this.buyTypeBuy.bank
        }

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
            account: this.buyTypeBuy.account,
            bank: this.buyTypeBuyBank, //机构名称
            name: this.buyTypeBuy.name,
            type: this.buyTypeBuy.type,
            amount: this.buyAmountUet /100
          }
        }
        console.log('UET 充值',requestda)
        transaction.placeAnOrder(requestda).then(res => {
          console.log(res)
          if (res.code == 10000) {
            this.$router.push({name: 'mOrder',params:{ id: res.data.key}});
          }

        }).catch(err => {
          toast(err.message);
        })
      }
    },
    computed: {
      ...mapGetters(["userData", "userId"]),
      buyAmountCny(){
        return (Number(this.buyAmountUet) *0.01).toFixed(2);
      },
      buyMinUnit(){
        return '最低买入'+this.item.minUnit+'UET';
      },
      tipsInfo(){
         if(this.buyAmountUet < this.item.minUnit){
            return '提示：您输入的数量低于最低买入数量';
         }else if(this.buyAmountUet > this.item.amount){
            return '提示：您输入的数量高于可买数量';
         }else {
            return '';
         }
      }
    },
    created() {
      if (this.$route.params.id) {
        console.log('created')
        this.orderId = this.$route.params.id;
        this.searchTranDetail();
        this.getBankInfo();
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
              @include  f(15px);
           }
           span{
             position: absolute;
             right: 0;
             display: block;
             width: 13%;
           }
         }
         .tranbuy-tips{
            line-height: r(40);
            .tips-info{
              color: #FF0000;
              border: none;
              outline: none;
              width: 78%;
              float: left;
              display: block;
              line-height: r(40);
              @include  f(15px);
            }
           .all-transact{
             color: #4982FF;
             width: 22%;
             float: left;
             text-align: right;
             display: block;
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
