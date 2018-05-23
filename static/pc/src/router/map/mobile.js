/**
 * Created by clover on 2018/5/21.
 */

export default [
  {
    path: "/mobile/index",
    name: "mAindex",
    redirect:"/mobile/",
  },
  {
    path: "/mobile/",
    name: 'mIndex',
    component(resolve){
      return resolve(require('views/mobile/index'))
    },
    meta: {
      noCache: true //是否不缓存组件
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
