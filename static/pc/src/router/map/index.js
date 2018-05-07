import transaction from './transaction';

let head_userpart = (resolve) => resolve(require('components/header'));
let index = (resolve) => resolve(require('views/show/index'));//首页

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
  ...transaction
]
