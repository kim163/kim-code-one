import { service } from "@/util"

let numversion = '/api/v1/';   // 版本信息
// 个人中心

//自动识别银行卡
export const autoRecognize = jsonData => service({
  url: numversion+`bank/card/autoRecognize`,
  method: 'post',
  data: jsonData
});

//绑定支付方式：银行卡/支付宝/微信
export const bindBankV2 = jsonData => service({
  url: numversion+`account/cash/bindBankV2`,
  method: 'post',
  data: jsonData
});

//获取银行卡
export const getBankList = jsonData => service({
  url: numversion+`account/cash/getBankList`,
  method: 'post',
  data: jsonData
});

//解绑银行卡
export const unbindBank = jsonData => service({
  url: numversion+`account/cash/unbindBank`,
  method: 'post',
  data: jsonData
});

//绑定用户信息：姓名，身份证，昵称等
export const bindUserInfo = jsonData => service({
  url: numversion+`account/cash/bindUserInfo`,
  method: 'post',
  data: jsonData
});

//我的
