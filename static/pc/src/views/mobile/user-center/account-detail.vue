<template>
  <div class="detail-container">
    <MobileHeader>账户详情</MobileHeader>
    <div class="account-person-single">
      <div class="person-single-info">
        <p class="account-pic"><span class="iconfont icon-default-user"></span></p>
        <p class="account-name">{{username}}</p>
        <p class="account-num"><span>{{accountValue}}</span> UET</p>
        <div class="address-info">
          <div class="left-side" @click="openCode">
            <span class="iconfont icon-qrcode-address"></span>
            <p>二维码</p>
          </div>
          <a class="right-side copy-btn" @click="copy" :data-clipboard-text="userData.accountChainVos[0].address">
            <span class="iconfont icon-copy-address"></span>
            <p>复制地址</p>
          </a>
        </div>
      </div>

      <div class="person-manager">
        <div class="btn" @click="transferMoney(1)" :class="{active:typeNum==1}">UET转出</div>
        <div class="btn btn-middle" @click="transferMoney(2)" :class="{active:typeNum==2}">UET转入</div>
        <div class="btn" @click="transferMoney(3)" :class="{active:typeNum==3}">收款</div>
      </div>
      <div class="manager-content" v-if="typeNum==1">
        <div class="transfer-account-hand" v-if="userId==currentId">
          <div class="de-title">手动转账</div>
          <div class="transfer-address">
            <input type="text" placeholder="请手动输入地址" v-model="handAddress">
          </div>
          <div class="transfer-amount">
            <input type="text" placeholder="请填写转账数量" v-model="handAmount">
            <span class="amount-value">UET</span>
          </div>
          <div class="btn" @click="TransMoney">确定转账</div>
        </div>

        <!--转账到内部账户-->
        <div class="transfer-account-container">
          <div class="de-title">
            转账到内部账户
          </div>
          <div class="de-line" v-for="(list,key) in accountList" @click="openDetailInfo(key)">
            <div class="wipper-info">
              <span class="de-user">{{list.name}}</span>
              <span class="de-accountValue">账户余额: {{list.amount}} UET</span>
              <span class="down-arrow" :class="{close:currentNum!==key&&isSame,active:currentNum==key&&!isSame}"></span>
            </div>
            <div class="inner-info" :class="{close:currentNum!==key&&isSame,active:currentNum==key&&!isSame}">
              <div class="inner-box">
                <span class="iconfont icon-money-value"></span>
                <div class="info-detail">
                  <p class="detail-name">{{list.name}}</p>
                  <p class="detail-money">转出 <input type="number" v-model="transferNum"> UET</p>
                </div>
                <p class="defineOk" @click="TransMoneyNext(list.nodeId,list.address)">确认</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="manager-content-middle" v-else-if="typeNum==2">
        <div class="de-title">请选择以下目标账户</div>
        <div class="de-line" v-for="(list,key) in accountList" @click="openMiddleInfo(key)">
          <div class="wipper-info">
            <span class="de-user">{{list.name}}</span>
            <span class="de-accountValue">账户余额: {{list.amount}} UET</span>
            <span class="down-arrow" :class="{close:isSameNext,active:currentNumNext ==key&&!isSameNext}"></span>
          </div>
          <div class="inner-info" :class="{close:isSameNext,active:currentNumNext==key&&!isSameNext}">
            <div class="inner-box">
              <span class="iconfont icon-money-value"></span>
              <div class="info-detail">
                <p class="detail-name">{{list.name}}</p>
                <p class="detail-money">转出 <input type="number" v-model="transferAmount"> UET</p>
              </div>
              <p class="defineOk">确认</p>
            </div>
          </div>
        </div>
      </div>
      <div class="content-last" v-else-if="typeNum==3">
        <div class="mreceiv-code">
          <div class="mreceiv-code-content">
            <div class="qrcode">
              <qrcode :text="'UET,'+currentAddress+','+accountValue" v-if="currentAddress" :logoSrc="Logo"
                      :logoScale="0.2"
                      :size="180"></qrcode>
            </div>
            <a href="javascript:void(0);" class="copy-btn mobile-pubtn" :data-clipboard-text="currentAddress"
               @click="copy">{{$t('transactionHome.copyBtn')}}</a>
          </div>
        </div>
      </div>

    </div>
    <transition name="scroll-up">
        <MultiAccount v-if="showReceivePageUpdate" @closeReceivables="closeReivePage" :accountChainVos="currentAddress"
                  :accountMount="accountValue"></MultiAccount>
    </transition>


  </div>
