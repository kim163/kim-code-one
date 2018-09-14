const tranRecord =()=> import('views/transaction/order-record'); // 订单记录模板
const index = () => import('views/transaction/index');  //交易大厅首页
const transell = () => import('views/transaction/transell');  // 交易大厅 -- 卖出 UET
const tranPending =()=> import('views/transaction/tran-pending');

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
    component:tranPending
  },
  {
    path: "/tranRecord",
    name: "tranRecord",
    component: tranRecord,
    meta: {
      noCache: true
    }
  }

]
