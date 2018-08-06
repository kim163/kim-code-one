/**
 * Created by clover on 2018/5/21.
 */

export default [
  {
    path: "/m/login",
    name: "mobileLogin",
    component(resolve) {
      return resolve(require('views/mobile/login'))
    },
    meta: {
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/register",
    name: "mobileRegister",
    component(resolve) {
      return resolve(require('views/mobile/register'))
    },
    meta: {
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/mh/index",
    name: "mAindex",
    redirect: "/mh/",
  },
  {
    path: "/mh/",
    name: 'mIndex',
    component(resolve) {
      return resolve(require('views/mobile/index'))
    },
    meta: {
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/tranbuyFm/:id?",
    name: 'tranbuyForm',
    component(resolve) {
      // 购买UET
      return resolve(require('views/mobile/index/components/tranbuy-list/tranbuy-form'))
    },
    meta: {
      noCache: true,
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/rechargeOrder/:id?",
    name: 'rechargeOrder',
    component(resolve) {
      // UET充值
      return resolve(require('views/mobile/index/components/tranbuy-list/recharge-order'))
    },
    meta: {
      noCache: true,
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/rechWechatOrder/:id?",
    name: 'rechWechatOrder',
    component(resolve) {
      // UET微信充值
      return resolve(require('views/mobile/index/components/tranbuy-list/rechwechat-order'))
    },
    meta: {
      noCache: true,
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/transellFm/:id?",
    name: 'transellForm',
    component(resolve) {
      // 出售UET
      return resolve(require('views/mobile/index/components/transell-list/transell-form'))
    },
    meta: {
      noCache: true,
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/withdrawOrder/:id?",
    name: 'withdrawOrder',
    component(resolve) {
      // 提现订单
      return resolve(require('views/mobile/index/components/transell-list/withdraw-orders'))
    },
    meta: {
      noCache: true,
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/cash",
    name: 'mCashDesk',
    component(resolve) {
      // 收银台
      return resolve(require('views/mobile/cashDesk/cash'))
    },
    meta: {
      noCache: true,
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/tranRecord",
    name: 'mTranRecord',
    component(resolve) {
      // 手机交易记录
      return resolve(require('views/mobile/transaction-record'))
    },
    meta: {
      isMobilePage: "mobile-bodyFtPd",
    }
  },
  {
    path: "/m/pendingBuy",
    name: 'mPendingBuy',
    component(resolve) {
      // 手机交易记录
      return resolve(require('views/mobile/pending-orders'))
    },
    meta: {
      isMobilePage: "mobile-bodyFtPd",
      noCache: true
    }
  },
  {
    path: "/m/myPending",
    name: 'mMyPending',
    component(resolve) {
      //我的挂单
      return resolve(require('views/mobile/my-pending-orders'))
    },
    meta: {
      isMobilePage: "mobile-body",
      noCache: true
    }
  },
  {
    path: "/m/order/:id",
    name: 'mOrder',
    component(resolve) {
      // 交易中-订单详情
      return resolve(require('views/mobile/details/order-progress'))
    },
    meta: {
      isMobilePage: "mobile-body",
      noCache: true
    }
  },
  {
    path: "/m/orderOver/:id",
    name: 'mOrderOver',
    component(resolve) {
      // 已完成-订单详情
      return resolve(require('views/mobile/details/order-compeleted'))
    },
    meta: {
      isMobilePage: "mobile-body",
      noCache: true
    }
  },
  {
    path: "/m/orderAppeal/:id",
    name: 'mOrderAppeal',
    component(resolve) {
      // 申诉订单-订单详情
      return resolve(require('views/mobile/details/order-appeal'))
    },
    meta: {
      isMobilePage: "mobile-body",
      noCache: true
    }
  },
  {
    path: "/m/userBind",
    name: 'mUserBind',
    component(resolve) {
      // 商户绑定
      return resolve(require('views/mobile/business-bind'))
    },
    meta: {
      isMobilePage: "mobile-body"
    },
  },
  {
    path: "/m/userBind/list",
    name: 'mBindList',
    component(resolve) {
      // 商户绑定--绑定列表
      return resolve(require('views/mobile/business-bind/bind-list'))
    },
    meta: {
      isMobilePage: "mobile-body",
      noCache: true
    },
  },
  {
    path: "/m/quickCreate",
    name: 'mQuickCreate',
    component(resolve) {
      // 商户绑定--绑定列表
      return resolve(require('views/mobile/quick-create'))
    },
    meta: {
      isMobilePage: "mobile-body",
      noCache: true
    },
  },
  {
    path:'/m/chatWith',
    name:'mchatWith',
    component(resolve){
      return resolve(require('views/mobile/chatroom/chat'))
    },
    meta:{
      noCache:true,
      isMobilePage:"mobile-body"
    }
  },
  {
    path:'/m/talk-list',
    name:'mtalkList',
    component(resolve){
      return resolve(require('views/mobile/chatroom/chat-list'))
    },
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    }
  },
  {
    path:'/m/bindCard/:id',
    name:'mBindCard',
    component(resolve){ //绑定银行卡
      return resolve(require('views/mobile/bind-payment/card-bind'))
    },
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    }
  },
  {
    path:'/m/cardList',
    name:'mCardList',
    component(resolve){ //银行卡列表
      return resolve(require('views/mobile/bind-payment/card-list'))
    },
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    }
  },
  {
    path:'/m/userCenter',
    name:'mUserCenter',
    component(resolve){ //个人中心
      return resolve(require('views/mobile/user-center'))
    },
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    }
  },
  {
    path:'/m/setUserInfo',
    name:'mSetUserInfo',
    component(resolve){ //完善信息
      return resolve(require('views/mobile/user-center/set-user-info'))
    },
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    }
  }
]
