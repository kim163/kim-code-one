import Vue from 'vue'; //引入vue
import store from './store';	//加载状态管理器
import router from './router';//加载路由器
import i18n from './lang' // 国际化插件
// import clipboard from 'clipboard' // 复制插件

import dom from './util/dom.js';//加载原型方法
import prototype from './util/prototype';//加载原型方法
import components from 'base/index.js';//装载公共模板
import {
  BusPlugin
} from './plugins/build'

import filters from './vue-extend/filters';//装载filters
import directives from './vue-extend/directives';//装载directives
Vue.use(BusPlugin)
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad:2,
  // error: require('static/images/bank_loading.gif'),
  loading:   require('static/images/reload.gif'),
})
require("@/assets/scss/base.scss")
require("@/assets/scss/font.scss")
require("@/assets/scss/animate.scss")
require("@/assets/scss/simple-grid.scss")
Vue.config.productionTip = false;
import App from './App.vue';//引入app.vue

let vm= new Vue({
  el:"#app",
  router,
  store,
  i18n,
  render:(h)=>h(App)
});

