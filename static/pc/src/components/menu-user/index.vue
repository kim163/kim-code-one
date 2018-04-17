<template>
  <div class="sidebar fl">
    <a class="sidenav-item toUserHome" >
      <div class="img-box hidden">
        <img v-lazy="userImg" style="vertical-align:top;" :title="userData.level" :alt="userData.level">
      </div>
      <div class="user-name">{{userData.loginname}}</div>
      <div class="user-level">
        <i class="iconfont icon-crown"></i>&nbsp;{{userData.level}}
      </div>
    </a>

    <div class="sidenav">
      <router-link v-for="(item,i) in myData" class="sidenav-item" :to="item.to" :key="i">
        {{item.name}}
        <i class="iconfont icon-arrow-right"></i>
      </router-link>
    </div>
  </div>
</template>
<script>
  let user_menu = [
    {name: "存款", to: {name: "user_deposit"}, icon: "icon-deposit"},
    {name: "取款", to: {name: "user_drawmoney"}, icon: "icon-drawmoney"},
    {name: "转账", to: {name: "user_transfer"}, icon: "icon-transfer"},

    {name: "个人资料", to: {name: "user_datum"}, icon: "icon-user"},
    {name: "我的优惠", to: {name: "user_discount"}, icon: " icon-discount"},
    {name: "安全中心", to: {name: "user_security"}, icon: "icon-security"},
    {name: "记录查询", to: {name: "user_log"}, icon: "icon-log"},
    {name: "站内消息", to: {name: "user_message"}, icon: "icon-msg"}
  ]
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        myData: user_menu
      };
    },
    props: {
      data: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    methods: {

    },
    computed: {
      ...mapGetters(["userData"]),
      userImg(){
        return this.userData.levelNumber?require(`./img/${this.userData.levelNumber}.png`):require("./img/0.png");
      }
    },
    created() {
    }
  };
</script>
<style lang="scss" scoped="">
  .sidebar {

    width: 225px;
    min-height: 800px;
    position: relative;
    z-index: 10;
    box-shadow: 0 1px 4px 1px #ccc;
    .user-info-menu {
      box-shadow: 0 1px 4px 1px #ccc;
    }
    .user-name{
      margin-top: 30px;
    }
    text-aligen: center;
    .userbox {
      width: 100%;
      text-align: center;
    }
    .sidenav {
      font-weight: normal;
      position: relative;
      background: #fff;

      .sidenav-item {
        background-repeat: no-repeat;
        background-position: right 30px center;
        position: relative;
        display: block;
        text-align: left;
        padding-left: 40px;
        color: #969696;
        font-size: 16px;
        letter-spacing: 2px;
        height: 50px;
        line-height: 50px;
        &:hover, &.active {
          background-color: #1e327e;
          color: #fff;
          &::before {
            border-color: transparent transparent transparent #1e327e;
          }
        }
        &::before {
          transition: border-color 0.5s;
          position: absolute;
          content: "";
          top: 0px;
          right: -10px;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 25px 0 25px 10px;
          border-color: transparent transparent transparent transparent;
        }
        .icon-arrow-right {
          position: absolute;
          right: 30px;
          font-size: 20px;
        }

      }
      .sidenav-item:first-child{
         color: #f00;
      }
    }
    .toUserHome {
      background: #fff;
      .img-box {
        display: block;
        border: solid 1px #ccc;
        border-radius: 20em;
        padding: 10px;
        width: 122px;
        height: 122px;
        margin: 10px auto;
        line-height:100px;
      }
      div {
        text-align: center;
        font-size: 18px;
        color: #333;
      }
      .user-level{
        color:#75430c;
        background: #fff100;
        width: 115px;
        height:34px;
        line-height: 34px;
        margin:10px auto 20px;
        text-align: center;
        border-radius: 17px;
        box-shadow:0 3px 1px #c7a60b;
        font-size: 14px;
        font-weight: bold;
        color: #75430c;
        .iconfont{ color:#75430c;font-size: 20px;font-weight: lighter;    vertical-align: middle;}
      }
    }
  }

</style>
