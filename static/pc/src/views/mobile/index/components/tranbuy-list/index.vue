<template>
  <div class="mobile-trandatas-main">
    <scroll
            ref="scroll"
            :updateData="[dataList.data]"
            :refreshData="[]"
            class="content"
            :pullDownConfig="pullDownCfg"
            :pullUpConfig="pullUpCfg"
            @pullingDown="loadRefresh"
            @pullingUp="loadMore"
            v-if="!noData"
    >
      <div class="mobile-trandatas mtranbuy-list">
        <div class="tranlist-container">

          <div class="tranlist-item" v-for="(item,i) in dataList.data||[]">
            <router-link v-if="item.userId !== userData.userId" :to="{name:'tranbuyForm',params:{ id: item.id}}" :key="i">
               <tranbuy-detail :item="item" :key="item.id" ></tranbuy-detail>
            </router-link>
            <div v-else @click="tipsOwnOrder">
              <tranbuy-detail :item="item" :key="item.id" ></tranbuy-detail>
            </div>

          </div>
        </div>
      </div>
    </scroll>
    <no-data-tip v-else></no-data-tip>
  </div>
</template>
<script>
  import {transaction} from 'api';
  import {generateTitle} from '@/util/i18n';
  import {SETTING} from "@/assets/data";
  import Scroll from 'vue-slim-better-scroll';
  import NoDataTip from 'components/no-data-tip';
  import tranbuyDetail from './tranbuy-detail';
  import {mapGetters,mapActions,mapMutations} from 'vuex';

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
          type: 11,
          startBalance: 0
        },
        pullDownCfg:{
          txt:this.generateTitle('scorllCfg.pullDownText')
        },
        pullUpCfg:{
          txt:{
            more:this.generateTitle('scorllCfg.pullUpMore'),
            noMore:this.generateTitle('scorllCfg.pullUpNoMore')
          }
        },
        noData:false
      }
    },
    computed: {
      ...mapGetters(["userData"]),
      avatarDealw() {
        return this.SETTING.avatarColor.length;
      },
      totalPage() {
        return Math.ceil(this.dataList.total / this.reqData.limit)
      },
    },
    methods: {
      generateTitle,
      searchDataList(index) {
        // if (!isNaN(index)) {
          this.reqData.offset = (this.reqData.currentPage - 1) * this.reqData.limit;
        // }
        console.log('req:', this.reqData);

        transaction.getOrderxPendingPage(this.reqData).then(res => {
          console.log('买入UET get OrderxPageForHallSell data:');
          console.log(res);
          if(res.data.length === 0 && this.reqData.currentPage === 1){
            this.noData = true
          }else{
            this.noData = false
            this.dataList.data = [...this.dataList.data, ...res.data.map(item => {
              let mathRand = parseInt(Math.random()*this.avatarDealw,10);
              item.avatarColor = this.SETTING.avatarColor[mathRand];
              return item;
            })];
            this.dataList.total = res.pageInfo.total;
            if (this.totalPage <= this.reqData.currentPage) {
              this.$refs.scroll.update(true)
            }
          }
        }).catch(error => {
          this.reset(res.message);
        });
      },

      tipsOwnOrder(){
        toast('不能购买自己的挂单');
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
      Scroll,
      NoDataTip,
      tranbuyDetail
    }
  };
</script>
<style lang="scss">
  .mobile-trandatas-main{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>

