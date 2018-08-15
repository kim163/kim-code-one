<template>
  <div class="transell-main0 transell-main-box">
    <m-header v-if="DetailList.credit==userData.userId">我的买币订单</m-header>
    <m-header v-else-if="DetailList.debit==userData.userId">我的卖币订单</m-header>
    <div class="m-order-details">
      <!--买家流程图-->
      <div class="payOrder_progress" v-if="DetailList.credit==userData.userId">
        <div class="progress_state">
          <img src="~images/startpay.png" alt="">
          <p class="defaultColor">等待我付款</p>
          <span class="line"></span>
        </div>
        <div class="progress_state">
          <img src="~images/waitpay_next.png" alt="">
          <p class="defaultColor">等待对方放币</p>
          <span class="line"></span>
        </div>
        <div class="progress_state">
          <img src="~images/trade_success_next.png" alt="">
          <p class="defaultColor">交易成功</p>
        </div>
      </div>
      <!--卖家流程图-->
      <div class="payOrder_progress" v-else-if="DetailList.debit==userData.userId">
        <div class="progress_state">
          <img src="~images/startpay.png" alt="">
          <p class="defaultColor">等待对方付款</p>
          <span class="line"></span>
        </div>
        <div class="progress_state">
          <img src="~images/waitpay_next.png" alt="">
          <p class="defaultColor">等待我放币</p>
          <span class="line"></span>
        </div>
        <div class="progress_state">
          <img src="~images/trade_success_next.png" alt="">
          <p class="defaultColor">交易成功</p>
        </div>
      </div>
      <div class="trade-time-bar">
        <p class="pay_send">订单完成</p>
        <p class="pay_send">交易成功获赠{{}}UET</p>
      </div>
      <!--  申诉订单显示 -->
      <!--<div class="mobilenav-tabs">-->
      <!--<span v-for="(item,i) in detailType" @click="detailTypeItem=item.value" :class="{active:detailTypeItem==item.value}" :key="item.value">-->
      <!--{{item.value}}-->
      <!--</span>-->
      <!--</div>-->

      <div v-if="detailTypeItem =='订单详情'">
        <ul class="details-ul">
          <li>
            <p class="l-title">订单 :</p>
            <p class="order-id-li">{{orderData.orderId}}</p>
          </li>
          <li>
            <span class="l-title">交易数量 :</span>
            <span>
                     <span class="l-title">{{DetailList.debitAmount}} UET</span> <span class="equal_money"> ≈ ¥ {{DetailList.debitAmount*0.01}} </span>
                 </span>
          </li>
        </ul>
        <!--卖币订单-->
        <ul class="details-ul pay-detail my-paymethod">
          <li>
              <span class="l-title">
                 <img src="~images/chatWith/buyer.png" alt="" class="character">
                {{DetailList.creditName}}</span>
          </li>
        </ul>
        <ul class="details-ul pay-detail">
          <li>
              <span class="l-title">
                 <img src="~images/chatWith/seller.png" alt="" class="character">
                我</span>
          </li>
          <li>
            <span class="l-title">卖家收款 : </span>
            <div class="fr0">
              <span v-if="DetailList.debitAccountMerchantTwin == '支付宝'"><i class="iconfont icon-pay-alipay"></i></span>
              <span v-else-if="DetailList.debitAccountMerchantTwin == '微信'"><i
                class="iconfont icon-pay-wechat"></i></span>
              <span v-else><i class="iconfont icon-pay-bank"></i></span>
              {{DetailList.debitAccountMerchantTwin}}
            </div>
          </li>
          <li>
            <span class="l-title">收款姓名 : </span>
            <div class="fr0">{{DetailList.debitAccountNameTwin}}
              <!--<a href="javascript:void(0);" class="copy-btn" @click="copystr(DetailList.debitAccountNameTwin)" >{{$t('transactionHome.copyBtn')}}</a>-->
            </div>
          </li>
          <li class="heightauto"
              v-if="DetailList.debitAccountMerchantTwin == '支付宝' || DetailList.debitAccountMerchantTwin == '微信'">
            <span class="l-title">收款二维码 : </span>
            <div class="qrcode-box" v-if="DetailList.debitAccountQrCodeUrlTwin != ''">
              <img src="~images/qrcode.jpg" :src="DetailList.debitAccountQrCodeUrlTwin" class="qrcode-img"/>
              <span class="qrcode-tips">长按二维码保存</span>
            </div>
          </li>
        </ul>
        <div class="btn-group">
          <!--<input type="button" class="btn btn-block btn-gray" readonly  value="我已付款">-->
        </div>
      </div>
      <div v-if="detailTypeItem =='申诉与仲裁'">
        <div class="trade-time-bar">
          申诉与仲裁
          <span class="fr red">卖方获胜</span>
        </div>
      </div>

    </div>
    <div class="btn-group">
      <input type="button" class="btn btn-block btn-primary" value="关闭页面">
    </div>
  </div>
</template>

