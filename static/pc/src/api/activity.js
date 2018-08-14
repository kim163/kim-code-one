import { service } from "@/util"

let numversion = '/api/v1/';   // 版本信息

//获取活动信息配置
export const getAwardInfo = jsonData => service({
  url: numversion+`coupon/getAwardInfo`,
  method: 'post',
  data: jsonData
});
//获取公告
export const announcement = jsonData => service({
  url: numversion+`additionalFeatures/announcement`,
  method: 'post',
  data: jsonData
});