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
    <sys-bullentin v-if="islogin"></sys-bullentin>
    <!--<v-login v-if="showLogin && !isMobile" v-model="showLogin"></v-login>-->
    <login-dialog v-if="showLogin && !isMobile"></login-dialog>
    <v-register v-if="showRegister && !isMobile" v-model="showRegister"></v-register>
    <setAccountPassword v-if="userData.initPwd == 'Y' && isMobile" @closePage="closesetPage"></setAccountPassword>

    <red-envelope v-if="islogin"></red-envelope>
    <find-pwd-dialog v-if="showFindPwd"></find-pwd-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import Stomp from 'webstomp-client';
  import {aesutil} from '@/util';
  import {$localStorage} from '@/util/storage';
  import SysBullentin from 'views/sys-bullentin';
  import setAccountPassword from 'views/mobile/user-center/set-account-password'
  import vLogin from "components/auth/login";
  import vRegister from "components/auth/register";
  import LoginDialog from 'components/auth/login/customize-login'
  import RedEnvelope from 'views/red-envelope';
  import FindPwdDialog from 'components/password/find-pwd'
  export default {
    data() {
      return {
        transitionName: "slide",
        client: null,
        connectMsg: [],
        connectUrl: '',
        connectUser: '',
        connectPsw: '',
        detailNormal: '',
        detailOver: '',
        detailAppeal: '',
        isMobile: _.isMobile(),
      }
    },
    computed: {
      ...mapGetters([
        "userData",
        "userId",
        "islogin",
        "showLogin",
        "showRegister",
        "showFindPwd"
      ]),
      isExclude() {
        return this.$route.meta.cache ? "" : this.$route.name;
      }
    },
    created() {
      const userData = $localStorage.get('userData')
      if (!_.isUndefined(userData) && !_.isNull(userData)) {
        const userDataInfo = JSON.parse(aesutil.decrypt(userData, true))
        if (userDataInfo.node && userDataInfo.node.customer) {
          aesutil.updateKey(userDataInfo.node.customer.aesKey)
        }
      }
      this.$store.dispatch("UPDATE_USERDATA");
      this.dwMobilePage();
    },
    methods: {
      dwMobilePage() {
        let element = document.getElementsByTagName('body')[0];
        let classN = this.$route.meta.isMobilePage;
        if (!_.isUndefined(classN) && !_.isNull(classN)) {
          if ((' ' + element.className + ' ').indexOf(' ' + classN + ' ') < 0) {
            element.className = classN;
          }
        } else if (_.isUndefined(classN) || _.isNull(classN)) {
          element.className = '';
        }
      },
      closesetPage(val) {
        this.isMobile = val
      },
      initWsData() {
        console.log('this.userData===================')
        console.log(this.userData.configVos,'klsaj')
        _.forEach(this.userData.configVos, (value, key) => {
          if (value.type == 1002) {
            this.connectMsg = value.value.split(',');
            this.connectUrl = this.connectMsg[0];
            this.connectUser = this.connectMsg[1];
            this.connectPsw = this.connectMsg[2];
          }
        });
        this.detailNormal = '/center/orderDetail/';
        this.detailOver = '/center/orderDetailOver/';
        this.detailAppeal = '/center/orderDetailAppeal/';
        if (_.isMobile()) {
          this.detailNormal = '/m/order/';
          this.detailOver = '/m/orderOver/';
          this.detailAppeal = '/m/orderAppeal/';
        }
      },
      stompSuccessCallback(frame) {
        this.client.subscribe('/exchange/walletCustomOperation/' + this.userId, (data) => {
          let msgData = JSON.parse(aesutil.decrypt(data.body, true));
          console.log('msgData.type：' + msgData.type)
          if (msgData.type == 5) {
            // C2C_ORDER_ONLINE(5, "C2C订单发起人在线检测"),
            msgData.text = this.userId;
            this.client.send('/exchange/walletCustomOnline/-0', {priority: 9}, aesutil.encrypt(JSON.stringify(msgData)))
          }
           /* if (_.isMobile()) {
              if (msgData.type == 1 || msgData.type == 2) {
                // C2C_ORDER_PLACE(1, "C2C下单"),
                //  C2C_ORDER_PAY(2, "C2C订单支付完成"),
                toast(msgData.describe);
                window.location.href = this.detailNormal + msgData.text;
              } else if (msgData.type == 3 || msgData.type == 4) {
                //  C2C_ORDER_CANCEL(3, "C2C订单取消"),
                //   C2C_ORDER_COMPLETE(4, "C2C订单完成"),
                toast(msgData.describe);
                window.location.href = this.detailOver + msgData.text;
              } else if (msgData.type == 11) {
                //  C2C_ORDER_APPEAL(11, "C2C申诉");
                toast(msgData.describe);
                window.location.href = this.detailAppeal + msgData.text;
              } else {
                toast(msgData.describe)
                //console.log(msgData);
              }
            }*/
             else {
            this.$store.commit('UPDATE_NEWORDER', {
              type: msgData.type,
              orderId: msgData.text,
              orderx: JSON.parse(msgData.orderx)
            })
          }
        })
      },
      stompFailureCallback(error) {
        console.log('STOMP: ', error)
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
      stompConnect() {
        console.log('STOMP: Attempting connection')
        if (this.connectUrl != '') {
          let ws = new WebSocket(this.connectUrl);
          this.client = Stomp.over(ws, {debug: false});
          this.client.heartbeat.outgoing = 30000;
          this.client.heartbeat.incoming = 30000;
          this.client.connect(this.connectUser, this.connectPsw, this.stompSuccessCallback, this.stompFailureCallback);
        }
      },
      initUserDef() {
        this.$store.dispatch("GET_USERBALANCE");
        this.$store.dispatch("GET_BANKCARD");
        this.initWsData();
        this.stompConnect();
      }
    },

    watch: {
      "$route"(to, from) {
        this.dwMobilePage();
//        document.title=to.meta.title||to.meta.headName||"久安钱包";
      },
      islogin(val) {
        if (val) {
          this.initUserDef()
        }
      },
      // userId(){
      //    // this.$store.dispatch("GET_BANKCARD");
      // }
    },
    components: {
      SysBullentin,
      // vLogin,
      vRegister,
      LoginDialog,
      setAccountPassword,
      RedEnvelope,
      FindPwdDialog
    },
    mounted() {
      if (this.islogin) {
        this.initUserDef()
      }
    },
  }
</script>
