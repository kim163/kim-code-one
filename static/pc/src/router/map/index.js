import transaction from './transaction';
import mobileUrl from './mobile';

let index = () => import('views/show/index');//首页
const autoLogin = () => import('views/auto-login'); //商户自动登录
const cash = () => import('views/cash'); //收银台
const BindAndCreate = () => import('views/bind-and-create'); //pc商户绑定及快速创建
const BindList = () => import('views/bind-and-create/bind-list'); //pc商户绑定列表
const UserCenter = () => import('views/user-center'); //pc个人中心
export default [
  {
    path: "/index",
    name: "index",
    component: index
  },
  {
    path: "/",
    name: "aindex",
    redirect:"/index"
  },
  {
    path: "/autoLogin",
    name: "autoLogin",
    component: autoLogin,
    meta:{
      noLogin: true,
      noCache: true
    }
  },
  {
    path: "/cash",
    name: "pcCashDesk",
    component: cash,
    meta:{
      noCache: true,
      noLogin: true
    }
  },
  {
    path: "/userBind",
    name: "pcUserBind",
    component: BindAndCreate,
    props:{
      type:1
    },
    meta:{
      noCache: true,
      noLogin: true
    }
  },
  {
    path: "/userBind/list",
    name: 'pcBindList',
    component: BindList,
    meta:{
      noCache:true
    },
  },
  {
    path: "/quickCreate",
    name: "pcQuickCreate",
    component: BindAndCreate,
    props:{
      type:2
    },
    meta:{
      noCache: true,
      noLogin: true
    }
  },
  {
    path: "/userCenter",
    name: "pcUserCenter",
    component: UserCenter,
    meta:{
      noCache: true
    }
  },
  ...transaction,
  ...mobileUrl
]
