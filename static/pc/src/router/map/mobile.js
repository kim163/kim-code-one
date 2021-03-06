/**
 * Created by clover on 2018/5/21.
 */

const mLogin = () => import(/* webpackChunkName: 'mLogin' */ 'views/mobile/login') //登陆
const mRegister = () => import(/* webpackChunkName: 'mRegister' */ 'views/mobile/register') //注册
const mTran = () => import(/* webpackChunkName: 'mIndex' */ 'views/mobile/index') //首页
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
const mreceivcode = () => import('views/mobile/user-center/receivables-code') // 收款码
const mAppealList = () => import('views/mobile/user-center/appeal-list') //申诉列表
const mAppealDetail = () => import('views/mobile/user-center/appeal-detail')
const mAccountManager = () => import('views/mobile/user-center/account-manager') //账户管理
const mAddAccount = () => import('views/mobile/user-center/add-account') //添加账户
const mSetPassword = () => import('views/mobile/user-center/set-account-password') //设置账户密码
const mAccountDetail = () => import('views/mobile/user-center/account-detail')
const mActivity = () => import('views/mobile/activity-center') //手机活动
const mOrderMatch = () => import('views/mobile/order-match') //匹配页面
const mFindPassword = () => import('views/mobile/find-password') //找回密码页面
const mSafeCenter = () => import('views/mobile/user-center/safe-center')  //安全中心
const mBindPhoneEmail = () => import('views/mobile/user-center/bind-phone-email') //绑定手机邮箱

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
      isMobilePage: "mobile-body",
    }
  },
  {
    path: "/m/pendingBuy",
    name: 'mPendingBuy',
    component:mPendingBuy,
    meta: {
      isMobilePage: "mobile-body",
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
      isMobilePage:'mobile-body'
    },
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
    component:mActivity,
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    }
  },
  {
    path:'/m/receivcode',
    name:'mreceivcode',
    component:mreceivcode, //收款码
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    }
  },
  {
    path:'/m/appealList',
    name:'mAppealList',
    component:mAppealList,
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    }
  },
  {
    path:'/m/appealDetail/:id',
    name:'mAppealDetail',
    component:mAppealDetail,
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    }
  },
  {
    path:'/m/accountManager',
    name:'mAccountManager',
    component:mAccountManager,
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    }
  },
  {
    path:"/m/addAccount",
    name:'mAddAccount',
    component:mAddAccount,
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    }
  },
  {
    path:"/m/setPassword",
    name:'mSetPassword',
    component:mSetPassword,
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    },
    props:(route) => ({
      isChange: route.query.c && route.query.c === '1'
    })
  },
  {
    path:'/m/accountDetail/:id/:address/:username/:node/:url',
    name:'mAccountDetail',
    component:mAccountDetail,
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    },
  },
  {
    path:'/m/findPwd',
    name:'mFindPassword',
    component:mRegister,
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    },
    props:{
      isFindPwd:true
    }
  },
  {
    path:'/m/safe',
    name:'mSafeCenter',
    component:mSafeCenter,
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    }
  },
 {
    path:'/m/match',
    name:'mMatch',
    component:mOrderMatch,
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    },
  },
  {
    path:'/m/bind',
    name:'mBindPhoneEmail',
    component:mBindPhoneEmail,
    meta:{
      noCache:true,
      isMobilePage:'mobile-body'
    },
    props:(route) => ({
      bindType: Number(route.query.t)
    })
  },
]
