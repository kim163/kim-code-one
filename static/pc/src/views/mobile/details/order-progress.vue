<template>
  <div class="transell-main transell-main-box">
    <!--<m-header>{{$t('postPend.postTitle')}}</m-header>-->
    <m-header>订单详情</m-header>

    <div class="cash-details">
      <div class="trade-time-bar">
        <span class="c-blue">买入</span>
        <span class="fr">等待付款 1小时59份59秒</span>
      </div>
      <ul class="details-ul">
        <li>
          <span class="l-title">订单号 :</span>
          <span class="fr order-id-li">{{$route.params.id}}</span>
        </li>
        <li>
          <span class="l-title">卖方 :</span>
          <span class="fr">{{DetailList.debitName}}</span>
        </li>
        <li>
          <span class="l-title">交易金额 :</span>
          <span class="fr">
                 <span class="red">{{DetailList.debitAmountTwin}} CNY</span>
             </span>
        </li>
        <li>
          <span class="l-title">交易数量 :</span>
          <span class="fr">
                 <span class="red">{{DetailList.debitAmount}} UET</span>
             </span>
        </li>
        <li>
          <span class="l-title">交易单价 :</span> <span class="fr">0.01 CNY</span>
        </li>
      </ul>
      <ul class="details-ul pay-detail">
        <li>
          <span class="l-title">卖家收款 : </span>
          <span class="fr0">
            <span v-if="DetailList.debitAccountMerchantTwin == '支付宝'"><i class="iconfont icon-pay-alipay"></i></span>
            <span v-if="DetailList.debitAccountMerchantTwin == '微信'"><i class="iconfont icon-pay-wechat"></i></span>
            {{DetailList.debitAccountMerchantTwin}}
          </span>
        </li>
        <li>
          <span class="l-title">收款姓名 : </span>
          <span class="fr0">{{DetailList.debitAccountNameTwin}}</span>
        </li>
        <li>
          <span class="l-title">收款账号 : </span>
          <span class="fr0">
                 <span class="">{{DetailList.debitAccountTwin}}</span>
             </span>
        </li>
        <li class="heightauto">
          <span class="l-title">收款二维码 : </span>
          <span class="qrcode-box">
                <!--<img src="~images/qrcode.jpg" :src="DetailList.debitAccountQrCodeUrlTwin" class="qrcode-img">-->
                <img src="~images/qrcode.jpg" class="qrcode-img">
                 <span class="qrcode-tips">长按二维码保存</span>
           </span>
        </li>

      </ul>

      <div class="btn-group">
          <input type="button" class="btn btn-block btn-primary"  value="我已完成付款">
          <input type="button" class="btn btn-block btn-cancel"  value="取消订单">
      </div>
    </div>

  </div>
</template>

<script>
  import mHeader from "components/m-header"

  import { generateTitle } from '@/util/i18n'
  import { transaction } from 'api'
  import {mapGetters,mapActions,mapMutations} from 'vuex'

  export default {
    data() {
      return {
        DetailList: {

        },
        orderData:{
          orderId:this.$route.params.id,
          debitName:'', // 交易买方

        }
      };
    },
    methods: {
      generateTitle,
      fetchData(){
        this.loading = true;
        this.request={
          orderId:this.$route.params.id
        }
        transaction.getOrderx(this.request).then(res => {
          this.loading = false;
          console.log('订单详情记录:');
          console.log(res.data);
          this.DetailList = res.data;
          this.DetailList.creditProofUrlTwin = res.data.creditProofUrlTwin.split(',');

          console.log('图片分解')
          console.log(res.data.creditProofUrlTwin.split(','))
        }).catch(error => {
          this.reset(res.message);
        });

        this.loading = false;
      },
    },
    created() {
      this.fetchData();
    },
    watch: {

    },
    computed: {
      ...mapGetters(["userData","islogin"]),
    },
    components: {
      mHeader
    }
  };

</script>

<style lang="scss">
  @import "~assets/scss/mobile";

  .cas-main{
    background: #F5F5F5;
  }
  .order-id-li{
   width:79%;
    text-align: right;
    word-break: break-all;
  }
  .c-red,.red{color:red;}
  .c-blue{color:#5087FF;}
  .trade-time-bar{
    background: #fff;
    padding:r(10) r(15);
    height:r(40);
    border-bottom:1px solid #d8d8d8;
    margin-bottom:r(10);
  }
  .details-ul{
    border-bottom:1px solid #d8d8d8;
    border-top:1px solid #d8d8d8;
    margin-bottom:r(10);
  li{
    background: #fff;
    min-height:r(35);
    padding:r(10) r(15);
    font-size:f(14);
    color:#8f8f8f;
    overflow:hidden;
    /*border-bottom:1px solid #f9f9f9;*/
    &.heightauto{
      height:180px;
    }
     .qrcode-img{
       width:150px;
     }
     .fr0{
       padding:0 0 0 r(10);
     }
     .qrcode-tips{
       display:inline-block;
        width:r(100);
       word-break: break-all;
      }
  .l-title{
    display:inline-block;
    float:left;
    /*width:r(85);*/
    /*text-align: right;*/
    color:#333;
  }
  }
  }


  .btn-group{
     padding:r(10) r(15);
      .btn {
        display: inline-block;
        color: #5087ff;
        border-radius: 4px;
        height: r(45);
        line-height: r(45);
        padding: 0 r(20);
        margin: r(10)0 0 0;
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
      .btn-block{
        display:block;
        width:100%;
      }
      .btn-gray{
        background: #E4E4E4;
      }
  }
</style>
