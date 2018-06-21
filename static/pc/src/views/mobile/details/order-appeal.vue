<template>
  <div class="transell-main0 transell-main-box">
    <m-header>申诉订单详情</m-header>
    <div class="m-order-details">
      <div class="trade-time-bar">
        <span class="c-blue" >
          <!--申诉订单-->
          <span v-if="DetailList.credit == userId" class="c-blue">买入</span>
          <span v-if="DetailList.debit == userId" class="c-red">卖出</span>
        </span>
        <span class="fr c-gray">
          申诉锁定中
          <!--{{DetailList.intervalTime - DetailList.elapsedTime | Date('hh:mm:ss')}}-->
        </span>
      </div>

      <div class="mobilenav-tabs">
          <span v-for="(item,i) in detailType" @click="detailTypeItem=item.value" :class="{active:detailTypeItem==item.value}" :key="item.value">
              {{item.value}}
          </span>
      </div>

      <div v-if="detailTypeItem =='订单详情'">
        <div v-if="DetailList.credit == userId">
          <!--买-->
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
              <div class="fr0">{{DetailList.debitAccountNameTwin}}
                <a href="javascript:void(0);" class="copy-btn" :data-clipboard-text="DetailList.debitAccountNameTwin" @click="copy">{{$t('transactionHome.copyBtn')}}</a>

              </div>
            </li>
            <li>
              <span class="l-title">收款账号 : </span>
              <div class="fr0">
                <span class="">{{DetailList.debitAccountTwin}}</span>
                <a href="javascript:void(0);" class="copy-btn" :data-clipboard-text="DetailList.debitAccountTwin" @click="copy">{{$t('transactionHome.copyBtn')}}</a>

              </div>
            </li>
            <li class="heightauto"  v-if="DetailList.debitAccountMerchantTwin == '支付宝' || DetailList.debitAccountMerchantTwin == '微信'">
              <span class="l-title">收款二维码 : </span>
              <div class="qrcode-box">
                <img src="~images/qrcode.jpg" :src="DetailList.debitAccountQrCodeUrlTwin" class="qrcode-img">
                <span class="qrcode-tips">长按二维码保存</span>
              </div>
            </li>

          </ul>
          <div class="btn-group">
            <input type="button" class="btn btn-block btn-primary" @click="detailTypeItem='申诉与仲裁'"  value="提出反证">
            <!--<input type="button" class="btn btn-block btn-gray"  value="我已付款">-->
            <!--<input type="button" class="btn btn-block btn-primary"  value="确定收款">-->
            <!--<input type="button" class="btn btn-block btn-primary"  value="我要申诉">-->
          </div>
        </div>
        <div v-if="DetailList.debit == userId">
          <!--卖-->
          <ul class="details-ul">
            <li>
              <span class="l-title">订单号 :</span>
              <span class="fr order-id-li">{{$route.params.id}}</span>
            </li>
            <li>
              <span class="l-title">买方 :</span>
              <span class="fr">{{DetailList.creditName}}</span>
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
              <div class="fr0">{{DetailList.debitAccountNameTwin}}
                <a href="javascript:void(0);" class="copy-btn" :data-clipboard-text="DetailList.debitAccountNameTwin" @click="copy">{{$t('transactionHome.copyBtn')}}</a>

              </div>
            </li>
            <li>
              <span class="l-title">收款账号 : </span>
              <div class="fr0">
                <span class="">{{DetailList.debitAccountTwin}}</span>
                <a href="javascript:void(0);" class="copy-btn" :data-clipboard-text="DetailList.debitAccountTwin" @click="copy">{{$t('transactionHome.copyBtn')}}</a>

              </div>
            </li>
            <li class="heightauto"  v-if="DetailList.debitAccountMerchantTwin == '支付宝' || DetailList.debitAccountMerchantTwin == '微信'">
              <span class="l-title">收款二维码 : </span>
              <div class="qrcode-box">
                <img src="~images/qrcode.jpg" :src="DetailList.debitAccountQrCodeUrlTwin" class="qrcode-img">
                <span class="qrcode-tips">长按二维码保存</span>
              </div>
            </li>

          </ul>
          <div class="btn-group">
            <input type="button" class="btn btn-block btn-border" @click="payCompleted"  value="释放UET">
            <input type="button" class="btn btn-block btn-primary" @click="detailTypeItem='申诉与仲裁'"  value="继续留言">
          </div>
        </div>

      </div>

      <div v-if="detailTypeItem =='申诉与仲裁'">

        <div class="trade-time-bar">
          申诉与仲裁
          <span class="fr">
            <!--<span class="red">卖方获胜</span>-->
            <span>{{AppealList.appeal.statusText}}</span>
          </span>
        </div>

        <div class="appeal-list">
            <ul class="appeal-list-ul"  v-if="DetailList.credit == userId">
              <li v-for="(item,i) in reverseAppealList" >
                <!-- 我是买家 DetailList.credit == userId-->
                <!-- 我是卖家 DetailList.debit == userId-->
                <div v-if="item.sourceType == 4" class="you-msg">
                  <span class="userAvator">
                    {{item.sourceTypeText }}
                  </span>
                  <div class="mes-box">
                    <p class="msg-time">{{item.createtime | Date('yyyy-MM-dd hh:mm:ss') }}</p>
                    <div class="mes-box-in">
                      <img v-if="item.attachmentUrls"  :src="item.attachmentUrls" class="mes-img">
                      <p class="msg-details">{{item.content }}</p>
                    </div>
                  </div>
                </div>
                <div v-else >
                  <span class="userAvator">{{item.sourceTypeText }}</span>
                  <div class="mes-box">
                    <p class="msg-time">{{item.createtime | Date('yyyy-MM-dd hh:mm:ss') }}</p>
                    <div class="mes-box-in">
                      <img v-if="item.attachmentUrls"  :src="item.attachmentUrls" class="mes-img">
                      <p class="msg-details">{{item.content }}</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="appeal-list-ul" v-if="DetailList.debit == userId">
              <li v-for="(item,i) in reverseAppealList" >
                <!-- 我是买家 DetailList.credit == userId-->

                <!-- 我是卖家 DetailList.debit == userId-->
                <div v-if="item.sourceType == 4"  >
                  <span class="userAvator">
                    {{item.sourceTypeText }}
                  </span>
                  <div class="mes-box">
                    <p class="msg-time">{{item.createtime | Date('yyyy-MM-dd hh:mm:ss') }}</p>
                    <div class="mes-box-in">
                      <img v-if="item.attachmentUrls"  :src="item.attachmentUrls" class="mes-img">
                      <p class="msg-details">{{item.content }}</p>
                    </div>
                  </div>
                </div>
                <div v-else class="you-msg">
                  <span class="userAvator">{{item.sourceTypeText }}</span>
                  <div class="mes-box">
                    <p class="msg-time">{{item.createtime | Date('yyyy-MM-dd hh:mm:ss') }}</p>
                    <div class="mes-box-in">
                      <img v-if="item.attachmentUrls"  :src="item.attachmentUrls" class="mes-img">
                      <p class="msg-details">{{item.content }}</p>
                    </div>
                  </div>
                </div>


              </li>
            </ul>

        </div>

      </div>

    </div>
     <chatEntrance></chatEntrance>
  </div>
