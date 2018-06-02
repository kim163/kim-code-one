<template>
  <div class="mtransell-form">
     <m-header>{{$t('transactionHome.msaleUet')}}</m-header>

     <div class="mtransact-content">
       <div class="form-group">
          <label> {{$t('transactionHome.tranUnitPrice')}} </label>
          <span>&yen;  0.01</span>
       </div>
       <div class="form-group">
         <label> {{$t('postPend.balance')}} </label>
         <balance></balance>
       </div>
       <div class="form-group">
         <label> {{$t('transactionHome.quantityAvailSale')}} </label>
         <span> {{item.amount}} UET</span>
       </div>
       <div class="form-group">
         <label> {{$t('transactionHome.tranAmount')}} </label>
         <span> {{(Number(item.amount) *0.01).toFixed(2)}} CNY</span>
       </div>
       <div class="input-group">
         <div class="input-div">
           <input class="my-input" :placeholder="$t('transactionHome.minimumSale')" v-model="buyAmountUet">
           <span> UET </span>
         </div>
         <div  class="input-div no-mb">
            <input class="my-input" :value="buyAmountCny" placeholder="">
            <span> CNY </span>
         </div>
         <div class="tips-div">
            <p>{{$t('transactionHome.msaleUetTips')}}</p>
         </div>
         <div  class="input-div">
           <select class="my-input" v-model="buyTypeBuy">
             <option value="">{{$t('postPend.selectPay')}}</option>
             <option v-for="item in bankList.data" :value="item">
               <span  v-if="item.type == '1'">支付宝 {{item.account}}</span>
               <span  v-if="item.type == '2'">微信 {{item.account}}</span>
               <span  v-if="item.type == '3'">{{item.bank}} {{subData(item.account)}}</span>
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
  import {transaction} from 'api';
  import mHeader from "components/m-header";
  import balance from 'components/balance';
  import {mapGetters, mapActions, mapMutations} from 'vuex';

  export default {
    data() {
      return {
        buyAmountUet: '',
        buyTypeBuy:'',
        bankList: {
          data: []
        },
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
        console.log('this.buyAmountUet:', this.buyAmountUet)
        console.log(this.buyAmountCny)
        console.log('item')
        console.log(this.item)
        console.log('test:' + this.userData)
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
            name: this.item.accountNameTwin,
            type: this.item.accountTypeTwin,
            amount: this.buyAmountCny
          }
        }
        console.log(requestda)
        transaction.placeAnOrder(requestda).then(res => {

          console.log(res)
          if (res.code == 10000) {
            this.$router.push({name: 'withdrawOrder',params:{ id: res.data.key}});
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
            display: inline-block;
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
         .tips-div{
            margin: r(5) 0 r(15);
           p{
             @include  f(15px);
             color: #FF0000;
             line-height: r(25);
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
