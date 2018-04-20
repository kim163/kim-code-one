import ajax from 'api/index'
let $queryCreditlogs = "/mobi/queryCreditlogs.php";//额度记录查询
let $ajaxGetSessionPersonalData = "/user/ajaxGetSessionPersonalData.php";
/***获取短信码*/
let $queryHistory = "/user/queryHistory.php";//记录查询
let $doSignRecord = "/index/doSignRecord.php";//用户签到
let $getWithdrawPW = '/onlinepayment/getWithdrawPW.php';//手机短信或邮件找回支付密码
let $checkWithdrawPwd="/asp/checkWithdrawPwd.php"; //确认用户是否设置支付密码

export function getWithdrawPW(data) {
  $load.open("正在验证...")
  return ajax.post($getWithdrawPW, data)
}

export function doSignRecord(data) {
  $load.open("正在签到...");
  return ajax.get($doSignRecord, data);
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
export function checkWithdrawPwd(data){
  return  ajax.get($checkWithdrawPwd,data);
}
