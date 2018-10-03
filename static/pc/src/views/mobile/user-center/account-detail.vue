<template>
  <div class="detail-container">
    <MobileHeader>账户详情</MobileHeader>
    <div class="account-person-single">
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
      <div class="person-manager">
        <div class="btn" @click="transferMoney(1)" :class="{active:typeNum==1}">UET转出</div>
        <div class="btn btn-middle" @click="transferMoney(2)" :class="{active:typeNum==2}">UET转入</div>
        <div class="btn" @click="transferMoney(3)" :class="{active:typeNum==3}">收款</div>
      </div>
      <div class="manager-content" v-if="typeNum==1">
        <div class="de-title">手动转账</div>
        <div class="transfer-address">
          <input type="text" placeholder="请手动输入地址">
        </div>
        <div class="transfer-amount">
          <input type="text" placeholder="请填写转账数量">
          <span class="amount-value">UET</span>
        </div>
        <div class="btn">确定转账</div>
      </div>
      <div class="manager-content-middle" v-else-if="typeNum==2">
        <div class="de-title">请选择以下目标账户</div>
        <div class="de-line">
          <span class="de-user">stan</span>
          <span class="de-accountValue">账户余额: 200000UET</span>
          <span class="iconfont icon-down-arrow "></span>
        </div>
        <div class="de-line">
          <span class="de-user">stan</span>
          <span class="de-accountValue">账户余额: 200000UET</span>
          <span class="iconfont icon-down-arrow de-arrow"></span>
        </div>
      </div>
      <div class="content-last" v-else-if="typeNum==3">
        <div class="mreceiv-code">
          <div v-for="(item,i) in userData.accountChainVos" class="mreceiv-code-content">
            <div class="qrcode">
              <qrcode :text="'UET,'+item.address" v-if="item.address" :logoSrc="Logo" :logoScale="0.2"
                      :size="180"></qrcode>
            </div>
            <a href="javascript:void(0);" class="copy-btn mobile-pubtn" :data-clipboard-text="item.address"
               @click="copy">{{$t('transactionHome.copyBtn')}}</a>
          </div>
        </div>
      </div>
    </div>
    <transition name="scroll-up">
      <MultiAccount v-if="showReceivePageUpdate" @closeReceivables="closeReivePage" :accountChainVos="currentAddress"></MultiAccount>
    </transition>
  </div>
</template>

<script>
  import {transaction} from 'api'
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
        accountValue: '',
        currentAddress:'',
        Logo
      }
    },
    created() {
      this.currentId = this.$route.params.id
      this.currentAddress = this.$route.params.address
      this.username = this.$route.params.username
      this.searchHomeInfo()
    },
    methods: {
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
      searchHomeInfo() {
        this.requestdata = {
          'userId': this.currentId,
          'assetCode':'UET',
          'address':this.currentAddress
        };
        transaction.getAccountChain(this.requestdata).then(res => {
          console.log(res,'时间看到了')
          if (res.code == '10000') {
            this.accountValue = res.data.balance
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
    background-color: #fff;
    .account-person-single {
      text-align: center;
      padding-top: r(20);
      color: #fff;

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
        .de-title {
          @include f(16px);
          color: #333;
          padding: r(20);
          text-align: left;
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
        .btn {
          display: block;
          margin: 0 auto;
          margin-top: r(20);
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
          height: r(56);
          background-color: #fff;
          line-height: r(56);
          display: flex;
          flex-direction: row;

          margin-top: r(10);
          .de-user {
            @include f(16px);
            color: #333;
            text-align: left;
            padding-left: r(20);
          }
          .de-accountValue {
            @include f(16px);
            color: #787876;
            flex: 1;
          }
          .de-arrow {
            display: inline-block;
            width: r(15);
            height: r(15);
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
      height: -webkit-fill-available;
    }
  }
</style>
