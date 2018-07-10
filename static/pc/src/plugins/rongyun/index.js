import {aesutil} from '@/util';
import {chatWith} from 'api'
import {$localStorage, $sessionStorage} from '@/util/storage'

export default {
  install(Vue) {
    Vue.prototype.$loadScript('https://cdn.ronghub.com/RongIMLib-2.3.0.js')
      .then(() => {
        this.callback()
      })
  },
  callback() {
    RongIMLib.RongIMClient.init('x18ywvq85ahuc', null, {navi: 'http://dc-jiuan-im-nav-pro.com'}) //eslint-disable-line
    this.getToken()
  },
  async getToken() {
    const userData = JSON.parse(aesutil.decrypt($localStorage.get('userData')))
    let params = {
      userId: userData.userId,
      nickName: userData.nickname
    }
    await chatWith.getToken(params).then(res => {
      this.token = res.data.token;
      this.connect();
      this.setConnectStatusListener();
      this.setOnReceiveMessageListener();
      Vue.prototype.$loadScript('https://cdn.ronghub.com/RongEmoji-2.2.6.min.js')
        .then(() => {
          this.initEmoji();
        })
    })
  },
  connect() {
    RongIMClient.connect(this.token, {
      onSuccess: () => {
        console.log('加载成功')
      },
      OnTokenIncorrect: function () {
        console.log('token无效')
      },
      OnError: function (error) {
        console.log(error)
      }
    })

  },
  initEmoji() {
    RongIMLib.RongIMEmoji.init(this.config);
  },
  setConnectStatusListener() {
    RongIMClient.setConnectionStatusListener({  //eslint-disable-line
      onChanged: function (status) {
        let info = null
        switch (status) {
          case RongIMLib.ConnectionStatus.CONNECTED:  //eslint-disable-line
            info = '链接成功'
            alert(info)
            Vue.$global.bus.$emit('rongState')
            this.$store.commit('CHANGE_CONNECTSTATE',true)
            break
          case RongIMLib.ConnectionStatus.CONNECTING:  //eslint-disable-line
            info = '正在链接'
            alert(info);
            break
          case RongIMLib.ConnectionStatus.DISCONNECTED:  //eslint-disable-line
            info = '断开连接'
            alert(info);
            break
          case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:  //eslint-disable-line
            info = '其他设备登录'
            alert(info);
            break
          case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:  //eslint-disable-line
            info = '域名不正确'
            alert(info);
            break
          case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:  //eslint-disable-line
            info = '网络不可用'
            alert(info);
            break
        }
      }
    })
  },
  setOnReceiveMessageListener() {
    RongIMClient.setOnReceiveMessageListener({  //eslint-disable-line
      onReceived: (message) => {
        /!*区分*!/
        switch (message.messageType) {
          case RongIMClient.MessageType.TextMessage: //eslint-disable-line
            // message.content.content => 消息内容
            /!*接收使用symbolToEmoji方法*!/
          //  Vue.prototype.chatArr.push({msg: this.RongIMEmoji.symbolToEmoji(message.content.content), user: 2})
         //   this.chatArr.push({msg: this.RongIMEmoji.symbolToEmoji(message.content.content), user: 2})
            console.log(`message+${message}`)
            Vue.$global.bus.$emit('textMessage', {msg: RongIMLib.RongIMEmoji.symbolToEmoji(message.content.content), user: 2})
            break
          case RongIMClient.MessageType.VoiceMessage: //eslint-disable-line
            // 对声音进行预加载
            // message.content.content 格式为 AMR 格式的 base64 码
            break
          case RongIMClient.MessageType.ImageMessage: //eslint-disable-line
            // message.content.content => 图片缩略图 base64。
            // message.content.imageUri => 原图 URL。
          //  this.chatArr.push({msg: message.content.imageUri, user: 4, img: [message.content.imageUri]})
            Vue.$global.bus.$emit('picMessage', {msg: message.content.imageUri, user: 4, img: [message.content.imageUri]})
            break
          case RongIMClient.MessageType.DiscussionNotificationMessage: //eslint-disable-line
            // message.content.extension => 讨论组中的人员。
            break
          case RongIMClient.MessageType.LocationMessage: //eslint-disable-line
            // message.content.latiude => 纬度。
            // message.content.longitude => 经度。
            // message.content.content => 位置图片 base64。
            break
          case RongIMClient.MessageType.RichContentMessage: //eslint-disable-line
            // message.content.content => 文本消息内容。
            // message.content.imageUri => 图片 base64。
            // message.content.url => 原图 URL。

            break
          case RongIMClient.MessageType.InformationNotificationMessage: //eslint-disable-line
            // do something...
            break
          case RongIMClient.MessageType.ContactNotificationMessage: //eslint-disable-line
            // do something...
            break
          case RongIMClient.MessageType.ProfileNotificationMessage: //eslint-disable-line
            // do something...
            break
          case RongIMClient.MessageType.CommandNotificationMessage: //eslint-disable-line
            // do something...
            break
          case RongIMClient.MessageType.CommandMessage: //eslint-disable-line
            // do something...
            break
          case RongIMClient.MessageType.UnknownMessage: //eslint-disable-line
            // do something...
            break
          default:
          // do something...
        }
      }
    })
  },
}

