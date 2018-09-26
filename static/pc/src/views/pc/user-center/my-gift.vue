<template>
  <div class="mygift-main-content">
    <div class="container min-width min-height max-width">
      <div class="tab-list">
        <div class="tab-item"
             :class="{active: titleType === item.type}"
             v-for="(item,index) in navList"
             :key="index"
             @click="changeTitle(item.type)">
          {{$t(item.name)}}
        </div>
        <router-link class="go-center" :to="{name:'walletCenter'}">返回钱包中心</router-link>
      </div>
      <div class="gift_content">
        <div class="gift_tab">
          <div class="exchange" :class="{'active':!currentShow}" @click="changeTab(2)">未兑现</div>
          <div class="exchange" :class="{'active':currentShow}" @click="changeTab(1)">已兑现</div>
        </div>
        <!--以兑现-->
        <div class="exchange_content cfx" v-if="currentShow">
          <noDataTip v-if="isNull"></noDataTip>
          <div class="discount_ticket" v-for="(list,num) in isCashArr" v-else>
            <coupon-detail :item="list" :isUsed="true"></coupon-detail>
          </div>
          <paging-by :data="isCashPageInfo" @search="getInfo"></paging-by>
        </div>
        <!--未兑现-->
        <div class="exchange_content cfx" v-else>
          <noDataTip v-if="isNullNext"></noDataTip>
          <div class="discount_ticket" v-for="(list,num) in noCacheArr" v-else>
            <coupon-detail :item="list" :showBtn="true" @toUse="toUseExchange"></coupon-detail>
          </div>
          <paging-by :data="noCashPageInfo" @search="getInfonext"></paging-by>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {userCenter} from 'api';
  import noDataTip from 'components/no-data-tip';
  import CouponDetail from 'components/coupon-detail';
  import pagingBy from "components/paging-by";

  export default {
    name: "pcmy-gift",
    data() {
      return {
        currentShow: false,
        isNull: true,
        isCashArr: [],
        isCashPageInfo: {},
        isNullNext: true,
        noCacheArr: [],
        noCashPageInfo: {},
        initPage: 0,
        initPageNext: 0,
        limit: 10,
        titleType:2,
        navList: [
          {
            name: 'navbar.userCenter',
            type: 1
          },
          {
            name: 'userCenter.myGift',
            type: 2
          }
        ],
      }
    },
    created() {
      this.getInfo();
      this.getInfonext();
    },
    methods: {
      getInfo(index) {              // 获取已兑现的优惠券数据
        if (!isNaN(index)) {
          this.initPage = (index - 1) * this.limit;
        }
        const requestData = {
          "limit": this.limit,
          "offset": this.initPage,
          "couponStatus": 3,
          "couponType": 100
        }
        userCenter.myGift(requestData).then(res => {
          console.log(res, '电视剧sad')
          if (res.code == 10000) {
            if (res.pageInfo.total == 0) {
              this.isNull = true
            } else {
              this.isNull = false;
              this.isCashArr = res.data;
              this.isCashPageInfo = res.pageInfo;
            }
          } else {
            toast(res.message)
          }
        }).catch(err => {
          toast(err);
        });

      },
      getInfonext(index) {           // 获取未兑现的优惠券信息
        if (!isNaN(index)) {
          this.initPageNext = (index - 1) * this.limit;
        }
        const requestDatas = {
          "limit": this.limit,
          "offset": this.initPageNext,
          "couponStatus": 2,
          "couponType": 100
        };
        console.log('获取未兑现的优惠券参数：', requestDatas);
        userCenter.myGift(requestDatas).then(res => {
          if (res.code == 10000) {
            if (res.pageInfo.total == 0) {
              this.isNullNext = true;
            } else {
              this.isNullNext = false;
              this.noCacheArr = res.data;
              this.noCashPageInfo = res.pageInfo;
            }
          } else {
            toast(res.message)
          }
        }).catch(err => {
          toast(err);
        });
      },
      changeTitle(num){
        if(num==2){
          this.$router.push({name:'myGift'})
        }else {
          this.$router.push({name:'userCenter'})
        }
      },
      changeTab(num) {
        if (num == 1) {
          this.currentShow = true
        } else {
          this.currentShow = false
        }
      },
      toUseExchange() {
        this.$router.push({name:'quickBuySell'})
      }
    },
    components: {
      CouponDetail,
      pagingBy,
      noDataTip
    }
  }
</script>

<style lang="scss" scoped>
  .mygift-main-content {
    .tab-list {
      padding-top: 20px;
      text-align: left;
      background-color: #fff;
      line-height: 50px;
      .tab-item {
        text-align: center;
        display: inline-block;
        width: 150px;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        background-color: #86A5F8;
        &:nth-child(2) {
          margin-left: 10px;
        }
        &.active {
          color: #ffffff;
          background-color: #3573FA;
        }
      }
      .go-center{
        float: right;
        padding: 5px 10px;
        border-radius: 15px;
        background-color: #86A5F8;
        color: #FFFFFF;
        line-height: 16px;
        margin-top: 8px;
      }
    }
    .gift_content {
      border: 1px solid #ccc;
      margin: 0 0 30px 0;
      .gift_tab {
        border-bottom: 1px solid #d5d5d5;
        height: 79px;
        overflow: hidden;
        text-align: left;
        .exchange {
          display: inline-block;
          width: 200px;
          text-align: center;
          font-size: 16px;
          color: #333333;
          height: 78px;
          line-height: 78px;
          cursor: pointer;
          &:hover, &.active {
            color: #5087ff;
            border-bottom: 1px solid #5087FF;
          }
        }
      }
      .exchange_content {
        padding: 25px 0;
        .discount_ticket {
          width: 50%;
          height: 140px;
          margin: 25px 0;
          float: left;
        }
        .page-wrap {
          width: 100%;
          float: left;
        }
      }
    }
  }
</style>
