import user from './user';
import {AUTH_NAME} from "@/store/types"//权限名称

let index = (resolve) => resolve(require('views/show/index'));//首页
let history = (resolve) => resolve(require('views/show/history'));

let download = (resolve) => resolve(require('views/show/download'));
let notice = (resolve) => resolve(require('views/show/notice'));
let register = (resolve) => resolve(require('views/show/register'));

let agentarea = require('views/show/agent-area');
let agentarea_joinplan = (resolve) => resolve(require('views/show/agent-area/components/join-plan'));
let agentarea_applicationprocess = (resolve) => resolve(require('views/show/agent-area/components/application-process'));
let agentarea_brandadvantage = (resolve) => resolve(require('views/show/agent-area/components/brand-advantage'));
let agentarea_commonproblems = (resolve) => resolve(require('views/show/agent-area/components/common-problems'));

// 关于我们路由
let aboutUs = require('views/show/about-us');
let aboutUs_tab1 = (resolve) => resolve(require('views/show/about-us/components/aboutus-tab1'));
let aboutUs_tab2 = (resolve) => resolve(require('views/show/about-us/components/aboutus-tab2'));
let aboutUs_tab3 = (resolve) => resolve(require('views/show/about-us/components/aboutus-tab3'));
let aboutUs_tab4 = (resolve) => resolve(require('views/show/about-us/components/aboutus-tab4'));
let aboutUs_tab5 = (resolve) => resolve(require('views/show/about-us/components/aboutus-tab5'));
let aboutUs_tab6 = (resolve) => resolve(require('views/show/about-us/components/aboutus-tab6'));
let aboutUs_tab7 = (resolve) => resolve(require('views/show/about-us/components/aboutus-tab7'));

export default [
  {
    path: "/index",
    name: "index",
    redirect:"./static/index.html"
  },
  {
    path: "/",
    name: "aindex",
    redirect:"./static/index.html"
  },
  {
    path: "/notice",
    name: "notice",
    component: notice
  },{
    path: "/register",
    name: "register",
    component: register
  },
  {
    path: "/download",
    name: "download",
    component: download
  },
  {
    path: "/agentarea", //代理专区
    name: "agentarea",
    component: agentarea,
    redirect: "/agentarea/joinplan",
    children: [
      {
        path: "joinplan",//加盟计划
        component: agentarea_joinplan
      },
      {
        path: "brandadvantage", //品牌优势
        component: agentarea_brandadvantage
      },
      {
        path: "commonproblems",//常见问题
        component: agentarea_commonproblems
      },
      {
        path: "applicationprocess",//申请流程
        component: agentarea_applicationprocess
      }
    ]
  },
  {
    path: "/aboutus",
    name: "aboutus",
    component: aboutUs,
    redirect: "/aboutus/aboutustab1",
    children: [
      {
        path: "aboutustab1",
        component: aboutUs_tab1
      },{
        path: "aboutustab2",
        component: aboutUs_tab2
      }, {
        path: "aboutustab3",
        component: aboutUs_tab3
      }, {
        path: "aboutustab4",
        component: aboutUs_tab4
      },{
        path: "aboutustab5",
        component: aboutUs_tab5
      }, {
        path: "aboutustab6",
        component: aboutUs_tab6
      },
      {
        path: "aboutustab7",
        component: aboutUs_tab7
      }
    ]
  },
  ...user
]
