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
        client: null,
        connectMsg: [],
        connectUrl: '',
        connectUser: '',
        connectPsw: '',
        detailNormal: '',
        detailOver: '',
        detailAppeal: '',

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
        this.detailNormal='/orderDetail/';
        this.detailOver='/orderDetailOver/';
        this.detailAppeal='/orderDetailAppeal/';
        if(_.isMobile()){
          this.detailNormal='/m/order/';
          this.detailOver='/m/orderOver/';
          this.detailAppeal='/m/orderAppeal/';
        }
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
        setTimeout(stompConnect, 10000)
        console.log('STOMP: Reconecting in 10 seconds')
      },
      stompConnect () {
        console.log('STOMP: Attempting connection')
        let ws = new WebSocket(this.connectUrl);
        this.client = Stomp.over(ws);
        this.client.heartbeat.outgoing = 30000;
        this.client.heartbeat.incoming = 30000;
        this.client.connect(this.connectUser, this.connectPsw, this.stompSuccessCallback, this.stompFailureCallback);
      }

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
