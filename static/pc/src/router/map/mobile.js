/**
 * Created by clover on 2018/5/21.
 */

const mLogin = () => import(/* webpackChunkName: 'mLogin' */ 'views/mobile/login') //登陆
const mRegister = () => import(/* webpackChunkName: 'mRegister' */ 'views/mobile/register') //注册
const mTran = () => import(/* webpackChunkName: 'mIndex' */ 'views/mobile/index') //首页
const mTranbuyForm = ()=> import(/* webpackChunkName: 'mTranbuyForm' */ 'views/mobile/index/components/tranbuy-list/tranbuy-form')
const mRechargeOrder = () => import(/* webpackChunkName: 'mRechargeOrder' */ 'views/mobile/index/components/tranbuy-list/recharge-order')
const mRechWechatOrder = () => import(/* webpackChunkName: 'mRechWechatOrder' */ 'views/mobile/index/components/tranbuy-list/rechwechat-order')
const mTransellForm = () => import(/* webpackChunkName: 'mTransellForm' */ 'views/mobile/index/components/transell-list/transell-form')
const mWithdrawOrder = () => import(/* webpackChunkName: 'mWithdrawOrder' */ 'views/mobile/index/components/transell-list/withdraw-orders')
const mCashDesk = () => import(/* webpackChunkName: 'mCashDesk' */ 'views/mobile/cashDesk/cash')
const mTranRecord = () => import(/* webpackChunkName: 'mTranRecord' */ 'views/mobile/transaction-record')
const mPendingBuy = () => import(/* webpackChunkName: 'mPendingBuy' */ 'views/mobile/pending-orders')
const mMyPending = () => import(/* webpackChunkName: 'mMyPending' */ 'views/mobile/my-pending-orders')
const mOrder = () => import(/* webpackChunkName: 'mOrder' */ 'views/mobile/details/order-progress')
const mOrderOver = () => import(/* webpackChunkName: 'mOrderOver' */ 'views/mobile/details/order-compeleted')
const mOrderAppeal = () => import(/* webpackChunkName: 'mOrderAppeal' */ 'views/mobile/details/order-appeal')
const mUserBind  = () => import(/* webpackChunkName: 'mUserBind' */ 'views/mobile/business-bind')
const mBindList  = () => import(/* webpackChunkName: 'mBindList' */ 'views/mobile/business-bind/bind-list')
const mQuickCreate = () => import(/* webpackChunkName: 'mQuickCreate' */ 'views/mobile/quick-create')
const mchatWith = () => import(/* webpackChunkName: 'mchatWith' */ 'views/mobile/chatroom/chat')  //聊天室
const mtalkList = () => import(/* webpackChunkName: 'mtalkList' */ 'views/mobile/chatroom/chat-list') //聊天列表
const mBindCard = () => import(/* webpackChunkName: 'mBindCard' */ 'views/mobile/bind-payment/card-bind')
const mCardList = () => import(/* webpackChunkName: 'mCardList' */ 'views/mobile/bind-payment/card-list')
const mUserCenter = () => import(/* webpackChunkName: 'mUserCenter' */ 'views/mobile/user-center') //个人中心
const mSetUserInfo = () => import(/* webpackChunkName: 'mSetUserInfo' */ 'views/mobile/user-center/set-user-info') //完善信息
const mMyGift = () => import('views/mobile/user-center/my-gift') //我的获赠
const customizeLoginTip = () => import('views/mobile/customize-login-tip')

