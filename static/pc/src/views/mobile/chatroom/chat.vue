<template>
  <div class="transell-main0 transell-main-box wrapper_box">
    <m-header :fixed="true">会话详情</m-header>
    <div class="order_info">
      <div class="order_state">
        <div class="state_b">
          <span class="state_d">买入</span>
          <span class="order_num">UET订单编号:</span>
          <span class="order_d">订单详情</span>
        </div>
        <div class="order_c">{{detail}}</div>
      </div>
      <div>

        <!--展开-->
        <div class="display-box" v-if="isDisplay">
          <div class="line">
            <span>卖家:</span>
            <span class="fr lineColor">saasda</span>
          </div>
          <div class="line">
            <span>交易金额:</span>
            <span class="fr lineColor">100000</span>
          </div>
          <div class="line">
            <span>交易数量:</span>
            <span class="fr lineColor">10000</span>
          </div>
          <div class="display" @click="showDisplay">
            <img src="~images/chatWith/hidden.png" alt="">
          </div>
        </div>
        <!--隐藏-->
        <div class="hidden-box" v-if="!isDisplay">
          <div class="hiddenbox" @click="showDisplay">
            <img src="~images/chatWith/display.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <!--付款倒计时-->
    <p class="countdown">
      等待付款倒计时: 09: 09
    </p>
    <!--聊天框-->
    <div class="chatbox" :class="{'displayState':!isDisplay,'hiddenState':isDisplay}" id="chatMessage">
      <div v-for="list in chatArr" :class="{user:'',seller:''}">
        <!--发送消息-->
        <div v-if="list.user==1" class="chat_container">
          <div class="" style="flex: 1"></div>
          <div class="contents">{{list.msg}}</div>
          <div class="user_symbol"></div>
        </div>
        <!--图片消息-->
        <div v-if="list.user==3" class="chat_container">
          <div class="" style="flex: 1"></div>
          <div class="contents">
            <img :src="list.msg" alt="" class="contents_image">
          </div>
          <div class="user_symbol"></div>
        </div>
        <div v-if="list.user==2" class="chat_container">
          <div class="user_symbol"></div>
          <div class="contents">
            <div class="contents">{{list.msg}}</div>
          </div>
          <div class="" style="flex: 1"></div>
        </div>
      </div>
    </div>
    <!--输入框-->
    <div class="input_chatbox">
      <div class="chatboxNext">
        <input type="text" class="input_message" v-model="messageValue" id="inputMessage">
        <div class="smile" @click="sendEmoji" :class="{emoji:isChangeValue,input:!isChangeValue}"></div>
        <div class="more demo1" v-if="!needSend" @click="showMoreFunction"></div>
        <input type="button" value="发送" class="sendMessage" v-if="needSend" @click="sendMessage">
      </div>
      <!--照片 照相机-->
      <div class="photo_area" v-if="isShowMore">
        <div class="take_photo take_box" style="position: relative">
          <img src="~images/chatWith/photo.png" alt="" style="display: block">
          <span>照片</span>
          <input type="file" accept="image/*" value="打开照相机" class="openCamera" @change="upload">
        </div>
        <!--    <vue-core-image-upload
              class="btn btn-primary"
              :crop="false"
              @imageuploaded="imageuploaded"
              :max-file-size="5242880"
              url="10.33.67.28" >
            </vue-core-image-upload>-->
        <!--   <div class="take_camera take_box" style="position: relative">
             <img src="~images/chatWith/camera.png" alt="" style="display: block">
             <span>摄像</span>
             <input type="file" accept="image/*" capture="camera" value="打开照相机" class="openCamera">
           </div>-->

      </div>
      <!--表情-->
      <div class="emoji_area">

      </div>
    </div>
    <!--融云库-->
    <!-- <romete-js src="https://cdn.ronghub.com/RongIMLib-2.3.0.js" @scriptLoad="callBack"></romete-js>-->
    <!--表情库-->
    <!--  <romete-js src="https://cdn.ronghub.com/RongEmoji-2.2.6.min.js" @scriptLoad="initEmoji"></romete-js>-->
  </div>
</template>

