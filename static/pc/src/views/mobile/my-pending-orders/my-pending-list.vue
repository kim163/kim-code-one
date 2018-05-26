<template>
  <Scroll
          ref="scrollIn"
          :updateData="[orderList]"
          :refreshData="[]"
          class="content"
          @pullingDown="loadRefresh"
          @pullingUp="loadMore">
    <ul>
      <li v-for="(item,i) in orderList" :key="i" class="order-item">
        <div class="order-info">
          <div class="text-left">{{item.createtime | Date('yyyy-MM-dd hh:mm:ss')}}</div>
          <div class="text-right">
            <span class="c-blue" v-show="item.type == 12">{{$t('postPend.buyer')}}</span>
            <span class="c-red" v-show="item.type == 11">{{$t('postPend.seller')}}</span>
          </div>
        </div>
        <div class="order-info">
          <div class="text-left">{{$t('table.quantity')}} {{item.amount}} UET</div>
          <div class="text-right">{{$t('table.unitPrice')}} 0.001 CNY</div>
        </div>
        <div class="order-info">
          <div class="text-left">{{$t('table.completed')}} {{(item.successAmount/item.amount)*100 | toFixed(2) }}%</div>
          <div class="text-right">
            <span class="btn drop-off" v-if="type === 'processing'">{{$t('table.remove')}}</span>
            <div v-else>
              <span class="btn restored">{{$t('table.restored')}}</span>
              <span class="btn delete">{{$t('table.deleteOrder')}}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </Scroll>
</template>

<script>
  import Scroll from 'vue-slim-better-scroll'
  import {mapGetters} from 'vuex'
  import {
    getOrderxPendingPage,
    getOrderxPendingUnshelve,
    putToDown
  } from 'api/transaction'

  export default {
    name: "my-pending-list",
    data() {
      return {
        orderList: [],
        limit:10,
        offset:0,
        total:0
      }
    },
    components:{
      Scroll
    },
    computed:{
      ...mapGetters([
        'userData'
      ]),
      totalPage () {
        return Math.ceil(this.total / this.limit)
      },
    },
    props: {
      type: {
        type: String,
        default: 'processing'
      }
    },
    methods:{
      getData(){
        const api = type === 'processing' ? getOrderxPendingPage : getOrderxPendingUnshelve
        const request = {
          limit: this.limit,
          offset: this.offset,
          credit: this.userData.userId,
          debit: this.userData.userId
        }
        api(request).then(res => {
          if(res.code === 10000){

          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast("请求失败")
        })
      },
      loadRefresh(){

      },
      loadMore(){

      }
    },
    mounted(){

    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .order-item {
    width: 100%;
    height: r(127);
    background: #FFFFFF;
    border-top: 1px solid #D8D8D8;
    border-bottom: 1px solid #D8D8D8;
    margin-bottom: r(10);
  }

  .order-info {
    display: flex;
    justify-content: space-between;
    padding: 0 r(10);
    margin-top: r(15);
    @include f(16px);
    .text-right {
      .c-blue {
        color: #4982FF;
      }
      .c-red {
        color: #FF0000;
      }
    }
  }

  .btn {
    display: inline-block;
    width: r(70);
    height: r(24);
    text-align: center;
    line-height: r(24);
    @include f(15px);
    border-radius: 2px;
    color: $white;
    &.drop-off {
      background: #4982FF;
    }
    &.restored {
      background: #9D9D9D;
    }
    &.delete {
      background: #86A5F8;
    }
  }
</style>