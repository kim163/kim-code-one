<template>
  <div class="trad-list" :class="{sell: isSell}">
    <div class="title-list" :class="{sell: isSell}">
      <div class="title-info" v-for="(item,index) in titleList" :key="index">{{item.name}}</div>
    </div>
    <div class="trad-info" v-if="!noData">
      <transition-group tag="div"
                        enter-active-class="fadeInRight"
                        leave-active-class="no-delay"
                        >
          <tran-detail v-for="(item,index) in dataList.data"
                       :key="item.id"
                       :item="item"
                       :is-sell="isSell"
                       :class="`deley-${index}`"></tran-detail>
      </transition-group>
    </div>
    <paging-by class="page" v-if="!noData" :data="dataList.pageInfo" @search="pageInfo"></paging-by>
    <no-data-tip v-if="noData"></no-data-tip>
  </div>
</template>

<script>
  import {
    getOrderxPendingPage
  } from 'api/transaction';
  import PagingBy from "components/paging-by";
  import {SETTING} from "@/assets/data";
  import NoDataTip from 'components/no-data-tip';
  import TranDetail from './trading-detail'
  import TransactionList from "../../mobile/transaction-record/transaction-list";

  export default {
    name: "trading-list",
    data(){
      return{
        SETTING,
        titleList:[
          {
            name: this.isSell ? '卖家' : '买家'
          },
          {
            name: 'UET数量'
          },
          {
            name: '支付方式'
          },
          {
            name: '操作'
          },
        ],
        dataList: {
          data: [],
          pageInfo: {}
        },
        reqData: {
          limit: 7,
          offset: 0,
          currentPage:1,
          status:1,
          startBalance: 0
        },
        noData:false,
      }
    },
    props:{
      isSell:{
        type:Boolean,
        default:false
      }
    },
    computed: {
      avatarDealw(){
        return this.SETTING.avatarColor.length;
      }
    },
    components:{
      TransactionList,
      PagingBy,
      NoDataTip,
      TranDetail
    },
    methods:{
      getTradList(){
        this.reqData.offset = (this.reqData.currentPage - 1) * this.reqData.limit;
        Object.assign(this.reqData,{
          type: this.isSell ? 12 : 11
        })
        this.dataList.data = []
        getOrderxPendingPage(this.reqData).then(res => {
          console.log('大厅:',res)
          if(res.code === 10000){
            if(res.data.length === 0 && this.reqData.offset === 0){
              this.noData = true;
            }else{
              this.noData = false;
              this.dataList.data = res.data.map(item => {
                let mathRand = parseInt(Math.random()*this.avatarDealw,10);
                item.already = false;
                item.avatarColor = this.SETTING.avatarColor[mathRand];
                return item;
              });
            }
            this.dataList.pageInfo = res.pageInfo;
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      pageInfo(index){
        this.reqData.currentPage = index
        this.getTradList()
      }
    },
    created(){
      this.getTradList()
    }
  }
</script>

<style lang="scss" scoped>
  .list-enter{
    opacity: 0;
    transform: translateX(50px);
  }
  .list-move{
    transition: all .5s;
  }
  .trad-list{
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #86A5F8;
    min-height: 682px;
    overflow: hidden;
    &.sell{
      border-color: #F68887;
    }
    .title-list{
      width: 100%;
      height: 50px;
      background: #86A5F8;
      display: flex;
      &.sell{
        background: #F68887;
      }
      .title-info{
        width: 23%;
        text-align: center;
        line-height: 50px;
        color: #ffffff;
        &:first-child{
          width: 30%;
        }
      }
    }
    .trad-info{
      position: relative;
      min-height: 560px;
    }
    .page{
      width: 100%;
      height: 63px;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0;
    }
  }
  @for $i from 1 to 10{
    .deley-#{$i}{
      animation-duration: 0.1s * $i;
    }
  }
  .no-delay{
    animation-duration:0s
  }
</style>