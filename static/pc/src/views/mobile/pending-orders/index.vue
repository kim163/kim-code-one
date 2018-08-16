<template>
  <div class="pending-orders-page">
    <m-headnav>{{$t('postPend.postTitle')}}</m-headnav>
    <div class="balance">
      <balance @getBalance="getBalance"></balance> ≈ &yen;{{}}
    </div>
    <div class="mobilenav-tabs">
      <ul class="cfx">
        <li v-for="item in pendingType" @click="pendingItem=item.value" class="s" :class="{active:pendingItem==item.value}" :key="item.value">
          {{generateTitle(item.name)}}
        </li>
      </ul>
    </div>
    <div v-if="pendingItem=='buyer'">

      <div class="white-box">
        <div class="line-box"></div>
        <div class="balance-box">
          <p>{{$t('postPend.balance')}} <balance @getBalance="getBalance"></balance> </p>
          <p class="c-gray">{{$t('postPend.unit')}} 0.01 CNY</p>
        </div>
        <div class="input-box">
          <div class="input-div"><input class="my-input" type="number" placeholder="挂单买入数量" v-model.number="buyAmount" min="1" max="200000000" > UET</div>
          <div  class="input-div"><input class="my-input" type="number" :value="buyAmountCny" placeholder="=总数量" readonly> CNY</div>
          <div  class="input-div get-bankcard">
            <get-bankcard :setBankcard="setBankcard" :def-select="bankNo" v-model="buyBindCardReset" @selCardChange="buySelCardChange"></get-bankcard>
          </div>
          <div >
            <p class="s-title">{{$t('postPend.buyerRequest')}}</p>
            <div  class="input-div"><input class="my-input" type="number" v-model.number="minBuyAmount" :placeholder="$t('postPend.minSell')" min="1" max="200000000"> UET</div>
          </div>
        </div>
        <div class="line-box"></div>
      </div>

      <div class="btn-box">
        <input type="button" class="btn btn-primary" @click="publishBuy()" value="快速买币" />
      </div>

    </div>
    <div v-if="pendingItem=='seller'">
      <div class="white-box">
        <div class="line-box"></div>
        <div class="balance-box">
          <p>{{$t('postPend.balance')}}  <balance @getBalance="getBalance"></balance></p>
          <p class="c-gray">{{$t('postPend.unit')}} 0.01 CNY <a class="c-blue" @click="allSell()">{{$t('postPend.allsell')}}</a></p>
        </div>
        <div class="input-box">
          <div class="input-div"><input class="my-input" placeholder="挂单卖出数量" v-model.number="sellAmount" min="1" max="200000000"> UET</div>
          <div  class="input-div"><input class="my-input" :value="sellAmountCny" placeholder="=总数量" readonly> CNY</div>
          <div  class="input-div">
            <get-bankcard :setBankcard="setBankcard" :def-select="bankNo" v-model="sellBindCardReset" @selCardChange="sellSelCardChange"></get-bankcard>
          </div>
          <div >
            <p class="s-title">{{$t('postPend.sellerRequest')}}</p>
            <div  class="input-div"><input class="my-input" v-model.number="minSellAmount" :placeholder="$t('postPend.minBuy')" min="1" max="200000000"> UET</div>
            <div  class="input-div">
              <select class="my-input" v-model="proofType">
                 <option value="">请选择付款说明</option>
                 <option value="1">要求提供付款说明</option>
                 <option value="0">不要求提供付款说明</option>
              </select>
            </div>
          </div>
        </div>
        <div class="line-box"></div>
      </div>
      <div class="btn-box">
        <input type="button" class="btn btn-primary"  value="快速卖币" @click="publishSell()" />
      </div>

    </div>


    <mobile-nav-bar></mobile-nav-bar>
  </div>
</template>

