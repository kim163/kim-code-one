<template>
  <div class="mtransell-form">
     <m-header>{{$t('transactionHome.msaleUet')}}</m-header>

     <div class="mtransact-content">
       <div class="form-group cfx">
          <label> {{$t('transactionHome.tranUnitPrice')}} </label>
          <span>0.01 CNY</span>
       </div>
       <div class="form-group cfx">
         <label> {{$t('postPend.balance')}} </label>
         <balance></balance>
       </div>
       <div class="form-group cfx">
         <label> {{$t('transactionHome.quantityAvailSale')}} </label>
         <span> {{item.amount}} UET</span>
       </div>
       <div class="form-group cfx">
         <label> {{$t('transactionHome.tranAmount')}} </label>
         <span> {{(Number(item.amount) *0.01).toFixed(2)}} CNY</span>
       </div>
       <div class="input-group">
         <div class="input-div">
           <input class="my-input" type="number" :placeholder="buyMinUnit" v-model="buyAmountUet">
           <span> UET </span>
         </div>
         <div  class="input-div no-mb">
            <input class="my-input" type="text" :value="buyAmountCny" :placeholder="$t('transactionHome.tranAmount')">
            <span> CNY </span>
         </div>
         <div class="transell-tips cfx">
           <input type="text" class="tips-info" :value="tipsInfo" >
           <a href="javascript:void(0);" @click="allTransact" class="all-transact">全部卖出</a>
         </div>
         <div  class="input-div">
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
         <input type="button" class="mobile-pubtn"  :value="$t('transactionHome.order')" @click="placeAnOrder()" />
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
        bankList: {
          data: []
        },
        item: {
          amount: 0
        },
        orderId: '',
        buyTypeBuy:'',
        buyTypeBuyBank:''
      };
    },
    watch: {
      "$route"(val) {
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
          toast('请您输入正确的卖出数量');
        }else if(this.buyAmountUet < this.item.minUnit){
          toast('您输入的数量低于最低卖出数量');
        }else if(this.buyAmountUet > this.item.amount){
          toast('您输入的数量高于卖出数量');
        }else if(this.buyTypeBuy =='' || !this.buyTypeBuy){
          toast('请您选择支付方式');
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
        console.log(requestda)
        transaction.placeAnOrder(requestda).then(res => {

          console.log(res)
          if (res.code == 10000) {
            this.$router.push({name: 'withdrawOrder',params:{ id: res.data.key}});
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
        return '最低卖出'+this.item.minUnit+'UET';
      },
      tipsInfo(){
        if(this.buyAmountUet < this.item.minUnit){
          return '提示：您输入的数量低于最低卖出数量';
        }else if(this.buyAmountUet > this.item.amount){
          return '提示：您输入的数量高于卖出数量';
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

  .mtransell-form{
     .mtransact-content{
        padding: r(10) 0 r(50);
        .form-group{
           height: r(44);
           line-height: r(44);
           border-bottom:1px solid #D8D8D8;
           background: $white;
           padding: 0 r(10);
           @include  f(15px);
           color: $font-color;
           &:first-child{
             border-top: 1px solid #D8D8D8;
           }
          label{
            display: inline-block;
            margin-right: r(10);
          }
          span{
            color: #787876;
            display: block;
            float: right;
          }
        }
       .input-group{
         padding: r(20);
         background: $white;
         .input-div{
            position: relative;
            @include  f(14px);
            color: $font-color;
            margin-bottom: r(20);
            line-height: r(40);
            &:last-child{
              margin-bottom: 0;
            }
            .my-input{
               height: r(40);
               line-height: r(40);
               width: 100%;
               border: 1px solid #D8D8D8;
               outline: none;
               padding: 0 r(11);
               @include  f(15px);
            }
            span{
              position: absolute;
              display: block;
              width: 13%;
              top: 0;
              right: 0;
            }
         }
         .no-mb{
           margin-bottom: 0;
         }
         .transell-tips{
           line-height: r(40);
           .tips-info{
             color: #FF0000;
             border: none;
             outline: none;
             width: 79%;
             float: left;
             display: block;
             line-height: r(40);
             @include  f(15px);
           }
           .all-transact{
             color: #4982FF;
             width: 21%;
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
