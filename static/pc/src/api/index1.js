import vueRouter from '@/router'; //引入vue
import axios from 'axios'; //引入axios
import store from '@/store';	//加载状态管理器

// axios.defaults.baseURL="http://112.213.126.135:4777";
axios.defaults.headers.common['Content-Type'] ='application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.responseType="json";
axios.defaults.timeout=0;
// axios.defaults.withCredentials=true;
// 请求拦截
var qs=require('qs');
let get=axios.get;
axios.get=function(url,data,config){
  return get(url,Object.assign({
    params:data||{}
  },config||{}));
};

axios.interceptors.request.use(function(config){
  config.data=qs.stringify(config.data)
  return config;
},function(error){
  console.log("发送请求失败:"+error);
  return Promise.reject(error);
});
//响应拦截
axios.interceptors.response.use((response)=>{
    $load.close();
    if(response.status===200&&response.data==undefined){
      let olddata=response.request.responseText||response.request.response;
      if(typeof olddata=="string"){
        try{
          response.data=JSON.parse(olddata)
        }catch(e){
          response.data={message:olddata,olddata:olddata,success:false};
        }
      }else{
        response.data=olddata;
      }
    }
    if(!response.data.hasOwnProperty("success")){
      response.data.success=response.data.code=="10000";
    }
    if(response.status===200&&/40001/.test(response.data.code)){//没有登录
      store.dispatch("INIT_INFO");//重新初始化信息
      response.data.message="请先登录";


    }
    return response.status===200 ? response.data : response;
  },
  (err)=>{
    $load.close();
    if (err && err.response) {
      switch (err.response.status) {
       /* case 500:
          vueRouter.replace({path: "/500"})
          break;
        case 404:
          vueRouter.replace({path: "/404"})
          break;*/
        case 403:
          vueRouter.replace({path: "/403"})
          break;
      }
    }
    return Promise.reject(err);
  }
)
window.$ajax=axios;
export default axios;