</template>

<script>
  import mHeader from "components/m-header"

  import { generateTitle } from '@/util/i18n'
  import { transaction } from 'api'
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  import Clipboard from 'clipboard';

  import chatEntrance from '../chatroom/chatEntrance'
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
        AppealList: {
        },
        myMessage:'',
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
          limit:'20',
          offset:'0',
          orderId:this.$route.params.id,
          userId:this.userId,
          type:3   //默认为3
        }
        console.log('传参数')
        console.log(this.request)
        console.log(this.userData)
        transaction.getAppealDetailPage(this.request).then(res => {
          this.loading = false;
          console.log('申诉详情记录:');
          console.log(res.data);
           // data.orderx   订单详情
           // data.appealDetailList   申诉消息列表
           // data.appeal   申诉状态

          this.DetailList = res.data.orderx ;
          this.AppealList = res.data ;
        //statusText
//          this.DetailList.creditProofUrlTwin = res.data.creditProofUrlTwin.split(',');

        }).catch(error => {
          toast(error.message);
        });

        this.loading = false;
      },
      getAppealDetailHistoryPage(){
        this.loading = true;
        this.request={
          limit:10,
          offset:0,
          orderId:this.$route.params.id,
          userId:this.userId,
          type:''
        }
        transaction.getAppealHistoryDetail(this.request).then(res => {
          this.loading = false;
          console.log('申诉记录:');
          console.log(res.data);
          if(res.code == '10000'){
            this.AppealList = res.data;
          }else{
            toast(res.message);
          }


      }).catch(error => {
          toast(error.message);
      });

        this.loading = false;
      },
      addAppealDetail(){
        this.loading = true;
        this.request={
          orderId:this.$route.params.id,
          userId:this.userId,
          userName:this.userData.nickname,
          attachmentUrls:'',
          content:this.myMessage
        }
        transaction.addAppealDetail(this.request).then(res => {
          this.loading = false;
          console.log('增加证据申诉记录:');
          console.log(res.data);
          if(res.code == '10000'){
              this.AppealList = res.data;
              toast('消息发送成功');
              this.fetchData();
              this.myMessage='';
              this.fetchData();
          }else{
            toast(res.message);
          }


      }).catch(error => {
          toast(error.message);
      });
        this.loading = false;
      },
      payCompleted(){
        this.request={
          orderId:this.$route.params.id
        }
        transaction.payCompleted(this.request).then(res => {
          this.loading = false;
          if(res.code == '10000'){
            toast('您已确认收款，请勿重复操作');
            this.$router.push({name: 'mTranRecord'});
          }else{
            toast(res.message)
          }

        }).catch(err => {
          toast(err.message);
        });
        toast(res.message);
        this.loading = false;
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
      "$route":"fetchData"
    },
    computed: {
      ...mapGetters(["userData","islogin"]),
      ...mapGetters(["userId"]),
      reverseAppealList() {
      // 按照时间倒序显示数据
        return this.AppealList.appealDetailList.reverse();
      }
    },
    components: {
      mHeader,
      chatEntrance
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
  .appeal-list{
    padding:0 0 70px 0;
  }
  .details-ul{
    border-bottom:1px solid #d8d8d8;
    border-top:1px solid #d8d8d8;
    margin-bottom:r(10);
  li{
    background: #fff;
    min-height:r(35);
    padding:r(8) r(15);
    @include  f(16px);
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
    /*width:50%;*/
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
    padding:r(6) r(15) r(10);
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
  .btn-border{
    border: 1px solid #5087ff;
    background: #fff;
    color: #5087ff;
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
    color:#787876;
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
  .mes-img{
    max-width:100%;
  }
  .appeal-list-ul{
    li{
      padding:r(10) r(10) 0;
      overflow: hidden;
    }
    .userAvator{
      background: #E9BA52;
      height:r(45);
      width:r(45);
      line-height: r(45);
      text-align: center;
      border-radius: 50px;
      display: inline-block;
      float:left;
      margin:r(15) r(10) 0 0;
      color:#fff;
    }
    .mes-box{
      display: inline-block;
      width:calc(100% - #{r(85)});
      line-height: 25px;
      @include  f(15px);
    }
    .mes-box-in{
      border:1px solid #ddd;
      border-radius: 5px;
      background: #fff;
      display: inline-block;
    }
    .msg-time{
      color:#787876;
      @include  f(14px);
    }
    .you-msg{
      .userAvator{
        background: #0ABB07;
        height:r(45);
        width:r(45);
        line-height: r(45);
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
        margin-right:r(15);
      }
      .mes-box-in{
        float: right;
        background: #A0E75A;
      }
    }
  }

  .bottom-keyboard{
    position: fixed;
    bottom:0;
    left:0;
    width:100%;
    padding:r(8) r(10);
    border-top:1px solid #ddd;
    background:#F5F5F5;
    .my-input{
      height:42px;
      width:80%;
      padding:0 2%;
      display:inline-block;
      border-radius: 6px;
      border:1px solid #ddd;
      @include f(16px);
    }
    .btn-send{
      display:inline-block;
      width:17.5%;
      margin:0 0 0 2.5%;
      text-align: center;
      height:42px;
      line-height: 42px;
      background: #4982FF;
      color:#fff;
      border-radius: 6px;
      float:right;
    }
  }
  .msg-details{
    padding:r(10);
    word-break: break-all;
  }
  .chatroom{
    width: r(50);
    height: r(50);
    background-color: #fff;
    position: fixed;
    right: 0;
    top: r(600);
    border-radius: 50%;
    background: url("../../../assets/images/chatbg.png")no-repeat;
    background-size: 100%;
    img{
      padding-top: r(7);
      display: block;
      width: r(20);
      height: r(20);
      margin: 0 auto;
    }
    .chatroom_num{
      font-size: r(12);
      color: #4982FF;
      line-height: r(12);
    }
  }
</style>
