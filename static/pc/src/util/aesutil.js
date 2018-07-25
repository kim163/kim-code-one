let CryptoJS = require('crypto-js');
let key = CryptoJS.enc.Utf8.parse('smkldospdosldaaa');
let iv = CryptoJS.enc.Utf8.parse('0000000000000000');

export default {
  encrypt: (data) => {
    let encrypted = CryptoJS.AES.encrypt(
      data,
      key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })

    return encrypted.toString()
  },
  decrypt: (data) => {
   if(data){
    let encrypted = data.toString().replace(/\r|\n/g, '')
    let decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7})

    return decrypted.toString(CryptoJS.enc.Utf8)
   }
  },
  updateKey(data){
    key = CryptoJS.enc.Utf8.parse(data)
  }

}