<script>
  import LoadScript from 'vue-plugin-load-script'
  import lrz from 'lrz'  //图片压缩
  import mHeader from "components/m-header"
  import {chatWith} from 'api'

  export default {
    data() {
      return {
        imgSrc: '~images/chatWith/more.png',
        isDisplay: true,
        messageValue: '',
        needSend: false,
        token: '',
        isChangeValue: true,
        chatArr: [],
        picUrl: '',
        EmojiList: [],
        isShowMore: false,
        uploadState: '',
        RongIMEmoji: '',
        src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
        shadowDomList: [],
        base64: '',
        size: '',
        name: '',
        file: '',
        config: {
          size: 24, // 大小, 默认 24, 建议15 - 55
          url: '//f2e.cn.ronghub.com/sdk/emoji-48.png', // 所有 emoji 的背景图片
          lang: 'zh', // 选择的语言, 默认 zh
        },
      }
    },
    props: {
      detail: {
        type: String,
        default: ''
      }
    },

    watch: {
      messageValue(newParm, oldParm) {
        if (newParm) {
          this.needSend = true
        } else {
          this.needSend = false
        }
      },
      uploadState(newParm, oldParm) {
        if (newParm) {
          this.sendPic()
        }
      }
    },
    created() {
      this.$loadScript('https://cdn.ronghub.com/RongIMLib-2.3.0.js')
        .then(() => {
          this.callBack()
        })
      this.$loadScript('https://cdn.ronghub.com/RongEmoji-2.2.6.min.js')
        .then(() => {
          this.initEmoji()
        })
    },
    methods: {
      showDisplay() {
        this.isDisplay = !this.isDisplay;
      },
      toFixed2(num) {
        return parseFloat(+num.toFixed(2));
      },
      upload(e) {
        this.uploadState = false;
        let reader = new FileReader();
        let file = e.target.files[0] || e.dataTransfer.files[0];
        //处理成功会执行
        const RamdomValue = Math.random();
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.base64 = reader.result
          this.base64 = this.base64.replace(/^data:.*?;base64,/, '')
        }

        this.uploadState = '';
        let formData = new FormData();
        formData.set('file', file, `${RamdomValue}.png`)
        formData.append('nodeId', process.env.NODE_ID)
        chatWith.uploadFile(formData).then(res => {
          if (res.code == 10000) {
            this.picUrl = res.data.url;
            this.uploadState = true
          } else {
            this.uploadState = false
          }
        }).catch(res => {

        })

          .catch((err) => {
            console.log(err)
          })
      },
      callBack() {
        /*初始化*/
        RongIMLib.RongIMClient.init('x18ywvq85ahuc', null, {navi: 'http://dc-jiuan-im-nav-pro.com'}) //eslint-disable-line
        /*获取token*/
        this.getToken()
      },
      initEmoji() {
        RongIMLib.RongIMEmoji.init(this.config);
        this.RongIMEmoji = RongIMLib.RongIMEmoji;
      },
      getToken() {
        let params = {
          userId: this.$store.state.userData.userId,
          nickName: this.$store.state.userData.nickname
        }
        chatWith.getToken(params).then(res => {
          this.token = res.data.token;
          this.connect();
          this.setConnectStatusListener();
          this.setOnReceiveMessageListener()
        })
      },
      setConnectStatusListener() {
        RongIMClient.setConnectionStatusListener({  //eslint-disable-line
          onChanged: function (status) {
            let info = null
            switch (status) {
              case RongIMLib.ConnectionStatus.CONNECTED:  //eslint-disable-line
                info = '链接成功'
                alert(info)
                break
              case RongIMLib.ConnectionStatus.CONNECTING:  //eslint-disable-line
                info = '正在链接'
                alert(info)
                break
              case RongIMLib.ConnectionStatus.DISCONNECTED:  //eslint-disable-line
                info = '断开连接'
                alert(info)
                break
              case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:  //eslint-disable-line
                info = '其他设备登录'
                alert(info)
                break
              case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:  //eslint-disable-line
                info = '域名不正确'
                alert(info)
                break
              case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:  //eslint-disable-line
                info = '网络不可用'
                alert(info)
                break
            }
          }
        })
      },
      connect() {
        RongIMClient.connect(this.token, {
          onSuccess: function () {
            console.log('连接成功')
          },
          OnTokenIncorrect: function () {
            console.log('token无效')
          },
          OnError: function (error) {
            console.log(error)
          }
        })
      },
      setOnReceiveMessageListener() {
        RongIMClient.setOnReceiveMessageListener({  //eslint-disable-line
          onReceived: (message) => {
            /*区分*/

            switch (message.messageType) {
              case RongIMClient.MessageType.TextMessage: //eslint-disable-line
                // message.content.content => 消息内容
                this.chatArr.push({msg:message.content.content,user:2})
                break
              case RongIMClient.MessageType.VoiceMessage: //eslint-disable-line
                // 对声音进行预加载
                // message.content.content 格式为 AMR 格式的 base64 码
                break
              case RongIMClient.MessageType.ImageMessage: //eslint-disable-line
                // message.content.content => 图片缩略图 base64。
                // message.content.imageUri => 原图 URL。
                this.chatArr.push({msg: message.content.imageUri, user: 4})
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
      getDom(html) {
        var span = document.createElement("span");
        span.innerHTML = html;
        return span.childNodes[0];
      },
      sendEmoji() {
        var panel = document.getElementsByClassName('emoji_area')[0];
        this.isChangeValue = !this.isChangeValue;
        this.isShowMore = false;
        if (!this.isChangeValue) {
          panel.style.display = 'block';
          for (let i = 0; i < this.RongIMEmoji.list.length; i++) {
            var value = this.RongIMEmoji.list[i].emoji;
            /*避免多次创建*/
            if (!panel.hasChildNodes()) {
              this.shadowDomList.push(this.getDom('<span>' + value + '</span>'));
            }
          }
          var emojis = this.shadowDomList;
          for (let i = 0; i < emojis.length; i++) {
            const emojiHtml = emojis[i];
            panel.appendChild(emojiHtml);
            emojiHtml.onclick = this.clickEmoji
          }
        } else {
          document.getElementsByClassName('emoji_area')[0].style.display = 'none'
        }
      },
      clickEmoji(event) {
        var e = event || window.event;
        var targer = e.target || e.srcElement;
        if (document.all && !document.addEventListener === false) {
          console.log(target);
        }
        var chatbox = document.getElementById('inputMessage');
        this.messageValue = chatbox.value + targer.innerHTML;
      },
      showMoreFunction() {
        this.isShowMore = !this.isShowMore
        document.getElementsByClassName('emoji_area')[0].style.display = 'none'
      },
      sendMessage() {
        var div = document.getElementsByClassName('wrapper_box')[0];
        div.scrollTop = div.scrollHeight;
        let conversationtype = RongIMLib.ConversationType.GROUP;
        let targetId = this.detail;
        //改变发送messageValue的值因为用户会发送表情
        this.messageValue = this.RongIMEmoji.symbolToHTML(this.messageValue);
        let msg = new RongIMLib.TextMessage({content: this.messageValue, extra: "附加信息"});
        RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
            onSuccess: (message) => {
              //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
              this.chatArr.push({msg: this.messageValue, user: 1})
              this.messageValue = ''
              console.log("Send successfully");
            },
            onError: function (errorCode, message) {
              var info = '';
              switch (errorCode) {
                case RongIMLib.ErrorCode.TIMEOUT:
                  info = '超时';
                  break;
                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                  info = '未知错误';
                  break;
                case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                  info = '在黑名单中，无法向对方发送消息';
                  break;
                case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                  info = '不在讨论组中';
                  break;
                case RongIMLib.ErrorCode.NOT_IN_GROUP:
                  info = '不在群组中';
                  break;
                case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                  info = '不在聊天室中';
                  break;
                default :
                  info = x;
                  break;
              }
              console.log('发送失败:' + info);
            }
          }
        );
      },
      sendPic() {
        let conversationtype = RongIMLib.ConversationType.GROUP;
        let targetId = this.detail;
        console.log(this.base64)
        let msg = new RongIMLib.ImageMessage({content: this.base64, imageUri: this.picUrl})
        RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
          onSuccess: ((message) => {
            console.log(message, '速度阿迪斯')
            this.chatArr.push({msg: message.content.imageUri, user: 3})
          }),
          onError: ((error) => {
            console.log(error)

          })

        })
      }
    },
    components: {
      mHeader,
      LoadScript

    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .fr {
    float: right;
  }

  .wrapper_box {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .order_info {
    width: 100%;
    background-color: #fff;

    .order_state {
      padding: r(24) r(10);
      border-bottom: 1px solid #D8D8D8;
      .state_b {
        overflow: hidden;
        .state_d {
          display: inline-block;
          width: r(33);
          height: r(16);
          background-color: #4982FF;
          color: #fff;
          border-radius: r(2);
          font-size: r(12);
          padding: 2px;
          line-height: r(14);
          margin: 0 auto;
          text-align: center;
        }
        .order_num {
          padding-left: r(8);
          font-size: r(15);
          color: #333333;
          line-height: 15px;
        }
        .order_d {
          font-size: 15px;
          color: #4982FF;
          letter-spacing: 0;
          line-height: 15px;
          float: right;
        }
      }
      .order_c {
        padding-top: r(12);
        font-size: 15px;
        color: #787876;
        letter-spacing: 0;
        line-height: 15px;
      }
    }
  }

  .line {
    height: 44px;
    padding: 0 r(10);
    border-bottom: 1px solid #D8D8D8;
    line-height: 44px;
    font-size: r(15);
    color: #333333;
    overflow: hidden;
  }

  .lineColor {
    font-size: 15px;
    color: #8F8F8F;
    letter-spacing: 0;

  }

  .display {
    background-color: #f5f5f5;
  }

  .display img {
    display: block;
    width: 70px;
    height: 20px;
    margin: 0 auto;
  }

  .hiddenbox {
    background-color: #F5F5F5;
  }

  .hiddenbox img {
    display: block;
    width: 70px;
    height: 20px;
    margin: 0 auto;
  }

  .countdown {
    margin-top: r(10);
    font-size: r(15);
    color: #F43531;
    letter-spacing: 0;
    line-height: r(44);
    height: r(44);
    width: 100%;
    text-align: center;
    background-color: #fff;
  }

  .chatbox {
    width: 100%;
    overflow: auto;
    margin-bottom: 2.5rem;
    .chat_container {
      display: flex;
      flex-direction: row;
      margin-top: r(10);
    }
    .contents {
      width: r(248);
      background-color: #84D55A;
      color: #000000;
      border-radius: r(5.8);
      position: relative;
      word-break: break-all;
      padding: r(5);
      &::after {
        display: block;
        content: '';
        position: absolute;
        right: r(-20);
        top: r(8);
        border-width: r(14);
        border-style: solid;
        border-color: transparent transparent transparent #84d55a;
      }
    }
    .user_symbol {
      width: r(45);
      height: r(48);
      background: url('~images/chatWith/my.png') no-repeat;
      background-size: 100%;
      margin-left: 1rem;
    }
  }

  .input_chatbox {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid #e0e0e2;
    background-color: #f4f4f6;
    .chatboxNext {
      background-color: #F5F5F5;
      display: flex;
      flex-direction: row;

    }
    .more {
      width: r(33);
      height: r(35);
      margin: r(10) r(5) r(8);
    }
    .smile {
      width: r(33);
      height: r(35);
      margin: r(10) r(5) r(8);
    }
  }

  .input_message {
    width: r(312);
    height: r(42);
    border-radius: r(6);
    margin: r(8) r(10);
    background-color: #fdfdfe;
    border: 1px solid #b4b6be;
    flex: 1;
    text-indent: r(5);
  }

  .sendMessage {
    width: r(43);
    height: r(33);
    margin: r(12) r(5);
    background-color: #4982FF;
    border-radius: r(4);
    color: #fff;
  }

  .photo_area {
    width: 100%;
    height: r(132);
    position: relative;
    display: flex;
    flex-direction: row;
    text-align: center;
    .take_box {
      padding: r(10);
    }
    img {
      width: r(70);
      height: r(70);
    }
    span {
      font-size: r(15);
      color: #888;
    }
  }

  .demo1 {
    background: url("~images/chatWith/more.png") no-repeat;
    background-size: 100%;
  }

  .demo2 {
    background: url("~images/chatWith/input.png") no-repeat;
    background-size: 100%;
  }

  .emoji {
    background: url("~images/chatWith/smile.png") no-repeat;
    background-size: 100%;
  }

  .input {
    background: url("~images/chatWith/input.png") no-repeat;
    background-size: 100%;
  }

  .sendPic {
    display: inline-block;
    position: absolute;
    top: 0;
    left: r(10);
    z-index: 10;
    opacity: 1;
  }

  .openCamera {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: r(70);
    height: r(70);
    z-index: 10;
    opacity: 0;
  }

  .contents_image {
    max-width: r(190);
  }
</style>
