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
  import {$alert} from "./base/msgbox/msgbox";

  export default {
    data(){
      return {
        transitionName:"slide",
        mobileDevice:"0",
      }
    },
    computed:{
      ...mapGetters(["userData"]),
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
          this.mobileDevice = '1';
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
      let connectMsg = [];
      let connectUrl='' ;
      let connectUser= '';
      let connectPsw= '';

        console.log('this.userData===================')
        console.log(this.userData.configVos)
        _.forEach(this.userData.configVos, function(value, key) {
          if(value.type == 1002){
            connectMsg = value.value.split(',');
             connectUrl= connectMsg[0];
             connectUser= connectMsg[1];
             connectPsw= connectMsg[2];
          }
        });
      let detailNormal='/orderDetail/';
      let detailOver='/orderDetailOver/';
      let detailAppeal='/orderDetailAppeal/';
      if(_.isMobile()){
         detailNormal='/m/order/';
         detailOver='/m/orderOver/';
         detailAppeal='/m/orderAppeal/';
      }
      const merchantOrderid = this.$route.query.merchantOrderid || ''
      console.log('userId===',this.userId)
      let stompSuccessCallback = (frame) => {
        console.log('STOMP: Connection successful')
        client.subscribe('/exchange/walletCustomOperation/'+userId, function (data) {
//          console.log('接收 message：')
//          console.log(JSON.parse(aesutil.decrypt(data.body)));
          let msgData=JSON.parse(aesutil.decrypt(data.body));
          console.log('msgData.type：'+msgData.type)
          if(msgData.type == 5){
            // C2C_ORDER_ONLINE(5, "C2C订单发起人在线检测"),
            msgData.text=userId;
            client.send('/exchange/walletCustomOnline/-0', {priority: 9}, aesutil.encrypt(JSON.stringify(msgData)))
          }else if(msgData.type == 1 || msgData.type == 2){
            // C2C_ORDER_PLACE(1, "C2C下单"),
            //  C2C_ORDER_PAY(2, "C2C订单支付完成"),
            toast(msgData.describe)
            window.location.href= detailNormal + msgData.text;
            //console.log('状态1： 进入下单详情，订单的id是'+msgData.text);
          }else if(msgData.type == 3){
            //  C2C_ORDER_CANCEL(3, "C2C订单取消"),
            toast(msgData.describe)
            window.location.href= detailOver +msgData.text;
          }else if(msgData.type == 4 ){
            //   C2C_ORDER_COMPLETE(4, "C2C订单完成"),
            toast(msgData.describe)
            window.location.href= detailOver +msgData.text;
          }else if(msgData.type == 11){
            //  C2C_ORDER_APPEAL(11, "C2C申诉");
            toast(msgData.describe)
            window.location.href=detailAppeal + msgData.text;
            //console.log(msgData);
          }else{
            toast(msgData.describe)
            //console.log(msgData);
          }
        })
        if(merchantOrderid && merchantOrderid != ''){
          client.subscribe('/exchange/walletCustomOperation/'+merchantOrderid, function (data) {
            let msgData=JSON.parse(aesutil.decrypt(data.body));
            debugger
            if(msgData.type == 21){  //收银台 支付中  用于二维码显示
              Vue.$global.bus.$emit('update:paying');
            }else if(msgData.type == 22){  //收银台 支付完成
              Vue.$global.bus.$emit('update:paySuccess');
            }
          })
        }
        // Vue.$global.bus.$on('merchantOrderid',(id) => {
        //   debugger
        //   client.subscribe('/exchange/walletCustomOperation/'+id, function (data) {
        //     let msgData=JSON.parse(aesutil.decrypt(data.body));
        //     if(msgData.type == 21){  //收银台 支付中  用于二维码显示
        //       Vue.$global.bus.$emit('update:paying');
        //     }else if(msgData.type == 22){  //收银台 支付完成
        //       Vue.$global.bus.$emit('update:paySuccess');
        //     }
        //   })
        // })
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
        let ws = new WebSocket(connectUrl);
        client = Stomp.over(ws);
        client.heartbeat.outgoing = 30000;
        client.heartbeat.incoming = 30000;
        client.connect(connectUser, connectPsw, stompSuccessCallback, stompFailureCallback)
      }
      stompConnect()

    }
  }
</script>
