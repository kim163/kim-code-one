<template>
  <div>

     <div class="modal fade in">
    <div class="modal-dialog popup">
      <div type="button" class="close close-w" @click="$emit('hide',false)">
        <i class="iconfont icon-close"></i>
      </div>

      <div class="pop-con">
        <h2 class="alert-title">{{$t('postPend.postTitle')}}</h2>
          <div class="stab-box">
            <span v-for="item in postType" @click="postItem=item.value" class="s" :class="{active:postItem==item.value}" :key="item.value">
            {{generateTitle(item.name)}}
          </span>

          </div>

        <div v-if="postItem=='buyer'">
          <div class="form-input-box">
            <span class="left">买入价格：</span>
            <input type="text" class="ps-input" readonly placeholder="100 UET= 1CNY">
          </div>
          <div  class="form-input-box">
            <span class="left">买入数量：</span>
            <span class="ps-input fl"> <input type="text" class="ps-input-in" v-model="buyAmount"><span class="i-uet">UET</span> </span>
            <span class="fl"><span>&nbsp;{{buyAmountCny}}</span> CNY </span>
          </div>
          <div  class="form-input-box">
            <span class="left">支付方式：</span>
            <select class="ps-input" v-model="buyTypeBuy">
              <option value="">请选择您要支付的方式</option>
              <option v-for="item in bankList.data" :value="item">
                <span  v-if="item.type == '1'">支付宝 {{item.account}}</span>
                <span  v-if="item.type == '2'">微信 {{item.account}}</span>
                <span  v-if="item.type == '3'">{{item.bank}} {{subData(item.account)}}</span>
              </option>
            </select>
          </div>


        </div>
        <div v-if="postItem=='seller'">
          <div class="form-input-box">
            <span class="left">卖出价格：</span>
            <input type="text" class="ps-input" readonly placeholder="100 UET= 1CNY">
          </div>
          <div  class="form-input-box">
            <span class="left">卖出数量：</span>
            <span class="ps-input fl"> <input type="text" class="ps-input-in" v-model="buyAmount"><span class="i-uet">UET</span> </span>
            <span class="fl"><span>&nbsp;{{buyAmountCny}}</span> CNY </span>
          </div>
          <div  class="form-input-box">
            <span class="left">支付方式：</span>
            <select class="ps-input" v-model="buyTypeSell">
              <option>请选择您要支付的方式</option>
              <option v-for="item in bankList.data" :value="item">
                <span  v-if="item.type == '1'">支付宝 {{item.account}}</span>
                <span  v-if="item.type == '2'">微 信 {{item.account}}</span>
                <span  v-if="item.type == '3'">{{item.bank}}  {{subData(item.account)}}</span>
              </option>
            </select>
          </div>


        </div>

        <div class="btn-groups">
          <span class="btn" @click="$emit('hide',false)">取消</span>
          <span class="btn btn-primary" v-if="postItem=='buyer'" @click="publishBuy">发布</span>
          <span class="btn btn-primary" v-if="postItem=='seller'" @click="publishSell">发布</span>
        </div>
      </div>
    </div>

  </div>

  </div>
</template>
<script>
  import { show } from 'api'
  import { transaction } from 'api'
  import { generateTitle } from '@/util/i18n'
  import {mapGetters,mapActions,mapMutations} from 'vuex'

  export default {
    props: {
      value: Boolean
    },
    data() {
      return {
        postType:[
          {name: "postPend.buyer", value: "buyer"},
          {name: "postPend.seller", value: "seller"}
        ],
        postItem:'buyer',
        bankList: {
          data: []
        },
        buyAmount:'',
//        buyAmountCny:''
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
    mounted() {
    },
    activated() {
    },
    components: {
    }
  };
</script>
<style lang="scss">
  .form-input-box{
    height: 45px;
    line-height: 45px;
    margin:0 0 15px 0;
  }
  .popup .pop-con .ps-input{
    display:inline-block;
  }
  .popup .pop-con .ps-input-in{
    display:inline-block;
    height: 42px;
    line-height: 42px;
    margin-top:1px;
    border:0;
    float:left;
    width:80%;
    &:focus{
    outline: none;
     }
  }
  .form-input-box{
    position: relative;
  }
  .form-input-box .left{
    display:inline-block;
    float:left;
    height:45px;
    line-height: 45px;
  }
  .i-uet{
    position: absolute;
    left:350px;
    color:#777;
  }
</style>
