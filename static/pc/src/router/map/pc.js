
const PcIndex = () => import('views/pc/index.vue')
const PromIndex = () => import('views/pc/promotion');  // 推广首页
const PromHelp = () => import('views/pc/promotion/help');  // 推广帮助中心
const PromContactUs = () => import('views/pc/promotion/contact-us');  // 推广联系我们
const WalletCenter = () => import('views/pc/wallet-center') //钱包中心
const TranCenter = () => import('views/pc/tran-center') //交易模块
const UserCenter = () => import('views/pc/user-center') //个人中心模块


export default [
  {
    path: "/",
    name: "aindex",
    redirect:"/index"
  },
  {
    path: "/index",
    component: PcIndex,
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
        component:PromIndex,
        // props:{
        //   isOfficialWeb:true
        // }
      },
      {
        path: "/helpCenter",
        name: "helpCenter",
        component: PromHelp,
        // props:{
        //   isOfficialWeb:true
        // }
      },
      {
        path: "/contactUs",
        name: "contactUs",
        component: PromContactUs,
        // props:{
        //   isOfficialWeb:true
        // }
      },
      {
        path: "/prom",
        name: "promIndex",
        component: PromIndex,
      },
      {
        path: "/promHelp",
        name: "promHelp",
        component: PromHelp,
      },
      {
        path: "/promContact",
        name: "promContact",
        component: PromContactUs,
      },
      {
        path: "/center",
        name: "walletCenter",
        component:WalletCenter,
        children:[
          {
            path:'',
            component:TranCenter,
          },
          {
            path:'/user',
            name:'userCenter',
            component:UserCenter,
          },
          {
            path:'/orderDetail/:id',
            name:'orderDetail',
            component:TranCenter,
          }
        ]
      }
    ]
  }
]