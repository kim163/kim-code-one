<template>
  <transition name="message">
      <div class="tran-contpart">
            <span class="s s1">
               <p>{{$t('transactionHome.quantity')}} {{item.balance}} UET</p>
               <p>{{$t('transactionHome.unitPrice')}} 0.01 CNY</p>
            </span>
            <span  class="s s2">{{$t('transactionHome.totalValue')}} {{item.balance}} UET</span>
            <span class="input-box">
                 <input type="text" :placeholder="buyMinUnit" v-model.number="buyAmountUet" :key="item.id" maxlength="9"> UET
            </span>
            <span class="input-box">
                  <input type="text" :value="buyAmountCny" :placeholder="$t('transactionHome.tranAmount')" readonly>CNY
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
      checkVerif(){
        if(this.buyAmountUet =='' || !this.buyAmountUet){
          toast('请您输入正确的卖出数量');
        }else if(!_.isInteger(this.buyAmountUet) || this.buyAmountUet<1 ){
          toast('请您输入整数卖出数量');
        }else if(this.buyAmountUet < this.item.minUnit){
          toast('您输入的数量低于最低卖出数量');
        }else if(this.buyAmountUet > this.item.balance){
          toast('您输入的数量高于卖出数量');
        }else {
          return true;
        }
      },

      placeAnOrder(item){
        if(!this.checkVerif()) return;
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
            amount : this.buyAmountUet /100
          }
        }
        console.log(requestda)
        transaction.placeAnOrder(requestda).then((res) => {

          console.log(res)
          if (res.code == 10000) {
            toast("成功卖出");
            Vue.$global.bus.$emit('update:balance');
          }else {
            toast(res.message);
          }

        }).catch(err => {
          toast(err.message);
        })
      }
    },
    computed: {
      ...mapGetters(["userData"]),
      buyAmountCny(){
        return (Number(this.buyAmountUet) *0.01).toFixed(2);
      },
      buyMinUnit(){
        return '最低卖出'+this.item.minUnit+'UET';
      }
    },
    created() {
    },
    components: {}
  };
</script>
<style lang="scss">

</style>
