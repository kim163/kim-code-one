<template>
  <div>
    <m-headnav>{{$t('postPend.postTitle')}}</m-headnav>
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
          <div  class="input-div"><input class="my-input readonly-txt" type="number" :value="buyAmountCny" placeholder="=总数量" readonly> CNY</div>
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
          <div  class="input-div"><input class="my-input readonly-txt" :value="sellAmountCny" placeholder="=总数量" readonly> CNY</div>
          <div  class="input-div">
            <select class="my-input" v-model="buyTypeSell">
              <option value="">{{$t('postPend.selectPay')}}</option>
              <option v-for="item in bankList.data" :value="item">
                <span  v-if="item.type == '1'">支付宝 {{item.account}}</span>
                <span  v-if="item.type == '2'">微信 {{item.account}}</span>
                <span  v-if="item.type == '3'">{{item.bank}} {{subData(item.account)}}</span>
              </option>
            </select>
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

  export default {
    name: "transaction-record",

    components: {
      MobileNavBar,
      mHeadnav,
      balance
    },

    data(){
      return{
        pendingType:[
          {name: "transactionRecord.buyer", value: "buyer"},
          {name: "transactionRecord.seller", value: "seller"}
        ],
        pendingItem: 'buyer',
        bankList: {
          data: []
        },
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
        userBalance:'',
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
      getBankInfo(){
        this.requestdata={
          userId: this.userId
        }
        show.getBankInfo(this.requestdata).then((res) => {
          this.bankList = res;

        }).catch(err => {

        })
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
            this.buyTypeBuy='';
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
            this.buyTypeSell='';
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
      subData:function(item){
        return (item.substring(item.length-4))
      },
      getBalance(data){
        this.userBalance = data
      },
      allSell(){
        this.sellAmount = this.userBalance
      }
    },
    created() {
      this.getBankInfo()
    },


  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";
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
    height:r(41);
    margin-bottom:r(20);
    padding:0 r(10)
  }
  .my-input{
    height:r(39);
    border:0;
    width:84%;
  @include  f(15px);
  &:hover,&:focus{
             outline: none;
           }
  }
  .readonly-txt{
    background: transparent;
  }
  select.my-input{
    width:100%;
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
</style>
