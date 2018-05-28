<template>
  <div class="transell-main transell-main-box">
    <m-header>订单详情</m-header>
    <div class="cash-details">
      <div class="trade-time-bar">
        <span class="c-blue" v-if="DetailList.type == '12'">买入</span>
        <span class="c-orange" v-if="DetailList.type == '11'">卖出</span>
        <span class="fr">等待付款 {{DetailList.intervalTime | Date('hh:mm:ss')}}</span>
      </div>

      <div class="mobilenav-tabs">
        <span v-for="(item,i) in detailType" @click="detailTypeItem=item.value" :class="{active:detailTypeItem==item.value}" :key="item.value">
            {{item.value}}
        </span>
      </div>

      <div v-if="detailTypeItem =='订单详情'">
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
              <div class="fr0">
                <span v-if="DetailList.debitAccountMerchantTwin == '支付宝'"><i class="iconfont icon-pay-alipay"></i></span>
                <span v-else-if="DetailList.debitAccountMerchantTwin == '微信'"><i class="iconfont icon-pay-wechat"></i></span>
                <span v-else><i class="iconfont icon-pay-bank"></i></span>
                {{DetailList.debitAccountMerchantTwin}}
              </div>
            </li>
            <li>
              <span class="l-title">收款姓名 : </span>
              <div class="fr0">{{DetailList.debitAccountNameTwin}}</div>
            </li>
            <li>
              <span class="l-title">收款账号 : </span>
              <div class="fr0">
                     <span class="">{{DetailList.debitAccountTwin}}</span>
                 </div>
            </li>
            <li class="heightauto">
              <span class="l-title">收款二维码 : </span>
              <div class="qrcode-box">
                    <!--<img src="~images/qrcode.jpg" :src="DetailList.debitAccountQrCodeUrlTwin" class="qrcode-img">-->
                    <img src="~images/qrcode.jpg" class="qrcode-img" />
                     <span class="qrcode-tips">长按二维码保存</span>
               </div>
            </li>

          </ul>

          <div class="btn-group">
              <input type="button" class="btn btn-block btn-primary"  value="我已完成付款">
              <input type="button" class="btn btn-block btn-primary"  value="提出发证">
              <input type="button" class="btn btn-block btn-cancel"  value="取消订单">
              <input type="button" class="btn btn-block btn-gray"  value="我已付款">

            <input type="button" class="btn btn-block btn-primary"  value="确定收款">
            <input type="button" class="btn btn-block btn-primary"  value="我要申诉">
          </div>
      </div>

      <div v-if="detailTypeItem =='申诉与仲裁'">

        <div class="trade-time-bar">
          申诉与仲裁
          <span class="fr red">卖方获胜</span>
        </div>
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
        detailType:[
          {name:'detail.buyUet', value: '订单详情' },
          {name:'detail.saleUet', value: '申诉与仲裁' }
        ],
        detailTypeItem:'订单详情',
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
  .c-orange{color:orange;}
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
    padding:r(8) r(15);
    font-size:r(16);
    color:#8f8f8f;
    overflow:hidden;
    &.heightauto{
      height:180px;
    }
     .qrcode-img{
       width:130px;
     }
     .fr0{
       display:inline-block;
       padding:0 0 0 r(10);
     }
     .qrcode-tips{
       display:inline-block;
        width:r(99);
       word-break: break-all;
       font-size:r(12);
      }
  .l-title{
    display:inline-block;
    float:left;
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
  .icon-pay-bank{
    color: #B764FE;
  }
  .icon-pay-wechat{
    color:#14CA39;
  }
  .icon-pay-alipay{
    color:#03A9F3;
  }
</style>
