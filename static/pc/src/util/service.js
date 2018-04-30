import axios from 'axios';
import aesutil from './aesutil';
import store from '@/store';	//加载状态管理器
import router from '@/router';

const service = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  timeout: 50000
})

// request拦截器
service.interceptors.request.use(config => {
  if (config.data.multipart) {
    config.headers['content-type'] = 'multipart/form-data'
  } else {
    /*if (store.getters.userInfo && store.getters.userInfo.nodeId) {
      config.data.nodeId = store.getters.userInfo.nodeId
    }*/
    config.data = {'requestData': aesutil.encrypt(JSON.stringify(config.data))}
  }
  config.headers['Access-Control-Allow-Origin'] = process.env.APP_ORIGIN
  config.headers['Authorization'] = `Bearer ${store.getters.tokenInfo ? store.getters.tokenInfo.accessToken : ''}`
  store.dispatch('toggleLoading', true)
  return config
}, error => {
  // Do something with request error
  console.log(error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    store.dispatch('toggleLoading', false)
    if (response && response.data && response.data.code && response.data.code !== 10000) {
      if (response.data.code === 15016) {
        window.localStorage.removeItem('tokenInfo')
        store.dispatch('updateTokenInfo', null)
        store.dispatch('updateUserInfo', null)
        store.dispatch('updateRolePermission', null)
        router.push({path: '/'})
      }
      return Promise.reject(response.data.message)
    } else {
      if (response.data.data) {
        response.data.data = JSON.parse(aesutil.decrypt(response.data.data))
      }
      return response.data
    }
  },
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject(error);
  //     } else {
  //       return response.data;
  //     }
  /**
   * progress
   */
  // uploadHandler = () => {
  //   ...
  //   axios.post('my-domain.com/file-upload', formData, {
  //     onUploadProgress: progressEvent => {
  //       console.log(progressEvent.loaded / progressEvent.total)
  //     }
  //   })
  // }
  error => {
    console.log('err' + error)
    store.dispatch('toggleLoading', false)
    if (error && error.response && error.response.data && error.response.data.message) {
      return Promise.reject(error.response.data.message)
    } else if (error && error.message) {
      return Promise.reject(error.message)
    } else {
      return Promise.reject(error)
    }
  }
)

export default service
