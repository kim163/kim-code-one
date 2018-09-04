<template>
  <div class="mygift-main-content header-padding">
    <nav-menu></nav-menu>
    <BreadCrumbs :bread-list="breadList"></BreadCrumbs>
    <transact-menu></transact-menu>

    <div class="container min-width min-height">
      <div class="gift_content">
      <div class="gift_tab">
        <div class="is_cash" :class="{'active':!currentShow}" @click="changeTab(2)">未兑现</div>
        <div class="no_cash" :class="{'active':currentShow}" @click="changeTab(1)">已兑现</div>
      </div>
      <!--以兑现-->
      <div class="isCash_content" v-if="currentShow">
        <noDataTip v-if="isNull"></noDataTip>
          <div class="discount_ticket" v-for="(list,num) in isCashArr">
            <div class="left_side">
              <p class="remark_info">{{list.remark}}</p>
              {{isCashArr[num].couponEndTime}}
              <p class="time_date" >至{{isCashArr[num].couponEndtime |Date('yyyy-MM-dd')}}过期</p>
              <div class="id_num" style="display: flex"><span style="float:left" class="id">单号:</span><span
               class="id-content">{{list.id}}</span></div>
            </div>
            <div class="middle_line"></div>
            <div class="right_side">
              <div class="side_money">¥ {{(list.couponValueStr*0.01).toFixed(2)}}</div>
              <div class="side_num"> ={{list.couponValueStr}}UET</div>
            </div>
        </div>
      </div>
      <!--未兑现-->
      <div class="noCash_content" v-else ref="noCash">
        <noDataTip v-if="isNullNext"></noDataTip>
          <div class="discount_ticket" v-for="(list,num) in noCacheArr" v-else>
            <div class="left_side">
              <p class="remark_info">{{list.remark}}</p>
              {{noCacheArr[num].couponEndTime}}
              <p class="time_date">至{{noCacheArr[num].couponEndtime |Date('yyyy-MM-dd')}}过期</p>
              <div class="id_num" style="display: flex"><span style="float:left" class="id">单号:</span><span
                class="id-content">{{list.id}}</span></div>
            </div>
            <div class="middle_line_next"></div>
            <div class="right_side">
              <div class="side_money">¥ {{(list.couponValueStr*0.01).toFixed(2)}}</div>
              <div class="side_num"> ={{list.couponValueStr}}UET</div>
            </div>
          </div>
        </div>
      </div>
      </div>

    <v-footer></v-footer>
  </div>

</template>

