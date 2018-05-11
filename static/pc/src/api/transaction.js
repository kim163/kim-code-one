import { service } from "@/util"

let numversion = '/api/v1/';   // 版本信息
// 交易大厅

// 获取代币订单列表页 (交易大厅 - 买入 UET 列表数据)
export const getOrderxPageForHallSell = jsonData => service({
  url: numversion+`account/chain/getOrderxPageForHallSell`,
  method: 'post',
  data: jsonData
});

// 获取代币订单列表页 （交易大厅 -- 卖出 UET 列表数据）
export const getOrderxPage = jsonData => service({
  url: numversion+`account/chain/getOrderxPage`,
  method: 'post',
  data: jsonData
});

// 我要挂单--买入挂单
export const publishToBuy = jsonData => service({
  url: numversion+`order/chain/publishToBuy`,
  method: 'post',
  data: jsonData
});
