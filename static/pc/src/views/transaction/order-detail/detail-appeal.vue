<template>
  <div class="transell-main transell-main-box">
    <nav-menu></nav-menu>
    <bread-crumbs :bread-list="breadList"></bread-crumbs>

    <div class="section detail-content">
      <div class="container min-width" v-if="DetailList">

        <div class="detailapp-navtabs cfx">
          <span v-for="(item,i) in detailType" @click="detailTypeItem=item.value" :class="{active:detailTypeItem==item.value}" :key="item.value">
              {{generateTitle(item.name)}}
          </span>
        </div>

        <div class="row00 detail-box" v-if="detailTypeItem=='orderDetails'">
          <div class="detail-title cfx">
            <span v-if="isCredit" class="title-btn btn-primary">买入</span>
            <span v-else-if="isDebit" class="title-btn btn-sell">卖出</span>
            <span class="order-num">
              订单号：   {{orderId}}
            </span>
          </div>
          <div class="detail-in cfx">
              <div class="col-33" >
                <h3 v-if="isCredit" class="h3">卖方 : {{DetailList.debitName}} ({{DetailList.debitAccountNameTwin}} )</h3>
                <h3 v-else-if="isDebit" class="h3">买方 : {{DetailList.creditName}} ({{DetailList.creditAccountNameTwin}})</h3>
                <ul class="details-data">
                  <li>
                    <p>交易金额:</p>
                    <input type="text" class="red" readonly :value="DetailList.debitAmountTwin+' CNY'" >
                  </li>
                  <li>
                    <p>交易数量:</p>
                    <input type="text" readonly  :value="DetailList.debitAmount+' UET'">
                  </li>
                  <li>
                    <p>交易单价:</p>
                    <input type="text" readonly value="0.01 CNY">
                  </li>
                  <li>
                    <p>订单时间:</p>
                    <input type="text" readonly :value="DetailList.createtime | Date('yyyy-MM-dd hh:mm:ss')">
                  </li>
                </ul>
              </div>
            <div v-if="isCredit" class="col-33">
              <h4 class="bank-title">卖家收款方式 : </h4>

              <div class="alipay-box" v-if="DetailList.debitAccountMerchantTwin == '支付宝' || DetailList.debitAccountMerchantTwin == '微信'" >
                <p class="alipay-box-title">
                  <i class="i-alipay" v-if="DetailList.debitAccountMerchantTwin == '支付宝'"></i>
                  <i class="i-wechat" v-else-if="DetailList.debitAccountMerchantTwin == '微信'"></i>
                  {{DetailList.debitName}} ({{DetailList.debitAccountNameTwin}})<br> {{DetailList.debitAccountTwin}}
                </p>
                <div class="alipay-qrcode">
                  <img src="~images/qrcode.jpg" :src="DetailList.debitAccountQrCodeUrlTwin"  class="qrcode-img" />
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
              <h4  class="bank-title">买家付款方式 : </h4>

              <div class="alipay-box" v-if="DetailList.creditAccountMerchantTwin == '支付宝' || DetailList.creditAccountMerchantTwin == '微信'" >
                <p class="alipay-box-title">
                  <i class="i-alipay" v-if="DetailList.creditAccountMerchantTwin == '支付宝'"></i>
                  <i class="i-wechat" v-else-if="DetailList.creditAccountMerchantTwin == '微信'"></i>
                  {{DetailList.creditName}}（{{DetailList.creditAccountNameTwin}}）<br>{{DetailList.creditAccountTwin}}
                </p>
                <div class="alipay-qrcode">
                  <img src="~images/qrcode.jpg" :src="DetailList.creditAccountQrCodeUrlTwin"  class="qrcode-img" />
                  <p>打开 {{DetailList.creditAccountMerchantTwin}} [扫一扫] </p>
                </div>
              </div>

              <div class="alipay-box" v-else>
                <p class="alipay-box-title text-center bank-title">
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

              <div class="col-33">
                <div class="order-time">
                  <p class="red order-status-title">
                    <span> 申诉锁定中</span>
                  </p>
                  <input type="button" v-if="isCredit" class="btn btn-normal" @click="detailTypeItem='appealArbitrat'" value="提出反证">
                  <div class="btn-group" v-else-if="isDebit">
                    <input type="button" class="btn btn-block btn-normal" @click="showConfirmPayment=true" value="释放UET">
                    <input type="button" class="btn btn-block btn-orange" @click="detailTypeItem='appealArbitrat'"  value="继续留言">
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div class="row00 detail-box" v-else-if="detailTypeItem=='appealArbitrat'">
          <div class="detail-title cfx">
              <span class="title-btn btn-primary">{{AppealList.appeal.statusText}}</span>
          </div>
          <div class="appeal-content">
            <ul class="appeal-list-ul" v-if="reverseAppealList.length>0">
              <li v-for="(item,i) in reverseAppealList" >
                <!-- 我是买家 DetailList.credit == userId-->
                <!-- 我是卖家 DetailList.debit == userId-->
                <div :class="{'you-msg':isCredit}">
                  <span class="userAvator">
                    {{item.sourceTypeText }}
                  </span>
                  <div class="mes-box">
                    <p class="msg-time">{{item.createtime | Date('yyyy-MM-dd hh:mm:ss') }}</p>
                    <div class="mes-box-in">
                     <div v-if="item.attachmentUrls">
                       <span v-for="proofImg in item.attachmentUrls||[]" class="attach-img">
                         <viewer :images="item.attachmentUrls">
                           <img :src="proofImg" class="mes-img">
                         </viewer>
                       </span>
                     </div>

                      <p class="msg-details">{{item.content }}</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div v-else>
              <no-data-tip></no-data-tip>
            </div>
          </div>

        </div>

      </div>
      <div class="container min-width" v-else>
        <no-data-tip></no-data-tip>
      </div>
    </div>

    <confirm-dialog v-model="showConfirmPayment" :is-pc="true">
      <div slot="title">{{$t('orderDetailPay.confirmPayTitle')}}</div>
      <div slot="content">{{$t('orderDetailPay.confirmPayCont')}}</div>
      <div slot="leftBtn" class="confirm-btn-cancel">{{$t('postPend.cancel')}}</div>
      <div slot="rightBtn" @click="payCompleted">{{$t('orderDetailPay.confirmPayBtn')}}</div>
    </confirm-dialog>

    <v-footer ></v-footer>
  </div>
