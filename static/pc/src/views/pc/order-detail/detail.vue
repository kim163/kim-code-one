<template>
  <div class="transell-main">
    <div class="section detail-content">
      <div class="go-back-part page-content cfx">
        <router-link :to="{name:'orderRecord'}" class="fr">返回上一页</router-link>
      </div>

      <div class="page-content detail-box" v-if="DetailList">
        <detail-title :isCredit="isCredit" :isDebit="isDebit" :orderId="orderId"></detail-title>
        <div class="pay-type" v-if="isCredit && DetailList.debit === '0'">
          <div class="tips">请先选择以下的付款方式，根据生成的金额来付款，选择后不可更改，为了及时到账请确保付款的金额准确</div>
          <div class="type-list">
            <div class="type-item" v-for="(item,index) in payTypeList"
                 :class="{active: item.type === payType}"
                 :key="index" @click="payType != 0 ? '' : chooseType(item.type)">
              <div class="icon">
                <i class="iconfont" :class="item.icon"></i>
              </div>
              我用{{item.name}}转账
            </div>
          </div>
        </div>
        <div class="detail-in cfx">
          <display-infor :DetailList="DetailList" :isCredit="isCredit" :hide-amount="hideAmountBtn" :isDebit="isDebit"
                         :isTrading="true"></display-infor>
          <div class="col-33">
            <div class="order-time">
              <p class="red order-status-title">
                <span v-if="DetailList.status =='45'">等待付款</span>
                <span v-else-if="DetailList.status =='47'">等待释放UET</span>
                <span v-else-if="DetailList.status =='61'">申诉锁定</span>
                <span v-else-if="DetailList.status =='41'">订单已发布</span>
                <span v-else-if="DetailList.status =='43'">订单已下架</span>
                <span v-else>
                      {{DetailList.status}}
                    </span>
              </p>
              <p class="text-center time-stame">
                <span v-if="DetailList.status =='45' && isCredit">请在倒计时结束前完成付款</span>
                <span v-else-if="DetailList.status =='47' && isCredit">等待卖家释放UET倒计时</span>
                <span v-else-if="DetailList.status =='45' && isDebit">等待买家付款倒计时</span>
                <span v-else-if="DetailList.status =='47' && isDebit">释放UET倒计时</span>

                <count-down v-if="DetailList.status !='61'"
                            :end-time="DetailList.intervalTime-DetailList.elapsedTime<=0 ? 0 : DetailList.intervalTime-DetailList.elapsedTime "
                            @callBack="countDownEnd">
                </count-down>

              </p>
              <!--卖家优惠 添加对应信息-->
              <p class="pay_send" v-if="showDiscountInfo&couponValueStr>0&DetailList.status =='45' && isDebit">立即付款后预计获赠
                <span>{{couponValueStr}} UET</span></p>
              <div class="btn-group" v-if="DetailList.status =='45' && isCredit">
                <input type="button" class="btn btn-block btn-normal" @click="showConfirm=true" v-if="!hideAmountBtn" value="我已完成付款">
                <p class="pay_send" v-if="showDiscountInfo&couponValueStr>0">立即付款后预计获赠
                  <span>{{couponValueStr}} UET</span></p>
                <p class="payment-tips">
                  警告：为了您能快速完成交易，请尽量使用 <span class="red">您所绑定的银行卡/支付宝付款。</span>付款成功后，点击“我已完成付款”。
                </p>
                <input type="button" class="btn btn-block btn-orange" @click="cancelOrder" value="取消订单">
                <p class="text-center">
                  <span class="red">如果您已向卖家付款，千万不要取消</span><br>
                  取消规则：买方当日连续取消2笔，或累计取消6笔，将限制交易24小时。
                </p>
              </div>
              <div v-if="DetailList.status =='47' && isCredit">
                <p class="pay_send" v-if="showDiscountInfo&couponValueStr>0">立即付款后预计获赠
                  <span>{{couponValueStr}} UET</span></p>
                <p class="text-center red">您已确认付款，请勿重复付款</p>
              </div>
              <div class="btn-group" v-if="DetailList.status =='47' && isDebit">
                <input type="button" class="btn btn-block btn-normal" @click="showConfirmPayment=true" value="释放UET">
                <p class="pay_send" v-if="showDiscountInfo&couponValueStr>0">立即付款后预计获赠
                  <span>{{couponValueStr}} UET</span></p>
                <p class="payment-tips">
                  确认收款前，请务必检查是否有收到买方付款
                </p>
                <input type="button" class="btn btn-block btn-orange" @click="createAppeal" value="我要申诉">
                <p class="text-center">
                  申诉规则：申诉后，该笔订单将会被锁定。若仲裁结果为买方获胜，系统将会自动释放该笔订单的UET给买方。若仲裁结果为您获胜，则该笔订单交易失败。
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-tips" v-if="isCredit">
          <p class="tips-title">温馨提示</p>
          <p>1.您的汇款将直接进入卖方账户，交易过程中卖方出售的UET由平台托管保护。<br>
            2.请在规定时间内完成付款，并务必点击“我已完成付款”，卖方确认收款后，系统会将UET划转到您的账户。</p>
        </div>
        <div class="detail-tips detail-tips-sell" v-if="DetailList.creditProofUrlTwin && isDebit">
          <p class="tips-title0">买家付款截图:</p>
          <ul class="pic-ul">
            <li v-for="proofImg in DetailList.creditProofUrlTwin||[]">
              <viewer :images="DetailList.creditProofUrlTwin">
                <img :src="proofImg" alt="买家付款截图">
              </viewer>
            </li>
          </ul>
          <span class="fl friend-txt">提示：点击缩略图可放大查看</span>
        </div>
        <div class="detail-tips" v-if="isDebit">
          <p class="tips-title tips-title-i">温馨提示</p>
          <p>1.买方的汇款将直接进入您的账户，交易过程中您出售的UET由平台托管保护。<br>
            2.您在确认收款后，系统会将UET划转到您的账户，如果您申诉，订单将会被锁定。</p>
        </div>

      </div>
      <div class="page-content" v-else>
        <no-data-tip></no-data-tip>
      </div>
    </div>

    <confirm-dialog v-model="showConfirm" :is-pc="true">
      <div slot="title">{{$t('orderDetailPay.alreadyPaidTitle')}}</div>
      <div slot="content" class="color-red">{{$t('orderDetailPay.alreadyPaidCont')}}</div>
      <div slot="leftBtn" class="confirm-btn-cancel bg-gray">{{$t('orderDetailPay.alreadyPaidCancelBtn')}}</div>
      <div slot="rightBtn" @click="payOrder" class="bg-blue">{{$t('orderDetailPay.alreadyPaidBtn')}}</div>
    </confirm-dialog>

    <confirm-dialog v-model="showConfirmPayment" :is-pc="true">
      <div slot="title">释放数额 {{DetailList.debitAmount}} UET</div>
      <div slot="content">
        <div class="dialog-content">{{$t('orderDetailPay.confirmPayTitle')}}</div>
        <div class="dialog-content color-red">{{$t('orderDetailPay.confirmPayCont')}}</div>
      </div>
      <div slot="leftBtn" class="confirm-btn-cancel bg-gray">{{$t('postPend.cancel')}}</div>
      <div slot="rightBtn" @click="payCompleted" class="bg-blue">{{$t('orderDetailPay.confirmPayBtn')}}</div>
    </confirm-dialog>

    <div class="modal fade in" v-if="payOrderStep==2 && isCredit">
      <div class="modal-dialog popup modal-payorder">
        <div type="button" class="close close-w" @click="payOrderStep=1">
          <i class="iconfont icon-close"></i>
        </div>

        <div class="pop-con">
          <h2 class="alert-title txt-imcenter">充值订单</h2>
          <div class="recharge-payinst">

            <div class="payinst-order">
              <p>根据卖家要求，您需要对该笔订单补充付款说明</p>
              <p class="cfx">
                <span class="order-title fl">订单号：</span>
                <span class="order-id fr">{{orderId}}</span>
              </p>
            </div>
            <div class="payord-group cfx border-bot pcdetail-paymethod">
              <label>您的付款方式</label>
              <get-bankcard :setBankcard="setBankcard" v-model="bindCardReset"
                            @selCardChange="selCardChange"></get-bankcard>
            </div>
            <div class="payinst-tips">
              请您提供真实的付款信息，否则您将可能无法顺利买入UET
            </div>
            <ul class="payord-form" v-show="showPayDetail">
              <li class="payord-group">
                <label>付款方式</label>
                <select class="payord-control" v-model="payOrderParam.creditAccountTypeTwin">
                  <option value="">请选择付款方式</option>
                  <option value="3">银行卡</option>
                  <option value="1">支付宝</option>
                  <option value="2">微信</option>
                </select>
              </li>
              <li class="payord-group" v-show="showPayBankName">
                <label>付款银行名称</label>
                <input class="payord-control" type="text" placeholder="银行名称"
                       v-model="payOrderParam.creditAccountMerchantTwin">
              </li>
              <li class="payord-group">
                <label>付款账号</label>
                <input class="payord-control" type="text" placeholder="银行卡号/支付宝/微信账号"
                       v-model="payOrderParam.creditAccountTwin">
              </li>
              <li class="payord-group posit-rel">
                <label>付款金额</label>
                <input class="payord-control" type="number" placeholder="请输入实际付款金额"
                       v-model="payOrderParam.creditAmountTwin">
                <span class="tips-info">CNY</span>
              </li>
              <li class="payord-group">
                <label>付款的户名</label>
                <input class="payord-control" type="text" placeholder="银行卡/支付宝/微信认证实名"
                       v-model="payOrderParam.creditAccountNameTwin">
              </li>
            </ul>
            <div class="payscreen-part">
              <p class="title">您的付款截图 <span>（选填项）</span></p>
              <upload-img :uploadImgSet="uploadImgSet" @gitPicUrl="gitPicUrl" :showClose="true"></upload-img>
            </div>
            <div class="paybtn-group">
              <input type="button" class="btn cancel" value="取消" @click="payOrderStep=1"/>
              <input type="button" class="btn paycomfirm" value="提交" @click="payOrder"/>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="chatRoom" @click="showChatList()" v-if="chatOnline">
      <div class="chatRoom_content">
        <span class="iconfont icon-tab-talk"></span> 在线聊天
        <div class="unread-count" v-show="unreadCountUpdate>0" :class="{'upMax':unreadCountUpdate>99}">
          {{unreadCountUpdate}}
          <span class="add_symbol" v-show="unreadCountUpdate>99">+</span>
        </div>
      </div>
    </div>
    <div v-if="isPCstate" style="position: relative">
      <chatList :isPC="isPCstate" v-if="openListState" @closeChatroom="iscloseChatroom"></chatList>
      <chat
              class="chatWindow"
              v-if="chatState"
              :detail="orderId"
              :debitNum="DetailList.debitAmount"
              :historyState="DetailList.historyState"
              @chatShow="chatStateUpdate"
              :isPc="isPCstate"
              @openList="openListUpdate"
              @closeChatroom="iscloseChatroom"
      ></chat>
    </div>
    <confirm-dialog v-model="payTypeConfirm" :is-pc="true">
      <div slot="title">请确认是否选择<span class="cl-red">{{payTypeList[payType - 1].name}}</span>付款？</div>
      <div slot="content">选择后不可更改</div>
      <div slot="leftBtn">返回</div>
      <div slot="rightBtn" @click="getRealPayAmount">确认</div>
    </confirm-dialog>
    <common-popup v-if="showRealAmount">
      <div class="real-main">
        <div class="title">请用{{payTypeList[payType - 1].name}}付款</div>
        <div class="real-amount cl-red">&yen; {{realAmount}}</div>
        <div class="tips cl-red">请保证转账的金额准确，否则订单会匹配失败，金额有少许差额敬请见谅！！</div>
        <div class="real-btn" @click="hasGetRealAmount">我知道了</div>
      </div>
    </common-popup>
  </div>
