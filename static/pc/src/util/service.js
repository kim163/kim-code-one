import axios from 'axios';
import aesutil from './aesutil';
import store from '@/store';	//加载状态管理器
import router from '@/router';
import {$localStorage, $sessionStorage} from './storage';

const service = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  timeout: 50000
});

// request拦截器
service.interceptors.request.use(config => {
  if (config.data && config.data.multipart) {
    config.headers['content-type'] = 'multipart/form-data'
  } else {
    config.data = {
      nodeId: process.env.NODE_ID,
      requestData: aesutil.encrypt(JSON.stringify(config.data))
    }
  }
  config.headers['Authorization'] = `Bearer ${store.getters.tokenInfo ? store.getters.tokenInfo.accessToken : ''}`
  $load.open("Loading...");
  return config
}, error => {
  // Do something with request error
  console.log(error)
  Promise.reject(error)
});

// respone拦截器
service.interceptors.response.use(
  response => {
    $load.close();
    if (response && response.data && response.data.code && response.data.code !== 10000) {
      if (response.data.code === 15016) {    // 没有在线
        store.dispatch('INIT_INFO');
        $localStorage.remove('tokenInfo');
        store.dispatch('UPDATE_TOKEN_INFO', null);
        store.dispatch('CHECK_ONLINE',false);
        store.commit("SHOW_LOGIN",true);
      }
      return Promise.reject(response.data.message)
    } else {
      if (response.data.data) {
        response.data.data = JSON.parse(aesutil.decrypt(response.data.data))
      }
      return response.data
    }
  },
  error => {
    console.log('err' + error);
    $load.close();
    if (error && error.response && error.response.data && error.response.data.message) {
      return Promise.reject(error.response.data.message)
    } else if (error && error.message) {
      return Promise.reject(error.message)
    } else {
      return Promise.reject(error)
    }
  }
);

export default service
