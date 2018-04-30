import transaction from './transaction';
import user from './user';
import {AUTH_NAME} from "@/store/types"//权限名称

let head_userpart = (resolve) => resolve(require('components/header'));

let index = (resolve) => resolve(require('views/show/index'));//首页
let download = (resolve) => resolve(require('views/show/download'));
let register = (resolve) => resolve(require('views/show/register'));

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
    path: "/register",
    name: "register",
    component: register
  },
  {
    path: "/download",
    name: "download",
    component: download
  },
  ...user,
  ...transaction
]
