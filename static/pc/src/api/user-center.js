import { service } from "@/util"

let numversion = '/api/v1/';   // 版本信息
let numversion2 = '/api/v2/'
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

//我的获赠
export const myGift = jsonData => service({
  url:numversion+`coupon/getCouponDetailPage`,
  method:'post',
  data:jsonData
})

//获取进行中的申诉列表
export const getAppealPage = jsonData => service({
  url: numversion +`appeal/getAppealPage`,
  method:'post',
  data:jsonData
})

//获取历史申诉列表

export const getAppealHistoryPage = jsonData => service({
  url: numversion +`appeal/getAppealHistoryPage`,
  method:'post',
  data:jsonData
})

//获取历史申诉列表中的申诉详情
export const getAppealDetailHistoryPage = jsonData => service({
  url: numversion +`appeal/getAppealDetailHistoryPage`,
  method:'post',
  data:jsonData
})

//获取进行中申诉列表中的申诉详情
export const getAppealDetailPage = jsonData => service({
  url: numversion + `appeal/getAppealDetailPage`,
  method:'post',
  data:jsonData
})

//发送申诉信息
export  const addAppealDetail = jsonData => service({
  url: numversion + `appeal/addAppealDetailV2`,
  method:'post',
  data:jsonData
})

//获取用户中心列表
export const getCenterInfo = jsonData => service({
  url:numversion + `user/center/getCenterInfo`,
  method:'post',
  data:jsonData
})

//带刷新token 的中心列表
export const flushCenterToken = jsonData => service({
  url:numversion + `user/center/flushCenterToken`,
  method:'post',
  data:jsonData
})
//登录 用户名/手机/邮箱统一登录
export const chainLogin = jsonData => service({
  url:numversion2 +`user/chain/login`,
  method:'post',
  data:jsonData,
  encryptDef:true,  //使用默认加密规则
})

//设置/修改用户密码
export const updatePassword = jsonData => service({
  url:numversion2 +`user/chain/updatePassword`,
  method:'post',
  data:jsonData
})

//删除用户中心关系
export const deleteCenter = jsonData => service({
  url: numversion +`user/center/deleteCenter`,
  method:'post',
  data:jsonData
})

//转账
export const assetTransfer = jsonData => service({
  url: numversion + `account/chain/assetTransfer`,
  method:'post',
  data:jsonData
})

//领取红包
export const receiveCoupon = jsonData => service({
  url: numversion + `coupon/receiveCoupon`,
  method:'post',
  data:jsonData
})

//找回密码
export const findPwd = jsonData => service({
  url: numversion + `account/cash/updatePassword`,
  method:'post',
  data:jsonData
})

//
