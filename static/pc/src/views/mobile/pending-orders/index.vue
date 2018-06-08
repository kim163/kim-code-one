<template>
  <div class="m-pengding-box">
    <m-headnav>{{$t('postPend.postTitle')}}</m-headnav>
    <div class="tab-box-out">
      <ul class="pop-tab tab-box">
        <li v-for="item in pendingType" @click="pendingItem=item.value" class="s" :class="{active:pendingItem==item.value}" :key="item.value">
          {{generateTitle(item.name)}}
        </li>
      </ul>
    </div>
    <div v-if="pendingItem=='buyer'">

      <div class="white-box">
        <div class="line-box"></div>
        <div class="balance-box">
          <p>{{$t('postPend.balance')}} <balance ></balance> </p>
          <p class="c-gray">{{$t('postPend.unit')}} ¥ 0.01</p>
        </div>
        <div class="input-box">
            <div class="input-div"><input class="my-input" type="number" placeholder="挂单买入数量" v-model="buyAmount"> UET</div>
            <div  class="input-div"><input class="my-input" type="number" :value="buyAmountCny" readonly placeholder="=总数量"> CNY</div>
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
              <p class="s-title">卖家要求</p>
              <div  class="input-div"><input class="my-input" type="number"  v-model="minBuyAmount" :placeholder="$t('postPend.minSell')"> UET</div>
            </div>
        </div>
        <div class="line-box"></div>
      </div>

      <div class="btn-box">
        <input type="button" class="btn btn-primary" @click="publishBuy()" value="确定挂单" />
      </div>

    </div>
    <div v-if="pendingItem=='seller'">
      <div class="white-box">
        <div class="line-box"></div>
        <div class="balance-box">
          <p>{{$t('postPend.balance')}}  <balance @getBalance="getBlance"></balance></p>
          <p class="c-gray">{{$t('postPend.unit')}} ¥ 0.01 <a class="c-blue" @click="buyAmount = userBlance">{{$t('postPend.allsell')}}</a></p>

        </div>
        <div class="input-box">
            <div class="input-div"><input class="my-input" type="number" placeholder="挂单卖出数量" v-model="buyAmount"> UET</div>
            <div  class="input-div"><input class="my-input" type="number" :value="buyAmountCny" readonly placeholder="=总数量"> CNY</div>
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
              <p class="s-title">买家要求</p>
              <div  class="input-div"><input class="my-input" type="number" v-model="minSellAmount" placeholder="卖家最低买入数量"> UET</div>
            </div>
        </div>
        <div class="line-box"></div>
      </div>
      <div class="btn-box">
        <input type="button" class="btn btn-primary"  value="确定挂单" @click="publishSell()" />
      </div>

    </div>


    <mobile-nav-bar></mobile-nav-bar>
  </div>
</template>

<script>
  import { show } from 'api'
  import { transaction } from 'api'

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
          {name: "postPend.buyer", value: "buyer"},
          {name: "postPend.seller", value: "seller"}
        ],
        pendingItem: 'buyer',
        bankList: {
          data: []
        },
        buyAmount:'',
        minBuyAmount:'',
        minSellAmount:'',
        buyTypeBuy:'',
        buyTypeSell:'',
        accountCashVo:{},
        buyTypeBuyBank:'',
        userBlance:0
      }
    },
    computed: {
      ...mapGetters(["userData"]),
      ...mapGetters([
        'userId'
      ]),
      buyAmountCny:function(){
        return Number(this.buyAmount) *0.01;
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
          toast('数量不能为空');
          return;
        }
        if(this.buyTypeBuy =='' || !this.buyTypeBuy){
          toast('支付方式不能为空');
          return;
        }
        if(this.minBuyAmount =='' || !this.minBuyAmount || this.minBuyAmount < 0){
          toast('最低卖出数量输入不正确');
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
            minUnit:this.minBuyAmount,//等于发布的数量
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
        console.log('this.requestd  请求数据：')
        console.log(this.requestda)
        transaction.publishToBuy(this.requestda).then((res) => {
          console.log(res)
          if(res.code == '10000'){
            toast('您已下单成功，请进入列表查询');
            this.$router.push({name: 'mTranRecord'});
          }else{
            toast(res.message)
          }
        }).catch(err => {
        })


      },
      publishSell(){
        if(this.buyAmount =='' || !this.buyAmount){
          toast('数量不能为空');
          return;
        }
        if(this.buyTypeSell =='' || !this.buyTypeSell){
          toast('支付方式不能为空');
          return;
        }
        if(this.minSellAmount =='' || !this.minSellAmount || this.minSellAmount < 0){
          toast('最低买入数量输入不正确');
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
            minUnit:this.minSellAmount,//等于发布的数量
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
            "account" : this.buyTypeSell.account,
            "bank" : this.buyTypeBuyBank, //机构名称
            "name" : this.buyTypeSell.name,
            "type" : this.buyTypeSell.type,
            "amount" : this.buyAmount /100
          }
        }
        console.log('this.requestd  请求数据：')
        console.log(this.requestda)
        transaction.publishToSell(this.requestda).then((res) => {
          console.log(res)
          if(res.code == '10000'){
            toast('您已下单成功，请进入列表查询');
            this.$router.push({name: 'mTranRecord'});
          }else{
            toast(res.message)
          }
        }).catch(err => {
        })

      },
      subData:function(item){
        return (item.substring(item.length-4))
      },
      getBlance(data){
        alert(data)
        this.userBlance = data
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
  .tab-box-out{
    background:#F5F5F5 ;
    padding:r(15) r(30);
  }
  .tab-box{
    color:#6b6b6b;
    border-radius: 5px;
    border: 1px solid #F5F5F5;
    overflow:hidden;
  .s{
    display:inline-block;
    height:r(35);
    padding:0 r(10);
    width:50%;
    text-align: center;
    line-height: r(35);
    cursor: pointer;
    background: #fff;
    color:#333;
    user-select: none;
    &:last-child{
       border:0;
     }
    &.active{
       background: #86A5F8;
       color:#fff;
     }
    &:hover,&:link,&:active{
                      opacity: .8;
     }
    }
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
  .m-pengding-box input:read-only{
    background:#fff;
  }
</style>
