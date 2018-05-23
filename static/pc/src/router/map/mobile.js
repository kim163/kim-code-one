/**
 * Created by clover on 2018/5/21.
 */

export default [
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
  {
    path: "/mobile/tranRecord",
    name: 'mTranRecord',
    component(resolve){
      // 手机交易记录
      return resolve(require('views/mobile/transaction-record'))
    }
  },

]
