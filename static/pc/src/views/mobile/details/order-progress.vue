<template>
  <div class="transell-main0 transell-main-box">
    <m-header>订单详情</m-header>
    <div class="m-order-details" v-if="DetailList.credit == userId">
      <div class="trade-time-bar">
        <span class="c-blue">买入</span>
        <span class="fr">
          <span v-if="DetailList.status =='45'">等待付款</span>
          <span v-if="DetailList.status =='47'">等待释放UET</span>
          <span v-if="DetailList.status =='61'">申诉锁定</span>
          <!--{{DetailList.intervalTime-DetailList.elapsedTime | Date('hh:mm:ss')}}-->
          <count-down v-if="DetailList.status !='61'" :end-time="DetailList.intervalTime-DetailList.elapsedTime" @callBack="countDownEnd"></count-down>
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
              <span class="fr">{{DetailList.debitName}} ({{DetailList.debitAccountNameTwin}} )</span>
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
            <li class="heightauto" v-if="DetailList.debitAccountMerchantTwin == '支付宝' || DetailList.debitAccountMerchantTwin == '微信'">
              <span class="l-title">收款二维码 : </span>
              <div class="qrcode-box">
                    <img src="~images/qrcode.jpg" :src="DetailList.debitAccountQrCodeUrlTwin"  class="qrcode-img" />
                     <span class="qrcode-tips">长按二维码保存</span>
               </div>
            </li>

          </ul>

          <div class="btn-group" v-if="DetailList.status =='45' ">
              <input type="button" class="btn btn-block btn-primary" @click="payOrder" value="我已完成付款">
              <input type="button" class="btn btn-block btn-cancel" @click="cancelOrder" v-if="DetailList.status =='45'" value="取消订单">
              <input type="button" class="btn btn-block btn-primary" v-if= "DetailList.debit == userId || DetailList.status =='47'" value="提出反证">
          </div>
          <div>
              <p v-if="DetailList.status =='47'" class="payed-txt">您已确认付款，请勿重复付款</p>
          </div>
      </div>

      <div v-if="detailTypeItem =='申诉与仲裁'">

        <div class="trade-time-bar">
          申诉与仲裁
          <span class="fr red">卖方获胜</span>
        </div>
      </div>

    </div>
      <!--卖家-->
    <div class="cash-details0" v-if="DetailList.debit == userId">
      <div class="trade-time-bar">
        <span class="c-orange" >卖出</span>
        <span class="fr">
          <span v-if="DetailList.status =='45'">等待付款</span>
          <span v-if="DetailList.status =='47' || DetailList.status =='48'">等待释放UET</span>
          <span v-if="DetailList.status =='61'">申诉锁定</span>
          <!--{{DetailList.intervalTime-DetailList.elapsedTime | Date('hh:mm:ss')}}-->
          <count-down v-if="DetailList.status !='61'"  :end-time="DetailList.intervalTime-DetailList.elapsedTime" @callBack="countDownEnd"></count-down>
        </span>
      </div>

      <div v-if="detailTypeItem =='订单详情'">
          <ul class="details-ul">
            <li>
              <span class="l-title">订单号 :</span>
              <span class="fr order-id-li">{{$route.params.id}}</span>
            </li>
            <li>
              <span class="l-title">买方 :</span>
              <span class="fr">{{DetailList.creditAccountNameTwin}}</span>
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
            <span class="l-title">我的收款方式 : </span>
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
          <li class="heightauto" v-if="DetailList.debitAccountMerchantTwin == '支付宝'">
            <span class="l-title">收款二维码 : </span>
            <div class="qrcode-box">
              <img src="~images/qrcode.jpg" :src="DetailList.debitAccountQrCodeUrlTwin"  class="qrcode-img" />
              <span class="qrcode-tips">长按二维码保存</span>
            </div>
          </li>

        </ul>

        <ul class="details-ul pay-detail my-paymethod">
            <li>
              <span class="l-title">买家付款方式 : </span>
              <div class="fr0">
                <span v-if="DetailList.creditAccountMerchantTwin == '支付宝'"><i class="iconfont icon-pay-alipay"></i></span>
                <span v-else-if="DetailList.creditAccountMerchantTwin == '微信'"><i class="iconfont icon-pay-wechat"></i></span>
                <span v-else><i class="iconfont icon-pay-bank"></i></span>
                {{DetailList.creditAccountMerchantTwin}}
              </div>
            </li>
            <li>
              <span class="l-title">付款姓名 : </span>
              <div class="fr0">{{DetailList.creditName}}（{{DetailList.creditAccountNameTwin}}）
              </div>
            </li>
            <li>
              <span class="l-title">付款账号 : </span>
              <div class="fr0">
                     <span class="">{{DetailList.creditAccountTwin}}</span>
              </div>
            </li>
            <li class="heightauto" v-if="DetailList.creditAccountMerchantTwin == '支付宝' || DetailList.creditAccountMerchantTwin == '微信'">
              <span class="l-title">付款二维码 : </span>
              <div class="qrcode-box">
                    <img src="~images/qrcode.jpg" :src="DetailList.debitAccountQrCodeUrlTwin"  class="qrcode-img" />
               </div>
            </li>

          </ul>

          <div class="btn-group" v-if="DetailList.status =='47'">
              <span class="btn btn-block btn-tips">释放UET倒计时 <count-down :end-time="DetailList.intervalTime-DetailList.elapsedTime" @callBack="countDownEnd"></count-down></span>
              <input type="button" class="btn btn-block btn-primary" @click="payCompleted" value="确认收款">
              <input type="button" class="btn btn-block btn-primary" @click="createAppeal"  value="我要申诉">
          </div>

         <div class="pic-box pic-box2" v-if="DetailList.creditProofUrlTwin">
              <p>买家付款截图:</p>
               <ul class="pic-ul">

                 <li v-for="proofImg in DetailList.creditProofUrlTwin">

                   <img :src="proofImg" @click="clickImg($event)">

                 </li>
               </ul>
           <!-- 放大图片 -->
           <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
         </div>
      </div>

      <div v-if="detailTypeItem =='申诉与仲裁'">

        <div class="trade-time-bar">
          申诉与仲裁
          <span class="fr red">卖方获胜</span>
        </div>
      </div>

    </div>
    <div class="chatroom" @click="goChatroom()">
      <img src="../../../assets/images/chat.png" alt="">
      <span class="chatroom_num"></span>
    </div>
    <transition name="toolSlideRight">
      <chat v-if="chatState" class="chatWindow"
            :detail="$route.params.id"
            :debitNum="DetailList.debitAmount"
            :sellName = 'DetailList.debitName'
            :debitMoney="DetailList.debitAmountTwin" ></chat>
    </transition>

  </div>
