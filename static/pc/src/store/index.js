import Vue from 'vue'; //引入vue
import Vuex from 'vuex'; //引入vue
import router from '@/router'; //引入vue
import { show } from 'api';     // 页面刷新获取用户数据
import * as types from './types'; //引入vue
import {$localStorage,$sessionStorage} from '@/util/storage';
import aesutil from '@/util/aesutil';
Vue.use(Vuex);
export default new Vuex.Store({
  state:{ //不要直接访问state
    showFooter:true,
    showLogin:false, //登录弹窗
    userData:{
      name: '',
      nickname: '',
      amount: '',
      userId: '',
      accountChainVos: []
    },
    language: $localStorage.get('language-sel') || 'zh',
    tokenInfo: null,
    checkOnline: false,
    connectState:false,
    RongIMEmoji:'',
    timeOver:false,
    unreadCount:0,
  },
  getters:{     // 用来从 store 获取 Vue 组件数据
    language( state,getters){
      return state.language;
    },
    tokenInfo(state,getters){
      if(!state.tokenInfo){
        if($localStorage.get('tokenInfo')){
          Object.assign(state.tokenInfo,JSON.parse($localStorage.get('tokenInfo')));
        }
      }

      return state.tokenInfo;
    },
    connectState(state,getters){
      return state.connectState
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
      if(state.userData.userId === ''){
        if($localStorage.get('userData')){
          Object.assign(state.userData,JSON.parse(aesutil.decrypt($localStorage.get('userData'))));
        }
      }
      // return $localStorage.get('userData') ? JSON.parse(aesutil.decrypt($localStorage.get('userData'))) : state.userData;
      return state.userData;
    },
    userId(state,getters){
      return $localStorage.get('userData') ? JSON.parse(aesutil.decrypt($localStorage.get('userData'))).userId : state.userData.userId;
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
    },
    timeOver(state,getters){
      return state.timeOver
    },
    unreadCount(state,getters){
      return state.unreadCount
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
      if(val != ''){
        $localStorage.set('userData', aesutil.encrypt(JSON.stringify(val)))
      }
      Object.assign(state.userData,val||{});
    },
    [types.CHANGE_CONNECTSTATE](state,val){
      state.connectState = val
    },
    [types.IS_TIMEOVER](state,val){
      state.timeOver = val
    },
    [types.SHOW_LOGIN](state,val){
      if(_.isMobile() && val){
        router.replace({name:'mobileLogin'});
      }else{
        state.showLogin=val;
        router.replace({name:'transaction'});
      }
    },
    [types.GET_UNREADCOUNT](state,val){
      state.unreadCount = val
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
        userId: '',
        accountChainVos: []
      })
    },
    [types.LOGIN_OUT]({commit,dispatch},val = true){ //退出登录
       dispatch(types.INIT_INFO);
       $localStorage.remove('tokenInfo');
       $localStorage.remove('userData');
       dispatch(types.UPDATE_TOKEN_INFO, null);
       dispatch(types.CHECK_ONLINE, false);
       if(val){
         if(_.isMobile()){
           //  router.replace({name:'mobileLogin'});
           window.location.href = "/m/login";
         }else{
           router.replace({name:'transaction'});
         }
       }
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
