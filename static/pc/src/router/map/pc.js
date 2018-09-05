
const pcIndex = () => import('views/pc/index')
const promIndex = () => import('views/show/promotion');  // 推广首页
const promHelp = () => import('views/show/promotion/help');  // 推广帮助中心
const promContactUs = () => import('views/show/promotion/contact-us');  // 推广联系我们

export default [
  {
    path: "/",
    name: "aindex",
    redirect:"/index"
  },
  {
    path: "/index",
    component: pcIndex,
    props: {
      isOfficialWeb: true
    },
    meta: {
      noLogin: true
    },
    children:[
      {
        path:"",
        name: "pcIndex",
        component:promIndex,
        // props:{
        //   isOfficialWeb:true
        // }
      },
      {
        path: "/helpCenter",
        name: "helpCenter",
        component: promHelp,
        // props:{
        //   isOfficialWeb:true
        // }
      },
      {
        path: "/contactUs",
        name: "contactUs",
        component: promContactUs,
        // props:{
        //   isOfficialWeb:true
        // }
      },
      {
        path: "/prom",
        name: "promIndex",
        component: promIndex,
      },
      {
        path: "/promHelp",
        name: "promHelp",
        component: promHelp,
      },
      {
        path: "/promContact",
        name: "promContact",
        component: promContactUs,
      }
    ]
  }
]