</template>

<script>
  import mHeader from "components/m-header"
  import CountDown from 'components/countdown'
  import BigImg  from 'components/bigImg'
  import { generateTitle } from '@/util/i18n'
  import { transaction,chatWith } from 'api'
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  import Clipboard from 'clipboard';
  import ChatEntrance from '../chatroom/chatEntrance'
  import chat from '../chatroom/chat'
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
          orderId:'',
          debitName:'' // 交易买方
        },
        showImg:false,
        imgSrc: '',
        chatState:''
      };
    },
    //props: ['pagedata'],
    methods: {
      generateTitle,
      fetchData(){
        this.loading = true;
        this.request={
          orderId:this.$route.params.id
        }

//        console.log('传参数')
//        console.log(this.request)
        transaction.getOrderx(this.request).then(res => {
          this.loading = false;
          console.log('订单详情记录:');
          console.log(res.data);
          console.log('res.data.status:'+res.data.status);
          if(res.data == '' || res.data == null){
            this.$router.push({name: 'mIndex'});
            return;
          }
          if(res.data.status =='61'){
            this.$router.push({name: 'mOrderAppeal',params:{ id: this.$route.params.id}});
            return;
          }

          this.DetailList = res.data;

          console.log('图片列表',res.data.creditProofUrlTwin)
          if(res.data.creditProofUrlTwin && res.data.creditProofUrlTwin.length > 1){
            this.DetailList.creditProofUrlTwin = res.data.creditProofUrlTwin.split(',');
          }

          if(res.code == '10000'){
            if(this.DetailList.credit == this.userId){
              toast('您已下单成功，请进入列表查询');
            }else{
              if(this.DetailList.status =='47' || this.DetailList.status =='48'){
                  toast('对方已确认付款，请查收是否到账');
              }
              // toast('对方已确认付款，请查收是否到账');
            }

          }
        }).catch(err => {
          toast(err.message);
        });

        this.loading = false;
      },
      cancelOrder(){
        this.loading = true;
        this.request={
          orderId:this.$route.params.id
        }
        transaction.cancelOrder(this.request).then(res => {
          this.loading = false;
          if(res.code == '10000'){
            toast('您已取消，请勿重复操作');
            this.$router.push({name: 'mTranRecord'});
          }
        }).catch(err => {
          toast(err.message);
        });

        this.loading = false;
      },
      payOrder(){
//
        this.request={
          orderId:this.$route.params.id
        }
        transaction.payOrder(this.request).then(res => {
          this.loading = false;
          if(res.code == '10000'){
            toast('您已确认付款，请勿重复付款');
            this.fetchData();
          }

        }).catch(err => {
          toast(err.message);
        });
        toast(res.message);
        this.loading = false;
      },
      payCompleted(){
        this.request={
          orderId:this.$route.params.id
        }
        transaction.payCompleted(this.request).then(res => {
          this.loading = false;
          if(res.code == '10000'){
            Vue.$global.bus.$emit('update:balance');
            toast('您已确认收款，请勿重复操作');
            this.$router.push({name: 'mTranRecord'});
          }else{
            toast(res.message)
          }

        }).catch(err => {
          toast(err.message);
        });
        this.loading = false;
      },
      createAppeal(){
        this.loading = true;
        this.request={
          orderId:this.$route.params.id,
          userId:this.userId,
          type:2
        }
        transaction.createAppeal(this.request).then(res => {
          this.loading = false;
          if(res.code == '10000'){
            toast('申诉创建成功');
            this.$router.push({name: 'mOrderAppeal',params:{ id: this.$route.params.id}});
          }
        }).catch(err => {
          toast(err.message);
        });
        toast(res.message);
        this.loading = false;
      },
      goChatroom(){
        //先获取订单号

        const gameID = this.$route.params.id;
       //
        let params ={
          groupId : gameID,
          founderId: this.$store.state.userData.userId,
          type:1,
          founderNickname: this.$store.state.userData.nickname
        }
        chatWith.createChatGroup(params).then(res=>{
           if(res.code ===10000){
             this.chatState = true
           }else {
              toast(res.message)
           }
        }).catch(res=>{
          toast(res.message)
        })
      },
      countDownEnd() {
        this.fetchData();
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
      },
      clickImg(e) {
        this.showImg = true;
        // 获取当前图片地址
        this.imgSrc = e.currentTarget.src;
      },
      viewImg(){
        console.log('关闭预览');
        this.showImg = false;
      },

    },
    beforecreate(){
    },
      created() {
      this.fetchData();
    },
    mouted(){
      this.fetchData();
    },
    watch: {
      "$route":"fetchData"
    },
    computed: {
      ...mapGetters(["userData","islogin"]),
      ...mapGetters(["userId"]),
    },
    components: {
      mHeader,
      CountDown,
      ChatEntrance,
      chat,
      'big-img':BigImg
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
    font-size:f(16px);
    color:#8f8f8f;
    overflow:hidden;
    position:relative;
    &.heightauto{
      height:150px;
    }

     .copy-btn{
       position:absolute;
       top:r(7);
       right:r(15);
       color:#5087ff;
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
     padding:r(5) r(15) r(10);
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
        text-align: center;
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
        color: #787876;
      }
      .btn-tips{
        background: #FFFFFF;
        border: 1px solid #E4E4E4;
        color: #FF0000;
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
  .payed-txt{
    padding: r(10) 0;
    text-align: center;
    color:#5087ff;
  }

  .pic-box{
    padding:0 r(15)  r(30) r(15);
  }
  .pic-ul{
    max-height:180px;
    padding:10px 0 30px;
    overflow:hidden;
    img{width:33%; display:inline-block;}
  }
  .chatroom{
    width: r(50);
    height: r(50);
    background-color: #fff;
    position: fixed;
    right: 0;
    top: 70%;
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
  .toolSlideRight-enter-active,.toolSlideRight-leave-active {
    transition:transform .5s;
  }
  .toolSlideRight-enter{
    transform: translateX(100%);
  }
  .toolSlideRight-leave-to{
    transform: translateX(-100%);
  }

  .chatWindow{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
  }
</style>
