<template>
  <div class="vip-step">
    <div class="titleT">
      <span>本月投注额</span>
    </div>
    <table>
      <tr>
        <th>序号</th>
        <th>游戏平台</th>
        <th>投注金额</th>
      </tr>
      <tr v-for=" (item,i) in data.betList">
        <td>{{i+1}}</td>
        <td>{{item.platform}}</td>
        <td>{{item.bet}}</td>
      </tr>
    </table>
  </div>

  <!--<div class="acctmeter">-->
  <!--<div class="meter" style="overflow:inherit;">-->
  <!--<div class="ul_auto_wrap">-->
  <!--<div class="user_vip_progress_info">-->
  <!--<div class="present_box" :style="{'margin-left':'-56px','left':lineWidth}">-->
  <!--<div class="present_box_content">-->
  <!--本月投注额<br>-->
  <!--<span class="money_text text_red ">{{thisMonthMoney}}</span>-->
  <!--</div>-->
  <!--<div class="present_box_arrow"></div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="meter">-->
  <!--<div class="ul_auto_wrap">-->
  <!--<div class="user_vip_progress_info">-->
  <!--<div class="progress_info">-->
  <!--<div class="progress_info_val" :style="{width:lineWidth}"></div>-->
  <!--</div>-->
  <!--<div class="user_vip_level_info">-->
  <!--<div class="level_info_gap" v-for="(item,i) in data.upgradeThresholdList"-->
  <!--:style="{width:100/levelCount+'%'}">-->
  <!--<div class="level_info_label text_red">{{item.levelName}}</div>-->
  <!--<div class="level_info_text">{{item.money | stringSplit}}</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
</template>
<script>
  import {getBetUpgrateVO} from "api/preferential-terms"
  import {mapGetters} from 'vuex'

  export default {
    name: "",
    data() {
      return {
        data: {
          upgradeThresholdList: [],
          betList: [{bet: 0}]
        },
        levelCount: 0, //所有的等级数量
        thisMonthMoney: 0//本月投注额
      };
    },
    computed: {
      ...mapGetters(["userData"]),
      lineNum() {
        return this.data.upgradeThresholdList.filter(item => {
          return item.money && this.thisMonthMoney >= item.money;
        }).length;
      },
      lineWidth() { //红色线条长度
        let list = this.data.upgradeThresholdList;
        if (list.length == 0) return "0%"
        let Maxlist = list.filter(item => { //找到大于本月金额的所有等级
          return this.thisMonthMoney > item.money;
        });
        if (Maxlist.length == 0) {
          return (this.thisMonthMoney / list[0].money) * 100 / this.levelCount + "%"
        } else {
          let cur = Maxlist[Maxlist.length - 1],
            def = 100 / this.levelCount, //每个等级的长
            more = this.thisMonthMoney - cur.money;//保级 多出来的钱
          let next = list.find(item => { // 下一个等级 为什么不用 maxlist因为找的是 集合不是index
            return item.money > this.thisMonthMoney;
          });
          if (next == undefined) {
            return "100%";
          } else {
            let rotes = more / ( next.money - cur.money) * def;//多出来的钱 占下一个等级晋级金钱的 比例
            return rotes + def * Maxlist.length + '%'
          }
        }
      }
    },
    created() {
      getBetUpgrateVO({username: this.userData.loginname}).then(res => {
        if (res.success) {
          this.data = res.data;
          this.levelCount = res.data.upgradeThresholdList.length;  //所有等级的数量
          this.thisMonthMoney = this.data.betList[this.data.betList.length - 1].bet; //本月投注额
          res.data.upgradeThresholdList.forEach((item) => {   //数据处理
            if (item.level == this.userData.levelNumber) {
              item.levelName += "(保级)";
              item.money = item.retainthreshold;
            }
            else if (item.level > this.userData.levelNumber) {
              item.money = item.upgradethreshold;
            } else {
              item.money = item.retainthreshold;
            }
          });
          this.data.upgradeThresholdList = res.data.upgradeThresholdList;
          this.$emit("input", this.lineNum > 0)
        }
        else {
          toast(res.message)
        }
      }).catch(err => {
        toast("晋级查询失败");
      })
    },

  }
