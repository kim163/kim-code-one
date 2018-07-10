<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="!$route.meta.noCache"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="$route.meta.noCache"></router-view>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters,mapMutations} from 'vuex'
  import Stomp from 'webstomp-client'
  import { aesutil } from '@/util';
  import {$alert} from "./base/msgbox/msgbox";
  import {chatWith} from 'api'

  export default {
    data(){
      return {
        transitionName:"slide",
        mobileDevice:"0",
        client: null,
        connectMsg: [],
        connectUrl: '',
        connectUser: '',
        connectPsw: '',
        detailNormal: '',
        detailOver: '',
        detailAppeal: ''
      }
    },
    computed:{
      ...mapGetters(["userData", "userId", "islogin"]),
      isExclude(){
        return this.$route.meta.cache ? "" : this.$route.name;
      }
    },
    created() {
      this.$store.dispatch("UPDATE_USERDATA");
      this.dwMobilePage();
/*      this.$loadScript('https://cdn.ronghub.com/RongIMLib-2.3.0.js')
        .then(()=>{
          this.callBack()
        })
     this.$loadScript('https://cdn.ronghub.com/RongEmoji-2.2.6.min.js')
        .then(() => {
          this.initEmoji()
        })*/
    },
    methods: {
      dwMobilePage(){
        if(this.$route.meta.isMobilePage){
          this.mobileDevice = '1';
          let element = document.getElementsByTagName('body')[0];
          let classN = this.$route.meta.isMobilePage;
          if((' ' + element.className + ' ').indexOf(' ' + classN + ' ') < 0){
            element.className = classN;
          }
        }
      },
      initWsData(){
        console.log('this.userData===================')
        console.log(this.userData.configVos)
        _.forEach(this.userData.configVos, (value, key) => {
          if(value.type == 1002){
            this.connectMsg = value.value.split(',');
            this.connectUrl= this.connectMsg[0];
            this.connectUser= this.connectMsg[1];
            this.connectPsw= this.connectMsg[2];
          }
        });
        // this.detailNormal='/orderDetail/';
        // this.detailOver='/orderDetailOver/';
        // this.detailAppeal='/orderDetailAppeal/';
        // if(_.isMobile()){
          this.detailNormal='/m/order/';
          this.detailOver='/m/orderOver/';
          this.detailAppeal='/m/orderAppeal/';
        //}
      },
      stompSuccessCallback(frame) {
        console.log('STOMP: Connection successful')
        this.client.subscribe('/exchange/walletCustomOperation/'+this.userId, (data) => {
          let msgData=JSON.parse(aesutil.decrypt(data.body));
          console.log('msgData.type：'+msgData.type)
          if(msgData.type == 5){
            // C2C_ORDER_ONLINE(5, "C2C订单发起人在线检测"),
            msgData.text= this.userId;
            this.client.send('/exchange/walletCustomOnline/-0', {priority: 9}, aesutil.encrypt(JSON.stringify(msgData)))
          }else if(msgData.type == 1 || msgData.type == 2){
            // C2C_ORDER_PLACE(1, "C2C下单"),
            //  C2C_ORDER_PAY(2, "C2C订单支付完成"),
            toast(msgData.describe)
            window.location.href= this.detailNormal + msgData.text;
            //console.log('状态1： 进入下单详情，订单的id是'+msgData.text);
          }else if(msgData.type == 3){
            //  C2C_ORDER_CANCEL(3, "C2C订单取消"),
            toast(msgData.describe)
            window.location.href= this.detailOver +msgData.text;
          }else if(msgData.type == 4 ){
            //   C2C_ORDER_COMPLETE(4, "C2C订单完成"),
            toast(msgData.describe)
            window.location.href= this.detailOver +msgData.text;
          }else if(msgData.type == 11){
            //  C2C_ORDER_APPEAL(11, "C2C申诉");
            toast(msgData.describe)
            window.location.href=this.detailAppeal + msgData.text;
            //console.log(msgData);
          }else{
            toast(msgData.describe)
            //console.log(msgData);
          }
        })
      },
      stompFailureCallback(error) {
        console.log('STOMP: ' , error)
        if (this.client && this.client.ws.readyState === this.client.ws.CONNECTING) {
          return
        }
        if (this.client.ws.readyState === this.client.ws.OPEN) {
          return
        }
        setTimeout(() => {
          this.stompConnect()
        }, 10000)
        console.log('STOMP: Reconecting in 10 seconds')
      },
      stompConnect () {
        console.log('STOMP: Attempting connection')
        if(this.connectUrl != ''){
          let ws = new WebSocket(this.connectUrl);
          this.client = Stomp.over(ws,{debug:process.env.NODE_ENV != 'production'});
          this.client.heartbeat.outgoing = 30000;
          this.client.heartbeat.incoming = 30000;
          this.client.connect(this.connectUser, this.connectPsw, this.stompSuccessCallback, this.stompFailureCallback);
        }
      },
   /*   callBack(){
        /!*初始化*!/
        RongIMLib.RongIMClient.init('x18ywvq85ahuc', null, {navi: 'http://dc-jiuan-im-nav-pro.com'}) //eslint-disable-line
        /!*获取token*!/
        this.getToken()
      },*/
      getToken(){
        let params = {
          userId: this.userId,
          nickName: this.userData.nickname
        }
        chatWith.getToken(params).then(res => {
          this.token = res.data.token;
          if(!this.connectState){
            console.log('hello+everyone')
            this.connect();
          }
          this.setConnectStatusListener();
          this.setOnReceiveMessageListener();

        })
      },
      connect() {
        RongIMClient.connect(this.token, {
          onSuccess: ()=> {
            //   this.$store.commit('CHANGE_CONNECTSTATE',true)
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
        this.RongIMEmoji = RongIMLib.RongIMEmoji;
        console.log(RongIMLib.RongIMEmoji,'是快乐到家阿斯顿')
        this.$store.state.RongIMEmoji = this.RongIMEmoji;
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
        console.log('C')
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
    },

    watch:{
      "$route"(to,from){
        this.dwMobilePage();
//        document.title=to.meta.title||to.meta.headName||"久安钱包";
      },
      islogin(val) {
        if (val) {
          this.initWsData();
          this.stompConnect();
        }
      }
    },
    components:{

    },
    mounted() {
      if (this.islogin) {
        this.initWsData();
        this.stompConnect();
      }

    }
  }
</script>
