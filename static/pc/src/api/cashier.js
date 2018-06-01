import { service } from "@/util"

let numversion = '/api/v1/';   // 版本信息
// 收银台

//收银台初始化
export const cashierInit = jsonData => service({
  url: numversion+`payment/cashier/init`,
  method: 'post',
  data: jsonData
});

//商户绑定用户，默认登录
export const loginH5 = jsonData => service({
  url: numversion+`user/chain/loginH5`,
  method: 'post',
  data: jsonData
});

//支付提交
export const paymentPay = jsonData => service({
  url: numversion+`payment/pay`,
  method: 'post',
  data: jsonData
});


