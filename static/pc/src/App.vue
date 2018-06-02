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
  import {mapGetters} from 'vuex'
  import Stomp from 'webstomp-client'
  import { aesutil } from '@/util';

  export default {
    data(){
      return {
        transitionName:"slide",
      }
    },
    computed:{
      ...mapGetters([
        'userId'
      ]),
      isExclude(){
        return this.$route.meta.cache ? "" : this.$route.name;
      }
    },
    created() {
      this.$store.dispatch("UPDATE_USERDATA");
      this.dwMobilePage();
    },
    methods: {
      dwMobilePage(){
        if(this.$route.meta.isMobilePage){
          let element = document.getElementsByTagName('body')[0];
          let classN = this.$route.meta.isMobilePage;
          if((' ' + element.className + ' ').indexOf(' ' + classN + ' ') < 0){
            element.className = classN;
          }
        }
      }
    },
    watch:{
      "$route"(to,from){
        this.dwMobilePage();
//        document.title=to.meta.title||to.meta.headName||"久安钱包";
      }
    },
    components:{

    },
    mounted() {

      let client = null
      let userId=this.userId;
      console.log('userId===')
      console.log(this.userId)
      let stompSuccessCallback = function (frame) {
        console.log('STOMP: Connection successful')
        client.subscribe('/exchange/walletCustomOperation/'+userId, function (data) {
          console.log('接收 message：')
          console.log(JSON.parse(aesutil.decrypt(data.body)));
          let msgData=JSON.parse(aesutil.decrypt(data.body));
          console.log('msgData.type：'+msgData.type)
          //根据类型显示不同的页面
//    C2C_ORDER_PLACE(1, "C2C下单"),
//      C2C_ORDER_PAY(2, "C2C订单支付完成"),
//      C2C_ORDER_CANCEL(3, "C2C订单取消"),
//      C2C_ORDER_COMPLETE(4, "C2C订单完成"),
//      C2C_ORDER_ONLINE(5, "C2C订单发起人在线检测"),
//      C2C_ORDER_APPEAL(11, "C2C申诉");  申诉详情
          if(msgData.type == 5){
            msgData.text=userId;
            console.log(msgData.text);
            client.send('/exchange/walletCustomOnline/-0', {priority: 9}, aesutil.encrypt(JSON.stringify(msgData)))
          }else if(msgData.type == 1 || msgData.type == 2){
            window.location.href='/orderDetail/'+msgData.text;
            console.log('状态1： 进入下单详情，订单的id是'+msgData.text);
          }else if(msgData.type == 3 || msgData.type == 4 ){
            window.location.href='/orderDetailOver/'+msgData.text;
            console.log(msgData);
          }else if(msgData.type == 11){
            window.location.href='/orderDetailAppeal/'+msgData.text;
            console.log(msgData);
          }else{
            console.log(msgData);
          }
        })
      }

      var stompFailureCallback = function (error) {
        console.log('STOMP: ' , error)
        if (client && client.ws.readyState === client.ws.CONNECTING) {
          return
        }
        if (client.ws.readyState === client.ws.OPEN) {
          return
        }
        setTimeout(stompConnect, 10000)
        console.log('STOMP: Reconecting in 10 seconds')
      }
      function stompConnect () {
        console.log('STOMP: Attempting connection')
        let ws = new WebSocket('ws://210.213.158.53:15674/ws')
        client = Stomp.over(ws)
        client.heartbeat.outgoing = 30000
        client.heartbeat.incoming = 30000
        client.connect('guest', 'guest', stompSuccessCallback, stompFailureCallback)
      }
      stompConnect()

    }
  }
</script>
