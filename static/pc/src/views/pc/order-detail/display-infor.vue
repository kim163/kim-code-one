<template>
  <div class="display-infor-content">
    <div class="col-33 trading-info">
      <h3 v-if="isCredit" class="h3">卖方 : {{DetailList.debitName}} ({{DetailList.debitAccountNameTwin}})</h3>
      <h3 v-else-if="isDebit" class="h3">买方 : {{DetailList.creditName}}
        ({{DetailList.creditAccountNameTwin}})</h3>
      <ul class="details-data">
        <li class="cfx">
          <p>交易金额:</p>
          <template v-if="!hideAmount">
            <input type="text" class="red" readonly  v-if="isHistory" :value="DetailList.amountTwin+' CNY'">
            <input type="text" class="red" readonly v-else :value="DetailList.debitAmountTwin+' CNY'">
          </template>
          <template v-else>
            <input type="text" class="red" readonly value="选择付款方式后会生成金额">
          </template>
        </li>
        <li class="cfx">
          <p>交易数量:</p>
          <input type="text" readonly :value="DetailList.amount+' UET'" v-if="isHistory">
          <input type="text" readonly :value="DetailList.debitAmount+' UET'" v-else>
        </li>
        <li class="cfx">
          <p>交易单价:</p>
          <input type="text" readonly value="0.01 CNY">
        </li>
        <li class="cfx">
          <p>订单时间:</p>
          <input type="text" readonly :value="DetailList.createtime | Date('yyyy-MM-dd hh:mm:ss')">
        </li>
      </ul>
    </div>
    <div class="col-33">
      <h4 v-if="isCredit" class="h3">卖家收款方式 : </h4>
      <h4 v-else-if="isDebit" class="h3">我的收款方式 : </h4>
      <div class="alipay-box"
           v-if="DetailList.debitAccountMerchantTwin == '支付宝' || DetailList.debitAccountMerchantTwin == '微信'">
        <p class="alipay-box-title cfx">
          <span class="alipay-logo fl">
            <i class="iconfont icon-bind-alipay" v-if="DetailList.debitAccountMerchantTwin == '支付宝'"></i>
            <i class="iconfont icon-bind-wechat" v-else-if="DetailList.debitAccountMerchantTwin == '微信'"></i>
          </span>
          <span class="alipay-text fl">
            {{DetailList.debitName}} ({{DetailList.debitAccountNameTwin}})<br> {{DetailList.debitAccountTwin}}
          </span>
        </p>
        <div class="alipay-qrcode">
          <img src="~images/qrcode.jpg" :src="DetailList.debitAccountQrCodeUrlTwin" class="qrcode-img"/>
          <p class="disp-inlblo">打开 {{DetailList.debitAccountMerchantTwin}} [扫一扫] </p>
        </div>
      </div>

      <div class="alipay-box" v-else>
        <p class="alipay-box-title text-center bank-title">
          <span class="bank-logo">
             <img :src="getPicArr(DetailList.debitAccountMerchantTwin)" alt="银行卡" class="bank-pic">
          </span>
          {{DetailList.debitAccountMerchantTwin}}
        </p>
        <div class="alipay-qrcode text-left bank-txt-box">
          <div class="bank-list-p posit-rel">
            <h3>银行卡号：</h3>
            <p>{{DetailList.debitAccountTwin}}</p>
            <button class="copyBtn btn-copy" @click="copystr(DetailList.debitAccountTwin)">复制卡号</button>
          </div>
          <div class="bank-list-p posit-rel">
            <h3>开户姓名：</h3>
            <p><span class="name"> {{DetailList.debitName}} </span> ({{DetailList.debitAccountNameTwin}})</p>
            <button class="copyBtn btn-copy" @click="copystr(DetailList.debitAccountNameTwin)">复制姓名</button>
          </div>
          <div class="bank-list-p posit-rel">
            <h3>银行类别：</h3>
            <p>{{DetailList.debitAccountMerchantTwin}} (储蓄卡)</p>
          </div>
        </div>
      </div>

      <p v-if="isCredit && isTrading" class="tips-info">
        请按照卖家要求的付款方式付款
      </p>

      <p v-else-if="isDebit && isTrading" class="tips-info">
        如果收到款项不确定是否对方付的，请点右下角 在线聊天 跟对方会话
      </p>
    </div>
    <div  class="col-33 hidden">
      <h4 class="h3">买家付款方式 : </h4>
      <div class="alipay-box"
           v-if="DetailList.creditAccountMerchantTwin == '支付宝' || DetailList.creditAccountMerchantTwin == '微信'">
        <p class="alipay-box-title cfx">
           <span class="alipay-logo fl">
             <i class="iconfont icon-bind-alipay" v-if="DetailList.creditAccountMerchantTwin == '支付宝'"></i>
             <i class="iconfont icon-bind-wechat" v-else-if="DetailList.creditAccountMerchantTwin == '微信'"></i>
           </span>
          <span class="alipay-text fl">
            {{DetailList.creditName}}（{{DetailList.creditAccountNameTwin}}）<br>{{DetailList.creditAccountTwin}}
          </span>
        </p>
        <div class="alipay-qrcode">
          <img src="~images/qrcode.jpg" :src="DetailList.creditAccountQrCodeUrlTwin" class="qrcode-img"/>
          <p class="disp-inlblo">打开 {{DetailList.creditAccountMerchantTwin}} [扫一扫] </p>
        </div>
      </div>

      <div class="alipay-box" v-else>
        <p class="alipay-box-title text-center">
          <i class="i-bank" :class="DetailList.creditAccountMerchantTwin"></i>{{DetailList.creditAccountMerchantTwin}}
        </p>
        <div class="alipay-qrcode text-left bank-txt-box">
          <div class="bank-list-p">
            <h3>银行卡号:</h3>
            {{DetailList.creditAccountTwin}}
            <button class="copyBtn btn-copy" @click="copystr(DetailList.creditAccountTwin)">复制卡号</button>
            <br>
          </div>
          <div class="bank-list-p">
            <h3>开户姓名：</h3>
            {{DetailList.creditName}}（{{DetailList.creditAccountNameTwin}}）
            <button class="copyBtn btn-copy" @click="copystr(DetailList.creditAccountNameTwin)">复制姓名</button>
            <br>
          </div>
          <div class="bank-list-p">
            <h3>银行类别：</h3>
            {{DetailList.creditAccountMerchantTwin}} (储蓄卡)<br>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import getBankUrl from '@/util/bankurl'

  export default {
    data() {
      return {};
    },
    props: {
      DetailList:{
        type: Object,
        default:{}
      },
      isCredit:{
        type:Boolean,
        default:false
      },
      isDebit:{
        type:Boolean,
        default:false
      },
      isHistory:{
        type:Boolean,
        default:false
      },
      isTrading:{
        type:Boolean,
        default:false
      },
      hideAmount:{
        type:Boolean,
        default:false
      }
    },
    methods: {
      getPicArr(cont) {
        return getBankUrl(cont);
      },
      copystr(text) {
        text.$copy();
        toast(this.$t('transactionHome.successCopy'));
      }
    },
    computed: {},
    created() {
    },
    components: {}
  };