</template>

<script>
  import {transaction, userCenter} from 'api'
  import MultiAccount from './multi-account-code'
  import MobileHeader from 'components/m-header';
  import {mapGetters} from 'vuex';
  import VueQrcode from 'vue-qr';
  import Logo from '@/assets/images/logo-blue.png';
  import Clipboard from 'clipboard';

  export default {
    data() {
      return {
        showReceivePage: false,
        typeNum: 1,
        currentId: '',
        userBalance: '',
        usernickName: '',
        showReceivePageUpdate: false,
        homeInfoName: '',
        accountValue: 0,
        currentAddress: '',
        accountList: [],
        isOpenState: false,
        currentNum: -1,
        transferNum: '',
        differentState: false,
        transferAmount: '',
        currentNumNext: -1,
        handAddress: '',
        handAmount: '',
        lastNum: 0,
        isSame: false,
        initTime: 0,
        lastNumNext: '',
        currentNumAnother: '',
        initTimeNext: 0,
        isSameNext: false,

        Logo
      }
    },
    created() {
      this.currentId = this.$route.params.id
      this.currentAddress = this.$route.params.address
      this.username = this.$route.params.username
      this.usernode = this.$route.params.nodeId
      this.searchHomeInfo(),
        this.getCenterInfo()
    },
    methods: {
      getCenterInfo() {
        const request = {
          'id': this.centerId
        }
        userCenter.getCenterInfo(request).then(res => {
          if (res.code == '10000') {
            this.accountList = res.data.filter((item) => {
              return item.userId !== this.userId
            })
          }
        })
      },
      TransMoneyNext(val, address) {
        const request = {
          userId: this.userId,
          amount: this.transferNum,
          nodeId: val,
          /*debit是用户自己的  贷方*/
          debitAccount: this.currentAddress,
          /*借方*/
          creditAccount: address
        }
        userCenter.assetTransfer(request).then(res => {
          if (res.code == '10000') {
            toast("账户转账成功")
            this.searchHomeInfo()
            this.getCenterInfo()
          } else {
            toast(res.message)
          }
        })
      },
      openCode() {
        this.showReceivePageUpdate = true
      },
      transferMoney(val) {
        this.typeNum = val
        if (val == 3) {
          this.showReceivePage = true
        }
      },
      closeReivePage(val) {
        this.showReceivePageUpdate = val
      },
      openDetailInfo(val) {
        this.lastNum = this.currentNum
        this.currentNum = val
        this.transferNum = ''

        if (this.lastNum == this.currentNum) {
          this.initTime++
          if (this.initTime % 2 == 1) {
            this.isSame = true
          } else {
            this.isSame = false
          }
        } else {
          this.isSame = false
        }
      },
      TransMoney() {
        const request = {
          userId: this.userId,
          amount: this.handAmount,
          nodeId: this.usernode,
          /*debit是用户自己的  贷方*/
          debitAccount: this.currentAddress,
          /*借方*/
          creditAccount: this.handAddress
        }

        userCenter.assetTransfer(request).then(res => {
          if (res.code == '10000') {
            toast("账户转账成功")

            this.searchHomeInfo()

          } else {
            toast(res.message)
          }
        })
      },
      openMiddleInfo(num) {
        this.lastNumNext = this.currentNumNext
        this.currentNumNext = num
        this.transferAmount = ''

        if (this.lastNumNext == this.currentNumNext) {
          this.initTimeNext++
          if (this.initTimeNext % 2 == 1) {
            this.isSameNext = true
          } else {
            this.isSameNext = false
          }
        } else {
          this.isSameNext = false
        }
      },
      searchHomeInfo() {
        this.requestdata = {
          'userId': this.currentId,
          'assetCode': 'UET',
          'address': this.currentAddress
        };
        transaction.getAccountChain(this.requestdata).then(res => {
          if (res.code == '10000') {
            this.accountValue = Number(res.data.balance)
            this.$store.dispatch("GET_USERBALANCE", res.data.balance)
          }
        }).catch(err => {
          toast(err.message);
        })
      },
      copy() {
        var clipboard = new Clipboard('a.copy-btn');
        clipboard.on('success', e => {
          toast('复制成功')
          // 释放内存
          clipboard.destroy()
        });
        clipboard.on('error', e => {
          // 不支持复制
          // 释放内存
          clipboard.destroy()
        });
      },
      returnBtnEvent() {
        this.$emit('closeReceivables', false)
      }
    },
    computed: {
      ...mapGetters(["userData", 'userId'])
    },
    components: {
      qrcode: VueQrcode,
      MobileHeader,
      MultiAccount
    },
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .detail-container {
    height: -webkit-fill-available;
    .account-person-single {
      text-align: center;
      color: #fff;
      .person-single-info {
        padding-top: r(20);
        background-color: #fff;
        .account-pic {
          display: block;
          width: r(80);
          height: r(80);
          border-radius: 50%;
          background-color: #85abfc;
          text-align: center;
          line-height: r(70);
          @include f(35px);
          margin: auto;
        }
        .account-name {
          margin-top: r(20);
          @include f(18px);
          color: #333333;
        }
        .account-num {
          @include f(18px);
          color: #333;
          padding-top: r(15);
          span {
            color: #ec3a4e;
          }
        }

        .address-info {
          display: flex;
          flex-direction: row;
          padding-bottom: r(30);
          .left-side {
            width: 50%;
            span {
              display: inline-block;
              color: #9a9a9a;
              @include f(40px)
            }
            p {
              margin-top: r(10);
              color: #333;
            }
          }
          .right-side {
            width: 50%;
            span {
              display: inline-block;
              color: #9a9a9a;
              @include f(40px)
            }
            p {
              margin-top: r(10);
              color: #333333;
            }
          }
        }
      }
      .person-manager {
        display: flex;
        flex-direction: row;
        .btn {
          width: 50%;
          text-align: center;
          height: r(52);
          color: #333;
          line-height: r(52);
          border-top: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          background-color: #fff;
        }
        .active {
          background-color: #85abfc;
          color: #fff;
        }
        .btn-middle {
          border-right: 1px solid #e4e4e4;
        }
      }
      .manager-content {
        width: 100%;
        background-color: #f5f5f5;
        .transfer-account-hand {
          background-color: #fff;
          height: r(240);
          .de-title {
            @include f(16px);
            color: #333;
            padding: r(20);
            text-align: left;
            background-color: #fff;
            height: r(56);
          }
          .transfer-address {
            border-top: 1px solid #E9E9E9;
            border-bottom: 1px solid #E9E9E9;
            height: r(44);
            line-height: r(44);
            text-align: left;
            @include f(15px);
            background-color: #fcfcfc;
            input {
              width: 80%;
              height: r(38);
              text-indent: r(10);
              margin-left: r(10);
              &:focus {
                outline: none;
              }
            }
          }
          .transfer-amount {
            margin-top: r(10);
            border-top: 1px solid #E9E9E9;
            border-bottom: 1px solid #E9E9E9;
            height: r(44);
            text-align: left;
            @include f(15px);
            line-height: r(44);
            input {
              width: 80%;
              height: r(38);
              text-indent: r(10);
              margin-left: r(10);
              &:focus {
                outline: none;
              }
            }
            .amount-value {
              @include f(15px);
              color: #949494;
            }
          }
        }

        .transfer-account-container {
          margin-top: r(10);
          background-color: #f5f5f5;
          .de-title {
            @include f(16px);
            color: #333;
            padding: r(20);
            text-align: left;
            background-color: #fff;
            height: r(56);
          }
          .de-line {
            width: 100%;
            background-color: #fff;
            margin-top: r(10);
            .wipper-info {
              display: flex;
              flex-direction: row;
              height: r(56);
              line-height: r(56);
              .de-user {
                @include f(16px);
                color: #333;
                padding-left: r(20);
                text-align: left;
              }
              .de-accountValue {
                @include f(16px);
                color: #787876;
                flex: 1;
                text-align: right;
              }
              .down-arrow {
                display: inline-block;
                position: relative;
                width: r(40);
                height: r(30);
                margin-right: r(20);
              }

              .down-arrow::after {
                display: inline-block;
                content: " ";
                height: r(10);
                width: r(10);
                border-width: 0 r(2) r(2) 0;
                border-color: #999999;
                border-style: solid;
                transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
                transform-origin: center;
                transition: transform .3s;
                position: absolute;
                top: 100%;
                right: r(10);
                margin-top: r(-10);
              }
              .down-arrow.active::after {
                transform-origin: center;
                transform: rotate(-135deg);
                transition: transform .3s;
              }
              .down-arrow.close::after {
                transform-origin: center;
                transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
                transform-origin: center;
                transition: transform .3s;

              }
            }
            .inner-info {
              display: none;
              .inner-box {
                display: flex;
                flex-direction: row;
                color: #333;
                background-color: #fff8f7;
                height: r(80);
              }

              span {
                color: #ec3a4e;
                @include f(30px);
                padding: r(20);
              }
              .info-detail {
                flex: 1;
                padding: r(15) r(10);
                .detail-name {
                  text-align: left;
                  @include f(15px)
                }
                .detail-money {
                  text-align: left;
                  padding-top: r(6);
                  @include f(15px);
                  white-space: nowrap;
                  input {
                    display: inline-block;
                    width: r(120);
                    border: 1px solid #E9E9E9;
                    color: #333;
                    height: r(30);
                    line-height: r(30);
                    text-indent: r(6);
                  }
                }
              }
              .defineOk {
                display: block;
                width: r(60);
                height: r(30);
                background-color: #ec3a4e;
                color: #fff;
                line-height: r(30);
                border-radius: r(3);
                margin-right: r(20);
                margin-top: r(30);
              }
              &.active {
                display: block;
              }
              &.close {
                display: none;
              }
            ;
            }

          }
        }
        .btn {
          display: block;
          margin: 0 auto;
          margin-top: r(20);
          margin-bottom: r(20);
          padding-bottom: r(20);
          background-color: #3573FA;
          border-radius: r(3);
          text-align: center;
          @include f(18px);
          color: #fff;
          width: r(335);
          height: r(44);
          line-height: r(44);
        }
      }
      .manager-content-middle {
        background-color: #f5f5f5;
        padding-bottom: r(10);
        .de-title {
          @include f(16px);
          color: #333;
          padding: r(20);
          text-align: left;
          background-color: #fff;
        }
        .de-line {
          width: 100%;
          background-color: #fff;
          margin-top: r(10);
          .wipper-info {
            display: flex;
            flex-direction: row;
            height: r(56);
            line-height: r(56);
            .de-user {
              @include f(16px);
              color: #333;
              padding-left: r(20);
              text-align: left;
            }
            .de-accountValue {
              @include f(16px);
              color: #787876;
              flex: 1;
              text-align: right;
            }
            .down-arrow {
              display: inline-block;
              position: relative;
              width: r(40);
              height: r(30);
              margin-right: r(20);
            }

            .down-arrow::after {
              display: inline-block;
              content: " ";
              height: r(10);
              width: r(10);
              border-width: 0 r(2) r(2) 0;
              border-color: #999999;
              border-style: solid;
              transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
              transform-origin: center;
              transition: transform .3s;
              position: absolute;
              top: 100%;
              right: r(10);
              margin-top: r(-10);
            }
            .down-arrow.active::after {
              transform-origin: center;
              transform: rotate(-135deg);
              transition: transform .3s;
            }
          }
          .inner-info {
            display: none;
            .inner-box {
              display: flex;
              flex-direction: row;
              color: #333;
              background-color: #f6f9ff;
              height: r(80);
            }

            span {
              color: #3573FA;
              @include f(30px);
              padding: r(20);
            }
            .info-detail {
              flex: 1;
              padding: r(15) r(10);
              .detail-name {
                text-align: left;
                @include f(15px)
              }
              .detail-money {
                text-align: left;
                padding-top: r(6);
                @include f(15px);
                white-space: nowrap;
                input {
                  display: inline-block;
                  width: r(120);
                  border: 1px solid #E9E9E9;
                  color: #333;
                  height: r(30);
                  line-height: r(30);
                  text-indent: r(6);
                }
              }
            }
            .defineOk {
              display: block;
              width: r(60);
              height: r(30);
              background-color: #3573FA;
              color: #fff;
              line-height: r(30);
              border-radius: r(3);
              margin-right: r(20);
              margin-top: r(30);
            }
            &.active {
              display: block;
            }
          }
        }
      }
      .mreceiv-code {
        position: relative;
        padding-bottom: r($footer-hg+20);
        width: 100%;
        background-color: #fff;

      }

      .mreceiv-code-content {
        background: #FFFFFF;
        text-align: center;
        padding: r(32) r(20) r(60);

        .address {
          @include f(16px);
          color: $font-color;
          line-height: r(22);
          word-wrap: break-word;
          margin-bottom: r(31);
        }
        .qrcode {
          width: r(150);
          height: r(150);
          overflow: hidden;
          margin: r(0) auto r(30);
        }
      }
    }
    /deep/ .mreceiv-code {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      height: auto;
    }

  }

  .code-container /deep/ .mreceiv-code {
    height: -webkit-fill-available !important;
  }
</style>