<script>
  import { show,transaction } from 'api'

  import MobileNavBar from 'components/m-navbar'
  import mHeadnav from 'components/m-headnav'
  import balance from 'components/balance';
  import { generateTitle } from '@/util/i18n'
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  import getBankcard from 'components/get-bankcard'

  export default {
    name: "transaction-record",

    components: {
      MobileNavBar,
      mHeadnav,
      balance,
      getBankcard
    },

    data(){
      return{
        pendingType:[
          {name: "transactionRecord.buyer", value: "buyer"},
          {name: "transactionRecord.seller", value: "seller"}
        ],
        pendingItem: 'buyer',
        requestdata:{},
        requestda:{},
        buyAmount:'',
        sellAmount:'',
        buyTypeBuy:'',
        buyTypeSell:'',
        minBuyAmount:'',
        minSellAmount:'',
        proofType:'',
        accountCashVo:{},
        buyTypeBuyBank:'',
        userBalance:0,
        buyBindCardReset:false,
        sellBindCardReset:false,
        setBankcard: {
          pleaseSelTitle: 'component.pleaseSelPayMet',         // 请选择标题文字
          addOption:[]
        },
        bankNo:'',
      }
    },
    watch: {
      pendingItem() {
        this.buyBindCardReset=true;
        this.sellBindCardReset=true;
      }
    },
    computed: {
      ...mapGetters([
        'userId',
        'userData'
      ]),
      buyAmountCny(){
        return (Number(this.buyAmount) *0.01).toFixed(2);
      },
      sellAmountCny(){
        return (Number(this.sellAmount) *0.01).toFixed(2);
      }
    },
    methods: {
      generateTitle,
      buySelCardChange(selCard){
         this.buyTypeBuy = selCard;
      },
      publishBuy(){
        if(this.buyAmount =='' || !this.buyAmount){
          toast('买入数量不能为空');
          return;
        }
        if(!_.isInteger(this.buyAmount) || this.buyAmount<1 ){
          toast('请您输入整数买入数量');
          return;
        }
        if(this.buyTypeBuy =='' || !this.buyTypeBuy){
          toast('支付方式不能为空');
          return;
        }
        if(this.minBuyAmount =='' || !this.minBuyAmount || this.minBuyAmount < 1){
          toast('卖家最低卖出数量输入不正确');
          return;
        }
        if(!_.isInteger(this.minBuyAmount)){
          toast('请您输入整数卖家最低卖出数量');
          return;
        }

        if(this.buyTypeBuy.type =='1'){
          this.buyTypeBuyBank='支付宝'
        }else if(this.buyTypeBuy.type =='2'){
          this.buyTypeBuyBank='微信'
        }else{
          this.buyTypeBuyBank=this.buyTypeBuy.bank
        }
        this.requestda={
          userId: this.userData.userId,
          orderOptionVo:{
            minUnit:this.minBuyAmount,
            contractType:1,
            mode:1
          },
          accountChainVo:{
            name:this.userData.nickname,
            address:this.userData.accountChainVos[0].address,
            assetCode:'UET', //资产编码 默认 UET,登录后资产的编码
            amount:this.buyAmount //uet的数量
          },
          accountCashVo:{
            "account" : this.buyTypeBuy.account,
            "bank" : this.buyTypeBuyBank, //机构名称
            "name" : this.buyTypeBuy.name,
            "type" : this.buyTypeBuy.type,
            "amount" : this.buyAmount /100
          }
        }
        transaction.publishToBuy(this.requestda).then((res) => {
          console.log(res)
          if(res.code == '10000'){
            this.buyAmount='';
            this.buyBindCardReset=true;
            this.minBuyAmount = '';
            toast('您已下单成功，请进入列表查询');
            Vue.$global.bus.$emit('update:balance')
            this.$router.push({name: 'mTranRecord'});
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err.message);
        })

      },
      sellSelCardChange(selCard){
         this.buyTypeSell = selCard;
      },
      publishSell(){
        if(this.sellAmount =='' || !this.sellAmount){
          toast('卖出数量不能为空');
          return;
        }
        if(!_.isInteger(this.sellAmount) || this.sellAmount<1){
          toast('请您输入整数卖出数量');
          return;
        }
        if(this.buyTypeSell =='' || !this.buyTypeSell){
          toast('支付方式不能为空');
          return;
        }
        if(this.minSellAmount =='' || !this.minSellAmount || this.minSellAmount < 1){
          toast('买家最低买入数量输入不正确');
          return;
        }
        if(!_.isInteger(this.minSellAmount)){
          toast('请您输入整数买家最低买入数量');
          return;
        }
        if(this.proofType =='' || !this.proofType){
          toast('付款说明不能为空');
          return;
        }

        if(this.buyTypeSell.type =='1'){
          this.buyTypeBuyBank='支付宝'
        }else if(this.buyTypeSell.type =='2'){
          this.buyTypeBuyBank='微信'
        }else{
          this.buyTypeBuyBank=this.buyTypeSell.bank
        }
        this.requestda={
          userId: this.userData.userId,
          orderOptionVo:{
            minUnit:this.minSellAmount,
            contractType:1,
            mode:1,
            proofType: this.proofType
          },
          accountChainVo:{
            name:this.userData.nickname,
            address:this.userData.accountChainVos[0].address,
            assetCode:'UET', //资产编码 默认 UET,登录后资产的编码
            amount:this.sellAmount //uet的数量
          },
          accountCashVo:{
            "account" : this.buyTypeSell.account,
            "bank" : this.buyTypeBuyBank, //机构名称
            "name" : this.buyTypeSell.name,
            "type" : this.buyTypeSell.type,
            "amount" : this.sellAmount /100
          }
        }
        transaction.publishToSell(this.requestda).then((res) => {
          console.log(res)
          if(res.code == '10000'){
            toast('您已下单成功，请进入列表查询');
            this.sellAmount='';
            this.sellBindCardReset=true;
            this.minSellAmount = '';
            this.proofType='';
            Vue.$global.bus.$emit('update:balance');
            this.$router.push({name: 'mTranRecord'});
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err.message);
        })

      },
      getBalance(data){
        this.userBalance = data
      },
      allSell(){
        this.sellAmount = this.userBalance
      }
    },
    created() {
      const mode = this.$route.query.mode
      if(!_.isUndefined(mode) && Number(mode) === 3){ // 判断用户意图  mode=3是想打开我要卖币 其他默认是买币
        this.pendingItem = 'seller'
      }
      const amount = this.$route.query.amount  //金额为CNY
      if(!_.isUndefined(amount) && Number(amount) > 0){
        if(this.pendingItem === 'seller'){
          this.sellAmount = Number(amount) * 100
        }else{
          this.buyAmount = Number(amount) * 100
        }
      }
      this.bankNo = this.$route.query.bankNo
      const withdraw = this.$route.query.withdraw
      if(!_.isUndefined(withdraw) && withdraw === 'true'){
        if(this.pendingItem === 'seller'){
          this.minSellAmount = 1
          this.proofType = '1'
        }
      }
    },


  }