</template>

<script>
  import DetailTitle from './detail-title';
  import DisplayInfor from './display-infor';
  import CountDown from 'components/countdown'
  import getBankcard from 'components/get-bankcard'
  import uploadImg from 'components/upload-img'
  import {generateTitle} from '@/util/i18n'
  import {transaction, chatWith} from 'api'
  import NoDataTip from 'components/no-data-tip'
  import confirmDialog from 'components/confirm'
  import chatList from '../../../views/mobile/chatroom/chat-list'
  import chat from '../../../views/mobile/chatroom/chat'
  import CommonPopup from 'components/common-popup'

  export default {
    data() {
      return {
        orderId: '',
        isPCstate: '',
        DetailList: {},
        chatState: '',
        payOrderStep: 1,
        payOrderParam: {
          id: '',
          creditProofTypeTwin: 0,      // 卖方要求买方的付款证明
          creditProofUrlTwin: '',      // 买方支付证明截图，多个地址逗号分隔
          creditAccountTypeTwin: '',   // 买方法币账户类型
          creditAccountNameTwin: '',   // 买方法币账户名
          creditAccountTwin: '',       // 买方法币账户
          creditAccountMerchantTwin: '',   // 买方法币机构名
          creditAmountTwin: ''           // 买方实际支付金额
        },
        uploadImgSet: {
          maxUploadNum: 3,       // 最大上传数量，如果没有最大上传数量，传 -1
          uploadImgTips: 'component.uploadUpThree',  // 上传图片提示文字
          isShowUploadTip: true,             // 是否有上传文件提示信息
          maxWidth: 600,
          maxHeight: 600
        },
        setBankcard: {
          pleaseSelTitle: 'component.pleaseSelPayMet',         // 请选择标题文字
          addOption: [                                  // 添加的选项
            {type: -1, account: 'component.otherPayMethod'}
          ]
        },
        bindCardReset: false,
        selAccountTypeTwin: {},
        showPayDetail: false,
        showPayBankName: false,
        isCredit: false,
        isDebit: false,
        showConfirm: false,
        showConfirmPayment: false,
        typeState: 1,
        openListState: false,
        chatOnline: true,
        buyTypeBuyBank: '',
        couponValueStr: 0,
        showDiscountInfo: false,
        payTypeList: [  //支付方式列表
          {
            icon: 'icon-pay-type-ali',
            name: '支付宝',
            type: 1
          },
          {
            icon: 'icon-pay-type-wechat',
            name: '微信',
            type: 2
          },
          {
            icon: 'icon-pay-type-bank',
            name: '银行卡',
            type: 3
          }
        ],
        payType: 0,
        showPayType: false, //展示支付类型选择
        payTypeConfirm:false,//支付方式确认弹窗
        realAmount:0,
        showRealAmount:false, //展示推荐金额弹窗
        hideAmountBtn:false, //隐藏交易金额和我已完成付款按钮
      };
    },
    methods: {
      generateTitle,
      fetchData() {
        this.request = {
          orderId: this.orderId
        }
        transaction.getOrderx(this.request).then(res => {
          if (res.code === 10000) {
            if (res.data == '' || res.data == null) {
              this.$router.push({name: 'walletCenter'});
              return;
            }
            if (res.data.status == '61') {
              this.$router.push({name: 'orderDetailAppeal', params: {id: this.orderId}});
              return;
            }
            if (res.data.intervalTime - res.data.elapsedTime <= 0) {
              toast('您好订单已过期');
              this.$router.back();
              return;
            }
            this.DetailList = res.data;
            this.fetchDiscountNum()
            if (this.DetailList.credit == this.userId) {
              this.isCredit = true;
              if(this.DetailList.debit === '0'){
                this.payType = _.isNull(this.DetailList.creditAccountTypeTwin) ? 0 : this.DetailList.creditAccountTypeTwin
                this.hideAmountBtn = this.payType === 0 ? true : false
              }
            } else if (this.DetailList.debit == this.userId) {
              this.isDebit = true;
            }

            if (res.data.creditProofUrlTwin && res.data.creditProofUrlTwin.length > 1) {
              this.DetailList.creditProofUrlTwin = res.data.creditProofUrlTwin.split(',');
            }

            if (this.DetailList.credit == this.userId) {

            } else {
              if (this.DetailList.status == '47' || this.DetailList.status == '48') {
                toast('对方已确认付款，请查收是否到账');
              }
              // toast('对方已确认付款，请查收是否到账');
            }
          } else {
            toast(res.message)
            this.$router.replace({name: 'walletCenter'});
          }
        }).catch(err => {
          toast(err.message);
        });

      },
      chatStateUpdate() {
        this.chatState = false
      },
      fetchDiscountNum() {
        const request = {
          'orderId': this.orderId,
          'traderType': this.DetailList.credit == this.userId ? 1 : 2
        }
        transaction.getCouponAmount(request).then((res) => {
          console.log(res, '手机打开')
          if (res.code == '10000') {
            if (res.data.isAward) {
              this.showDiscountInfo = true;
              this.couponValueStr = res.data.couponValueStr
              if (this.showDiscountInfo) {
                setTimeout(() => {
                  this.fetchDiscountNum()
                }, 10000)
              }
            }
          } else {
            toast(res.message)
          }
        })
      },
      openListUpdate() {
        this.openListState = true
        this.chatState = false
      },
      cancelOrder() {
        this.request = {
          orderId: this.orderId
        };
        transaction.cancelOrder(this.request).then(res => {
          if (res.code == '10000') {
            toast('您已取消，请勿重复操作');
            Vue.$global.bus.$emit('update:tranList');
            this.$store.commit('UPDATE_NEWORDER', {
              type: 0,
              orderId: ''
            })
            this.$store.dispatch('GET_ORDERXPAGE')
            this.$store.dispatch('GET_USERBALANCE')
            this.$router.push({name: 'walletCenter'});
          } else {
            toast(res.message);
          }
        }).catch(err => {
          toast(err);
        });
      },
      iscloseChatroom() {
        this.isPCstate = false
        this.chatOnline = true
      },
      selCardChange(selCard) {
        this.selAccountTypeTwin = selCard;
        if (this.selAccountTypeTwin && JSON.stringify(this.selAccountTypeTwin) != "{}" && this.selAccountTypeTwin.type == -1) {
          this.showPayDetail = true;
        } else {
          this.showPayDetail = false;
        }
      },
      gitPicUrl(picUrlArr) {
        this.payOrderParam.creditProofUrlTwin = picUrlArr.join(',');
      },
      checkPayDetail() {
        if (this.payOrderParam.creditAccountTypeTwin == "" || !this.payOrderParam.creditAccountTypeTwin) {
          toast("请选择付款方式");
        } else if (this.payOrderParam.creditAccountTypeTwin == 3 && (this.payOrderParam.creditAccountMerchantTwin == "" || !this.payOrderParam.creditAccountMerchantTwin)) {
          toast("请输入付款银行名称");
        } else if (this.payOrderParam.creditAccountTwin == "" || !this.payOrderParam.creditAccountTwin) {
          toast("请输入付款账号");
        } else if (this.payOrderParam.creditAmountTwin == "" || !this.payOrderParam.creditAmountTwin) {
          toast("请输入付款金额");
        } else if (this.payOrderParam.creditAccountNameTwin == "" || !this.payOrderParam.creditAccountNameTwin) {
          toast("请输入付款的户名");
        } else {
          return true;
        }
      },
      payOrder() {
        this.showConfirm = false;
        if (this.DetailList.creditProofTypeTwin == 1 && this.DetailList.creditProofStatusTwin == 0) {
          if (this.payOrderStep == 1) {
            this.payOrderStep = 2;
            return;
          } else if (this.payOrderStep == 2) {
            if (!this.selAccountTypeTwin || JSON.stringify(this.selAccountTypeTwin) == "{}") {
              toast('请选择您的付款方式');
              return;
            }
            if (this.selAccountTypeTwin.type == -1) {
              if (!this.checkPayDetail()) return;
              if (this.payOrderParam.creditAccountTypeTwin == 1) {
                this.buyTypeBuyBank = '支付宝';
              } else if (this.payOrderParam.creditAccountTypeTwin == 2) {
                this.buyTypeBuyBank = '微信';
              } else {
                this.buyTypeBuyBank = this.payOrderParam.creditAccountMerchantTwin;
              }
            } else {
              if (this.selAccountTypeTwin.type == 1) {
                this.buyTypeBuyBank = '支付宝';
              } else if (this.selAccountTypeTwin.type == 2) {
                this.buyTypeBuyBank = '微信';
              } else {
                this.buyTypeBuyBank = this.selAccountTypeTwin.bank;
              }
              this.payOrderParam.creditAccountTypeTwin = this.selAccountTypeTwin.type;
              this.payOrderParam.creditAccountNameTwin = this.selAccountTypeTwin.name;
              this.payOrderParam.creditAccountTwin = this.selAccountTypeTwin.account;
              this.payOrderParam.creditAmountTwin = this.DetailList.debitAmountTwin;
            }
          }
        }

        this.payOrderParam.creditAccountMerchantTwin = this.buyTypeBuyBank;
        this.payOrderParam.id = this.orderId;
        this.payOrderParam.creditProofTypeTwin = this.DetailList.creditProofTypeTwin;
        transaction.payOrderV2(this.payOrderParam).then(res => {
          if (res.code == '10000') {
            toast('您已确认付款，请勿重复付款');
            this.fetchData();
            this.payOrderStep = 1;
          } else {
            toast(res.message);
          }

        }).catch(err => {
          toast(err.message);
        });
      },
      showChatList() {
        if (!this.connectState) {
          toast('聊天功能正在初始化,请稍后片刻！')
          return
        }
        let params = {
          groupId: this.orderId,
          founderId: this.userData.userId,
          type: this.typeState,
          founderNickname: this.userData.nickname
        }
        chatWith.createChatGroup(params).then(res => {
          if (res.code === 10000) {
            this.$store.commit('GET_HISTORYSTATE', 3)
            this.isPCstate = !this.isPCstate
            this.chatOnline = false
            this.chatState = true
          } else {
            toast(res.message)
          }
        }).catch(res => {
          toast(res.message)
        })
      },
      payCompleted() {
        this.showConfirmPayment = false;
        this.request = {
          orderId: this.orderId
        }
        transaction.payCompleted(this.request).then(res => {
          this.loading = false;
          if (res.code == '10000') {
            // Vue.$global.bus.$emit('update:balance');
            this.$store.dispatch('GET_USERBALANCE')
            toast('您已确认收款，请勿重复操作');
            this.$router.push({name: 'orderDetailOver', params: {id: this.orderId}});
          } else {
            toast(res.message)
          }

        }).catch(err => {
          toast(err.message);
        });
        this.loading = false;
      },
      createAppeal() {
        this.loading = true;
        this.request = {
          orderId: this.orderId,
          userId: this.userId,
          type: 2
        }
        transaction.createAppeal(this.request).then(res => {
          this.loading = false;
          if (res.code == '10000') {
            toast('申诉创建成功');
            this.$router.push({name: 'orderDetailAppeal', params: {id: this.orderId}});
          } else {
            toast(res.message);
          }
        }).catch(err => {
          toast(err.message);
        });
        this.loading = false;
      },
      countDownEnd() {
        this.fetchData();
      },
      chooseType(data){ //买家选择支付渠道
        this.payType = data
        this.payTypeConfirm = true
      },
      getRealPayAmount(){
        const data = {
          orderId: this.orderId,
          accountCashVo:{
            type: this.payType
          }
        }
        const selectPay = this.bankCardInfo.find(item => {
          return item.type === this.payType
        })
        if(selectPay){
          Object.assign(data.accountCashVo,{
            account: selectPay.account
          })
        }
        transaction.recommendedAmount(data).then(res => {
          if(res.code === 10000){
            this.realAmount = res.data.key
            this.showRealAmount = true
          }else {
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      hasGetRealAmount(){
        this.showRealAmount = false
        this.hideAmountBtn = false
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
      },
      "payOrderParam.creditAccountTypeTwin"(val) {
        if (val == 3) {
          this.showPayBankName = true;
        } else {
          this.showPayBankName = false;
        }
      },
      "getNewOrder": {
        handler(newVal, oldVal) {
          if (newVal.orderId === this.orderId) {
            if (newVal.type === 1 || newVal.type === 2) {
              this.fetchData();
            } else {
              let routerName = ''
              if (newVal.type === 3 || newVal.type === 4) {
                routerName = 'orderDetailOver'
              } else if (newVal.type === 11) {
                routerName = 'orderDetailAppeal'
              }
              this.$router.replace({name: routerName, params: {id: this.orderId}})
            }
          }
        },
        deep: true
      },
      payTypeConfirm(val){
        if(!val){
          this.payType = 0
        }
      }
    },
    computed: {
      ...mapGetters([
        "userData",
        "islogin",
        "userId",
        'connectState',
        'unreadCount',
        'getNewOrder',
        'bankCardInfo'
      ]),
      unreadCountUpdate() {
        if (this.unreadCount < 0) {
          return 0
        } else if (this.unreadCount > 99) {
          return 99
        } else {
          return this.unreadCount
        }
      }
    },
    components: {
      DetailTitle,
      DisplayInfor,
      NoDataTip,
      getBankcard,
      uploadImg,
      CountDown,
      confirmDialog,
      chatList,
      chat,
      CommonPopup
    },
    beforeRouteEnter(to, from, next) {
      if (from.name === 'orderDetailAppeal') {
        next({name: 'tranRecord'})
      } else {
        next()
      }
    }
  };
</script>

<style lang="scss" scoped>
  .txt-imcenter {
    text-align: center !important;
  }

  div.pop-con {
    padding-bottom: 10px;
  }

  .order-status-title {
    text-align: center;
    span {
      font-size: 18px;
    }
  }

  .recharge-payinst {
    padding: 0 40px;
    .payinst-order {
      background: #FFFFFF;
      padding: 10px 10px 0;
      p {
        line-height: 30px;
        font-size: 15px;
        color: #333333;
        span {
          display: block;
        }
        .order-id {
          color: #787876;
          line-height: 20px;
          word-break: break-all;
          width: 80%;
        }
      }
    }
    .payord-group {
      background: #FFFFFF;
      line-height: 40px;
      padding: 0 10px;
      font-size: 15px;
      color: #333333;
      display: flex;
      p.bind-card-part {
        flex-grow: 1;
        width: auto;
        /*display: flex;*/
      }
      .payord-control, .my-input {
        height: 40px;
        line-height: 40px;
        width: auto;
        display: inline-block;
        font-size: 15px;
        color: #333333;
        padding: 0 30px 0 10px;
        border: none;
        outline: none;
        flex-grow: 1;
      }
      .tips-info {
        position: absolute;
        top: 0;
        right: 10px;
        display: block;
      }
    }
    .border-bot {
      border-bottom: 1px solid #EBEBEB;
    }
    .payord-form {
      margin-bottom: 9px;
      li {
        border-bottom: 1px solid #EBEBEB;
      }
    }
    .payinst-tips {
      padding: 0 10px;
      font-size: 15px;
      color: #8F8F8F;
      line-height: 30px;
    }
    .payscreen-part {
      background: #FFFFFF;
      font-size: 15px;
      color: #333333;
      .title {
        padding: 0 10px;
        line-height: 36px;
        span {
          color: #FF0000;
        }
      }
      .upload-imgpart {
        padding: 0 10px;
      }
    }
    .paybtn-group {
      padding: 0 10px;
      .btn {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        width: 48%;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
        font-size: 15px;
        color: #333333;
        &:first-child {
          margin-right: 2%;
        }
      }
      .cancel:hover {
        background: #eeeeee;
      }
      .paycomfirm {
        background: #619eff;
        border: 1px solid #619eff;
        color: #fff;
        &:hover {
          background: rgb(255, 166, 60);
          border: 1px solid rgb(255, 166, 60);
        }
      }
    }
  }

  .pay_send {
    font-size: 14px;
    color: #333;
    text-align: center;
    span {
      font-size: 14px;
      color: #ff1100;
    }
  }

  .detail-content {
    min-height: 300px;
    padding: 0 0 23px;
  }

  .go-back-part {
    height: 40px;
    a {
      font-size: 16px;
      padding: 5px 12px;
      border-radius: 15px;
      background-color: #86A5F8;
      color: #FFFFFF;
      display: block;
      line-height: 16px;
      margin-top: 7px;
      &:hover {
        background: #9490F6;
      }
    }
  }

  .detail-box {
    border: 1px solid #d4d4d4;
    .btn-sell {
      background: orange;
    }
    .time-stame {
      font-size: 20px;
      padding: 10px 0;
      span {
        display: block;
        &:last-child {
          color: red;
        }
      }
    }
    .col-33 {
      display: block;
      float: left;
      width: 28%;
      margin: 0;
      min-height: 435px;
    }
    p {
      font-size: 14px;
      padding: 5px 0;
      line-height: 25px;
    }
    .red {
      color: red;
    }
    .pay-type {
      padding: 30px 40px;
      .tips {
        font-size: 14px;
      }
      .type-list {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
      }
      .type-item {
        width: 346px;
        height: 80px;
        background: #F3F7FF;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover{
          box-shadow: 0 2px 5px 0 rgba(0,0,0,0.30);
        }
        &.active{
          background-image: linear-gradient(0deg, #3A7FDB 0%, #58A0FF 100%);
          box-shadow: 0 2px 5px 0 rgba(0,0,0,0.30);
        }
      }
      .icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #FFFFFF;
        margin-right: 20px;
        text-align: center;
        font-size: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-pay-type-ali {
          color: #3988FF;
        }
        .icon-pay-type-wechat {
          color: #24DB5A;
        }
        .icon-pay-type-bank {
          color: #EC3A4E;
        }
      }
    }
  }

  .order-time {
    padding: 20px;
  }

  .detail-tips {
    border-top: 1px solid #d4d4d4;
    color: #787876;
    line-height: 30px;
    padding: 18px 30px 50px;
    p {
      font-size: 16px;
    }
    .tips-title {
      color: red;
      font-size: 18px;
      padding: 0 0 15px 0;
    }
    .tips-title-i {
      background: url(~images/tips.png) no-repeat left 4px;
      padding: 0 0 15px 25px;
    }
    .tips-title0 {
      padding: 0 0 15px 0;
    }
  }

  .detail-tips-sell {
    padding: 18px 30px 20px;
    overflow: hidden;
  }

  input[type="button"] {
    &.btn {
      display: block;
      width: 90%;
      border: 1px solid #5087ff;
      font-size: 18px;
      color: #FFFFFF;
      border-radius: 4px;
      height: 38px;
      line-height: 38px;
      margin: 10px auto 0;
      cursor: pointer;
      &:hover {
        opacity: .8;
      }
    }
    .btn-blue {
      border: 1px solid #5087ff;
      color: #5087ff;
    }
    &.btn-orange {
      border: 1px solid #D3D3D3;
      color: #787876;
    }
    &.btn-normal {
      border: 1px solid #5087ff;
      background: #5087ff;
      color: #fff;
    }
  }

  .item-info {
    color: #333;
  }

  .item-info.active {
    color: #5087FF;
  }

  .text-center {
    text-align: center;
  }

  .pic-ul {
    overflow: hidden;
    float: left;
  }

  .pic-ul li {
    float: left;
    margin-right: 15px;
  }

  .pic-ul li img {
    height: 190px;
  }

  .friend-txt {
    margin-top: 150px;
  }

  .bank-list-p {
    position: relative;
    margin-bottom: 18px;
  }

  .chatRoom {
    position: fixed;
    right: 0;
    bottom: 0;
    color: #fff;
    width: 150px;
    height: 50px;
    background-color: #FF6666;
    border-radius: 10px 10px 0 0;
    font-size: 18px;
    line-height: 50px;
    text-align: center;
    float: right;
    .chatRoom_content {
      position: relative;
    }
  }

  .unread-count {
    display: inline-block;
    border-radius: 50%;
    padding: 0 5px;
    background-color: red;
    font-size: 12px;
    text-align: center;
    margin: 0 auto;
    color: #fff;
    line-height: 17px;
    vertical-align: top;
    margin-top: 7px;
    position: relative;
    &.upMax {
      padding: 0 10px 0 5px;
    }
    .add_symbol {
      position: absolute;
      top: -3px;
      right: 0;
      margin-top: -1px;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .real-main{
    width: 506px;
    padding: 30px;
    text-align: center;
    .title{
      margin-top: 30px;
      ont-size: 24px;
      color: #333333;
    }
    .real-amount{
      font-size: 40px;
      margin-top: 60px;
    }
    .tips{
      font-size: 16px;
      text-align: left;
      margin-top: 57px;
    }
    .real-btn{
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 18px;
      color: #FFFFFF;
    }
  }

</style>
