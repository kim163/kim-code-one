import ajax from './index'; //引入vue
let checkLogin = "/user/ajaxGetSessionPersonalData.php";
/*** 检查登录*/
let $login = "/index/login.php";
/*** 登录*/
let $logout = '/index/logout.php';
/*** 登出*/
let $register = '/mobi/register.php';
/***注册*/
let $addAgent = '/mobi/addAgent.php';

/**
 * 用户认证所用到的 API
 */
export function checkLogin() {
  return ajax.get(checkLogin);
}

export function login(userData) {
  $load.open("登录中...");
  return ajax.post($login, userData);
}

export function logOut() {
  $load.open("正在退出...");
  return ajax.get($logout);
}

export function getAuthImg() {
  return "/mobi/validateImage.php?random=" + Math.random();
}

export function register(data) {
  $load.open("正在注册...");
  return ajax.post($register, data)
}

export function registerAgent(data) {
  $load.open("正在注册...");
  return ajax.post($addAgent, data)
}
