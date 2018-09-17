<template>
  <div class="quick-main">
    <div class="tabs">
      <ul>
        <li v-for="item in pendingType" @click="pendingItem=item.value" :class="{active:pendingItem === item.value}" :key="item.value">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.icon"></use>
          </svg>
          <p>{{$t(item.name)}}</p>
        </li>
      </ul>
    </div>
    <div class="tip">
      <p>您发布{{pendingItem === 'buyer' ? '买' : '卖'}}币之后，钱包将会扫描所有用户需求进行配对，快速匹配买卖双方，请您留意我们的订单提醒，匹配成功之后便可快速交易。</p>
      <p class="red">注意：随意发布订单而不交易的，将被禁用账户。</p>
    </div>
    <div class="content-info">
      <div class="buy-container" v-show="pendingItem === 'buyer'">
        <div class="amount-list">
          <div class="amount-item" v-for="(item,index) in amonutArr"
               :key="index"
               @click="buyAmount = item.value">{{item.name}}UET</div>
        </div>
        <input type="text" class="buy-input" v-number-only v-model.number="buyAmount" :maxlength="max"> UET  ≈ &yen;
        <animated-integer :value="formatCny(1)"></animated-integer>
      </div>
      <div class="sell-container" v-show="pendingItem === 'seller'">
        <div class="info">
          <label>卖出数量：</label>
          <input type="text" class="sell-input" v-model.number="sellAmount" v-number-only :maxlength="max">
          <span class="amount-type">UET</span>
          <div class="all-in" @click="sellAmount = userBalance">全部卖出</div>
        </div>
        <div class="info">
          <label>卖出总价：</label>
          <div class="all-amount">&yen;
            <animated-integer :value="formatCny(2)"></animated-integer>
          </div>
        </div>
        <div class="info">
          <label>收款方式：</label>
          <div class="sel-bank">
            <get-bankcard :setBankcard="setBankcard"
                          :def-select="bankNo"
                          :auto-select="true"
                          :filter-bank="filterBank"
                          @selCardChange="selCardChange"></get-bankcard>
          </div>
        </div>
      </div>
      <div class="submit-btn" @click="publishBuyOrSell">确定</div>
      <transition name="fade">
        <div class="coupon-info" v-if="Object.keys(couponDetail).length > 0">
          <div class="text">现在下单，立即兑现</div>
          <coupon-detail class="coupon-detail" :item="couponDetail"></coupon-detail>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import AnimatedInteger from 'components/animated-integer'
  import GetBankcard from 'components/get-bankcard'
  import CouponDetail from 'components/coupon-detail'
  import {
    publishToBuy,
    publishToSell
  } from 'api/transaction'
  import {
    getFastTraderAward
  } from 'api/activity'
  export default {
    name: "quick-buy-sell",
    data(){
      return{
        pendingType:[
          {
            name: "transactionRecord.buyer",
            value: "buyer",
            icon: '#icon-car-add'
          },
          {
            name: "transactionRecord.seller",
            value: "seller",
            icon: '#icon-car-sub'
          }
        ],
        pendingItem:'buyer',
        buyAmount: 0,
        sellAmount: 0,
        setBankcard: {
          pleaseSelTitle: 'component.pleaseSelRecMet',         // 请选择标题文字
          addOption:[]
        },
        amonutArr:[
          {
            name:'1000',
            value:'1000'
          },
          {
            name:'5000',
            value:'5000'
          },
          {
            name:'1万',
            value:'10000'
          },
          {
            name:'2万',
            value:'20000'
          },
          {
            name:'3万',
            value:'30000'
          },
          {
            name:'4万',
            value:'40000'
          },
          {
            name:'5万',
            value:'50000'
          },
          {
            name:'6万',
            value:'60000'
          },
          {
            name:'7万',
            value:'70000'
          },
          {
            name:'8万',
            value:'80000'
          },
          {
            name:'9万',
            value:'90000'
          },
          {
            name:'10万',
            value:'100000'
          },
        ],
        amount:0,
        max:9,
        filterBank:false,
        payType: '',
        bankNo:'',
        proofType:0,
        minAmount:1,
        couponDetail:{},
      }
    },
    props:{
      tabType:{
        type:Number,
        default:1
      }
    },
    computed:{
      ...mapGetters([
        'userData',
        'userBalance',
        'noBankCardTip',
      ])
    },
    components:{
      AnimatedInteger,
      GetBankcard,
      CouponDetail
    },
    watch:{
      pendingItem(val) {
        this.filterBank = val === 'seller' ? true : false
      },
      tabType(val){
        this.pendingItem = val === 1 ? 'buyer' : 'seller'
      }
    },
    methods:{
      formatCny(type){
        const amount = type === 1 ? this.buyAmount : this.sellAmount
        return _.floor(amount * 0.01, 2);
      },
      selCardChange(selCard){
        this.payType = selCard;
      },
      publishBuyOrSell() {
        const buySellAmount = this.pendingItem === 'seller' ? this.sellAmount : this.buyAmount
        if (buySellAmount == '' || buySellAmount == 0) {
          toast(`请输入${this.pendingItem === 'seller' ? '卖币' : '买币'}数量`);
          return;
        }
        if(this.pendingItem === 'seller' && Number(buySellAmount) > Number(this.userBalance)){
          toast('余额不足!请输入正确的卖出数量');
          this.sellAmount = this.userBalance
          return;
        }
        if (this.payType == '' || !this.payType) {
          toast(`请选择${this.pendingItem === 'seller' ? '收款' : '支付'}方式`);
          return;
        }
        if (this.payType.type == '1') {
          this.typeBank = '支付宝'
        } else if (this.payType.type == '2') {
          this.typeBank = '微信'
        } else {
          this.typeBank = this.payType.bank
        }
        this.requestda = {
          userId: this.userData.userId,
          orderOptionVo: {
            minUnit: this.minAmount,//等于发布的数量
            contractType: 1,
            mode: 1
          },
          accountChainVo: {
            name: this.userData.nickname,
            address: this.userData.accountChainVos[0].address,
            assetCode: 'UET', //资产编码 默认 UET,登录后资产的编码
            amount: buySellAmount //uet的数量
          },
          accountCashVo: {
            "account": this.payType.account,
            "bank": this.typeBank, //机构名称
            "name": this.payType.name,
            "type": this.payType.type,
            "amount": buySellAmount / 100
          },
        }
        if (this.pendingItem === 'seller') {
          Object.assign(this.requestda.orderOptionVo,{
            proofType: this.proofType
          })
        }
        console.log('requestda',this.requestda)
        const api = this.pendingItem === 'buyer' ? publishToBuy : publishToSell
        api(this.requestda).then((res) => {
          console.log(res)
          if (res.code == '10000') {
            this.buyAmount = 0;
            this.sellAmount = 0;
            this.$store.dispatch('GET_USERBALANCE')
            toast('下单成功');
          } else {
            toast(res.message)
          }
        }).catch(err => {
          toast(err.message);
        })
      },
      getGift(){
        getFastTraderAward({}).then(res => {
          if(res.code === 10000){
            if(res.data && !_.isNull(res.data)){
              this.couponDetail = res.data
            }
          }
        })
      },
    },
    created(){
      this.pendingItem = this.tabType === 1 ? 'buyer' : 'seller'
    },
    mounted(){
      this.getGift()
    }
  }
