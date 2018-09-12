import  abchina from '../assets/images/bankIcon/abchina.png'
import  bcomm from '../assets/images/bankIcon/bjrcb.png'
import  bjrcb from '../assets/images/bankIcon/bjrcb.png'
import bobj from '../assets/images/bankIcon/bobj.png'
import boc from '../assets/images/bankIcon/boc.png'
import ccb from '../assets/images/bankIcon/ccb.png'
import cebbank from '../assets/images/bankIcon/cebbank.png'
import cgbchina from '../assets/images/bankIcon/cgbchina.png'
import cib from '../assets/images/bankIcon/cib.png'
import cmbc from '../assets/images/bankIcon/cmbc.png'
import cmsb from '../assets/images/bankIcon/cmsb.png'
import ctb from '../assets/images/bankIcon/ctb.png'
import hxb from '../assets/images/bankIcon/hxb.png'
import icbc from '../assets/images/bankIcon/icbc.png'
import pingan from '../assets/images/bankIcon/pingan.png'
import psbc from '../assets/images/bankIcon/psbc.png'
import spdb from '../assets/images/bankIcon/spdb.png'
import srcb from '../assets/images/bankIcon/srcb.png'
import juan from '../assets/images/bankIcon/juan-bank.png'

export default function getBankUrl(name) {
  switch (name){
    case '农业银行':
       return abchina;
       break;
    case '交通银行':
      return bcomm;
      break;
    case '北京农商银行':
      return bjrcb;
      break;
    case '北京银行':
      return bobj;
      break;
    case '中国银行':
      return boc;
      break;
    case '建设银行':
      return ccb;
      break;
    case '光大银行':
      return cebbank;
      break;
    case '广发银行':
      return cgbchina;
      break;
    case '兴业银行':
      return cib;
      break;
    case '招商银行':
      return cmbc;
      break;
    case '民生银行':
      return cmsb;
      break;
    case '中信银行':
      return ctb;
      break;
    case '华夏银行':
      return hxb;
      break;
    case '工商银行':
      return icbc;
      break;
    case '平安银行':
      return pingan;
      break;
    case '邮政储蓄银行':
      return psbc;
      break;
    case '浦发银行':
      return spdb;
      break;
    case '上海农商银行':
      return srcb;
      break;
    default:
      return juan
  }
}
