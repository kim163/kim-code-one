import { service } from "@/util"

let numversion = '/api/v1/';   // 版本信息
// 交易大厅

// 获取代币订单列表页 (交易大厅 - 买入 UET 列表数据)
export const getOrderxPageForHallSell = jsonData => service({
  url: numversion+`account/chain/getOrderxPageForHallSell`,
  method: 'post',
  data: jsonData
});

// 获取代币订单列表页 （交易大厅 -- 卖出 UET 列表数据） -交易中
export const getOrderxPage = jsonData => service({
  url: numversion+`order/getOrderxPage`,
  method: 'post',
  data: jsonData
});

// 我要挂单--买入挂单
export const publishToBuy = jsonData => service({
  url: numversion+`order/c2c/publishToBuy`,
  method: 'post',
  data: jsonData
});

// 获取 订单记录-交易结束
export const getTransactionPage = jsonData => service({
  url: numversion+`transaction/getTransactionPage`,
  method: 'post',
  data: jsonData
});
// 获取 订单记录-挂单中
export const getOrderxPendingPage = jsonData => service({
  url: numversion+`order/getOrderxPendingPage`,
  method: 'post',
  data: jsonData
});
//  下单
export const placeAnOrder = jsonData => service({
  url: numversion+`order/c2c/placeAnOrder`,
  method: 'post',
  data: jsonData
});

// 获取 订单记录- 详情
export const getOrderx = jsonData => service({
  url: numversion+`order/getOrderx`,
  method: 'post',
  data: jsonData
});
// 获取 订单记录- 获取申诉列表
export const getAppealHistoryPage = jsonData => service({
  url: numversion+`appeal/getAppealHistoryPage`,
  method: 'post',
  data: jsonData
});
// 获取 订单记录- 获取申诉列表详情
export const getAppealHistoryDetail = jsonData => service({
  url: numversion+`appeal/getAppealDetailHistoryPage`,
  method: 'post',
  data: jsonData
});
// 获取 订单记录- 获取挂单详情
export const getOrderxPending = jsonData => service({
  url: numversion+`order/getOrderxPending`,
  method: 'post',
  data: jsonData
});
