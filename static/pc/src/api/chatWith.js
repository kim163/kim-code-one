import { service } from '@/util'

let numversion = '/api/v1/';   // 版本信息

/*创建会话群组*/
export  const createChatGroup = jsonData => service({
   url: numversion+`rongcloud/createChatGroup`,
   method:'post',
   data: jsonData
})
/*获取token*/
export const getToken = jsonData => service({
  url: numversion + `rongcloud/getToken`,
  method: 'post',
  data: jsonData
})
/*发送图片*/

export const uploadFile = (jsonData) => {
  jsonData.multipart = true;
  return service({url: numversion+`common/uploadFile`, method: 'post', data: jsonData})
}

