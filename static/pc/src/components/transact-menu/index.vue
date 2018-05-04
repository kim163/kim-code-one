<template>
  <div class="section transact-menu">
    <div class="container">
      <div class="row">
        <router-link v-for="(item,i) in transactMenuData" class="item-info" :to="item.to" :key="i">
          {{generateTitle(item.name)}}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import { generateTitle } from '@/util/i18n'
  let transactMenuData = [
    {name:'transactionHome.buyUet', value: 'buyUet', to: {name: 'transaction'} },
    {name:'transactionHome.saleUet', value: 'saleUet', to: {name: 'index'} },
    {name:'transactionHome.postPendOrd', value: 'postPendOrd', to: {name: 'index'} },
    {name:'transactionHome.orderRecord', value: 'orderRecord', to: {name: 'index'} }
  ]

  export default {
    data() {
      return {
        transactMenuData: transactMenuData
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
.transact-menu{
  height: 48px;
  line-height: 48px;
  min-height: auto;
  margin-top: 30px;
  a{
    display: inline-block;
    width: 200px;
    text-align: center;
    font-size: 16px;
    color: #787876;
    border: 1px solid #D4D4D4;
    border-bottom: none;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    margin-right: 18px;
    &:hover, &.active {
      color: #ffffff;
      background: #5087FF;
      border: 1px solid #5087FF;
    }
  }
}

</style>
