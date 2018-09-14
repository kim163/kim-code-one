<template>
  <div class="trad-list" :class="{sell: isSell}">
    <div class="title-list" :class="{sell: isSell}">
      <div class="title-info" v-for="(item,index) in titleList" :key="index">{{item.name}}</div>
    </div>
    <div class="trad-info" v-if="dataList.data.length > 0">
      <div v-for="(item,index) in dataList.data" :key="index">
        <tran-detail :item="item" :is-sell="isSell"></tran-detail>
      </div>
      <paging-by :data="dataList.pageInfo" @search="pageInfo"></paging-by>
    </div>
    <no-data-tip v-else></no-data-tip>
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
          limit: 10,
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
  .trad-list{
    width: 100%;
    background: #FFFFFF;
    border: 1px solid #86A5F8;
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
        width: 25%;
        text-align: center;
        line-height: 50px;
        color: #ffffff;
      }
    }
  }
</style>