</script>
<style lang="scss">
  .vip-step {
    padding: 45px 20px;
    .titleT {
      height: 42px;
      line-height: 42px;
      color: #000;
      text-align: left;
      border-bottom: 1px solid #1e327e;
      margin-bottom: 10px;
      font-size: 18px;
      span {
        /*background: #1e327e;*/
        display: block;
        width: 206px;
      }
    }
    table {
      width: 100%;
      border-spacing: 0;
      font-size: 14px;
      text-align: center;
      border-collapse:collapse;
      th {
        background: #1e327e;
        padding: 10px 20px;
        font-weight: 100;
        color: #fff;
        height: 50px;
      }
      td {
        padding: 10px 20px;
        border: 1px solid #b8b8b8
      }
    }
  }

  /*.acctmeter {*/
  /*padding: 15px;*/
  /*}*/

  /*.user_vip_level_info {*/
  /*overflow: hidden;*/
  /*margin-bottom: 15px;*/
  /*box-sizing: border-box;*/
  /*}*/

  /*.user_vip_level_info .level_info_gap {*/
  /*text-align: right;*/
  /*float: left;*/
  /*}*/

  /*.user_vip_level_info .level_info_label {*/
  /*font-size: 12px;*/
  /*font-weight: 700;*/
  /*}*/

  /*.user_vip_level_info .level_info_text {*/
  /*font-size: 14px;*/
  /*color: #999;*/
  /*}*/

  /*.progress_info {*/
  /*position: relative;*/
  /*margin: 7px 0;*/
  /*width: 100%;*/
  /*height: 7px;*/
  /*background: #e6e6e6;*/
  /*border-radius: 3000px;*/
  /*}*/

  /*.progress_info .progress_info_val {*/
  /*position: absolute;*/
  /*top: 0;*/
  /*left: 0;*/
  /*height: 100%;*/
  /*background: #ff684d;*/
  /*background-size: 1px 100%;*/
  /*border-radius: 3000px;*/
  /*}*/

  /*.text_red {*/
  /*color: #f66;*/
  /*}*/

  /*.meter {*/
  /*width: 600px;*/
  /*height: 75px;*/
  /*margin: 0 auto;*/
  /*position: relative;*/
  /*overflow: hidden*/
  /*}*/

  /*.mlabel p {*/
  /*color: #999999;*/
  /*text-align: left;*/
  /*position: absolute;*/
  /*}*/

  /*.user_vip_progress_info {*/
  /*position: relative;*/
  /*}*/

  /*.user_vip_progress_info .present_box {*/
  /*display: table;*/
  /*position: absolute;*/
  /*z-index: 99;*/
  /*height: 39px;*/
  /*padding: 10px 12px 0;*/
  /*border: 1px solid #ccc;*/
  /*background: #fff;*/
  /*border-radius: 5px;*/
  /*font-size: 1.1rem;*/
  /*line-height: 18px;*/
  /*text-align: center;*/
  /*color: #999;*/
  /*white-space: nowrap;*/
  /*box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);*/
  /*}*/

  /*.user_vip_progress_info .present_box .present_box_content {*/
  /*position: relative;*/
  /*z-index: 98;*/
  /*background: #fff;*/
  /*display: table-cell;*/
  /*vertical-align: middle;*/
  /*}*/

  /*.present_box .present_box_arrow {*/
  /*position: absolute;*/
  /*bottom: -6px;*/
  /*left: 50%;*/
  /*z-index: 97;*/
  /*margin-left: -5px;*/
  /*width: 10px;*/
  /*height: 10px;*/
  /*border: 1px solid #ccc;*/
  /*background: #fff;*/
  /*transform: rotate(45deg);*/

  /*}*/

  /*.user_vip_level_info {*/
  /*overflow: hidden;*/
  /*margin-bottom: 15px;*/
  /*box-sizing: border-box;*/
  /*}*/

  /*.user_vip_level_info .level_info_gap {*/
  /*text-align: right;*/
  /*float: left;*/
  /*}*/

  /*.user_vip_level_info .level_info_label {*/
  /*font-size: 12px;*/
  /*font-weight: 700;*/
  /*}*/

  /*.user_vip_level_info .level_info_text {*/
  /*font-size: 14px;*/
  /*color: #999;*/
  /*}*/
</style>
