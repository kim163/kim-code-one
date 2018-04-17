/**
 * Created by Lorne on 2017/7/5.
 */
import ajax from 'api/index'
let $getNewAnnouncement="/index/getNewAnnouncement.php";// 获取公告获取公告 只获取最新15条，时间倒序排列
let $queryRecommandGamesList="/index/queryRecommandGamesList.php";//查询推荐的游戏
let $checkConfigSystem="/index/checkConfigSystem.php";//弹框配置 首页
let $queryBannerList="/index/queryBannerList.php";//弹框配置 首页

let $getCarouselListAll="/index/getCarouselListAll.php";// 首页中奖信息
let $makeCall = "/user/makeCall.php"; //电话回拨接口$
let $generateQRCode = "/index/generateQRCode.php";
let  $saveOrUpdateGameStatus="/user/saveOrUpdateGameStatus.php";//收藏接口
let $getMessageByUser = "/index/getMessageByUser.php";//获取消息记录集合
let $readMsg = "/index/readMsg.php"; //获取单个消息
let $getGuestbookCountNew = "/index/getGuestbookCountNew.php"; //获取未读消息
let $getbackPwdByDx_dc = "/index/getbackPwdByDx_dc.php";//手机短信找回密码
let $getbackPwdByEmail = "/index/getbackPwdByEmail.php";//邮箱找回密码

let $getLoginNameByEmailOrPhone = "/index/getLoginNameByEmailOrPhone.php";//手机短信或邮件找回账户名
let $getDomainName = '/asp/getDomainName.php';//获取域名

let $getTouClickFlag="/asp/getTouClickFlag.php";  //获取是否开启点触

export function getAllGames(data){
  return ajax.get($allGamesData,data);
}

export function generateQRCode(data,size=140) {
  return `${$generateQRCode}?qrtext=${data}&size=${size}`
}

export function getLoginNameByEmailOrPhone(data) {
  $load.open("正在验证...")
  return ajax.post($getLoginNameByEmailOrPhone, data)
}
export function getbackPwdByDx_dc(data) {
  $load.open("正在验证...")
  return ajax.post($getbackPwdByDx_dc, data)
}
export function getbackPwdByEmail(data) {
  $load.open("发送中...")
  return ajax.post($getbackPwdByEmail,data)
}

export function getGuestbookCountNew(data) {
  return ajax.get($getGuestbookCountNew, data)
}
export function makeCall(data) {
  $load.open("处理中...")
  return ajax.post($makeCall, data)
}
export function getCarouselListAll(data){
  return ajax.get($getCarouselListAll,data);
}
export function checkConfigSystem(data){
  return ajax.post($checkConfigSystem,data);
}
export function queryBannerList(data){
  return ajax.get($queryBannerList,data);
}
export function getNewAnnouncement(){
  return ajax.get($getNewAnnouncement,{v:Math.random()});
}

export function queryRecommandGamesList(data){
  return ajax.get($queryRecommandGamesList,data);
}

export function saveOrUpdateGameStatus(data){
  return ajax.get($saveOrUpdateGameStatus,data);
}
export function getMessageByUser(data) {
  return ajax.get($getMessageByUser, data);
}
export function readMsg(data) {
  return ajax.get($readMsg, data);
}

export function getDomainName(data){
  return ajax.get($getDomainName,data);
}
export function getTouClickFlag(data){
  return ajax.get($getTouClickFlag,data);
}
