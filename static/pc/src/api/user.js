import ajax from 'api/index'
let $queryCreditlogs = "/mobi/queryCreditlogs.php";//额度记录查询
let $queryGameStatus = "/user/queryGameStatus.php";//查询用户收藏的游戏
let $getGameMoney = "/cash/getGameMoney.php"; //获取金钱接口
let $change_info = "/user/change_info.php";  //修改用户信息
let $modifyCustomerSocialInfo = "/user/modifyCustomerSocialInfo.php";  //修改用户qq，微信，邮箱
let $completeUserInfo = "/user/completeUserInfo.php";  //完善用户信息
let $ajaxGetSessionPersonalData = "/user/ajaxGetSessionPersonalData.php";
/***获取用户资料*/
let $getPhoneAndCode = "/youhui/getPhoneAndCode.php";
/***获取短信码*/
let $queryHistory = "/user/queryHistory.php";//记录查询
let $sendSms4TYJ = "/asp/sendSms4TYJ.php";//体验金：发送短信到玩家的注册手机号
let $checkPhoneCode = "/youhui/checkPhoneCode.php";//校验短信校验码
let $doSignRecord = "/index/doSignRecord.php";//用户签到
let $getWithdrawPW = '/onlinepayment/getWithdrawPW.php';//手机短信或邮件找回支付密码

export function getWithdrawPW(data) {
  $load.open("正在验证...")
  return ajax.post($getWithdrawPW, data)
}

export function doSignRecord(data) {
  $load.open("正在签到...");
  return ajax.get($doSignRecord, data);
}

export function getPhoneAndCode(data) {
  $load.open("获取验证方式...");
  return ajax.get($getPhoneAndCode, data);
}

export function queryGameStatus(data) {
  return ajax.get($queryGameStatus, data);
}

export function checkPhoneCode(data) {
  $load.open("正在验证...");
  return ajax.get($checkPhoneCode, data);
}

export function sendSms4TYJ(data) {
  $load.open("正在发送短信...");
  return ajax.get($sendSms4TYJ, data);
}

export function queryHistory(data) {
  return ajax.get($queryHistory, data);
}

export function queryCreditlogs(data) {
  return ajax.get($queryCreditlogs, data);
}

export function ajaxGetSessionPersonalData(data) {
  return ajax.get($ajaxGetSessionPersonalData, data);
}

export function change_info(data) {
  $load.open("正在处理...");
  return ajax.post($change_info, data);
}

export function modifyCustomerSocialInfo(data) {
  $load.open("正在处理...");
  return ajax.post($modifyCustomerSocialInfo, data);
}

export function completeUserInfo(data) {
  $load.open("正在处理...");
  return ajax.post($completeUserInfo, data);
}

//获取单个直接传入 "PT"
export function getGameMoney(data) {
  return ajax.get($getGameMoney, data);
};

