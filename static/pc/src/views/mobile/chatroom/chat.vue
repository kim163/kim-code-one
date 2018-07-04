<template>
  <div class=" wrapper_box  box box-ver">
    <m-header>会话详情</m-header>
    <!--付款倒计时-->
    <!--聊天框-->
    <div class="chatbox box-f1 box box-ver" :class="{'displayState':!isDisplay,'hiddenState':isDisplay}"
         id="chatMessage">
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
              <span class="fr lineColor">{{sellName}}</span>
            </div>
            <div class="line">
              <span>交易金额:</span>
              <span class="fr lineColor">{{debitNum}} CNY</span>
            </div>
            <div class="line">
              <span>交易数量:</span>
              <span class="fr lineColor">{{debitMoney}} UET</span>
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
      <p class="countdown">
        等待付款倒计时: 09: 09
      </p>
      <b-scroll
        ref="scroll"
        :autoUpdate="true"

      >

        <div v-for="list in chatArr" class="msg-item">
          <!--发送消息-->
          <div v-if="list.user==1" class="chat_container">
            <div class="" style="flex: 1"></div>
            <div class="contents">{{list.msg}}</div>
            <div class="user_symbol"></div>
          </div>
          <!--发送图片消息-->
          <div v-if="list.user==3" class="chat_container">
            <div class="" style="flex: 1"></div>
            <div class="contents">
              <viewer :images="list.img">
                <img :src="list.msg" alt="" class="contents_image">
              </viewer>
            </div>
            <div class="user_symbol"></div>
          </div>
          <!--接收文字消息-->
          <div v-if="list.user==2" class="chat_container">
            <div class="user_symbol_next" :class="{'isSeller':isSeller}"></div>
            <div class="contents_next">{{list.msg}}</div>
            <div class="" style="flex: 1"></div>
          </div>
          <!--接收图片消息-->
          <div v-if="list.user==4" class="chat_container">
            <div class="user_symbol_next" :class="{'isSeller':isSeller}"></div>
            <div class="contents_next">
              <viewer :images="list.img">
                <img :src="list.msg" alt="" class="contents_image">
              </viewer>
            </div>
            <div class="" style="flex: 1"></div>
          </div>
        </div>
      </b-scroll>
    </div>

    <!--输入框-->
    <div class="input_chatbox ">
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

          <div class="hhha"></div>
          <img src="" alt="" id="demoImg">

        </div>


      </div>
      <!--表情-->
      <div class="emoji_area">

      </div>
    </div>

  </div>
</template>

