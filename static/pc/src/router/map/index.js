import transaction from './transaction';
import mobileUrl from './mobile';

let head_userpart = (resolve) => resolve(require('components/header'));
let index = (resolve) => resolve(require('views/show/index'));//首页
const autoLogin = (resolve) => resolve(require('views/auto-login')); //商户自动登录
const cash = (resolve) => resolve(require('views/cash')); //收银台
const BindAndCreate = (resolve) => resolve(require('views/bind-and-create')); //pc商户绑定及快速创建
const BindList = (resolve) => resolve(require('views/bind-and-create/bind-list')); //pc商户绑定列表
const UserCenter = (resolve) => resolve(require('views/user-center')); //pc个人中心
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
    path: "/headerUser",
    name: "header_user",
    component: head_userpart
  },
  {
    path: "/autoLogin",
    name: "autoLogin",
    component: autoLogin
  },
  {
    path: "/cash",
    name: "pcCashDesk",
    component: cash,
    meta:{
      noCache: true
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
      noCache: true
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
      noCache: true
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
