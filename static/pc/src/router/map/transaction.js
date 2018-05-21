import tranRecord from 'components/master/tran-record'; // 订单记录模板

let index = (resolve) => resolve(require('views/transaction/index'));  //交易大厅首页
let transell = (resolve) => resolve(require('views/transaction/transell'));  // 交易大厅 -- 卖出 UET

export default [
  {
    path: "/transaction",
    name: 'transaction',
    component: index
  },
  {
    path: "/transell",
    name: "transell",
    component: transell
  },
  {
    path: "/tranRecord",
    name: "tranRecord",
    component: tranRecord,
    redirect: "/tranRecord/tranProgress",
    children: [
      {
        path: "tranPending", name: "tranPending", component(resolve){
          return resolve(require('views/transaction/order-record/tran-pending'))
        }
      },
      {
        path: "tranProgress", name: "tranProgress", component(resolve){
          return resolve(require('views/transaction/order-record/tran-progress'))
        }
      },
      {
        path: "tranComplete", name: "tranComplete", component(resolve){
          return resolve(require('views/transaction/order-record/tran-complete'))
        }
      },
      {
        path: "appealRecord", name: "appealRecord", component(resolve){
          return resolve(require('views/transaction/order-record/appeal-record'))
        }
      }
    ]
  },
  {
    path: "/orderDetail/:id",
    name: 'orderDetail',
    component(resolve){
      // 订单详情页
      return resolve(require('views/transaction/order-detail/detail'))
    }
  },
  {
    path: "/mobile/transell",
    name: 'transell',
    component(resolve){
      // 手机卖出
      return resolve(require('views/mobile/tradeHall/transell'))
    }
  },
  {
    path: "/mobile/tranbuy",
    name: 'tranbuy',
    component(resolve){
      // 手机买入
      return resolve(require('views/mobile/tradeHall/tranbuy'))
    }
  },
  {
    path: "/mobile/cash",
    name: 'cashDesk',
    component(resolve){
      // 收银台
      return resolve(require('views/mobile/cashDesk/cash'))
    }
  },


]