<script>

  import BScroll from 'vue-slim-better-scroll';
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
        croppa: {},
        dataUrl: {},
        isChangeValue: true,
        chatArr: [],
        picUrl: '',
        EmojiList: [],
        isShowMore: false,
        uploadState: '',
        RongIMEmoji: '',
        dataURL: '',
        src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
        shadowDomList: [],
        base64: '',
        size: '',
        name: '',
        file: '',
        demoArr:[],
        dataURLNext: '',
        demoTest:'',
        isSeller: '',
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
      },
      debitNum: {
        type: Number,
        default: 0
      },
      debitMoney: {
        type: Number,
        default: 0
      },
      sellName: {
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
      },

    },
    created() {
      this.$loadScript('https://cdn.ronghub.com/RongIMLib-2.3.0.js')
        .then(() => {
          this.callBack()

        })
      /*确定好卖买放关系*/
      if (this.sellName === this.$store.state.userData.nickname) {
        /*卖方*/
        this.isSeller = true
      } else {
        /*买方*/
        this.isSeller = false
      }
      /*加载bettorScroll*/
    },
    mounted(){
      this.scroll = this.$refs.scroll;
    },

    methods: {
      scrollToBot() {
        this.$nextTick(() => {
          this.scroll.refresh()
          if (this.chatArr.length == 0) {
             this.chatArr.length == 1

          }
          console.log(document.querySelector('.msg-item')[0])
          this.scroll.scrollToElement(document.querySelector('.msg-item')[this.chatArr.length>=1?this.chatArr.length-1:0])
          const imgArr = document.getElementsByClassName('msg-item')
          const len = imgArr.length

          for (let i = 0; i < len; i++) {
            imgArr[i].onload = () => {
              this.scroll.refresh()
              this.scroll.scrollToElement(document.querySelectorAll('.msg-item')[this.chatArr.length - 1])
              //  clearTimeout(this.imgScrollTimer)
            }
          }
        })
      },
      showDisplay() {
        this.isDisplay = !this.isDisplay;
      },
      upload(e) {
        let reader = new FileReader();
        var file = e.target.files[0];

        console.log(this.demoTest,'速度')
        //区分2个地方 一个是给后台发 一个是给融云发
        if (file.type.indexOf('image') == 0) {
          reader.readAsDataURL(file)
          reader.onload = () => {
            var img = new Image()
            var canvas = document.createElement('canvas');
            var canvasNext = document.createElement('canvas');
            var context = canvas.getContext('2d');
            var ctx = canvas.getContext('2d');
            img.src = reader.result
            this.base64 = reader.result;
            /*如果图片的base64大于100kb 那么久压缩*/

            img.onload = () => {
              var originWidth = img.width;
              var originHeight = img.height;
              // 最大尺寸限制
              if (this.base64.length > 100000) {
                canvasNext.width = 60;
                canvasNext.height = 60;
                ctx.clearRect(0, 0, 60, 60)
                ctx.drawImage(img, 0, 0, 60, 60)
                this.dataURLNext = canvasNext.toDataURL('image/png');
                console.log(this.dataURLNext, '四度空间撒旦')
                this.base64 = this.dataURLNext.replace(/^data:.*?;base64,/, '')
              } else {
                this.base64 = this.base64.replace(/^data:.*?;base64,/, '')
              }
              var maxWidth = 400,
                maxHeight = 400;
              // 目标尺寸
              var targetWidth = originWidth,
                targetHeight = originHeight;
              if (originWidth > maxWidth || originHeight > maxHeight) {
                if (originWidth / originHeight > maxWidth / maxHeight) {
                  // 更宽，按照宽度限定尺寸
                  targetWidth = maxWidth;
                  targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                } else {
                  targetHeight = maxHeight;
                  targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                }
              }
              canvas.width = targetWidth;
              canvas.height = targetHeight;
              // 清除画布
              context.clearRect(0, 0, targetWidth, targetHeight);
              // 图片压缩
              context.drawImage(img, 0, 0, targetWidth, targetHeight);
              // canvas转为blob并上传
              this.dataURL = canvas.toDataURL('image/png');
              console.log(this.demoTest,'撒旦')

              this.demoTest.src = this.dataURL;
             // this.chatArr.push({msg: message.content.imageUri, user: 4, img: [message.content.imageUri]})
              /*this.demoArr.push({img:[this.dataURL]});*/
              var blob = this.dataURItoBlob(this.dataURL);
              const RamdomValue = Math.random();
              var fd = new FormData();
              this.uploadState = '';
              fd.append("file", blob, `${RamdomValue}.png`);
              fd.append('nodeId', process.env.NODE_ID)
              chatWith.uploadFile(fd).then(res => {
                if (res.code == 10000) {
                  this.picUrl = res.data.url;
                  this.uploadState = true;
                  this.demoArr.push({img:[this.picUrl]});
                } else {
                  this.uploadState = false
                }
              }).catch(res => {

              })

            }
            //  fr.readAsDataURL(input.files[0]);
          }
        }
      },
      dataURItoBlob(base64Data) {
        var byteString;
        if (base64Data.split(',')[0].indexOf('base64') >= 0) {
          byteString = atob(base64Data.split(',')[1]);
        } else {
          byteString = unescape(base64Data.split(',')[1]);
        }
        var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], {type: mimeString});
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
          this.setOnReceiveMessageListener();
          this.$loadScript('https://cdn.ronghub.com/RongEmoji-2.2.6.min.js')
            .then(() => {
              this.initEmoji()
            })
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
                /*接收使用symbolToEmoji方法*/
                this.chatArr.push({msg: this.RongIMEmoji.symbolToEmoji(message.content.content), user: 2})
                break
              case RongIMClient.MessageType.VoiceMessage: //eslint-disable-line
                // 对声音进行预加载
                // message.content.content 格式为 AMR 格式的 base64 码
                break
              case RongIMClient.MessageType.ImageMessage: //eslint-disable-line
                // message.content.content => 图片缩略图 base64。
                // message.content.imageUri => 原图 URL。
                this.chatArr.push({msg: message.content.imageUri, user: 4, img: [message.content.imageUri]})
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
       // this.scrollToBot()
      },
      sendMessage() {
       // var div = document.getElementsByClassName('wrapper_box')[0];
     //   div.scrollTop = div.scrollHeight;

      //  this.scroll.scrollToElement(document.querySelector('.msg-item')[this.chatArr.length>=1?this.chatArr.length-1:0])
       // console.log('aaa')
        let conversationtype = RongIMLib.ConversationType.GROUP;
        let targetId = this.detail;
        //改变发送messageValue的值因为用户会发送表情
        this.messageValue = this.RongIMEmoji.symbolToEmoji(this.messageValue);
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
        console.log(this.base64.length, 'bse64长度')
        console.log(this.picUrl, '速度')
        let msg = new RongIMLib.ImageMessage({content: this.base64, imageUri: this.picUrl})
        RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
          onSuccess: ((message) => {
            console.log(message.content.imageUri, '四大皆空')
            this.chatArr.push({msg: message.content.imageUri, user: 3, img: [message.content.imageUri]})
          }),
          onError: ((error) => {
            console.log(error)

          })

        })
      }
    },
    components: {
      mHeader,
      BScroll
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .box {
    display: flex;
  }

  .box-f1 {
    flex: 1;
  }

  .box-ver {
    flex-direction: column;
  }

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
    margin-bottom: .5rem;
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
    .contents_next {
      width: r(248);
      background-color: #fff;
      color: #000000;
      border-radius: r(5.8);
      position: relative;
      word-break: break-all;
      padding: r(5);
      text-indent: r(10);
      &::after {
        display: block;
        content: '';
        position: absolute;
        left: r(-20);
        top: r(8);
        border-width: r(14);
        border-style: solid;
        border-color: transparent #fff transparent transparent;
      }
    }
    .user_symbol {
      width: r(45);
      height: r(48);
      background: url('~images/chatWith/my.png') no-repeat;
      background-size: 100%;
      margin-left: 1rem;
    }
    .user_symbol_next {
      width: r(45);
      height: r(48);
      background: url('~images/chatWith/seller.png') no-repeat;
      background-size: 100%;
      margin-right: 1rem;
      &.isSeller {
        width: r(45);
        height: r(48);
        background: url('~images/chatWith/buyer.png') no-repeat;
        background-size: 100%;
        margin-right: 1rem;
      }
    }
  }

  .input_chatbox {
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
    font-size: r(15);
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
