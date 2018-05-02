import { service } from "@/util"

let numversion = '/api/v1/';   // 版本信息
// 账户
export const login = jsonData => service({url: numversion+`user/chain/login2`, method: 'post', data: jsonData});  // 登录：手机登录/邮箱登录
export const implicitLogin = jsonData => service({url: numversion+`user/chain/implicitLogin`, method: 'post', data: jsonData});  // 隐式登录
export const loginByUserNameAndPwd = jsonData => service({url: numversion+`user/chain/loginByUserNameAndPwd`, method: 'post', data: jsonData});  //登录：账号密码登录
export const register = jsonData => service({url: numversion+`user/chain/register`, method: 'post', data: jsonData});  //注册用户

