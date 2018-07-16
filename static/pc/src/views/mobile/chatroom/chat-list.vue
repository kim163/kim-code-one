<template>
  <div class="chatList_container box box-ver">
    <mHeader>交易会话</mHeader>
    <div class="conversation_list box-f1">
      <div v-if="chatArr.length==0" class="noMessage">
        <img src="~images/chatWith/no_message.png" alt="" class="noMessage_pic">
      </div>
      <div v-else class="conversation_item" v-for="(list,num) in chatArr" :key="num"
           @click="goChatRoom(list.latestMessage.content.extra.targetId,list.latestMessage.content.extra.debitName,
           list.latestMessage.content.extra.debitMoney,list.latestMessage.content.extra.amount)">
        <div class="converstation_info box">
          <div class="user_symbol"
               :class="{'user_symbolNext':userData.nickname==list.latestMessage.content.extra.debitName}"
               v-html="userData.nickname.slice(0,1)">
          </div>
          <span class="unread_num" :class="{isShow:getCount(num)}">{{getCount(num)}}</span>
          <span class="unread_line" :class="{isOn:getCount(num)}"></span>
          <div class="user_conversation box-f1">
            <p class="user_name">{{userData.nickname}}
              <span v-if="userData.nickname==list.latestMessage.content.extra.debitName" class="sell_out">卖出</span>
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
      <chat v-show="chatState" class="chatWindow"
            :detail="DetailList.targetId"
            :debitNum="DetailList.amount"
            :creditName='DetailList.creditName'
            :debitMoney="DetailList.money"
            :debitName="DetailList.debitName"
            :historyState="DetailList.historyState"
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
        countUnreadNum: [],
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
      if (this.connectState) {
        this.getConversationList()
      }
    }
    ,
    computed: {
      ...mapGetters([
        'userId',
        'userData',
        'connectState'
      ]),
    },
    methods: {
      getCount(n) {
        return this.countUnreadNum.length > 0 && !_.isUndefined(this.countUnreadNum[n]) ? this.countUnreadNum[n].count : ''
      },
      getConversationList() {
        this.symolEmoji = RongIMLib.RongIMEmoji
        RongIMClient.getInstance().getConversationList({
          onSuccess: (list) => {
            this.chatArr = list
            console.log(list,'为什么为什么为什么')
            for (let i = 0; i < list.length; i++) {
              this.getUnreadCount(list[i].latestMessage.content.extra.targetId)
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
        const conversationType = RongIMLib.ConversationType.GROUP
        RongIMClient.getInstance().clearUnreadCount(conversationType,id,{
          onSuccess:(res)=>{
            console.log(res,'野路子')
          },
          onError:()=>{
          }
        })
        const requestData = {
          userId: this.userId,
          groupId: id
        }
        chatWith.groupState(requestData).then(res => {
          if (res.data == -1) {
            toast('群组已解散！')
            RongIMClient.getInstance().removeConversation(RongIMLib.ConversationType.GROUP, id, {
              onSuccess: function (bool) {
                // 删除会话成功。
                console.log('删除数据成功！！！！')
              },
              onError: function (error) {
                // error => 删除会话的错误码
              }
            });
            return
          } else {
            /*先情调未读消息数*/
            this.DetailList.targetId = id;
            this.DetailList.debitName = name;
            this.DetailList.money = money;
            this.DetailList.amount = amount;
            this.chatState = true;
            this.DetailList.historyState = 3;
          }
        })
      },
      /*获取获取未读信息数*/
      getUnreadTotalCount() {
        RongIMClient.getInstance().getTotalUnreadCount({
          onSuccess: function (count) {
            // count => 多个会话的总未读数。
            console.log(count)
          },
          onError: function (error) {
            // error => 获取多个会话未读数错误码。
          }
        });
      },
      getUnreadCount(id) {
        const conversationType = RongIMLib.ConversationType.GROUP;
        const targetId = id
        RongIMLib.RongIMClient.getInstance().getUnreadCount(conversationType, targetId, {
          onSuccess: (count) => {
            const arr = []
            arr.push(count)
            for (let i = 0; i < arr.length; i++) {
              this.countUnreadNum.push({count: arr[i]})
            }
          },
          onError: function () {
            // error => 获取指定会话未读数错误码。
          }
        });
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
  .noMessage{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    height:-webkit-fill-available;
    position: relative;
  }
  .noMessage_pic{
    display: block;
    margin: 0 auto;
    width: r(150);
    height: r(150);
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
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
    position: relative;
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

  .unread_num {
    position: absolute;
    top: r(2);
    left: r(25);
    display: inline-block;
    width: r(22);
    height: r(14);
    background-color: #f43531;
    border-radius: r(7.78);
    font-size: r(10);
    color: #fff;
    line-height: r(12);
    margin: 0 auto;
    text-align: center;
    opacity: 0;
    &.isShow {
      opacity: 1;
    }
  }
  .unread_line{
    position: absolute;
    top: r(40);
    left: r(35);
    display: inline-block;
    width: r(10);
    height: r(10);
    background-color: #f43531;
    border-radius:50%;
    color: #fff;
    opacity: 0;
    &.isOn{
      opacity: 1;
    }
  }
</style>
