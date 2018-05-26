<template>
  <ul class="list">
    <router-link tag="li" :to="{name:'cashDesk',query:{ id: item.id}}" class="tran-item" v-for="(item,index) in data" :key="index">
      <div class="type-status">
        <div class="type blue-text" v-show="item.credit === userData.userId">{{$t('transactionRecord.buy')}}</div>
        <div class="type red-text" v-show="item.debit === userData.userId">{{$t('transactionRecord.sale')}}</div>
        <div class="status-time" v-if="type === 0">
            <div class="status">
              {{(item.status === 45 ? $t('transactionRecord.waitingForPayment') : $t('transactionRecord.waitingForRelease'))}}
            </div>
            <div class="time">{{item.status === 61 ? (item.intervalTime-item.elapsedTime | Date('mm:ss')) : '申诉锁定' }}</div>
        </div>
        <div class="status-time" v-else>
          <div class="status">
            {{$t('transactionRecord.tarnComplete')}}
          </div>
        </div>
      </div>
      <div class="user-amount">
        <div class="user">{{item.creditAccountNameTwin}}</div>
        <div class="amount">
          <span class="text-red">{{item.creditAmount}}</span> UET
        </div>
      </div>
    </router-link>
  </ul>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "transaction-list",
    data() {
      return{

      }
    },
    props:{
      type:{
        type:Number,
        default:0 //0代表交易中 1代表已完成
      },
      data:{
        type:Array,
        default:[]
      }
    },
    computed: {
      ...mapGetters([
        "userData"
      ])
    },
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";
  .list{
    display: block;
  }
  .tran-item{
    width: 100%;
    height: r(88);
    background: $white;
    border-top: 1px solid;
    border-bottom: 1px solid;
    border-color: #D8D8D8;
    margin-bottom: r(12);
    padding: r(20) r(10) 0;
    @include f(15px);
    .type-status{
      display: flex;
      justify-content: space-between;
      .type{
        &.red-text{
          color: #FF0000;
        }
        &.blue-text{
          color: #5087FF;
        }
      }
      .status-time{
        display: flex;
        justify-content: center;
      }
      .time{
        margin-left: r(5);
      }
    }
    .user-amount{
      display: flex;
      justify-content: space-between;
      margin-top: r(10);
      .text-red{
        color: #FF0000;
        @include f(18px)
        }
    }
  }
</style>