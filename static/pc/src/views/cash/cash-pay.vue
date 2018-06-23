<template>
    <div class="pay-main">
      <div class="amout-info">
        <div class="amount-detail">
          <div class="title">UET钱包支付</div>
          <div class="blance">{{$t('cash.balance')}}：<balance @getBalance="getUserBalance"></balance></div>
          <div class="amount-status" :class="amountStatus ? 'green' : 'red'">
            {{ amountStatus ? $t('cash.enough') : $t('cash.notEnough')}}
          </div>
        </div>
      </div>
      <div class="pay-password">
        <div class="input-info">
          <div class="title">{{$t('cash.payPassWord')}}:</div>
          <input type="password" class="input-password" v-model.trim="payPassword" :placeholder="$t('cash.psdInputPlaceholder')"/>
        </div>
        <div class="btn-info">
          <!--<router-link :to="{name: 'mIndex'}" class="go-tran">{{$t('cash.goTran')}}</router-link>-->
          <div class="pay-btn" :class="{disabled: !amountStatus || !payBtn}" @click="amountStatus && payBtn ? payment() : ''">{{$t('cash.confirmPayment')}}</div>
        </div>
        <div class="go-app-pay" @click="$emit('appPay')">手机APP扫码支付</div>
      </div>
    </div>
</template>

<script>
  import Balance from 'components/balance'
  export default {
    name: "pc-cash-pay",
    data(){
      return{
        amountStatus: false, //余额状态
        payPassword:'',
        userBalance:0,
      }
    },
    components:{
      Balance
    },
    watch:{
      payInfo(){
        if(Number(this.payInfo.coinAmount) <= this.userBalance){
          this.amountStatus = true
        }else{
          this.amountStatus = false
        }
      }
    },
    props:{
      payInfo:{
        type:Object,
        default:{}
      },
      payBtn:{
        type:Boolean,
        default:true
      }
    },
    methods:{
      payment(){
        if(this.payPassword != ''){
          Vue.$global.bus.$emit('cash:payPassword',this.payPassword);
        }else{
          toast('请输入支付密码')
        }
      },
      getUserBalance(data){
        this.userBalance = data
        if(Number(this.payInfo.coinAmount) <= this.userBalance){
          this.amountStatus = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pay-main{
    width: 500px;
    height: 340px;
    background-color: #ffffff;
    border: solid 1px #e4e4e4;
    .amout-info{
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      padding: 0 15px;
      border-bottom: 1px solid #D8D8D8;

      .amount-detail{
        display: flex;
        justify-content: space-between;
      }
      .blance{
        color: #787876;
      }
    }
    .pay-password{
      padding: 62px 20px 0px;
      font-size: 15px;
      .input-info,.btn-info{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
      .input-password{
        width: 344px;
        height: 40px;
        background: #FFFFFF;
        border: 1px solid #DEDEDE;
        padding-left: 10px;
      }
      .pay-btn,.go-tran{
        width: 40%;
        height: 50px;
        background: #4982FF;
        text-align: center;
        line-height: 50px;
        color: #ffffff;
        font-size: 18px;
        margin-top: 30px;
        &.disabled{
          background: #E4E4E4;
          color: #787876;
        }
      }
      .go-tran{
        display: block;
        background: #86A5F8;
      }
      .go-app-pay{
        font-size: 14px;
        color: #333333;
        margin-top: 30px;
        cursor: pointer;
      }
    }
    .title{
      color: #333333;
    }
    .green{
      color: #14CA39;
    }
    .red{
      color: #FF0000;
    }
  }
</style>