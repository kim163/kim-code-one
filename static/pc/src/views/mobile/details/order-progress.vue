<template>
  <div class="transell-main0 transell-main-box morder-page">
    <div class="m-order-details" v-if="DetailList.credit == userId">
      <m-header>充值订单</m-header>
      <div v-if="payOrderStep==1">
      <div class="trade-time-bar">
        <span class="c-blue">买入</span>
        <span class="fr">
          <span v-if="DetailList.status =='45'">等待付款</span>
          <span v-if="DetailList.status =='47'">等待释放UET</span>
          <span v-if="DetailList.status =='61'">申诉锁定</span>
          <count-down v-if="DetailList.status !='61'" :end-time="DetailList.intervalTime-DetailList.elapsedTime" @callBack="countDownEnd"></count-down>
        </span>
      </div>

      <div v-if="detailTypeItem =='订单详情'">
          <ul class="details-ul">
            <li>
              <span class="l-title">订单号 :</span>
              <span class="fr order-id-li">{{orderId}}</span>
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

          <ul class="morder-paymethod" v-if="DetailList.status =='45' ">
              <li class="cfx">
                <a href="alipay://">
                  <i class="iconfont icon-pay-alipay"></i> 前往支付宝付款 <span class="iconfont icon-right-arrow"></span>
                </a>
              </li>
              <li class="cfx">
                <a href="weixin://">
                   <i class="iconfont icon-pay-wechat"></i> 前往微信付款 <span class="iconfont icon-right-arrow"></span>
                </a>
              </li>
          </ul>

          <div class="btn-group" v-if="DetailList.status =='45' ">
              <span class="btn btn-block btn-tips">请在倒计时结束前完成付款
                  <count-down v-if="DetailList.status !='61'" :end-time="DetailList.intervalTime-DetailList.elapsedTime" @callBack="countDownEnd"></count-down>
              </span>
              <p class="payment-tips">
                警告：为了您能快速完成交易，请尽量使用 <span>您所绑定的银行卡/支付宝付款。</span>
              </p>
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

      <div v-if="payOrderStep==2" class="recharge-payinst">
         <div class="payinst-order">
            <p>根据卖家要求，您需要对该笔订单补充付款说明</p>
            <p class="cfx">
               <span class="order-title fl">订单号：</span>
               <span class="order-id fr">{{orderId}}</span>
            </p>
         </div>
         <div class="payord-group cfx">
           <label>您的付款方式</label>

         </div>
        <div class="payinst-tips">
          请您提供真实的付款信息，否则您将可能无法顺利买入UET
        </div>
        <ul class="payord-form">
          <li class="payord-group">
             <label>付款方式</label>
             <select class="payord-control" v-model="payOrderParam.creditAccountTypeTwin">
                <option value="">请选择付款方式</option>
                <option value="3">银行卡</option>
                <option value="1">支付宝</option>
                <option value="2">微信</option>
             </select>
          </li>
          <li class="payord-group">
            <label>付款银行名称</label>
            <input class="payord-control" type="text" placeholder="银行名称" v-model="payOrderParam.creditAccountMerchantTwin">
          </li>
          <li class="payord-group">
            <label>付款账号</label>
            <input class="payord-control" type="text" placeholder="银行卡号/支付宝/微信账号" v-model="payOrderParam.creditAccountTwin">
          </li>
          <li class="payord-group posit-rel">
            <label>付款金额</label>
            <input class="payord-control" type="number" placeholder="请输入实际付款金额" v-model="payOrderParam.creditAmountTwin">
            <span class="tips-info">CNY</span>
          </li>
          <li class="payord-group">
             <label>付款的户名</label>
             <input class="payord-control" type="text" placeholder="银行卡/支付宝/微信认证实名" v-model="payOrderParam.creditAccountNameTwin">
          </li>
        </ul>
        <div class="payscreen-part">
            <p class="title">您的付款截图 <span>（选填项）</span> </p>

        </div>
        <div class="paybtn-group">
          <input type="button" class="mobile-pubtn" value="提交" @click="payOrder" />
        </div>
      </div>

    </div>
      <!--卖家-->
    <div class="cash-details0" v-if="DetailList.debit == userId">
      <m-header>出售订单</m-header>
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
              <span class="fr order-id-li">{{orderId}}</span>
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
        orderId:'',
        detailType:[
          {name:'detail.buyUet', value: '订单详情' },
          {name:'detail.saleUet', value: '申诉与仲裁' }
        ],
        detailTypeItem:'订单详情',
        DetailList: {
        },
        showImg:false,
        imgSrc: '',
        chatState:'',
        payOrderStep:1,
        payOrderParam:{
          id:'',
          creditProofTypeTwin:0,      // 卖方要求买方的付款证明
          creditProofUrlTwin:'',      // 买方支付证明截图，多个地址逗号分隔
          creditAccountTypeTwin:'',   // 买方法币账户类型
          creditAccountNameTwin:'',   // 买方法币账户名
          creditAccountTwin:'',       // 买方法币账户
          creditAccountMerchantTwin:'',   // 买方法币机构名
          creditAmountTwin:''           // 买方实际支付金额
        }
      };
    },
    methods: {
      generateTitle,
      fetchData(){
        this.request={
          orderId:this.orderId
        }

//        console.log('传参数')
//        console.log(this.request)
        transaction.getOrderx(this.request).then(res => {
          console.log('getOrderx 订单详情记录:');
          console.log(res.data);
          console.log('res.data.status:'+res.data.status);
          if(res.data == '' || res.data == null){
            this.$router.push({name: 'mIndex'});
            return;
          }
          if(res.data.status =='61'){
            this.$router.push({name: 'mOrderAppeal',params:{ id: this.orderId}});
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

      },
      cancelOrder(){
        this.loading = true;
        this.request={
          orderId:this.orderId
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
        if(this.DetailList.creditProofTypeTwin==1 && this.DetailList.creditProofStatusTwin==0){
           this.payOrderStep = 2;
           return;
        }

        this.payOrderParam.id = this.orderId;
        this.payOrderParam.creditProofTypeTwin = this.DetailList.creditProofTypeTwin;

        console.log('我已完成付款 param: ',this.payOrderParam);
        transaction.payOrderV2(this.payOrderParam).then(res => {
          if(res.code == '10000'){
            toast('您已确认付款，请勿重复付款');
            this.fetchData();
          }

        }).catch(err => {
          toast(err.message);
        });
      },
      payCompleted(){
        this.request={
          orderId:this.orderId
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
          orderId:this.orderId,
          userId:this.userId,
          type:2
        }
        transaction.createAppeal(this.request).then(res => {
          this.loading = false;
          if(res.code == '10000'){
            toast('申诉创建成功');
            this.$router.push({name: 'mOrderAppeal',params:{ id: this.orderId}});
          }
        }).catch(err => {
          toast(err.message);
        });
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
      if (this.$route.params.id) {
        this.orderId = this.$route.params.id;
        this.fetchData();
      }
    },
    mouted(){

    },
    watch: {
      "$route"(val) {
        this.orderId = val.params.id;
        this.fetchData();
      }
    },
    computed: {
      ...mapGetters(["userData","islogin","userId"])
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

  .recharge-payinst{
    .payinst-order{
       background: $white;
       padding: r(10);
       margin-bottom: r(9);
       p{
         line-height: r(30);
         @include  f(15px);
         color: $font-color;
         span{
           display: block;
         }
         .order-id{
           color: #787876;
           line-height: r(28);
           word-break: break-all;
           width: 80%;
         }
       }
    }
    .payord-group{
      background: $white;
      line-height: r(44);
      padding: 0 r(10);
      @include  f(15px);
      color: $font-color;
      display: flex;
      .payord-control{
        height: r(44);
        line-height: r(44);
        width: auto;
        display: inline-block;
        @include  f(15px);
        color: $font-color;
        padding: 0 r(30) 0 r(10);
        border: none;
        outline: none;
        flex-grow: 1;
      }
      .tips-info{
        position: absolute;
        top: 0;
        right: r(10);
        display: block;
      }
    }
    .payord-form{
      margin-bottom: r(9);
      li{
        border-bottom: 1px solid #EBEBEB;
        &:last-child{
          border-bottom: none;
        }
      }
    }
    .payinst-tips{
       padding: r(6) r(10);
       @include  f(15px);
       color: #8F8F8F;
       line-height: r(30);
    }
    .payscreen-part{
      background: $white;
      padding: 0 r(10);
      @include  f(15px);
      color: $font-color;
      margin-bottom: r(20);
      .title{
        line-height: r(38);
        span{
          color: #FF0000;
        }
      }
    }
    .paybtn-group{
      padding: 0 r(10);
    }
  }

  .morder-page{
    padding-bottom: r(50);
  }
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
      height: auto;
    }

     .copy-btn{
       position:absolute;
       top:r(7);
       right:r(15);
       color:#5087ff;
     }
     .qrcode-img{
       width: r(140);
       height: r(140);
       margin-left: r(10);
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

  .morder-paymethod{
    li{
      line-height: r(45);
      background: $white;
      padding: 0 r(15);
      border-bottom: 1px solid #d8d8d8;
      @include  f(15px);
      color: $font-color;
      &:last-child{
        border-bottom: none;
      }

      a{
        display: block;
      }
      i.iconfont{
        @include  f(20px);
        margin-right: r(10);
      }
      span.iconfont{
        display: block;
        float: right;
        @include  f(18px);
        color: #000000;
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
  .payment-tips{
    @include  f(15px);
    color: #787876;
    line-height: r(30);
    margin: r(13) 0;
    span{
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
