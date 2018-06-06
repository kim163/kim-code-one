<template>
  <transition name="message">
      <div class="tran-contpart">
            <span class="s s1">
               <p>{{$t('transactionHome.quantity')}} {{item.amount}} UET</p>
               <p>{{$t('transactionHome.unitPrice')}} 0.01 CNY</p>
            </span>
            <span  class="s s2">{{$t('transactionHome.totalValue')}} {{item.amount}}UET</span>
            <span class="input-box">
                 <input type="text" v-model="buyAmountUet" :key="item.id"> UET
            </span>
            <span class="input-box">
                  <input type="text" :value="buyAmountCny" readonly>CNY
            </span>
            <span class="btns">
                   <span class="btn btn-primary" @click="placeAnOrder(item)">{{$t('transactionHome.order')}}</span>
                   <span class="btn btn-cancel gray" @click="$emit('hiddenOrder')">{{$t('postPend.cancel')}}</span>
            </span>
      </div>
  </transition>
</template>
<script>
  import {mapGetters,mapActions,mapMutations} from 'vuex';
  import { transaction } from 'api';

  export default {
    data() {
      return {
        buyAmountUet:'',
      };
    },
    props: {
      item: {
        type: Object
      }
    },
    methods: {
      placeAnOrder(item){
        console.log('this.buyAmountUet:', this.buyAmountUet)
        console.log(this.buyAmountCny)
        console.log('item')
        console.log(item)
        console.log('test:',this.userData)
        let requestda={
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
        console.log(requestda)
        transaction.placeAnOrder(requestda).then((res) => {

          console.log(res)
          if (res.code == 10000) {
            toast("下单成功，请及时支付,10分钟内未完成支付，将自动取消订单");
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
    },
    components: {}
  };
</script>
<style lang="scss">

</style>
