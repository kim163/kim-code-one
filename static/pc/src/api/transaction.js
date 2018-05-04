import { service } from "@/util"

let numversion = '/api/v1/';   // 版本信息
// 交易大厅

// 获取代币订单列表页 (交易大厅 - 买入 UET 列表数据)
export const getOrderxPageForHallSell = jsonData => service({url: numversion+`account/chain/getOrderxPageForHallSell`, method: 'post', data: jsonData});
