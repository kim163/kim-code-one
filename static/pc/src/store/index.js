import Vue from 'vue'; //引入vue
import Vuex from 'vuex'; //引入vue
import router from '@/router'; //引入vue
import { show } from 'api';     // 页面刷新获取用户数据
import * as types from './types'; //引入vue
import {$localStorage,$sessionStorage} from '@/util/storage';
Vue.use(Vuex);
export default new Vuex.Store({
  state:{ //不要直接访问state
    showFooter:true,
    showLogin:false, //登录弹窗
    userData:{
      name: '',
      nickname: '',
      amount: '',
      userId: ''
    },
    language: $localStorage.get('language-sel') || 'en',
    tokenInfo: null,
    checkOnline: false
  },
  getters:{     // 用来从 store 获取 Vue 组件数据
    language( state,getters){
      return state.language;
    },
    tokenInfo(state,getters){
      return state.tokenInfo;
    },
    checkOnline(state,getters){
      return state.checkOnline;
    },
    showFooter(state,getters){
      Vue.nextTick(()=>{
        document.querySelector("body").style.paddingBottom=(state.showFooter?"":"0");
      })
      return state.showFooter;
    },
    showLogin(state,getters){
      return state.showLogin;
    },
    userData(state,getters){ //其有可能进行过滤
      return state.userData;
    },
    islogin(state,getters){  // 根据是否有 tokenVo 并且请求返回值不为 15016
      let tokenInfo = JSON.parse($localStorage.get('tokenInfo'));
      if($localStorage&&tokenInfo){ //先查localStorage
        if(types.CHECK_ONLINE){
          return true;
        }
      }
      if(state.checkOnline&&state.tokenInfo){
         return true;
      }
      return false;
    }
  },
  mutations:{         // 事件处理器用来驱动状态的变化
    [types.SET_LANGUAGE](state, language){
      state.language = language;
      $localStorage.set('language-sel', language);
    },
    [types.UPDATE_TOKEN_INFO] (state, tokenInfo) {
      state.tokenInfo = tokenInfo
    },
    [types.CHECK_ONLINE] (state, val) {
      state.checkOnline = val
    },
    [types.SET_FOOTER](state,val){
      state.showFooter=val
    },
    [types.SET_USERDATA](state,val={}){
      Object.assign(state.userData,val||{});
    },
    [types.SHOW_LOGIN](state,val){
      state.showLogin=val;
    }
  },
  actions:{    // 可以给组件使用的函数，以此用来驱动事件处理器 mutations
    [types.SET_LANGUAGE]({ commit }, language){
      commit(types.SET_LANGUAGE, language)
    },
    [types.UPDATE_TOKEN_INFO]({ commit }, tokenInfo){
      commit(types.UPDATE_TOKEN_INFO, tokenInfo)
    },
    [types.CHECK_ONLINE]({ commit }, val){
      commit(types.CHECK_ONLINE, val)
    },
    [types.INIT_INFO]({commit},val){ //初始化所有信息 相当于退出
      commit(types.SET_USERDATA,{
        name: '',
        nickname: '',
        amount: '',
        userId: ''
      })
    },
    [types.LOGIN_OUT]({commit,dispatch},val){ //退出登录
       dispatch(types.INIT_INFO);
       $localStorage.remove('tokenInfo');
       dispatch(types.UPDATE_TOKEN_INFO, null);
       dispatch(types.CHECK_ONLINE, false);
       router.push({path: '/'});
    },
    [types.UPDATE_USERDATA]({commit,dispatch},val){  //获取 初始化信息
      let tokenInfo = JSON.parse($localStorage.get('tokenInfo'));
      if (tokenInfo) {
        dispatch(types.UPDATE_TOKEN_INFO, tokenInfo);
      }else {
        dispatch(types.CHECK_ONLINE, false);
      }

      return show.implicitLogin({}).then(res =>{
        if(res.code == 10000){
          console.log('implicitLogin res:', res);
          commit(types.SET_USERDATA,res.data);
          dispatch(types.CHECK_ONLINE, true);
        }
        return Promise.resolve(res);
      });
    }
  }
});