</script>

<style lang="scss">
 @import "~assets/scss/mobile";
 .balance{
   width: 100%;
   height: r(40);
   background: $white;
   line-height: r(40);
 }
 .pending-orders-page{
   padding-bottom: r(50);
  .white-box{
    background: #fff;
  }
  .balance-box{
    margin:r(5) r(30);
    line-height: r(30);
  }
  .input-box{
    margin:r(20) r(30);
  }
  .line-box{
    border-bottom:1px solid #ddd;
  }
  .input-div{
    background: #FFFFFF;
    border: 1px solid #D8D8D8;
    margin-bottom:r(20);
    padding:0 r(10)
  }
  .my-input{
    height:r(39);
    line-height:r(39);
    border:0;
    width:84%;
  @include  f(15px);
  &:hover,&:focus{
             outline: none;
           }
  }
  select.my-input{
    width:100%;
  }
  .nocard-tips{
    line-height: r(30);
    padding-left: 3%;
  }
  .s-title{
    font-size: r(15);
    color: #333333;
    padding:0 0 r(20) 0;
    margin:0;
  }
  .btn{
    display:block;
    width:90%;
    text-align: center;
    margin:0 auto;
    background: #4982FF;
    border-radius: 4px;
    height:r(44);
    line-height:r(44) ;
    font-size:r(18);
    color:#fff;
    margin-top:r(40)
  }
  .c-gray{
    color:#666;
  }
  .c-blue{
    color: #4982FF;
  }
 }
</style>