</script>
<style lang="scss" scoped>
.display-infor-content{
  float: left;
  width: 72%;
  .details-data{
    li{
      height: 40px;
      line-height: 40px;
      margin-bottom: 21px;
    }
    p {
      font-size: 16px;
      padding: 0 10px;
      width: 29%;
      float: left;
      text-align: right;
    }
    input {
      height: 40px;
      line-height: 40px;
      border: 1px solid #E4E4E4;
      width: 61.5%;
      padding: 0 20px;
      font-size: 16px;
      color: #333333;
      float: left;
      display: block;
      &.red{
        color: #FF1100;
      }
    }
    input:read-only {
      background: #F8F8F8;
    }
  }
  div.col-33 {
    display: block;
    float: left;
    width: 52.3%;
    border-right: 1px solid #d4d4d4;
    margin: 0;
    min-height: 435px;
    &.trading-info{
      width: 47.7%;
    }
  }
  .tips-info{
    padding: 10px 42px 0;
    font-size: 14px;
    color: #ec3a4e;
    line-height: 26px;
  }
  .alipay-box {
    width: 370px;
    height: 240px;
    margin: 0 auto;
    background: url("~images/bank-cardbg.png") no-repeat center top;
    background-size: contain;
    padding-top: 42px;

    .alipay-box-title {
      padding: 0 30px;
      font-size: 16px;
      color: #FFFFFF;
      &.bank-title{
        padding: 10px 20px 0;
        line-height: 36px;
      }
    }
    .alipay-logo{
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 36px;
      background: #FFFFFF;
      border-radius: 35px;
      text-align: center;
      margin-right: 6px;
      i{
         font-size: 28px;
        &.icon-bind-alipay{
          color: #00AAEE;
        }
        &.icon-bind-wechat{
          color: #3CB034;
        }
      }
    }

    .alipay-qrcode {
      color: #FFFFFF;
      text-align: center;
      padding:5px 30px 0;
      &.text-left {
        text-align: left;
      }
      &.bank-txt-box {
        padding:5px 20px 0;
      }
      .bank-list-p{
         line-height: 38px;
         display: -webkit-flex;
         display: flex;
         flex-wrap: wrap;
         justify-content: normal;
      }
      h3 {
        font-weight: normal;
        font-size: 14px;
        color: #FFFFFF;
      }
      p{
        font-size: 14px;
        .name{
          max-width: 90px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          float: left;
        }
      }
      img {
        width: 100px;
        height: 100px;
        padding: 12px;
        display: inline-block;
      }
    }
  }
  .h3{
    font-weight: normal;
    font-size: 20px;
    color: #333333;
    padding: 0 42px;
    line-height: 102px;
  }
  .btn-copy {
    position: absolute;
    right: 0;
    padding: 3px 7px;
    font-size: 14px;
    color: #FFFFFF;
    border: 1px solid #FFFFFF;
    border-radius: 2px;
    cursor: pointer;
    margin-top: 5px;
  }
  .bank-logo{
    display: inline-block;
    height: 36px;
    line-height: 34px;
    width: 40px;
    background: #FFFFFF;
    border-radius: 35px;
    text-align: center;
    img{
      width: 25px;
    }
  }
}

</style>
