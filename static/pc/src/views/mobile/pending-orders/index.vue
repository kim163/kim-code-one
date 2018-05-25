<template>
  <div>
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
          <p>{{$t('postPend.balance')}} 252586456.21  UET</p>
          <p class="c-gray">{{$t('postPend.unit')}} ¥ 0.01</p>
        </div>
        <div class="input-box">
            <div class="input-div"><input class="my-input" placeholder="挂单买入数量" v-model="buyAmount"> UET</div>
            <div  class="input-div"><input class="my-input" :value="buyAmountCny" placeholder="=总数量"> CNY</div>
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
              <div  class="input-div"><input class="my-input" :placeholder="$t('postPend.minSell')"> CNY</div>
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
          <p>{{$t('postPend.balance')}} 252586456.21  UET</p>
          <p class="c-gray">{{$t('postPend.unit')}} ¥ 0.01 <a class="c-blue">{{$t('postPend.allsell')}}</a></p>
        </div>
        <div class="input-box">
            <div class="input-div"><input class="my-input" placeholder="挂单卖出数量" v-model="buyAmount"> UET</div>
            <div  class="input-div"><input class="my-input" :value="buyAmountCny" placeholder="=总数量"> CNY</div>
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
              <p class="s-title">买家要求</p>
              <div  class="input-div"><input class="my-input" placeholder="卖家最低买入数量"> UET</div>
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
  import { Transaction } from 'api'

  import MobileNavBar from 'components/m-navbar'
  import mHeadnav from 'components/m-headnav'
  import { transaction } from 'api'
  import { generateTitle } from '@/util/i18n'
  import {mapGetters,mapActions,mapMutations} from 'vuex'

  export default {
    name: "transaction-record",

    components: {
      MobileNavBar,
      mHeadnav
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
        buyTypeBuy:'',
        buyTypeSell:'',
        accountCashVo:{},
        buyTypeBuyBank:''
      }
    },
    computed: {
      ...mapGetters(["userData"]),
      buyAmountCny:function(){
        return Number(this.buyAmount) *0.01;
      }
    },
    methods: {
      generateTitle,
      getBankInfo(){
        this.requestdata={
          userId: this.userData.userId
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
        if(this.buyTypeBuy.type =='1'){
          this.buyTypeBuyBank='支付宝'
        }else if(this.buyTypeBuy.type =='2'){
          this.buyTypeBuyBank='微信'
        }else{
          this.buyTypeBuyBank=this.buyTypeBuy.bank
        }
        this.requestda={
          userId: this.userData.userId,
          mode:'1',
          minUnit:this.buyAmount,//等于发布的数量
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
            toast('您已下单成功，请进入列表查询');
            $emit('hide',false)
          }else{
            toast(res.message)
          }
        }).catch(err => {
        })
//       transaction.publishToSell(this.requestda).then((res) => {
//          console.log(res)
//        }).catch(err => {
//        })

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
        if(this.buyTypeSell.type =='1'){
          this.buyTypeBuyBank='支付宝'
        }else if(this.buyTypeSell.type =='2'){
          this.buyTypeBuyBank='微信'
        }else{
          this.buyTypeBuyBank=this.buyTypeSell.bank
        }
        this.requestda={
          userId: this.userData.userId,
          mode:'1',
          minUnit:this.buyAmount,//等于发布的数量
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
        transaction.publishToSell(this.requestda).then((res) => {
          console.log(res)
          if(res.code == '10000'){
            toast('您已下单成功，请进入列表查询');
            $emit('hide',false)
          }else{
            toast(res.message)
          }
        }).catch(err => {
        })

      },
      subData:function(item){
        return (item.substring(item.length-4))
      }
    },
    created() {
      this.getBankInfo()
    },


  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixin";
.white-box{
  background: #fff;
}
  .tab-box-out{
    background:#F5F5F5 ;
    padding:r(20) r(30);
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
    width:85%;
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
</style>