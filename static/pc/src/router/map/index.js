import transaction from './transaction';

let head_userpart = (resolve) => resolve(require('components/header'));
let index = (resolve) => resolve(require('views/show/index'));//首页
let mobile = (resolve) => resolve(require('views/mobile/login'));//手机登录

export default [
  {
    path: "/index",
    name: "index",
    component: index
  },
  {
    path: "/mobile",
    name: "mobile",
    component: mobile
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
  ...transaction
]
