import { service } from "@/util"

let numversion = '/api/v1/';   // 版本信息

export const getAwardInfo = jsonData => service({
  url: numversion+`coupon/getAwardInfo`,
  method: 'post',
  data: jsonData
});