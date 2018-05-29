<template>
  <scroll
          ref="scroll"
          :updateData="[dataList.data]"
          :refreshData="[]"
          class="content"
          @pullingDown="loadRefresh"
          @pullingUp="loadMore"
  >
    <div class="mobile-trandatas mtransell-list">
      <div class="tranlist-container">

        <div class="tranlist-item" v-for="(item,i) in dataList.data||[]">
          <router-link :to="{name:'transellForm',params:{ id: item.id}}" :key="i" class="cfx">
            <div class="fl mtran-itemleft"><span class="disp-inlblo" v-html="proUserAvatars(item.userName)"> </span>
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
                <a href="javascript:void(0);" class="transaction-btn" @click="showView(item,i)">{{$t('transactionHome.saleUet')}}</a>
              </p>
              <p class="right-arrow">
                <i class="iconfont icon-right-arrow"></i>
              </p>
            </div>
          </router-link>
          <transition name="message">
            <div class="tran-contpart" v-show="item.already" :ref="item.id">
                      <span class="s s1">
                         <p>数量 {{item.amount}} UET</p>
                         <p>单价 0.01 元</p>
                      </span>
              <span class="s s2">总值 {{item.amount}}UET</span>
              <span class="input-box">
                          <input type="text" v-model="buyAmountUet"> UET
                      </span>
              <span class="input-box">
                          <input type="text" :value="buyAmountCny" readonly>CNY
                      </span>
              <span class="btns">
                          <span class="btn btn-primary" @click="placeAnOrder(item)">下单</span>
                          <span class="btn btn-cancel gray">取消</span>
                      </span>
            </div>
          </transition>
        </div>

      </div>
    </div>
  </scroll>
</template>
<script>
  import {transaction} from 'api';
  import {generateTitle} from '@/util/i18n';
  import {SETTING} from "@/assets/data";
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import Scroll from 'vue-slim-better-scroll'

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
          type: 12,
          startBalance: 0
          //status: 41
        },
        buyAmountUet: '',
      }
    },
    computed: {
      ...mapGetters(["userData"]),
      avatarDealw() {
        return this.SETTING.avatarColor.length;
      },
      buyAmountCny: function () {
        return Number(this.buyAmountUet) * 0.01;
      },
      totalPage() {
        return Math.ceil(this.dataList.total / this.reqData.limit)
      },
    },
    methods: {
      generateTitle,
      proUserAvatars(name) {
        let mathRand = parseInt(Math.random() * this.avatarDealw, 10);
        let avatarColor = this.SETTING.avatarColor[mathRand];
        if (name != '' || name != 'undefined') {
          let nameFirst = name.substring(0, 1);
          let avaHtml = '<a class="avatars-item" style="background: ' + avatarColor + ' ">' + nameFirst + '</a>';

          return avaHtml;
        }
      },

      searchDataList(index) {
        if (!isNaN(index)) {
          this.reqData.offset = (index - 1) * this.reqData.limit;
        }
        console.log('reqqq:', this.reqData);

        transaction.getOrderxPendingPage(this.reqData).then(res => {
          console.log('卖出UET get OrderxPage data:', res);
          $load.close();
          this.dataList.data = res.data.map(item => {
            item.already = false;
            return item;
          });
          this.dataList.total = res.pageInfo.total;
          if (this.totalPage - 1 <= this.reqData.offset) {
            this.$refs.scroll.update(true)
          }
        }).catch(error => {
          this.reset(res.message);
        });
      },

      showView(item, i) {
        if (this.$refs[item.id][0].style.display == "") {
          this.$refs[item.id][0].style.display = 'block';
        }

        this.$nextTick(() => {
          item.already = !item.already;
        });
      },

      placeAnOrder(item) {
        console.log('this.buyAmountUet:', this.buyAmountUet)
        console.log(this.buyAmountCny)
        console.log('item')
        console.log(item)
        console.log('test:' + this.userData)
        this.requestda = {
          orderId: item.id,
          userId: this.userData.userId,
          accountChainVo: {
            name: this.userData.nickname,
            address: this.userData.accountChainVos[0].address,
            assetCode: 'UET', //资产编码 默认 UET,登录后资产的编码
            amount: this.buyAmountUet //uet的数量
          },
          accountCashVo: {
            account: item.accountTwin,
            bank: item.accountMerchantTwin, //机构名称
            name: item.accountNameTwin,
            type: item.accountTypeTwin,
            amount: this.buyAmountCny
          }
        }
        console.log(this.requestda)
        transaction.placeAnOrder(this.requestda).then((res) => {

          console.log(res)
          if (res.code == 10000) {
            toast("下单成功，请及时支付,10分钟内未完成支付，将自动取消订单");
          }

        }).catch(err => {
          toast(res.message);
        })
      },
      loadRefresh() {
        this.reqData.offset = 0
        this.dataList.data = []
        this.searchDataList()
      },
      loadMore() {
        this.reqData.offset += 1
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
