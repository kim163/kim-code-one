let CryptoJS = require('crypto-js');
import {$localStorage} from './storage';
const encrypt = (data) => {
  console.log('key',key)
  console.log('iv',iv)
  let encrypted = CryptoJS.AES.encrypt(
    data,
    key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })

  return encrypted.toString()
}
const decrypt = (data) => {
  if(data){
    let encrypted = data.toString().replace(/\r|\n/g, '')
    let decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7})

    return decrypted.toString(CryptoJS.enc.Utf8)
  }
}
const updateKey = (data) => {
  key = CryptoJS.enc.Utf8.parse(data);
  console.log('new key',key)
}
let key = CryptoJS.enc.Utf8.parse('smkldospdosldaaa');
let iv = CryptoJS.enc.Utf8.parse('0000000000000000');
const userData = $localStorage.get('userData')
if(!_.isUndefined(userData) && !_.isNull(userData)){
  const userDataInfo = JSON.parse(decrypt(userData))
  if(userDataInfo.node && userDataInfo.node.customer){
    key = CryptoJS.enc.Utf8.parse(userDataInfo.node.customer.aesKey)
  }
}
console.log('new key',key)
export default {
  encrypt,
  decrypt,
  updateKey
}
