import {AUTH_NAME} from "@/store/types"
import master from 'components/master/user';//模板
let index=(resolve) => resolve(require('views/user/index'));//用户首页
let datum=(resolve) => resolve(require('views/user/datum'));//个人资料

import discount from 'views/user/discount'

import finance from 'views/user/finance';//财务服务

let log=(resolve) => resolve(require('views/user/log'));//记录查询
let message=(resolve) => resolve(require('views/common/message'));//站内消息
let security=(resolve) => resolve(require('views/user/security'));//安全中心

export default [
  {
    path:"/user",
    name:'user',
    component:master,
    redirect:"/user/",
    meta:{
      auth:[AUTH_NAME.USER]
    },
    children:[
      {path:"", component:index},
      {
        path:"index",
        name:"user_index",
        component:index
      },
      {
        path:"datum",
        name:"user_datum",
        component:datum
      },{
        path:"discount",
        name:"user_discount",
        component:discount,
        redirect:"discount/experience",
        children:[
          {path:"experience",name:"discount_experience", component(resolve){return resolve(require('views/user/discount/components/experience-gold'))}},
          {path:"savesend",name:"discount_savesend",component(resolve){return resolve(require('views/user/discount/components/save-send'))}},
          {path:"redenvelope",name:"discount_redenvelope",component(resolve){return resolve(require('views/user/discount/components/red-envelope'))}},
          {path:"washcode",name:"discount_washcode",component(resolve){return resolve(require('views/user/discount/components/wash-code'))}},
          {path:"coupon",name:"discount_coupon",component(resolve){return resolve(require('views/user/discount/components/discount-code'))   } },
          {path:"help",name:"discount_help",component(resolve){return resolve(require('views/user/discount/components//help-gold'))}},
          {path:"vip",name:"discount_vip",component(resolve){return resolve(require('views/user/discount/components/vip-gold'))}},
          {path:"birthday",name:"discount_birthday",component(resolve){return resolve(require('views/user/discount/components/birthday-gold'))}},
          {path:"recommend",name:"discount_recommend",component(resolve){return resolve(require('views/user/discount/components/recommend-firend'))}}
        ]
      },{
        path:"finance",
        name:"user_finance",
        component:finance,
        redirect:"finance/deposit",
        children:[
          {path:"deposit",name:"user_deposit",component(resolve){return resolve(require('views/money/deposit'))}},
          {path:"drawmoney",name:"user_drawmoney",component(resolve){return resolve(require('views/money/drawmoney'))}},
          {path:"transfer",name:"user_transfer",component(resolve){return resolve(require('views/money/transfer'))}}
        ]
      },{
        path:"log",
        name:"user_log",
        component:log
      },{
        path:"message",
        name:"user_message",
        component:message
      },{
        path:"security",
        name:"user_security",
        component:security
      }
    ]
  }
]
