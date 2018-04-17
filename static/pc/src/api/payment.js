import ajax from 'api/index'

let $checkWithdrawPwd="/cash/checkWithdrawPwd.php"; //确认用户是否设置支付密码
let $change_pws="/user/change_pws.php"; //修改登录密码
let $modifyWithdrawPwd="/cash/modifyWithdrawPwd.php"; //修改支付密码
let $bindWithdrawPwd="/cash/bindWithdrawPwd.php";//设置支付密码



let $findUserBankList="/user/findUserBankList.php";//银行卡列表
let $bindBankNo="/cash/bindBankNo.php";//绑定银行卡
let $validateBankNo="/cash/validateBankNo.php";//校验银行卡列表


let $withdraw_new="/cash/withdraw_new.php";//取款提交
let $updateGameMoney="/cash/updateGameMoney.php";//转账


let $createDepositeOrder="/cash/createDepositeOrder.php";//创建秒存订单
let $getPaymentConfigInfo="/onlinepayment/getPaymentConfigInfo.php";//充值方式  0 1 2 分别是PC/WAP/APP
let $mobilePayByEbank="/onlinepayment/mobilePayByEbank.php";//获取网银bankcode
let $onlinePayDispathcer="/onlinepayment/onlinePayDispathcer.php";//提交存款订单

let $flashPay="/asp/createDepositeOrder.php";//提交存款订单
let $getWxZzQuota="/asp/getWxZzQuotaV2.php";//微信秒存随机数


export function thirdRedirct(data){
  return  ajax.post($thirdRedirct,data);
}
export function mobilePayByEbank(data){
  $load.open("正在获取...");
  return  ajax.post($mobilePayByEbank,data);
}
/*export function onlinePayDispathcer(data){
  $load.open("正在提交...");
  return  ajax.post($onlinePayDispathcer,data);
}*/
export function onlinePayDispathcer(data){
  //$load.open("正在提交...");
  let $form=document.createElement("form");
  $form.target="_blank"
  $form.method="POST";
  $form.action=$onlinePayDispathcer;
  for(let item in data){
    let inputVal=document.createElement("input");
    inputVal.type='hidden';
    inputVal.value=data[item];
    inputVal.name=item;
    $form.appendChild(inputVal);
  }
  document.querySelector("body").appendChild($form);
  $form.submit();
  setTimeout(()=>{
    document.querySelector("body").removeChild($form);
  },0)
}
export function createDepositeOrder(data){
  $load.open("正在创建...");
  return  ajax.post($createDepositeOrder,data);
}
export function getPaymentConfigInfo(data){
  return  ajax.post($getPaymentConfigInfo,data);
}

export function updateGameMoney(data){
  $load.open("正在处理...");
  return  ajax.post($updateGameMoney,data);
}
export function checkWithdrawPwd(data){
  return  ajax.get($checkWithdrawPwd,data);
}
export function changepws(data){
  $load.open("正在处理...");
  return  ajax.post($change_pws,data);
}
export function modifyWithdrawPwd(data){
  $load.open("正在处理...");
  return  ajax.post($modifyWithdrawPwd,data);
}
export function bindWithdrawPwd(data){
  $load.open("正在处理...");
  return  ajax.post($bindWithdrawPwd,data);
}
export function findUserBankList(data){
  return  ajax.get($findUserBankList,data);
}
export function withdraw_new(data){
  $load.open("正在处理...");
  return  ajax.post($withdraw_new,data);
}
export function validateBankNo(data){
  return  ajax.get($validateBankNo,data);
}
export function bindBankNo(data){
  $load.open("正在处理...");
  return  ajax.get($bindBankNo,data);
}
export function getWxZzQuota(data){
  $load.open("正在处理...");
  return  ajax.post($getWxZzQuota,data);
}