</template>

<script>
  import navMenu from 'components/nav';
  import breadCrumbs from 'components/bread-crumbs';
  import NoDataTip from 'components/no-data-tip'
  import confirmDialog from 'components/confirm'
  import vFooter from 'components/footer';
  import { generateTitle } from '@/util/i18n'
  import { transaction } from 'api'
  import {mapGetters,mapActions,mapMutations} from 'vuex'

  export default {
    data() {
      return {
        orderId:'',
        DetailList: {

        },
        breadList: [
          {
            urlName: 'transaction',
            name: 'navbar.tradingHall'
          },
          {
            urlName: 'tranRecord',
            name: 'transactionHome.orderRecord'
          },
          {
            urlName:'orderDetailAppeal',
            name: 'transactionRecord.orderDetails'
          }
        ],
        detailType:[
          {name:'transactionRecord.orderDetails', value: 'orderDetails' },
          {name:'transactionRecord.appealArbitrat', value: 'appealArbitrat' }
        ],
        detailTypeItem:'orderDetails',
        AppealList: {
        },
        myMessage:'',
        request:{},
        isCredit: false,
        isDebit: false,
        showConfirmPayment:false
      };
    },
    methods: {
      generateTitle,
      fetchData(){
        this.request={
          limit:'20',
          offset:'0',
          orderId:this.orderId,
          userId:this.userId,
          type:3   //默认为3
        }
        console.log('传参数')
        console.log(this.request)
        console.log(this.userData)
        transaction.getAppealDetailPage(this.request).then(res => {
          console.log('申诉详情记录:');
          console.log(res.data);
          // data.orderx   订单详情
          // data.appealDetailList   申诉消息列表
          // data.appeal   申诉状态

          this.DetailList = res.data.orderx ;
          this.AppealList = res.data ;
          if(this.DetailList.credit == this.userId){
            this.isCredit = true;
          }else if(this.DetailList.debit == this.userId){
            this.isDebit = true;
          }
          //statusText
//          this.DetailList.creditProofUrlTwin = res.data.creditProofUrlTwin.split(',');

        }).catch(error => {
          toast(error.message);
        });
      },
      payCompleted(){
        this.showConfirmPayment=false;
        this.request={
          orderId:this.orderId
        }
        transaction.payCompleted(this.request).then(res => {
          if(res.code == '10000'){
            Vue.$global.bus.$emit('update:balance');
            Vue.$global.bus.$emit('update:tranList');
            toast('您已确认收款，请勿重复操作');
            this.$router.push({name: 'tranRecord'});
          }else{
            toast(res.message)
          }

        }).catch(err => {
          toast(err.message);
        });
      },
      copystr(text) {
        text.$copy();
        toast(this.$t('transactionHome.successCopy'));
      }
    },
    created() {
      if (this.$route.params.id) {
        this.orderId = this.$route.params.id;
        this.fetchData();
      }
    },
    watch: {
      "$route"(val) {
        this.orderId = val.params.id;
        this.fetchData();
      }
    },
    computed: {
      ...mapGetters(["userData","islogin","userId"]),
      reverseAppealList() {
        // 按照时间倒序显示数据
        if(this.AppealList.appealDetailList.length>0){
          this.AppealList.appealDetailList = this.AppealList.appealDetailList.map(item => {
            if(item.attachmentUrls && item.attachmentUrls.length>1){
              item.attachmentUrls = item.attachmentUrls.split(',');
            }
            return item;
          });
        }

        return this.AppealList.appealDetailList.reverse();
      }
    },
    components: {
      navMenu, breadCrumbs, NoDataTip, confirmDialog, vFooter
    },
    filters: {
      bankIcon: function (value) {
        if (!value) return 'icbc';
        if(value == '工商银行'){
          return 'icbc';
        }
        if(value == '招商银行'){
          return 'cmbc';
        }
        return value
      }
    }
  };
