<template>
  <div>
  <div class="section transact-menu">
    <div class="container">
      <div class="row">
        <router-link v-for="(item,i) in transactMenuData" class="item-info" :to="item.to" :key="i">
          {{generateTitle(item.name)}}
        </router-link>
        <a href="javascript:void(0);" class="item-info" @click="isShowPostPend=true"> {{$t('transactionHome.postPendOrd')}} </a>
        <router-link :to="{name: 'tranPending'}" class="item-info" >{{$t('transactionHome.pengdingOrder')}}</router-link>
        <router-link :to="{name: 'tranRecord'}" class="item-info" >{{$t('transactionHome.orderRecord')}}</router-link>
      </div>
    </div>
  </div>

   <post-pendord v-if="isShowPostPend" @hide="isShowPostPend=false"></post-pendord>
  </div>
</template>
<script>
  import postPendord from 'components/trancomp/post-pendord'
  import { generateTitle } from '@/util/i18n'
  let transactMenuData = [
    {name:'transactionHome.buyUet', value: 'buyUet', to: {name: 'transaction'} },
    {name:'transactionHome.saleUet', value: 'saleUet', to: {name: 'transell'} }
  ]

  export default {
    data() {
      return {
        transactMenuData: transactMenuData,
        isShowPostPend: false
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
      postPendord
    }
  };
</script>
<style lang="scss">
.transact-menu{
  height: 48px;
  line-height: 48px;
  min-height: auto;
  margin-top: 31px;
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