<script>
  import {userCenter} from 'api';
  import noDataTip from 'components/no-data-tip';
  import NavMenu from 'components/nav';
  import BreadCrumbs from 'components/bread-crumbs'
  import TransactMenu from 'components/transact-menu';
  import VFooter from 'components/footer';

  export default {
    name: "pcmy-gift",
    data() {
      return {
        breadList: [
          {
            urlName: 'transaction',
            name: 'navbar.tradingHall'
          }
        ],
        currentShow: false,
        isNull: true,
        isCashArr: [],
        timeList: [],
        isNullNext: true,
        noCacheArr: [],
        initPage: 0,
        initPageNext: 0,
        busy: false,
        totalNext:'',
        pageNumNext:'',
        pageSizeNext:'',
        pullDownCfg: {
          threshold: 45,
          stop: 20
        }
      }
    },
    created() {
      this.getInfo();
      this.getInfonext();
    },
    methods: {
      getInfo() {
        const requestData = {
          "limit": 10,
          "offset": this.initPage,
          "couponStatus": 3,
          "couponType": 100
        }
        userCenter.myGift(requestData).then(res => {
          if (res.code == 10000) {
            if (res.pageInfo.total == 0) {
              this.isNull = true
            } else {
              this.isNull = false
              this.isCashArr = res.data
              this.total=res.pageInfo.total;
              this.pageNum = res.pageInfo.pageNum;
              this.pageSize = res.pageInfo.pageSize

            }
          } else {
            toast(res.message)
          }
        })

      },
      getInfonext(){
        const requestDatas = {
          "limit": 10,
          "offset": this.initPageNext,
          "couponStatus": 2,
          "couponType": 100
        }
        userCenter.myGift(requestDatas).then(res => {
          if (res.code == 10000) {
            if (res.pageInfo.total == 0) {
              this.isNullNext = true
            } else {
              this.isNullNext = false
              this.noCacheArr = res.data
              this.totalNext=res.pageInfo.total;
              this.pageNumNext = res.pageInfo.pageNum;
              this.pageSizeNext = res.pageInfo.pageSize
            }
          } else {
            toast(res.message)
          }
        })
      },
      changeTab(num) {
        if (num == 1) {
          this.currentShow = true
        } else {
          this.currentShow = false
        }
      }
    },
    components: {
      NavMenu,
      BreadCrumbs,
      TransactMenu,
      VFooter,
      noDataTip
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .mygift-main-content{
    .gift_content {
      border: 1px solid #ccc;
      margin: 0 0 30px 0;
      .gift_tab {
        text-align: center;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        width: 80%;
        padding-top: r(28);
        height: r(50);
        .is_cash {
          width: 50%;
          height: r(35);
          font-size: r(15);
          color: #333333;
          background-color: #fff;
          line-height: r(35);
          border-radius: r(4) r(0) r(0) r(4);
          &.active {
            background-color: #86A5F8;
            color: #fff;
          }
        }
        .no_cash {
          width: 50%;
          height: r(35);
          font-size: r(15);
          color: #333333;
          line-height: r(35);
          background-color: #fff;
          border-radius: r(0) r(4) r(4) r(0);
          &.active {
            background-color: #86A5F8;
            color: #fff;
          }
        }
      }
      .isCash_content {
        width: 100%;
        height: 100%;
        margin: r(20) auto;
        .discount_ticket {
          width: 85%;
          height: r(108);
          margin: r(20) auto;
          display: flex;
          flex-direction: row;
          .left_side {
            flex: 1;
            word-break: break-word;
            font-size: r(14);
            color: #787876;
            position: relative;
            padding: r(10) r(8);
            background-color: #fff;
            border-radius: r(5) 0 0 r(5);
            .time_date {
              padding: r(8) r(0);
            }
            .id_num {
              display: flex;
              .id {
                width: r(40);
              }
              .id-content{
                width: r(140);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
          .middle_line{
            width: r(15);
            height: r(108);
            background: url('~images/discount_white.png') no-repeat;
            background-size: 100% 100%;
          }
          .right_side {
            width: r(112);
            text-align: center;
            padding: r(10) r(8);
            background-color: #fff;
            border-radius: 0 r(5) r(5) 0;
            .side_money {
              font-size: 18px;
              color: #ff8b8b;
              padding-top: r(12);
            }
            .side_num {
              font-size: 16px;
              color: #ff8b8b;
              padding-top: r(10);
            }
          }
        }
      }
      .noCash_content {
        width: 100%;
        height: 100%;
        margin: r(20) auto;
        .discount_ticket {
          width: 85%;
          height: r(108);
          margin: r(20) auto;
          display: flex;
          flex-direction: row;
          .left_side {
            flex: 1;
            word-break: break-word;
            font-size: r(14);
            color: #fff;
            position: relative;
            padding: r(10) r(8);
            background-color: #FF8B8B;
            border-radius: r(5) 0 0 r(5);
            .time_date {
              padding: r(8) r(0);
            }
            .id_num {
              display: flex;
              .id {
                width: r(40);
              }
              .id-content{
                width: r(140);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
          .middle_line_next {
            width: r(15);
            height: r(108);
            background: url('~images/discount_pink.png') no-repeat;
            background-size: 100% 100%;
          }
          .right_side {
            width: r(112);
            text-align: center;
            padding: r(10) r(8);
            background-color: #FF8B8B;
            border-radius: 0 r(5) r(5) 0;
            .side_money {
              font-size: 18px;
              color: #fff;
              padding-top: r(12);
            }
            .side_num {
              font-size: 16px;
              color: #fff;
              padding-top: r(10);
            }
          }
        }
      }
    }
  }
</style>
