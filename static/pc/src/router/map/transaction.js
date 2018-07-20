import tranRecord from 'views/transaction/order-record'; // 订单记录模板

let index = (resolve) => resolve(require('views/transaction/index'));  //交易大厅首页
let transell = (resolve) => resolve(require('views/transaction/transell'));  // 交易大厅 -- 卖出 UET

export default [
  {
    path: "/transaction",
    name: 'transaction',
    component: index,
    meta: {
      noCache: true
    }
  },
  {
    path: "/transell",
    name: "transell",
    component: transell,
    meta: {
      noCache: true
    }
  },
  {
    path: "/tranPending",
    name: "tranPending",
    component(resolve){
      return resolve(require('views/transaction/tran-pending'))
    }
  },
  // {
  //   path: "/tranPending2",
  //   name: "tranPending2",
  //   //component: tranRecord,
  //   redirect: "/tranPending2/tranPendingOrder",
  //   children:[
  //     {
  //       path: "tranPendingOrder", name: "tranPendingOrder", component(resolve){
  //        return resolve(require('views/transaction/tran-pending/pending-buy'))
  //       }
  //     },
  //     {
  //       path: "tranPendingRemoved", name: "tranPendingRemoved", component(resolve){
  //        return resolve(require('views/transaction/tran-pending/pending-order'))
  //       }
  //     },
  //   ]
  // },
  {
    path: "/tranRecord",
    name: "tranRecord",
    component: tranRecord,
    meta: {
      noCache: true
    }
  },
  {
    path: "/orderDetail/:id",
    name: 'orderDetail',
    component(resolve){
      // 订单详情页-交易中
      return resolve(require('views/transaction/order-detail/detail'))
    }
  },
  {
    path: "/orderDetailAppeal/:id",
    name: 'orderDetailAppeal',
    component(resolve){
      // 订单详情页-已完成
      return resolve(require('views/transaction/order-detail/detail-appeal'))
    }
  },
  {
    path: "/orderDetailOver/:id",
    name: 'orderDetailOver',
    component(resolve){
      // 订单详情页
      return resolve(require('views/transaction/order-detail/detail-over'))
    }
  },


]