export default [
  {
    path: "/m/login",
    name: "mobileLogin",
    component:mLogin,
    meta: {
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/clogin",
    name: "mobileCusLogin",
    component:customizeLoginTip,
    meta: {
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/register",
    name: "mobileRegister",
    component:mRegister,
    meta: {
      isMobilePage: "mobile-body",
      noLogin: true
    }
  },
  {
    path: "/mh/index",
    name: "mAindex",
    redirect: "/mh/",
  },
  {
    path: "/mh/",
    name: 'mTransaction',
    component:mTran,
    meta: {
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/tranbuyFm/:id?",
    name: 'tranbuyForm',
    component:mTranbuyForm,
    meta: {
      noCache: true,
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/rechargeOrder/:id?",
    name: 'rechargeOrder',
    component:mRechargeOrder,
    meta: {
      noCache: true,
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/rechWechatOrder/:id?",
    name: 'rechWechatOrder',
    component:mRechWechatOrder,
    meta: {
      noCache: true,
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/transellFm/:id?",
    name: 'transellForm',
    component:mTransellForm,
    meta: {
      noCache: true,
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/withdrawOrder/:id?",
    name: 'withdrawOrder',
    component:mWithdrawOrder,
    meta: {
      noCache: true,
      isMobilePage: "mobile-body"
    }
  },
  {
    path: "/m/cash",
    name: 'mCashDesk',
    component:mCashDesk,
    meta: {
      noCache: true,
      isMobilePage: "mobile-body",
      noLogin: true
    }
  },
  {
    path: "/m/tranRecord",
    name: 'mTranRecord',
    component:mTranRecord,
    meta: {
      isMobilePage: "mobile-bodyFtPd",
    }
  },
  {
    path: "/m/pendingBuy",
    name: 'mPendingBuy',
    component:mPendingBuy,
    meta: {
      isMobilePage: "mobile-bodyFtPd",
      noCache: true
    }
  },
  {
    path: "/m/myPending",
    name: 'mMyPending',
    component:mMyPending,
    meta: {
      isMobilePage: "mobile-body",
      noCache: true
    }
  },
  {
    path: "/m/order/:id",
    name: 'mOrder',
    component:mOrder,
    meta: {
      isMobilePage: "mobile-body",
      noCache: true
    }
  },
  {
    path: "/m/orderOver/:id",
    name: 'mOrderOver',
    component:mOrderOver,
    meta: {
      isMobilePage: "mobile-body",
      noCache: true
    }
  },
  {
    path: "/m/orderAppeal/:id",
    name: 'mOrderAppeal',
    component:mOrderAppeal,
    meta: {
      isMobilePage: "mobile-body",
      noCache: true
    }
  },
  {
    path: "/m/userBind",
    name: 'mUserBind',
    component:mUserBind,
    meta: {
      isMobilePage: "mobile-body",
      noLogin: true
    },
  },
  {
    path: "/m/userBind/list",
    name: 'mBindList',
    component:mBindList,
    meta: {
      isMobilePage: "mobile-body",
      noCache: true
    },
  },
  {
    path: "/m/quickCreate",
    name: 'mQuickCreate',
    component:mQuickCreate,
    meta: {
      isMobilePage: "mobile-body",
      noCache: true,
      noLogin: true
    },
  },
  {
    path:'/m/chatWith',
    name:'mchatWith',
    component:mchatWith,
    meta:{
      noCache:true,
      isMobilePage:"mobile-body"
    }
  },
  {
    path:'/m/talk-list',
    name:'mtalkList',
    component:mtalkList,
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    }
  },
  {
    path:'/m/bindCard/:id',
    name:'mBindCard',
    component:mBindCard,
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    }
  },
  {
    path:'/m/cardList',
    name:'mCardList',
    component:mCardList,
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    }
  },
  {
    path:'/m/userCenter',
    name:'mUserCenter',
    component:mUserCenter, //个人中心
    meta:{
      noCache:true,
      isMobilePage:'mobile-bodyFtPd'
    }
  },
  {
    path:'/m/setUserInfo',
    name:'mSetUserInfo',
    component:mSetUserInfo,//完善信息
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    }
  },
  {
    path:'/m/myGift',
    name:'mMyGift',
    component:mMyGift,//我的获赠
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    }
  },
  {
    path:'/m/activity',
    name:'mIndex',
    component(resolve){ //活动中心
      return resolve(require('views/mobile/activity-center'))
    },
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    }
  }
]
