<template>
  <div class="chatList_container box box-ver">
    <mHeader>交易会话</mHeader>
    <div class="conversation_list box-f1">
      <div class="conversation_item" v-for="(list,index) in chatArr" :key="index"
           @click="goChatRoom(list.latestMessage.content.extra.targetId,list.latestMessage.content.extra.debitName,
           list.latestMessage.content.extra.debitMoney,list.latestMessage.content.extra.amount)">
        <div class="converstation_info box">
          <div class="user_symbol"
               :class="{'user_symbolNext':!list.latestMessage.content.extra.isSeller}"
               v-html="userData.nickname.slice(0,1)"></div>
          <div class="user_conversation box-f1">
            <p class="user_name">{{userData.nickname}}
              <span v-if="!list.latestMessage.content.extra.isSeller" class="sell_out">卖出</span>
              <span v-else class="buy_in">买入</span>
            </p>
            <!--区分图片和文本消息 目前就这两种-->
            <p class="user_content"
               v-html="list.latestMessage.content.extra.nickName+': '+symolEmoji.symbolToEmoji(list.latestMessage.content.content)"
               v-if="list.latestMessage.content.messageName=='TextMessage'"></p>
            <p class="user_content" v-else>{{list.latestMessage.content.extra.nickName}}: [图片]</p>
          </div>
          <div class="user_time">
            {{list.latestMessage.content.extra.time}}
          </div>
        </div>
        <div class="conversation_num">
          <span>交易数量:  {{list.latestMessage.content.extra.amount}}UET</span>
        </div>
      </div>
    </div>
    <transition name="toolSideRight">
      <chat v-if="chatState" class="chatWindow"
            :detail="DetailList.targetId"
            :debitNum="DetailList.debitAmount"
            :creditName='DetailList.creditName'
            :debitMoney="DetailList.debitAmountTwin"
            :debitName="DetailList.debitName"
      ></chat>
    </transition>
    <mFooter></mFooter>
  </div>

</template>

<script>
  import chat from './chat'
  import mHeader from "components/m-headnav"
  import mFooter from 'components/m-navbar'
  import {chatWith} from 'api'
  import {mapGetters} from 'vuex'

  export default {
    name: "chatList",
    data() {
      return {
        token: '',
        chatArr: [],
        timeList: '',
        chatState: '',
        DetailList: {},
        symolEmoji: '',
        readyOk: '',
        config: {
          size: 24, // 大小, 默认 24, 建议15 - 55
          url: '//f2e.cn.ronghub.com/sdk/emoji-48.png', // 所有 emoji 的背景图片
          lang: 'zh', // 选择的语言, 默认 zh
        },
      }
    },
    created() {
      Vue.$global.bus.$on('rongState', () => {
        this.getConversationList();
      })

      console.log(this.connectState,'撒孔家店了啊说得好')
      if (this.connectState) {
       // this.clearConversationList()
        this.getConversationList()

      }

      },
    watch:{
      connectState(val){
        if(val){
          this.getConversationList()
        }
      }
    },
    computed: {
      ...mapGetters([
        'userId',
        'userData',
        'connectState'
      ]),
    },
    methods: {
      getConversationList() {
        this.symolEmoji = RongIMLib.RongIMEmoji
        RongIMClient.getInstance().getConversationList({
          onSuccess: (list) => {
            this.chatArr = list
            for (let i = 0; i < list.length; i++) {
              this.timeList = list[i].latestMessage.sentTime
            }
          },
          onError: function (error) {
            // do something...

          }
        }, null);
      },
      clearConversationList() {
        RongIMClient.getInstance().clearConversations({
          onSuccess: function () {
            // 清除会话成功

          },
          onError: function (error) {
            // error => 清除会话错误码。
          }
        });
      },
      goChatRoom(id, name, money, amount) {
        this.chatState = true
        this.DetailList.targetId = id;
        this.DetailList.debitName = name;
        this.DetailList.money = money;
        this.DetailList.amount = amount
      },

    },
    components: {
      mHeader,
      mFooter,
      chat
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

  .conversation_list {
    background-color: #f5f5f5;
    height: -webkit-fill-available;
    height: fill-available;
  }

  .user_symbol {
    width: r(50);
    height: r(50);
    background-color: #E9BA52;
    border-radius: 50%;
    text-align: center;
    color: #fff;
    line-height: r(50);
    font-size: r(18);
  }

  .user_symbolNext {
    width: r(50);
    height: r(50);
    background-color: #07BB86;
    border-radius: 50%;
    text-align: center;
    color: #fff;
    line-height: r(50);
    font-size: r(18);
  }

  .conversation_item {
    padding: r(10) r(10) 0 r(10);
    background-color: #fff;
    margin-bottom: r(11);
  }

  .converstation_info {
    height: r(60);
  }

  .user_conversation {
    padding-left: r(10);
    padding-top: r(5);
  }

  .conversation_num {
    border-top: 1px solid #D8D8D8;
    height: r(42);
    line-height: r(42);
    font-size: r(12);
    color: #787876;
  }

  .user_name {
    font-size: r(15);
  }

  .sell_out {
    display: inline-block;
    width: r(36);
    height: r(16);
    background-color: #07BB86;
    color: #fff;
    font-size: r(12);
    text-align: center;
    border-radius: r(2);
  }

  .buy_in {
    display: inline-block;
    width: r(36);
    height: r(16);
    background-color: #E9BA52;
    color: #fff;
    font-size: r(12);
    text-align: center;
    border-radius: r(2);
  }

  .user_time {
    font-size: r(15);
    white-space: nowrap;
    color: #787876;
    padding-top: r(5);
  }

  .user_content {
    font-size: r(12);
    color: #787876;
    width: r(250);
    overflow: hidden;
    white-space: nowrap;
    padding-top: r(5);
  }

  .chatWindow {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
  }
</style>
