<template>
  <div class="muser-center-home">
    <div class="mcenter-userinfo">
      <div class="login-user">
        <span @click="goAccountManager">
        <span>
          <img :src="getLogo" class="logo" v-if="currentIcon==null">
          <img :src="currentIcon" alt="" class="logo" v-else>
          {{userData.nickname}}
          <span class="iconfont icon-right-arrow left "></span>
        </span>
           </span>
        <span class="iconfont icon-cebian-menu right" @click="openSideMenu"></span>

      </div>

      <div class="assets cfx">
        <div class="item-info">
          <div class="mcertent">
            <p> UET资产：</p>
            <span class="amount"> {{calUserBalance(1)}}</span>
            <span class="money"> ≈ &nbsp;{{formatCny(1)}} &nbsp;CNY</span>
          </div>
        </div>

        <div class="item-info txt-center">
          <div class="mcertent right-lock">
            <p> 锁定资产：</p>
            <span class="amount"> {{calUserBalance(2)}}</span>
            <span class="money"> ≈ &nbsp;{{formatCny(2)}} &nbsp;CNY</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mcenter-hotlink cfx">
      <div class="item-href" @click="openReivePage">
        <i class="iconfont icon-receipt-code"></i>
        {{$t('userCenter.receivcode')}}
      </div>
      <router-link :to="{name:'mTranRecord'}" class="item-href">
        <i class="iconfont icon-tran-record1"></i>
        {{$t('userCenter.transactionRecord')}}
        <span class="tran-num" v-if="homeInforma.tradingOrderCount>0">{{homeInforma.tradingOrderCount}}</span>
      </router-link>
      <router-link :to="{name:'mMyPending'}" class="item-href">
        <i class="iconfont icon-mypend-order"></i>
        {{$t('transactionRecord.tranPending')}}
        <span class="tran-num" v-if="homeInforma.pendingOrderCount>0">{{homeInforma.pendingOrderCount}}</span>
      </router-link>
      <router-link :to="{name:'mMyGift'}" class="item-href">
        <i class="iconfont icon-my-gift"></i>
        {{$t('userCenter.myGift')}}
        <span class="tran-num" v-if="myGiftTotal>0">{{myGiftTotal}}</span>
      </router-link>
    </div>

    <div class="panel-item">
      <div class="mcenter-linkitem">
     <!--   <router-link :to="{name:'mBindList'}" v-if="userData.nodeId < 10000" class="item-href">
          <i class="iconfont logo icon-business-list"></i>
          {{$t('navbar.busineList')}}
          <i class="iconfont icon-right-arrow"></i>
        </router-link>-->
        <router-link :to="{name:'mAppealList'}" class="item-href">
          <i class="iconfont logo icon-appeal-list"></i>
          {{$t('userCenter.appealList')}}
          <i class="iconfont icon-right-arrow"></i>
        </router-link>
      </div>

      <div class="mcenter-linkitem">
        <router-link :to="{name:'mCardList'}" class="item-href">
          <i class="iconfont logo icon-bind-bank"></i>
          {{$t('userCenter.bindCard')}}
          <i class="iconfont icon-right-arrow"></i>
        </router-link>
        <router-link :to="{name:'mBindCard',params:{id:1}}" class="item-href">
          <i class="iconfont logo icon-bind-alipay"></i>
          {{$t('userCenter.bindAlipay')}}
          <i class="iconfont icon-right-arrow"></i>
        </router-link>
        <router-link :to="{name:'mBindCard',params:{id:2}}" class="item-href">
          <i class="iconfont logo icon-bind-wechat"></i>
          {{$t('userCenter.bindWeChat')}}
          <i class="iconfont icon-right-arrow"></i>
        </router-link>
      </div>

      <div class="mcenter-linkitem">
        <router-link :to="{name:'mSetUserInfo'}" class="item-href">
          <i class="iconfont logo icon-complete-material"></i>
          完善资料
          <i class="iconfont icon-right-arrow"></i>
        </router-link>
      </div>

      <div class="mcenter-linkitem">
        <!--   <get-live800 :showRightArrow="true" :liveSpecStyle="mcenterLive" :isRoundIcon="true"></get-live800>-->
        <a class="item-href" target="_blank" :href="SETTING.appUrl">
          <i class="iconfont logo icon-juan-app"></i>
          {{$t('navbar.juanApp')}}
          <i class="iconfont icon-right-arrow"></i>
        </a>
        <router-link :to="{name:'index'}" class="item-href">
          <i class="iconfont logo icon-juan-home"></i>
          前往久安首页
          <i class="iconfont icon-right-arrow"></i>
        </router-link>
      </div>
    </div>
    <m-navbar></m-navbar>
    <confirm-dialog v-model="showConfirm">
      <div slot="title">温馨提示</div>
      <div slot="content">
        <div class="dialog-content">请前往设置您的真实姓名</div>
      </div>
      <div slot="leftBtn" class="confirm-btn-cancel dialog-cancel">取消</div>
      <div slot="rightBtn" class="dialog-btn-yes" @click="toSetInfo">确定</div>
    </confirm-dialog>
    <div class="outer-container" v-if="isAd">
      <div class="mist" @click="openSideMenu"></div>
      <div class="side-menu">
        <div class="account-person-single" v-if="isSingle">
          <p class="account-pic"><span class="iconfont icon-default-user"></span></p>
          <p class="account-name">{{singerUserName}}</p>
        </div>
        <div class="account-person-more" v-else>
          <p class="changeTitle">切换账号</p>
          <p v-for="list in accountList" class="account-list">
            <img :src="list.iconUrl" alt="" v-if="list.iconUrl">
            <span class="iconfont icon-default-user user-symbol" v-else></span>
            <span class="user-name">{{list.name}}</span>
            <span class="change-account" @click="changeAccount(list.token,list.merchantId)">切换账户</span>
          </p>
        </div>
        <div class="add-account" @click="addAccount">添加账户</div>
        <div class="account-content">
          <get-live800 :showRightArrow="true" :liveSpecStyle="mcenterLive" :isRoundIcon="true"></get-live800>
          <router-link :to="{name:'helpCenter'}" class="item-info">
            <i class="iconfont help-icon icon-help-center"></i>
            <span class="font-content">帮助中心</span>
            <i class="iconfont icon-right-arrow"></i>
          </router-link>
          <router-link :to="{name:'contactUs'}" class="item-info">
            <i class="iconfont about-icon icon-about-jiuan"></i>
            <span class="font-content">关于我们</span>
            <i class="iconfont icon-right-arrow"></i>
          </router-link>
        </div>
        <div class="login-out-btn" @click="$store.dispatch('LOGIN_OUT')">退出账户</div>
      </div>
    </div>
    <transition name="scroll-up">
      <ReceivablesCode v-if="showReceivePage" @closeReceivables="closeReivePage"></ReceivablesCode>
    </transition>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import ConfirmDialog from 'components/confirm'
  import mNavbar from 'components/m-navbar';
  import {SETTING} from "@/assets/data";
  import getLive800 from 'components/get-live800';
  import {$localStorage} from '@/util/storage';
  import ReceivablesCode from './receivables-code'
  import jiuanLogo from '@/assets/images/icon/juan-logo.svg';
  import {transaction, userCenter, show} from 'api';
  import mToolbar from 'components/m-toolbar'

  export default {
    name: "m-user-center",
    data() {
      return {
        SETTING,
        showConfirm: false,
        homeInforma: {},
        requestdata: {},
        mcenterLive: 'mcenter-live',
        initPageNext: 0,
        myGiftTotal: 0,
        isAd: false,
        showReceivePage: false,
        singerUserName: '',
        isSingle: false,
        accountList: [],
        currentUser:[],
        currentIcon:''
      }
    },
    components: {
      ConfirmDialog,
      mNavbar,
      getLive800,
      mToolbar,
      ReceivablesCode
    },
    watch: {
      'userData.name': function (val) {
        this.userData.name = val
      },
    },
    computed: {
      ...mapGetters([
        'userData',
        'userId'
      ]),
      getLogo() {
        const menuStyle = JSON.parse($localStorage.get('menuStyle'));
        let logoSrc = jiuanLogo;
        if (this.userData.nodeId > 10000 && menuStyle) {
          logoSrc = menuStyle.iconUrl;
        }
        return logoSrc
      },

    },
    methods: {
      closeReivePage(val) {
        this.showReceivePage = val
      },
      openReivePage() {
        this.showReceivePage = true
      },
      addAccount() {
        this.$router.push({name: 'mAddAccount'})
      },
      openSideMenu() {
        this.isAd = !this.isAd
        this.getCenterInfo()
      },
      toSetInfo() {
        this.showConfirm = false;
        this.$router.push({name: 'mSetUserInfo'});
      },
      changeAccount(val, cont) {
        const request = {
          type: 11,
          token: val,
          merchantId: cont
        }
        show.login(request).then(res => {
          if (res.code == '10000') {
            $localStorage.set('tokenInfo', JSON.stringify(res.data.tokenVo));
            this.$store.commit('SET_USERDATA', res.data);
            this.$store.dispatch('CHECK_ONLINE', true);
            this.$store.dispatch('UPDATE_TOKEN_INFO', res.data.tokenVo);
            this.$store.dispatch("GET_BANKCARD");
            this.searchHomeInfo()
            this.getCenterInfo()
            _.initRongyun()
            toast('切换用户成功')
            this.isAd = false
          } else {
            toast(res.message)
          }
        })
      },
      formatCny(type) {   // type 1表示用户余额 2表示锁定资产
        const amount = type === 1 ? this.homeInforma.chainAmount : (this.homeInforma.pendingAmount + this.homeInforma.lockedAmount);
        return !_.isNaN(Number(amount)) ? (Number(amount) * 0.01).toFixed(2) : '0.00';
      },
      searchHomeInfo() {
        this.requestdata = {
          userId: this.userId
        };
        transaction.getHomeInfo(this.requestdata).then(res => {
          if (res.code == '10000') {
            this.homeInforma = res.data;
          }
        }).catch(err => {
          toast(err.message);
        })
      },
      calUserBalance(type) {
        const balAmount = type === 1 ? this.homeInforma.chainAmount : (this.homeInforma.pendingAmount + this.homeInforma.lockedAmount);
        return !_.isNaN(Number(balAmount)) ? Number(balAmount) : '0.00';
      },
      goAccountManager() {
        this.$router.push({name: 'mAccountManager'})
      },
      getCenterInfo() {
        const request = {}
        userCenter.getCenterInfo(request).then(res => {
          if (res.code == '10000') {
            if (res.data.length == 1) {
              this.isSingle = true
              this.singerUserName = res.data[0].name
              this.$store.commit('GET_CENTERID', res.data[0].centerId)
            } else {
              this.isSingle = false
              this.accountList = res.data.filter((item) => {
                return item.userId !== this.userId
              })
              this.currentUser = res.data.filter((item)=>{
                return item.userId == this.userId
              })
              this.currentIcon = this.currentUser[0].iconUrl
              this.$store.commit('GET_CENTERID', res.data[0].centerId)
            }
          } else {
            toast(res.message)
          }
        })
      },

      getInfonext() {
        const requestDatas = {
          "limit": 10,
          "offset": this.initPageNext,
          "couponStatus": 2,
          "couponType": 100
        };
        userCenter.myGift(requestDatas).then(res => {
          if (res.code == '10000') {
            this.myGiftTotal = res.pageInfo.total;
          } else {
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        });
      }
    },
    created() {
      this.searchHomeInfo();
      this.getInfonext();
      this.getCenterInfo();
      // this.$store.commit('SET_ACCOUNT_MANAGER_TOKEN', {type: 'add', value: 'userToken', userId: this.userId});
      // const demoValue = $localStorage.get('name')
      // if(!demoValue){
      //   $localStorage.set('name','')
      // }
    },
    beforeRouteLeave(to, from, next) {
      if (to.name === 'mBindCard') {
        if (_.isNull(this.userData.name)) {
          this.showConfirm = true
        } else {
          next()
        }
      } else {
        next()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .muser-center-home {
    padding-bottom: r($footer-hg+20);
    /deep/ .mreceiv-code {
      position: fixed;
      top: 0;
      left: 0;
      height: -webkit-fill-available;
      z-index: 100;
    }
  }

  /deep/ .mreceiv-code {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: -webkit-fill-available;
  }

  .mcenter-userinfo {
    background: #3573FA;
    padding: r(20) r(20) r(22);
    color: $white;
    margin-bottom: r(10);
    .login-user {
      height: r(40);
      overflow: hidden;
      .logo {
        height: r(40);
        margin-right: r(6);
        border-radius: r(35);
      }
      .left {
        font-size: r(14);
        padding-left: r(10);
      }
      .right {
        float: right;
      }
      line-height: r(40);
      @include f(16px);
      margin-bottom: r(18);
    }
    .assets {
      .item-info {
        width: 50%;
        float: left;
        @include f(16px);
        &:first-child {
          border-right: 1px solid #85ABFC;
        }
        .right-lock {
          display: inline-block;
          text-align: left;
        }
        span {
          display: block;
          word-wrap: break-word;
          &.amount {
            @include f(26px);
            line-height: r(40);
            padding-top: r(7);
          }
          &.money {
            @include f(14px);
            line-height: r(14);
            margin-top: r(10);
          }
        }
      }
    }
  }

  .mcenter-hotlink {
    background: #FFFFFF;
    box-shadow: 0 r(4) r(4) 0 rgba(0, 0, 0, 0.05);
    margin-bottom: r(11);
    .item-href {
      display: block;
      width: 25%;
      float: left;
      @include f(13px);
      color: $font-color;
      text-align: center;
      position: relative;
      padding: r(10) 0;
      .iconfont {
        @include f(29px);
        display: block;
        margin-bottom: r(8);
        &.icon-receipt-code {
          color: #39D65A;
        }
        &.icon-tran-record1 {
          color: #3573FA;
        }
        &.icon-mypend-order {
          color: #955AF9;
        }
        &.icon-my-gift {
          color: #FF758D;
        }
        &.icon-about-jiuan {
          color: #3573FA;
        }
        &.icon-help-center {
          color: #ec3a4e;
        }
      }
      .tran-num {
        position: absolute;
        right: r(12);
        top: r(8);
        @include f(14px);
        width: r(20);
        height: r(20);
        border-radius: r(50);
        background: red;
        color: #FFFFFF;
      }
    }
  }

  .panel-item {
    .mcenter-linkitem {
      background: #FFFFFF;
      border-top: 1px solid #E4E4E4;
      border-bottom: 1px solid #E4E4E4;
      padding-left: r(20);
      margin-bottom: r(10);

      .item-href {
        height: r(50);
        line-height: r(50);
        padding: 0 r(10) 0 0;
        display: block;
        border-bottom: 1px solid #E4E4E4;
        @include f(16px);
        color: $font-color;
        &:last-child {
          border-bottom: none;
        }
        .iconfont {
          &.logo {
            @include f(25px);
            margin-right: r(5);
          }
          &.icon-business-list {
            color: #B0D443;
          }
          &.icon-appeal-list {
            color: #db1270;
          }
          &.icon-bind-bank {
            color: #3D88E4;
          }
          &.icon-bind-alipay {
            color: #00AAEE;
          }
          &.icon-bind-wechat {
            color: #3CB034;
          }
          &.icon-complete-material {
            color: #F4376D;
          }
          &.icon-juan-app {
            color: #C8151D;
          }
          &.icon-juan-home {
            color: #3573FA;
          }
          &.icon-sign-out {
            color: #E17367;
          }
        }
        .icon-right-arrow {
          float: right;
        }
      }
    }
  }

  .icon-gift {
    color: #03A9F3;
  }

  .outer-container {
    width: 100%;
    height: 100%;
    .mist {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 110;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .4);
    }
    .side-menu {
      position: fixed;
      top: 0;
      right: 0;
      background-color: #fff;
      width: 70%;
      height: 100%;
      z-index: 200;
      animation: fadeInRight .5s;
      .account-person-single {
        text-align: center;
        height: r(180);
        padding-top: r(40);
        background-color: #f6f9ff;
        .account-pic {
          display: block;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #85abfc;
          text-align: center;
          line-height: 50px;
          @include f(35px);
          margin: auto;
        }
        color: #fff;
        .account-name {
          margin-top: r(20);
          @include f(18px);
          color: #333333;
        }
      }
      .account-person-more {
        background-color: #f6f9ff;
        padding-top: r(20);
        padding-bottom: r(10);
        .changeTitle {
          @include f(16px);
          color: #333;

          margin-bottom: r(20);
          padding-left: r(20);
        }
        .account-list {
          height: r(50);
          width: 100%;
          background-color: #fff;
          border-bottom: 1px solid #E9E9E9;
          border-top: 1px solid #e9e9e9;
          line-height: r(50);
          margin-bottom: r(10);
          display: flex;
          .user-symbol {
            margin-top: r(8);
            width: r(36);
            height: r(36);
            border-radius: 50%;
            text-align: center;
            line-height: r(36);
            background-color: #85ABFC;
            color: #fff;
            margin-left: r(8);
          }
          .user-name {
            flex: 2;
            padding-left: r(10);
          }
          .change-account {
            flex: 1;
            padding-left: r(10);
            border-left: 1px solid #e9e9e9;
            color: #3573FA;
            @include f(14px)
          }
          img {
            width: r(36);
            height: r(36);
            line-height: r(50);
            padding-left: r(7);
            margin-top: r(8);

          }
        }
      }
      .add-account {
        background-color: #85abfc;
        color: #fff;
        @include f(18px);
        line-height: 44px;
        text-align: center;
      }
      .account-content {
        padding-top: r(20);
        .item-href {
          height: 3.09067rem;
          line-height: 3.09067rem;
          padding: 0 0.61813rem 0 0;
          display: block;
          border-bottom: 1px solid #e4e4e4;
          font-size: 16px;
          color: #333333;
          padding-left: r(10);
          border-top: 1px solid #e4e4e4;
        }
        .item-info {
          height: r(50);
          border-top: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          line-height: r(50);
          margin-bottom: r(10);
          padding: 0 0.61813rem 0 r(10);
          display: flex;
          flex-direction: row;
          margin-top: r(10);
          .font-content {
            flex: 1;
            padding-left: r(10);
          }
          .iconfont {
            &.icon-about-jiuan {
              color: #3573FA;
              @include f(24px)
            }
            &.icon-help-center {
              color: #E17367;
              @include f(24px)
            }
          }
        }

      }
      .login-out-btn {
        background-color: #3573FA;
        color: #fff;
        height: r(44);
        line-height: r(44);
        @include f(18px);
        text-align: center;
      }
    }
  }
</style>
