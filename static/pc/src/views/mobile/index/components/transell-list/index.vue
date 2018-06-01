<template>
  <scroll
          ref="scroll"
          :updateData="[dataList.data]"
          :refreshData="[]"
          class="content"
          :pullDownConfig="pullDownCfg"
          :pullUpConfig="pullUpCfg"
          @pullingDown="loadRefresh"
          @pullingUp="loadMore"
  >
    <div class="mobile-trandatas mtransell-list">
      <div class="tranlist-container">

        <div class="tranlist-item" v-for="(item,i) in dataList.data||[]">
          <router-link :to="{name:'transellForm',params:{ id: item.id}}" :key="i" class="cfx">
            <div class="fl mtran-itemleft">
              <span class="disp-inlblo" >
                   <a class="avatars-item" :style="{'background':item.avatarColor}" > {{(item.userName).substring(0, 1)}} </a>
              </span>
            </div>
            <div class="fr mtran-itemright">
              <p class="item user-info">
                <span class="user-name"> {{item.userName}} </span>
                <span v-if="item.accountTypeTwin === 1" class="mpay alipay">{{$t('transactionHome.payAlipay')}}</span>
                <span v-else-if="item.accountTypeTwin === 2"
                      class="mpay wechat">{{$t('transactionHome.payWechat')}}</span>
                <span v-else-if="item.accountTypeTwin === 3" class="mpay bank">{{$t('transactionHome.payBank')}}</span>
                <span v-else class="mpay">
                         {{item.accountTypeTwin}}
                       </span>
              </p>
              <p class="item tranCountOrRate">
                <span class="tradeTotal">{{$t('transactionHome.monthlyTran')}} {{item.tradeTotal}} {{$t('transactionHome.tradeTotal')}}</span>
                <span>{{$t('transactionHome.completionRate')}}</span>
                <span v-if="item.tradeTotal">{{ ((item.finishedTotal/item.tradeTotal)*100).toFixed(2)}}</span>
                <span v-if="!item.tradeTotal">0 </span>％
              </p>
              <p class="item amount-line">
                <span class="unit-price">{{$t('transactionHome.unitPrice')}}：</span> 0.01
                <span class="quantity-txt">{{$t('transactionHome.quantity')}}：</span>
                <span class="amount"> {{item.amount}} UET </span>
              </p>

              <p class="item hide">
                <a href="javascript:void(0);" class="transaction-btn">{{$t('transactionHome.saleUet')}}</a>
              </p>
              <p class="right-arrow">
                <i class="iconfont icon-right-arrow"></i>
              </p>
            </div>
          </router-link>
        </div>

      </div>
    </div>
  </scroll>
</template>
<script>
  import {transaction} from 'api';
  import {generateTitle} from '@/util/i18n';
  import {SETTING} from "@/assets/data";
  import Scroll from 'vue-slim-better-scroll';

  export default {
    data() {
      return {
        SETTING,
        dataList: {
          data: [],
          total: 0
        },
        reqData: {
          limit: 10,
          offset: 0,
          currentPage:1,
          type: 12,
          startBalance: 0
          //status: 41
        },
        pullDownCfg:{
          txt:this.generateTitle('scorllCfg.pullDownText')
        },
        pullUpCfg:{
          txt:{
            more:this.generateTitle('scorllCfg.pullUpMore'),
            noMore:this.generateTitle('scorllCfg.pullUpNoMore')
          }
        }
      }
    },
    computed: {
      avatarDealw() {
        return this.SETTING.avatarColor.length;
      },
      totalPage() {
        return Math.ceil(this.dataList.total / this.reqData.limit)
      }
    },
    methods: {
      generateTitle,
      searchDataList(index) {
        //if (!isNaN(index)) {
          this.reqData.offset = (this.reqData.currentPage - 1) * this.reqData.limit;
        //}
        console.log('reqqq:', this.reqData);

        transaction.getOrderxPendingPage(this.reqData).then(res => {
          console.log('卖出UET getOrderxPendingPage data:', res);
          this.dataList.data = [...this.dataList.data,...res.data.map(item => {
            let mathRand = parseInt(Math.random()*this.avatarDealw,10);
            item.avatarColor = this.SETTING.avatarColor[mathRand];
            return item;
          })];
          this.dataList.total = res.pageInfo.total;
          if (this.totalPage <= this.reqData.currentPage) {
            this.$refs.scroll.update(true)
          }
        }).catch(error => {
          this.reset(res.message);
        });
      },

      loadRefresh() {
        this.reqData.currentPage = 1
        this.dataList.data = []
        this.searchDataList()
      },
      loadMore() {
        this.reqData.currentPage += 1
        this.searchDataList()
      }

    },
    created() {
      this.searchDataList();
    },
    mounted() {
    },
    activated() {
    },
    components: {
      Scroll
    }
  };
</script>
<style lang="scss">

</style>
