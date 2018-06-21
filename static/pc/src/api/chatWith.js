import { service } from '@/util'

let numversion = '/api/v1/';   // 版本信息

/*创建会话群组*/
export  const createChatGroup = jsonData => service({
   url: numversion+`rongcloud/createChatGroup`,
   method:'post',
   data: jsonData
})


