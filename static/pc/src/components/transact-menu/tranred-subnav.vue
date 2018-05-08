<template>
  <div class="section tranred-subnav">
    <div class="container">
      <div class="row">
        <router-link v-for="(item,i) in tranredNavData" class="item-info" :to="item.to" :key="i">
          {{generateTitle(item.name)}}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import { generateTitle } from '@/util/i18n'
  let tranredNavData = [
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

    &:hover, &.active {
      color: #5087ff;
      border-bottom: 1px solid #5087FF;
    }
  }
}

</style>