</script>

<style lang="scss" scoped>
  .appeal-content{
    min-height: 400px;
    padding: 10px 0;
  }
  .appeal-list-ul{
    li{
      padding:10px 10px 0;
      overflow: hidden;
    }
    .userAvator{
      background: #E9BA52;
      height:45px;
      width:45px;
      line-height:45px;
      text-align: center;
      border-radius: 50px;
      display: inline-block;
      float:left;
      margin:15px 10px 0 0;
      color:#fff;
    }
    .mes-box{
      display: inline-block;
      width:calc(100% - #{85px});
      line-height: 25px;
      font-size: 15px;
    }
    .mes-box-in{
      border:1px solid #ddd;
      border-radius: 5px;
      background: #fff;
      display: inline-block;
    }
    .msg-time{
      color:#787876;
      font-size: 14px;
    }
    .attach-img{
      margin: 10px;
      text-align: center;
      display: block;
    }
    .you-msg{
      .userAvator{
        background: #0ABB07;
        height:45px;
        width:45px;
        line-height: 45px;
        text-align: center;
        border-radius: 50px;
        display: inline-block;
        color:#fff;
        float:right;
      }
      .msg-time{
        text-align: right;
      }
      .mes-box{
        float:right;
        margin-right:15px;
      }
      .mes-box-in{
        float: right;
        background: #A0E75A;
      }
    }
  }

  .detailapp-navtabs{
    height: 48px;
    line-height: 48px;
    span{
      display: block;
      float: left;
      width: 18%;
      text-align: center;
      font-size: 16px;
      color: #787876;
      border: 1px solid #D4D4D4;
      border-bottom: none;
      border-top-left-radius:3px;
      border-top-right-radius:3px;
      margin-right: 2.2%;
      cursor: pointer;
      &:hover,&.active{
        color: #ffffff;
        background:#4AA9E9;
        border: 1px solid #4AA9E9;
        border-bottom: none;
      }
      &:last-child{
        margin: 0;
      }
    }
  }

  .transell-main-box{
    padding-top:100px;
  }
  .detail-content{
    min-height:300px;
    margin:30px 0;
  }
  .order-status-title{
    text-align: center;
  }

  .detail-box{
    border:1px solid #d4d4d4;
  input{
    height:40px;
    line-height:40px;
    border:1px solid #d4d4d4;
    width:100%;
    padding:0 20px;
    font-size:16px;
  }
  input:read-only {
    background: #f7f7f7;
  }
  .btn-sell{
    background: orange;
  }
  .time-stame{
    font-size:22px;
    padding:10px 0;
  }
  .col-33{
    display:block;
    width:33%;
    float: left;
    border-right:1px solid #d4d4d4;
    margin:0;
    min-height:427px;
    min-width:350px;
  &:last-child{
     border:0;
   }
  }
  p {
    font-size: 16px;
    padding:5px 0;
    line-height: 25px;
  }
  .red{color:red;}
  .alipay-box{
    margin: 30px 50px 40px;
  .alipay-box-title{
    border:1px solid #d4d4d4;
    padding:10px 10px 10px 10px;
    background-size: 30px;
    font-size:16px;
  &.bank-ttile{
     font-size:20px;
   }
  }
  .i-alipay{
    display:inline-block;
    float:left;
    height:50px;
    width:38px;
    background: url('~images/i-alipay.png') no-repeat left center;
    background-size: 30px;
  }
  .i-wechat{
    display:inline-block;
    float:left;
    height:50px;
    width:38px;
    background: url('~images/i-wechat.png') no-repeat left center;
    background-size: 30px;
  }
  .alipay-qrcode{
    background: #4aa9e9;
    color:#fff;
    text-align: center;
    padding:18px;
  &.text-left{
     text-align: left;
   }
  &.bank-txt-box{
     padding:18px 22px;
   }
  h3{
    font-weight:normal;
    font-size:18px;
    padding:2px 0 8px;
  }
  img{
    width:160px;
    height:160px;
    padding:12px;
    background: url('~images/j.png') no-repeat;
    margin-bottom:5px;
    display: inline-block;
  }
  }
  }
  }

  .order-time{
    padding:20px 50px;
  }
  .detail-title{
    height:80px;
    border-bottom:1px solid #d4d4d4;
  }
  .title-btn{
    height:80px;
    line-height: 80px;
    display:inline-block;
    width:140px;
    color:#fff;
    text-align: center;
    background: #5087ff;
    margin:0 20px 0 0;
    font-size:18px;
  }

  .detail-tips{
    border-top:1px solid #d4d4d4;
    color:#787876;
    line-height:30px;
    padding:18px 30px 50px;
  p{
    font-size:16px;
  }
  .tips-title{
    color:red;
    font-size:18px;
    padding:0 0 15px 0;
  }
  .tips-title-i{
    background: url(~images/tips.png) no-repeat left 4px;
    padding:0 0 15px 25px;
  }
  .tips-title0{
    padding:0 0 15px 0;
  }
  }
  .detail-tips-sell{
    padding:18px 30px 20px;
    overflow: hidden;
  }
  .h3,.bank-title{
    font-weight:normal;
    color:#333;
    font-size:22px;
    padding:20px 30px 0;
  }
  .details-data{
    padding:0 30px 30px;
  li{
    padding:16px 0 0 0;
  }
  p{
    font-size:16px;
    padding: 0 0 8px 0;
  }
  .red{color:red;}
  }

  input[type="button"]{
  &.btn{
     display:inline-block;
     border:1px solid #5087ff;
     color:#5087ff;
     border-radius: 4px;
     height:50px;
     line-height: 50px;
     padding:0 20px;
     margin:10px 0 0 0;
     cursor: pointer;
  &:hover{opacity: .8;}
  }
  .btn-blue{
    border:1px solid #5087ff;
    color:#5087ff;
  }
  &.btn-orange{
     border:1px solid #ffa500;
     color:#ffa500;
   }
  &.btn-normal{
     border:1px solid #5087ff;
     background:#5087ff ;
     color:#fff;
   }
  }
  .item-info{
    color:#333;
  }
  .item-info.active{
    color:#5087FF;
  }

  .text-center{
    text-align: center;
  }

  .pic-ul{overflow: hidden;float:left;}
  .pic-ul li{float:left; margin-right:15px;}
  .pic-ul li img{ height:190px;}
  .friend-txt{
    margin-top:150px;
  }
  .bank-list-p{
    position:relative;
    margin-bottom:18px;
  }
  .btn-copy{
    position: absolute;
    right:0;
    bottom:0;
    color:#fff;
    border:0;
    cursor: pointer;
  }
  .i-bank{
    display:inline-block;
    height:40px;
    width:46px;
    vertical-align: -13px;
    background: url(~images/bankIcon/juan-bank.png) no-repeat;
    background-size: contain;
  &.icbc{
     background: url(~images/bankIcon/icbc.png) no-repeat;
     background-size: 40px;
   }
  &.cmbc{
     background: url(~images/bankIcon/cmbc.png) no-repeat;
     background-size: 40px;
   }
  }
</style>
