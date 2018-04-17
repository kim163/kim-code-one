<template>
  <div class="user-conter user-index">
    <div class="user-item-box">
      <div class="userhome-title money-title fl">
        账户余额
      </div>
      <div class="right-list">
        <div class="money-item">
          <span class="label fl">主账户总余额 ：</span>
          <span :class="['amountval',{'cl-red':!isNaN(myData.MAIN)}]">
            {{myData.MAIN}} </span><span class="iconfont icon-shuaxin" @click="getGameMoney('MAIN')"></span>
        </div>
        <div class="money-item">
          <span class="label fl">副账户总余额 ：</span>
          <span :class="['amountval',{'cl-red':!isNaN(myData.DEPUTY)}]">
            {{myData.DEPUTY}}
            </span><span class="iconfont icon-shuaxin" @click="getGameMoney('DEPUTY')"></span>
        </div>
        <div class="money-item">
          <span class="label fl">PT电游 ：</span>
          <span :class="['amountval',{'cl-red':!isNaN(myData.PT)}]">{{myData.PT}}</span>
          <span class="iconfont icon-shuaxin" @click="getGameMoney('PT')"></span>
        </div>
        <div class=money-item>
          <span class="label fl">DT电游 ：</span>
          <span :class="['amountval',{'cl-red':!isNaN(myData.DT)}]">{{myData.DT}}</span>
          <span class="iconfont icon-shuaxin" @click="getGameMoney('DT')"></span>
        </div>
        <div class="money-item">
          <span class="label fl">TTG电游 ：</span>
          <span :class="['amountval',{'cl-red':!isNaN(myData.TTG)}]">{{myData.TTG}}</span>
          <span class="iconfont icon-shuaxin" @click="getGameMoney('TTG')"></span>
        </div>
        <div class="money-item">
          <span class="label fl">PNG电游 ：</span>
          <span :class="['amountval',{'cl-red':!isNaN(myData.PNG)}]">{{myData.PNG}}</span>
          <span class="iconfont icon-shuaxin" @click="getGameMoney('PNG')"></span>
        </div>
        <div class="money-item">
          <span class="label fl">MG电游 ：</span>
          <span :class="['amountval',{'cl-red':!isNaN(myData.MG)}]">{{myData.MG}}</span>
          <span class="iconfont icon-shuaxin" @click="getGameMoney('MG')"></span>
        </div>
        <div class="money-item">
          <span class="label fl">QT电游 ：</span>
          <span :class="['amountval',{'cl-red':!isNaN(myData.QT)}]">{{myData.QT}}</span>
          <span class="iconfont icon-shuaxin" @click="getGameMoney('QT')"></span>
        </div>
        <div class="money-item ">
          <span class="label fl">NT电游 ：</span>
          <span :class="['amountval',{'cl-red':!isNaN(myData.NT)}]"> {{myData.NT}}</span>
          <span class="iconfont icon-shuaxin" @click="getGameMoney('NT')"></span>
        </div>
        <div class="money-item ">
          <span class="label fl">AG真人 ：</span>
          <span :class="['amountval',{'cl-red':!isNaN(myData.AGIN)}]"> {{myData.AGIN}}</span>
          <span class="iconfont icon-shuaxin" @click="getGameMoney('AGIN')"></span>
        </div>
        <div class="money-item noboder">
          <span class="label fl">EBET ：</span>
          <span :class="['amountval',{'cl-red':!isNaN(myData.EBET_LIVE)}]"> {{myData.EBET_LIVE}}</span>
          <span class="iconfont icon-shuaxin" @click="getGameMoney('EBET_LIVE')"></span>
        </div>
        <div class="money-item noboder">
          <span class="label fl">沙巴体育 ：</span>
          <span :class="['amountval',{'cl-red':!isNaN(myData.SB)}]"> {{myData.SB}}</span>
          <span class="iconfont icon-shuaxin" @click="getGameMoney('SB')"></span>
        </div>
      </div>
    </div>
    <div class="user-item-box functionmenu">
      <div class="userhome-title fl">
        常用功能
      </div>
      <div class="right-list ">
        <!--<router-link :to="{name:'discount_experience'}"  class="day-funs u-ico5"><span>体验金</span></router-link>-->
        <router-link :to="{name:'discount_savesend'}" class="day-funs u-ico5"><span>存送优惠</span></router-link>
        <router-link :to="{name:'discount_washcode'}" class="day-funs u-ico6"><span>洗码</span></router-link>
        <router-link :to="{name:'discount_help'}" class="day-funs u-ico2"><span>救援金</span></router-link>
        <router-link :to="{name:'discount_vip'}" class="day-funs u-ico3"><span>自助晋级</span></router-link>
        <router-link :to="{name:'discount_recommend'}" class="day-funs u-ico4"><span>推荐好友</span></router-link>
        <router-link :to="{name:'discount_birthday'}" class="day-funs u-ico1"><span>生日礼金</span></router-link>
        <!--<router-link :to="{name:'discount_coupon'}"  class="day-funs u-ico1"><span>优惠券</span></router-link>-->
      </div>
    </div>
    <div class="user-item-box">
      <vipStep></vipStep>
    </div>
  </div>
