
const PcIndex = () => import('views/pc/index.vue')
const PromIndex = () => import('views/pc/promotion');  // 推广首页
const PromHelp = () => import('views/pc/promotion/help');  // 推广帮助中心
const PromContactUs = () => import('views/pc/promotion/contact-us');  // 推广联系我们
const WalletCenter = () => import('views/pc/wallet-center') //钱包中心
const TranCenter = () => import('views/pc/tran-center') //交易模块
const UserCenter = () => import('views/pc/user-center') //个人中心模块
const OrderDetail = () => import('views/pc/order-detail') //订单详情

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
        meta: {
          noLogin: true
        },
        // props:{
        //   isOfficialWeb:true
        // }
      },
      {
        path: "/helpCenter",
        name: "helpCenter",
        component: PromHelp,
        meta: {
          noLogin: true
        },
        // props:{
        //   isOfficialWeb:true
        // }
      },
      {
        path: "/contactUs",
        name: "contactUs",
        component: PromContactUs,
        meta: {
          noLogin: true
        },
        // props:{
        //   isOfficialWeb:true
        // }
      },
      {
        path: "/prom",
        name: "promIndex",
        component: PromIndex,
        meta: {
          noLogin: true
        },
      },
      {
        path: "/promHelp",
        name: "promHelp",
        component: PromHelp,
        meta: {
          noLogin: true
        },
      },
      {
        path: "/promContact",
        name: "promContact",
        component: PromContactUs,
        meta: {
          noLogin: true
        },
      },
      {
        path: "/center",
        component:WalletCenter,
        children:[
          {
            path:'',
            name: "walletCenter",
            component:TranCenter,
          },
          {
            path:'user',
            name:'userCenter',
            component:UserCenter,
          },
          {
            path:'orderDetail',
            name:'orderDetail',
            component:OrderDetail,
          }
        ]
      }
    ]
  }
]