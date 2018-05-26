/**
 * Created by clover on 2018/5/21.
 */

export default [
  {
    path: "/m/index",
    name: "mAindex",
    redirect:"/m/",
  },
  {
    path: "/m/",
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
    path: "/mobile/cash",
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
    path: "/mobile/tranRecord",
    name: 'mTranRecord',
    component(resolve){
      // 手机交易记录
      return resolve(require('views/mobile/transaction-record'))
    },
    meta:{
      isMobilePage: "mobile-body mobile-bodyPd"
    }
  },
 {
    path: "/mPendingBuy",
    name: 'mPendingBuy',
    component(resolve){
      // 手机交易记录
      return resolve(require('views/mobile/pending-orders'))
    },
    meta:{
       isMobilePage: "mobile-body"
    }
  },
  {
    path: "/mobile/myPending",
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
    path: "/mPendingSell",
    name: 'mPendingSell',
    component(resolve){
      // 手机交易记录
      return resolve(require('views/mobile/pending-orders/pending-sell'))
    },
    meta:{
       isMobilePage: "mobile-body"
    }
  },

]
