<template>
  <div class="section tranred-subnav noborder">
    <div class="container border-box">
      <div class="row">
        <router-link v-for="(item,i) in tranredNavData" class="item-info" :to="item.to" :key="i">
          {{generateTitle(item.name)}}
        </router-link>

        <span class="back-hall"> 返回交易大厅</span>
        <div class="search-box">
          <input type="text" class="search-input" placeholder="请输入对方昵称、账号"><span class="search-btn" >搜索</span>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import { generateTitle } from '@/util/i18n'
  let tranredNavData = [
//    {name:'transactionRecord.tranPending', value: 'tranPending', to: {name: 'tranPending'} },
    {name:'transactionRecord.tranProgress', value: 'tranProgress', to: {name: 'tranProgress'} },
    {name:'transactionRecord.tranComplete', value: 'tranComplete', to: {name: 'tranComplete'} },
    {name:'transactionRecord.appealRecord', value: 'appealRecord', to: {name: 'appealRecord'} }
  ]

  export default {
    data() {
      return {
        tranredNavData: tranredNavData
      }
    },
    methods: {
      generateTitle
    },
    created() {
    },
    mounted() {
    },
    activated() {
    },
    components: {
    }
  };
</script>
<style lang="scss">
.tranred-subnav{
  height: 80px;
  line-height: 80px;
  min-height: auto;
  border-bottom: 1px solid #D4D4D4;
  a{
    display: inline-block;
    width: 200px;
    text-align: center;
    font-size: 16px;
    color: #333333;
    height: 77px;
    line-height: 77px;

    &:hover, &.active {
      color: #5087ff;
      border-bottom: 1px solid #5087FF;
    }
  }
}

.noborder{
  border:0;
}
  .border-box{
    border:1px solid #ccc;
  }
.back-hall{
  display:inline-block; float:right;
  height:42px;
  line-height: 42px;
  padding:0 20px;
  border:1px solid #5087FF;
  color:#5087FF;
  border-radius: 5px;
  margin:20px 20px 0 0;
}
  .search-box{
    display:inline-block; float:right;
    height:46px;
    margin:20px;
    width:330px;
  }
  .search-btn{
    display: inline-block;
    float:left;
    width: 100px;
    text-align: center;
    font-size: 16px;
    background: orange;
    color:#fff;
    height:42px;
    line-height: 42px;
    border-radius:0 5px 5px 0;
    cursor: pointer;
  }
  .search-input{
    float:left;
    width: 230px;
    border:1px solid #ccc;
    border-right:0;
    border-radius: 5px 0 0 5px;
    height:42px;
    line-height: 42px;
    padding:0 10px 0 30px;
  }
</style>