</script>

<style lang="scss" scoped>
  .quick-main{
    .tabs{
      width: 400px;
      margin: 40px auto;
      ul{
        width: 100%;
        height: 105px;
        border: 1px solid #D3D3D3;
        border-radius: 5px;
        display: flex;
        background: #ffffff;
        overflow: hidden;
        li{
          width: 50%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: #333333;
          transition: all .5s;
          cursor: pointer;
          .icon{
            width: 30px;
            height: 25px;
            margin-bottom: 15px;
            color: #ffffff;
          }
          &.active{
            background: #3573FA;
            color: #ffffff;
          }
        }
      }
    }
    .tip{
      p{
        text-align: center;
        margin-bottom: 16px;
      }
      .red{
        color: #FF1100;
      }
    }
    .content-info{
      width: 696px;
      margin: 20px auto;
    }
    .amount-list{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .amount-item{
        width: 100px;
        height: 40px;
        background: #FFFFFF;
        border: 1px solid #E4E4E4;
        line-height: 40px;
        text-align: center;
        margin-right: 16px;
        margin-bottom: 16px;
        cursor: pointer;
        transition: all .5s;
        &:hover{
          background: #3573FA;
          border: 1px solid #3573FA;
          color: #ffffff;
        }
      }
    }
    .buy-input{
      width: 300px;
      height: 40px;
      line-height: 40px;
      background: #FFFFFF;
      border: 1px solid #E4E4E4;
      padding-left: 10px;
      font-size: 16px;
      margin-top: 5px;
    }
    .sell-container{
      margin-top: 5px;
      .info{
        display: flex;
        position: relative;
        align-items: center;
        margin-bottom: 21px;
      }
      .sell-input{
        width: 300px;
        height: 40px;
        background: #FFFFFF;
        border: 1px solid #E4E4E4;
        padding-left: 10px;
        font-size: 16px;
      }
      .amount-type{
        position: absolute;
        left: 48%;
      }
      .all-in{
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #3573FA;
        border: 1px solid #3573FA;
        color: #FFFFFF;
        cursor: pointer;
      }
      .all-amount{
        width: 400px;
        height: 40px;
        background: #F8F8F8;
        border: 1px solid #E4E4E4;
        line-height: 40px;
        padding-left: 21px;
        font-size: 16px;
      }
      .sel-bank{
        width: 400px;
        height: 40px;
      }
    }
    .submit-btn{
      width: 300px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: #3573FA;
      border: 1px solid #3573FA;
      border-radius: 4px;
      color: #FFFFFF;
      margin-top: 30px;
      cursor: pointer;
      font-size: 18px;
    }
    .coupon-info{
      padding-top: 25px;
      .text{
        margin-bottom: 10px;
      }
      .coupon-detail{
        width: 555px;
        height: 128px;
        margin: 0;
      }
    }
  }
</style>