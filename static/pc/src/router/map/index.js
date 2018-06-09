import transaction from './transaction';
import mobileUrl from './mobile';

let head_userpart = (resolve) => resolve(require('components/header'));
let index = (resolve) => resolve(require('views/show/index'));//首页
let mobile = (resolve) => resolve(require('views/mobile/login'));//手机登录
const autoLogin = (resolve) => resolve(require('views/auto-login')); //商户自动登录

export default [
  {
    path: "/index",
    name: "index",
    component: index
  },
  {
    path: "/m/login",
    name: "mobileLogin",
    component: mobile,
    meta:{
      isMobilePage: "mobile-body"
    }
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
  ...transaction,
  ...mobileUrl
]
