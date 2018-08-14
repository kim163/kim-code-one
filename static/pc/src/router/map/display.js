/**
 * Created by Anne on 2018/08/07.
 * Display page router
 */

const promIndex = () => import('views/show/promotion');  // 推广首页
const promHelp = () => import('views/show/promotion/help');  // 推广帮助中心
const promContactUs = () => import('views/show/promotion/contact-us');  // 推广联系我们

export default [
  {
    path: "/prom",
    name: "promIndex",
    component: promIndex,
    meta:{
      noLogin: true
    }
  },
  {
    path: "/promHelp",
    name: "promHelp",
    component: promHelp,
    meta:{
      noLogin: true
    }
  },
  {
    path: "/promContact",
    name: "promContact",
    component: promContactUs,
    meta:{
      noLogin: true
    }
  }
]
