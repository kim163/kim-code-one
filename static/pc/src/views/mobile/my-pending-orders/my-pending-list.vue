<template>
  <div class="pending-main">
    <Scroll
            ref="scroll"
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
              <span class="c-blue" v-show="item.type === 12">{{$t('postPend.buyer')}}</span>
              <span class="c-red" v-show="item.type === 11">{{$t('postPend.seller')}}</span>
            </div>
          </div>
          <div class="order-info">
            <div class="text-left">{{$t('table.quantity')}} {{item.amount}} UET</div>
            <div class="text-right">{{$t('table.unitPrice')}} 0.001 CNY</div>
          </div>
          <div class="order-info">
            <div class="text-left">{{$t('table.completed')}} {{(item.successAmount/item.amount)*100 | toFixed(2) }}%</div>
            <div class="text-right">
              <span class="btn drop-off" v-if="tabType === 1" @click="putDownUpOrder(item.id,1)">{{$t('table.remove')}}</span>
              <div v-else-if="item.status != 11">
                <span class="btn restored" @click="putDownUpOrder(item.id,2)">{{$t('table.restored')}}</span>
                <span class="btn delete" @click="deleteOrder(item.id)">{{$t('table.deleteOrder')}}</span>
              </div>
              <div v-else>
                {{$t('postPend.removing')}}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </Scroll>
    <confirm-dialog v-model="showConfirm">
      <div slot="title">{{$t('postPend.delConfirmTitle')}}</div>
      <div slot="content">{{$t('postPend.delConfirmContent')}}</div>
      <div slot="rightBtn" @click="orderDelete">{{$t('postPend.confirmYes')}}</div>
    </confirm-dialog>
  </div>
</template>

<script>
  import Scroll from 'vue-slim-better-scroll'
  import {mapGetters} from 'vuex'
  import ConfirmDialog from 'components/confirm'
  import {
    getOrderxPendingPage,
    getOrderxPendingUnshelve,
    putToDown,
    putToUp,
    deleteUnshelve
  } from 'api/transaction'

  export default {
    name: "my-pending-list",
    data() {
      return {
        orderList: [],
        limit:10,
        offset:0,
        total:0,
        showConfirm: false,
        orderId:''
      }
    },
    components:{
      Scroll,
      ConfirmDialog
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
      tabType: {  // 1是进行中 2是已下架
        type: Number,
        default: 1
      }
    },
    methods:{
      getData(format = false){
        const api = this.tabType === 1 ? getOrderxPendingPage : getOrderxPendingUnshelve
        const request = {
          limit: this.limit,
          offset: this.offset,
        }
        if(this.tabType === 1){
          Object.assign(request,{
            credit: this.userData.userId,
            debit: this.userData.userId
          })
        }else{
          Object.assign(request,{
            statuses:[11,12],
          })
        }
        console.log(request)
        api(request).then(res => {
          if(res.code === 10000){
            console.log('pending data:',res)
            if(format){
              this.orderList = [...res.data]
            }else{
              this.orderList = Array.from(new Set([...this.orderList,...res.data]))
            }
            this.total = res.pageInfo.total
            if(this.totalPage - 1 <= this.offset){
              this.$refs.scroll.update(true)
            }
          }else{
            toast(res.message)
          }
        }).catch(error => {
          toast(error)
        })
      },
      putDownUpOrder(orderId,type){
        if(orderId){
          const api = type === 1 ? putToDown : putToUp
          api({orderId}).then(res => {
            if(res.code === 10000){
              toast(res.message)
              this.getData(true)
            }else{
              toast(res.message)
            }
          }).catch(error => {
            toast(error)
          })
        }
      },
      deleteOrder(orderId){
        if(orderId) {
          this.orderId = orderId
          this.showConfirm = true
        }
      },
      orderDelete(){
        this.showConfirm = false
        deleteUnshelve({orderId: this.orderId}).then(res => {
          if(res.code === 10000){
            toast(res.message)
            this.getData(true)
          }else{
            toast(res.message)
          }
        }).catch(error => {
          toast(error)
        })
      },
      loadRefresh(){
        this.offset = 0
        this.orderList = []
        this.getData()
      },
      loadMore(){
        this.offset += 1
        this.getData()
      }
    },
    mounted(){
      this.getData()
    },
    beforeRouteUpdate (to, from, next) {
      this.showConfirm = false
      next()
    },
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .pending-main{
    width: 100%;
    height: 100%;
  }
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