/**
 * Created by clover on 2018/5/21.
 */

export default [
  {
    path: "/mh/index",
    name: "mAindex",
    redirect:"/mh/",
  },
  {
    path: "/mh/",
    name: 'mIndex',
    component(resolve){
      return resolve(require('views/mobile/index'))
    },
    meta: {
      noCache: true, //是否不缓存组件
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/tranbuyFm/:id?",
    name: 'tranbuyForm',
    component(resolve){
      // 购买UET
      return resolve(require('views/mobile/index/components/tranbuy-list/tranbuy-form'))
    },
    meta:{
      noCache: true,
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/rechargeOrder/:id?",
    name: 'rechargeOrder',
    component(resolve){
      // UET充值
      return resolve(require('views/mobile/index/components/tranbuy-list/recharge-order'))
    },
    meta:{
      noCache: true,
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/rechWechatOrder/:id?",
    name: 'rechWechatOrder',
    component(resolve){
      // UET微信充值
      return resolve(require('views/mobile/index/components/tranbuy-list/rechwechat-order'))
    },
    meta:{
      noCache: true,
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/transellFm/:id?",
    name: 'transellForm',
    component(resolve){
      // 出售UET
      return resolve(require('views/mobile/index/components/transell-list/transell-form'))
    },
    meta:{
      noCache: true,
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/withdrawOrder/:id?",
    name: 'withdrawOrder',
    component(resolve){
      // 提现订单
      return resolve(require('views/mobile/index/components/transell-list/withdraw-orders'))
    },
    meta:{
      noCache: true,
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/cash",
    name: 'cashDesk',
    component(resolve){
      // 收银台
      return resolve(require('views/mobile/cashDesk/cash'))
    },
    meta:{
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/tranRecord",
    name: 'mTranRecord',
    component(resolve){
      // 手机交易记录
      return resolve(require('views/mobile/transaction-record'))
    },
    meta:{
      isMobilePage: "mobile-bodyFtPd"
    }
  },
 {
    path: "/m/pendingBuy",
    name: 'mPendingBuy',
    component(resolve){
      // 手机交易记录
      return resolve(require('views/mobile/pending-orders'))
    },
    meta:{
       isMobilePage: "mobile-bodyFtPd"
    }
  },
  {
    path: "/m/myPending",
    name: 'mMyPending',
    component(resolve) {
      //我的挂单
      return resolve(require('views/mobile/my-pending-orders'))
    },
    meta:{
      isMobilePage: "mobile-body",
      noCache:true
    }
  },
 {
    path: "/m/pendingSell",
    name: 'mPendingSell',
    component(resolve){
      // 挂单-卖出
      return resolve(require('views/mobile/pending-orders/pending-sell'))
    },
    meta:{
       isMobilePage: "mobile-bodyFtPd"
    }
  },
 {
    path: "/m/order/:id",
    name: 'mOrder',
    component(resolve){
      // 交易中-订单详情
      return resolve(require('views/mobile/details/order-progress'))
    },
    meta:{
       isMobilePage: "mobile-body"
    }
  },
 {
    path: "/m/orderOver/:id",
    name: 'mOrderOver',
    component(resolve){
      // 已完成-订单详情
      return resolve(require('views/mobile/details/order-compeleted'))
    },
    meta:{
       isMobilePage: "mobile-body"
    }
  },
 {
    path: "/m/orderAppeal/:id",
    name: 'mOrderAppeal',
    component(resolve){
      // 申诉订单-订单详情
      return resolve(require('views/mobile/details/order-appeal'))
    },
    meta:{
       isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/userBind",
    name: 'mUserBind',
    component(resolve){
      // 申诉订单-订单详情
      return resolve(require('views/mobile/business-bind'))
    },
    meta:{
      isMobilePage: "mobile-body"
    }
  },

]
