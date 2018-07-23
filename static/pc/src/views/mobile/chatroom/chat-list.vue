<template>
  <div class="chatList_container box box-ver">
    <mHeader>交易会话</mHeader>
    <div class="conversation_list box-f1">
      <div v-if="chatArr.length==0" class="noMessage">
        <img src="~images/chatWith/no_message.png" alt="" class="noMessage_pic">
        <span class="no_message">暂无聊天信息</span>
      </div>
      <div v-else class="conversation_item" v-for="(list,num) in chatArr" :key="num"
         @click="goChatRoom(list.targetId,list.latestMessage.content.user.id)">
        <div class="converstation_info box">
          <div class="user_symbol"
               :class="{'user_symbolNext':userId==JSON.parse(list.latestMessage.content.extra).debit}"
               v-html="userData.nickname.slice(0,1)">
          </div>
          <span class="unread_num" :class="{isShow:list.unreadMessageCount}">{{list.unreadMessageCount>99?99:list.unreadMessageCount}}</span>
          <span class="unread_line" :class="{isOn:list.unreadMessageCount}"></span>
          <div class="user_conversation box-f1">
            <p class="user_name">{{userData.nickname}}
              <span v-if="userId==JSON.parse(list.latestMessage.content.extra).debit" class="sell_out">卖出</span>
              <span v-else class="buy_in">买入</span>
            </p>
            <!--区分图片和文本消息 目前就这两种-->

           <p class="user_content"
               v-if="list.latestMessage.content.messageName=='TextMessage'">{{list.latestMessage.content.user.name+': '+symolEmoji.symbolToEmoji(list.latestMessage.content.content)}}</p>
            <p class="user_content" v-else>{{list.latestMessage.content.user.name}}: [图片]</p>
          </div>
          <div class="user_time">
            {{timeList[num].TimeList}}
          </div>
        </div>
        <div class="conversation_num">
          <span>交易数量: {{JSON.parse(list.latestMessage.content.extra).amount}}UET</span>
        </div>
      </div>
    </div>
    <transition name="toolSideRight">
      <chat v-show="chatState" class="chatWindow"
            :detail="DetailList.targetId"
            :historyState="DetailList.historyState"
            :userInfoId ="userInfoId"
            @chatShow="chatStateUpdate"
      ></chat>
    </transition>
    <mFooter :unreadCount="unreadTotalCount"></mFooter>
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
        timeList: [],
        chatState: '',
        DetailList: {},
        symolEmoji: '',
        readyOk: '',
        unreadTotalCount:0,
        countUnreadNum: [],
        userInfoId:'',
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
      if(this.connectState){
        this.getConversationList()
      }
    }
    ,
    computed: {
      ...mapGetters([
        'userId',
        'userData',
        'connectState',

      ])
    },
    watch:{
      connectState(val){
        if(val){
          this.getConversationList()
        }
      }
    },
    methods: {
      getCount(n) {
        return this.countUnreadNum.length > 0 && !_.isUndefined(this.countUnreadNum[n]) ? this.countUnreadNum[n].count : ''
      },
      chatStateUpdate(value){
        console.log(value,'晚上，')
        this.chatState = value
      },
      getConversationList() {
        this.symolEmoji = RongIMLib.RongIMEmoji
        RongIMClient.getInstance().getConversationList({
          onSuccess: (list) => {
            this.chatArr = list
            for (let i = 0; i < list.length; i++) {
              this.getUnreadCount(list[i].targetId)
             this.timeList.push({TimeList:this.formatMsgTime(list[i].sentTime)})
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
      goChatRoom(id,userId) {
        const requestData = {
          userId: this.userId,
          groupId: id
        }
        this.getUnreadTotalCount()
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
            /!*先情调未读消息数*!/
            this.DetailList.targetId = id;
            this.DetailList.historyState = 3;
            this.userInfoId= userId
            /*清楚未读绘画*/
            const conversationType = RongIMLib.ConversationType.GROUP
            RongIMClient.getInstance().clearUnreadCount(conversationType,id,{
              onSuccess:(res)=>{
                RongIMClient.getInstance().getTotalUnreadCount({
                  onSuccess:(count)=>{
                    this.$store.commit('GET_UNREADCOUNT',count)
                    this.chatState = true;
                    this.$store.commit('CHANGE_CONNECTSTATE', true)
                  },
                  onError:(error)=>{
                    // error => 获取总未读数错误码。
                  }
                });
              },
              onError:()=>{
              }
            })
          }
        })
      },
      getUnreadTotalCount() {
        RongIMClient.getInstance().getTotalUnreadCount({
          onSuccess:(count)=>{
            // count => 多个会话的总未读数。
           this.$store.commit('GET_UNREADCOUNT',count)
          },
          onError: (error)=> {
            // error => 获取多个会话未读数错误码。
          }
        });
      },
      formatMsgTime(timespan) {
        var dateTime = new Date(timespan);
        var month = dateTime.getMonth() + 1 >= 10 ? dateTime.getMonth() + 1 : '0' + dateTime.getMonth();
        var day = dateTime.getDate() >= 10 ? dateTime.getDate() : '0' + dateTime.getDate();
        var hour = dateTime.getHours() >= 10 ? dateTime.getHours() : '0' + dateTime.getHours();
        var minute = dateTime.getMinutes() >= 10 ? dateTime.getMinutes() : '0' + dateTime.getMinutes();
        var timeSpanStr;
        timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
        return timeSpanStr;
      },
      getUnreadCount(id) {
        const conversationType = RongIMLib.ConversationType.GROUP;
        const targetId = id
        this.countUnreadNum = []
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
    height: r(120);
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .no_message{
    margin: 0 auto;
    position: absolute;
    top: 54%;
    left: 50%;
    font-size: r(15);
    transform: translate(-50%,-50%);
    color: #787876;
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
    max-width: r(150);
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
