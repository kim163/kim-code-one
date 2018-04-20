import {AUTH_NAME} from "@/store/types"
import master from 'components/master/user';//模板

let log=(resolve) => resolve(require('views/user/log'));//记录查询
let message=(resolve) => resolve(require('views/common/message'));//站内消息

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
      {path:"", component:log},
      {
        path:"log",
        name:"user_log",
        component:log
      },{
        path:"message",
        name:"user_message",
        component:message
      }
    ]
  }
]
