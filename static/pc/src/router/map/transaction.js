import {AUTH_NAME} from "@/store/types"

let index=(resolve) => resolve(require('views/transaction/index'));  //交易大厅首页

export default [
  {
    path:"/transaction",
    name:'transaction',
    component: index,
    meta:{
   //   auth:[AUTH_NAME.USER]
    }

  }
]