</template>
<script>
  import {getGameMoney, getMoneyAll} from 'api/user'
  import vipStep from "components/vip-step"

  import {mapGetters, mapActions} from 'vuex'
  export default {
    data() {
      return {
        myData: {
          PT: "点击查询",
          QT: "点击查询",
          DT: "点击查询",
          NT: "点击查询",
          MG: "点击查询",
          TTG: "点击查询",
          AGIN: "点击查询",
          PNG: "点击查询",
          EBET_LIVE: "点击查询",
          MAIN: "点击查询",
          DEPUTY: "点击查询",
          SB: "点击查询"
        }
      };
    },
    methods: {
      getGameMoney(val) {
        this.myData[val] = "正在查询.."
        getGameMoney({gameCode: val}).then(res => {
          if (res.success) {
            this.myData[val] = res.data;
            if (val == "MAIN") {
              this.userData.accountMoney = res.data;
            }
          }
          else {
            toast(res.message)
            this.myData[val] = '点击查询'
          }
        })
      },
      getMoneyAll() {
//        for (let item in this.myData) {
//          this.getGameMoney(item)
//        }
      }
    },
    computed: {
      ...mapGetters(["userData"])
    },
    created() {
      this.getMoneyAll()
    },
    components: {vipStep}
  };
</script>
<style lang="scss">
  .user-index {
    padding: 20px;
    .user-item-box {
      border-radius: 0;
      border: solid 1px #ccc;
      margin: 20px;
      position: relative;
      overflow: hidden;
    }
    .userhome-title {
      width: 150px;
      font-size: 18px;
      color: #333;
      text-align: center;

      &.money-title {
        line-height: 305px;
      }
    }
    .right-list {
      border-left: solid 1px #ccc;
      background: #fff;
      padding-top: 15px;
      margin-left: 150px;
      overflow: hidden;
      padding: 0 20px;
      .money-item {
        float: left;
        line-height: 61px;
        height: 61px;
        width: 50%;
        border-bottom: 1px solid #e0e0e0;
        .amountval {
          font-size: 16px;
          float: left;
          display: inline-block;
          color: #ccc;
        }
        &.noboder {
          border: none;
        }
        .iconfont {
          margin-left: 6px;
          font-size: 20px;
          cursor: pointer;
          font-weight: 100;
          color: #ccc;
        }
      }
      .label {
        color: #666666;
        font-size: 18px;
        float: left;
        margin-right: 25px;
      }
    }
    .functionmenu {
      .userhome-title {
        line-height: 200px;
      }
      .right-list {
        text-align: center;
        padding: 20px 0;
      }
      .day-funs {
        display: inline-block;
        text-align: left;
        width: 178px;
        height: 60px;
        margin: 10px;
        border-radius: 4px;
        background: #ccc;
        line-height: 60px;
        padding-left: 70px;
        box-sizing: border-box;
        font-size: 16px;
        color: #FFF;
        background-position: 25px center;
        background-repeat: no-repeat;
        background-size: 35px;
        transition: all 0.5s;
        &.u-ico1 {
          background-image: url(~images/icons/u_ico1.png);
          background-color: #2cb187;
        }
        &.u-ico2 {
          background-image: url(~images/icons/u_ico2.png);
          background-color: #cf4eaf;
        }
        &.u-ico3 {
          background-image: url(~images/icons/u_ico3.png);
          background-color: #eb4646;
        }
        &.u-ico4 {
          background-image: url(~images/icons/u_ico4.png);
          background-color: #3ebc12;
        }
        &.u-ico5 {
          background-image: url(~images/icons/u_ico5.png);
          background-color: #00a0ea;
        }
        &.u-ico6 {
          background-image: url(~images/icons/u_ico6.png);
          background-color: #4159e9;
        }
        &:hover {
          transform: scale(1.1);
        }
      }
    }

  }
</style>