<script>
  import mHeader from "components/m-header"
  import {generateTitle} from '@/util/i18n'
  import {transaction} from 'api'
  import {mapGetters} from 'vuex'
  import Clipboard from 'clipboard';

  export default {
    data() {
      return {
        detailType: [
          {name: 'detail.buyUet', value: '订单详情'},
          {name: 'detail.saleUet', value: '申诉与仲裁'}
        ],
        detailTypeItem: '订单详情',
        DetailList: {},
        orderData: {
          orderId: this.$route.params.id,
          debitName: '', // 交易买方
        }
      };
    },
    methods: {
      generateTitle,
      fetchData() {
        this.loading = true;
        this.request = {
          transactionId: this.$route.params.id
        }
        transaction.getCoinTransactionHistory(this.request).then(res => {
          this.loading = false;
          this.DetailList = res.data;
          //  多个图片分解
          if (res.data.creditProofUrlTwin && res.data.creditProofUrlTwin.length > 1) {
            this.DetailList.creditProofUrlTwin = res.data.creditProofUrlTwin.split(',');
          }

        }).catch(error => {
          toast(error.message);
        });
//        this.loading = false;
      },
      fetchDiscountInfo(){
        const request ={

        }
      },
      copy() {
        var clipboard = new Clipboard('.copy-btn')
        clipboard.on('success', e => {
          toast('复制成功')
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          // 释放内存
          clipboard.destroy()
        })
      }
    },
    created() {
      this.fetchData();
    },
    watch: {
      "$route": "fetchData"
    },
    computed: {
      ...mapGetters(["userData", "islogin"]),
      ...mapGetters(["userId"]),
    },
    components: {
      mHeader
    }
  };

</script>

<style lang="scss">
  @import "~assets/scss/mobile";

  .cas-main {
    background: #F5F5F5;
  }

  .order-id-li {
    text-align: left;
    word-break: break-all;
    color: #333;
  }

  .c-red, .red {
    color: red;
  }

  .c-blue {
    color: #5087FF;
  }

  .c-orange {
    color: orange;
  }

  .trade-time-bar {
    background: #fff;
    padding: r(10) r(15);
    height: auto;
  }

  .details-ul {
    border-top: 1px solid #d8d8d8;
    li {
      background: #fff;
      min-height: r(35);
      padding: r(8) r(15);
      font-size: f(16px);
      color: #8f8f8f;
      overflow: hidden;
      &.heightauto {
        height: 180px;
      }
      .qrcode-img {
        width: 130px;
      }
      .fr0 {
        display: inline-block;
        /*width:50%;*/
        padding: 0 0 0 r(10);
      }
      .qrcode-tips {
        display: inline-block;
        width: r(99);
        word-break: break-all;
        font-size: r(12);
      }
      .l-title {
        display: inline-block;
        color: #333;
          .character{
            width: r(30);
            height: r(30);
            vertical-align: - r(8);
          }
      }
    }
  }

  .pay_send {
    font-size: r(16);
    color: #ec3a4e;
    text-align: center;
  }

  .btn-group {
    padding: r(5) r(15) r(10);
    .btn {
      display: inline-block;
      color: #5087ff;
      border-radius: 4px;
      height: r(45);
      line-height: r(45);
      padding: 0 r(20);
      margin: r(10) 0 0 0;
      cursor: pointer;
      font-size: r(18);
    }
    .btn-primary {
      border: 1px solid #5087ff;
      background: #5087ff;
      color: #fff;
    }
    .btn-cancel {
      color: #787876;
    }
    .btn-block {
      display: block;
      width: 100%;
    }
    .btn-gray {
      background: #E4E4E4;
      color: #666;
    }
  }

  .icon-pay-bank {
    color: #B764FE;
  }

  .icon-pay-wechat {
    color: #14CA39;
  }

  .icon-pay-alipay {
    color: #03A9F3;
  }

  .chatroom {
    width: r(50);
    height: r(50);
    background-color: #fff;
    position: fixed;
    right: 0;
    top: r(600);
    border-radius: 50%;
    background: url("../../../assets/images/chatbg.png") no-repeat;
    background-size: 100%;
    img {
      padding-top: r(7);
      display: block;
      width: r(20);
      height: r(20);
      margin: 0 auto;
    }
    .chatroom_num {
      font-size: r(12);
      color: #4982FF;
      line-height: r(12);
    }
  }

  .equal_money {
    color: #ec3a4e;
  }

  .payOrder_progress {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    .progress_state {
      padding-top: r(20);
      width: 33%;
      text-align: center;
      position: relative;
      img {
        width: r(33);
        height: r(30);
      }
      p {
        font-size: r(16);
        color: #333;
      }
      .line{
        position: absolute;
        right: r(-15);
        top: r(35);
        display: inline-block;
        width: r(40);
        height: r(1);
        background-color: #3573FA;
      }
      .defaultColor{
        color: #3573FA;
      }
    }
  }
</style>
