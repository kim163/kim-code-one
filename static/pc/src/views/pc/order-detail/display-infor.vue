<template>
  <div class="display-infor-content">
    <div class="col-33">
      <h3 v-if="isCredit" class="h3">卖方 : {{DetailList.debitName}} ({{DetailList.debitAccountNameTwin}})</h3>
      <h3 v-else-if="isDebit" class="h3">买方 : {{DetailList.creditName}}
        ({{DetailList.creditAccountNameTwin}})</h3>
      <ul class="details-data">
        <li class="cfx">
          <p>交易金额:</p>
          <input type="text" class="red" readonly :value="DetailList.debitAmountTwin+' CNY'">
        </li>
        <li class="cfx">
          <p>交易数量:</p>
          <input type="text" readonly :value="DetailList.debitAmount+' UET'">
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
    <div v-if="isCredit" class="col-33">
      <h4 class="bank-title">卖家收款方式 : </h4>
      <div class="alipay-box"
           v-if="DetailList.debitAccountMerchantTwin == '支付宝' || DetailList.debitAccountMerchantTwin == '微信'">
        <p class="alipay-box-title">
          <i class="i-alipay" v-if="DetailList.debitAccountMerchantTwin == '支付宝'"></i>
          <i class="i-wechat" v-else-if="DetailList.debitAccountMerchantTwin == '微信'"></i>
          {{DetailList.debitName}} ({{DetailList.debitAccountNameTwin}})<br> {{DetailList.debitAccountTwin}}
        </p>
        <div class="alipay-qrcode">
          <img src="~images/qrcode.jpg" :src="DetailList.debitAccountQrCodeUrlTwin" class="qrcode-img"/>
          <p>打开 {{DetailList.debitAccountMerchantTwin}} [扫一扫] </p>
        </div>
      </div>

      <div class="alipay-box" v-else>
        <p class="alipay-box-title text-center bank-title">
          <i class="i-bank" :class="DetailList.debitAccountMerchantTwin | bankIcon"></i>{{DetailList.debitAccountMerchantTwin}}
        </p>
        <div class="alipay-qrcode text-left bank-txt-box">
          <div class="bank-list-p">
            <h3>银行卡号:</h3>
            {{DetailList.debitAccountTwin}}
            <button class="copyBtn btn-copy" @click="copystr(DetailList.debitAccountTwin)">复制卡号</button>
            <br>
          </div>
          <div class="bank-list-p">
            <h3>开户姓名：</h3>
            {{DetailList.debitName}} ({{DetailList.debitAccountNameTwin}})
            <button class="copyBtn btn-copy" @click="copystr(DetailList.debitAccountNameTwin)">复制姓名</button>
            <br>
          </div>
          <div class="bank-list-p">
            <h3>银行类别：</h3>
            {{DetailList.debitAccountMerchantTwin}} (储蓄卡)<br>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="isDebit" class="col-33">
      <h4 class="bank-title">买家付款方式 : </h4>
      <div class="alipay-box"
           v-if="DetailList.creditAccountMerchantTwin == '支付宝' || DetailList.creditAccountMerchantTwin == '微信'">
        <p class="alipay-box-title">
          <i class="i-alipay" v-if="DetailList.creditAccountMerchantTwin == '支付宝'"></i>
          <i class="i-wechat" v-else-if="DetailList.creditAccountMerchantTwin == '微信'"></i>
          {{DetailList.creditName}}（{{DetailList.creditAccountNameTwin}}）<br>{{DetailList.creditAccountTwin}}
        </p>
        <div class="alipay-qrcode">
          <img src="~images/qrcode.jpg" :src="DetailList.creditAccountQrCodeUrlTwin" class="qrcode-img"/>
          <p>打开 {{DetailList.creditAccountMerchantTwin}} [扫一扫] </p>
        </div>
      </div>

      <div class="alipay-box" v-else>
        <p class="alipay-box-title text-center">
          <i class="i-bank" :class="DetailList.creditAccountMerchantTwin | bankIcon"></i>{{DetailList.creditAccountMerchantTwin}}
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
      }
    },
    methods: {
      copystr(text) {
        text.$copy();
        toast(this.$t('transactionHome.successCopy'));
      }
    },
    computed: {},
    created() {
    },
    components: {},
    filters: {
      bankIcon: function (value) {
        if (!value) return 'icbc';
        if (value == '工商银行') {
          return 'icbc';
        }
        if (value == '招商银行') {
          return 'cmbc';
        }
        //value = value.toString()
        return value
      }
    }
  };
</script>
<style lang="scss">
.display-infor-content{
  float: left;
  width: 66%;
  .details-data{
    li{
      height: 40px;
      line-height: 40px;
      margin-bottom: 21px;
    }
    p {
      font-size: 16px;
      padding: 0 10px;
      width: 30%;
      float: left;
      text-align: right;
    }
    input {
      height: 40px;
      line-height: 40px;
      border: 1px solid #E4E4E4;
      width: 60%;
      padding: 0 20px;
      font-size: 16px;
      float: left;
      display: block;
    }
    input:read-only {
      background: #F8F8F8;
    }
  }
  div.col-33 {
    display: block;
    float: left;
    width: 50%;
    border-right: 1px solid #d4d4d4;
    margin: 0;
    min-height: 435px;
    min-width: 350px;
  }
  .alipay-box {
    margin: 0 50px 20px;
    .alipay-box-title {
      border: 1px solid #d4d4d4;
      padding: 10px 10px 10px 10px;
      background-size: 30px;
      font-size: 16px;
      &.bank-ttile {
        font-size: 20px;
      }
    }
    .i-alipay {
      display: inline-block;
      float: left;
      height: 50px;
      width: 38px;
      background: url('~images/i-alipay.png') no-repeat left center;
      background-size: 30px;
    }
    .i-wechat {
      display: inline-block;
      float: left;
      height: 50px;
      width: 38px;
      background: url('~images/i-wechat.png') no-repeat left center;
      background-size: 30px;
    }
    .alipay-qrcode {
      background: #4aa9e9;
      color: #fff;
      text-align: center;
      padding: 18px;
      &.text-left {
        text-align: left;
      }
      &.bank-txt-box {
        padding: 18px 22px;
      }
      h3 {
        font-weight: normal;
        font-size: 18px;
        padding: 2px 0 8px;
      }
      img {
        width: 160px;
        height: 160px;
        padding: 12px;
        background: url('~images/j.png') no-repeat;
        margin-bottom: 5px;
        display: inline-block;
      }
    }
  }
  .h3, .bank-title {
    font-weight: normal;
    font-size: 20px;
    color: #333333;
    padding: 0 42px;
    line-height: 102px;
  }
  .btn-copy {
    position: absolute;
    right: 0;
    bottom: 0;
    color: #fff;
    border: 0;
    cursor: pointer;
  }

  .i-bank {
    display: inline-block;
    height: 40px;
    width: 46px;
    vertical-align: -13px;
    background: url(~images/bankIcon/juan-bank.png) no-repeat;
    background-size: contain;
    &.icbc {
      background: url(~images/bankIcon/icbc.png) no-repeat;
      background-size: 40px;
    }
    &.cmbc {
      background: url(~images/bankIcon/cmbc.png) no-repeat;
      background-size: 40px;
    }
  }
}

</style>
