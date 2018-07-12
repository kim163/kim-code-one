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