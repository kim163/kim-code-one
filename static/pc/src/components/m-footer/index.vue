<template>
    <div class="m-footer-main">
        <router-link :to="{name: item.link}" class="link-item" tag="div" v-for="item in linkList" :key="item.icon">
            <i class="iconfont" :class="item.icon"></i>
            <div class="link-name">{{item.name}}</div>
        </router-link>
    </div>
</template>

<script>
  export default {
    name: "mobile-footer",
    data() {
      return {
        linkList: [
          {
            icon:'',
            name:'交易大厅',
            link:''
          },
          {
            icon:'',
            name:'买入挂单',
            link:'tranbuy'
          },
          {
            icon:'',
            name:'卖出挂单',
            link:'transell'
          },
          {
            icon:'',
            name:'交易记录',
            link:'mTranRecord'
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
    .m-footer-main{
        width: 100%;
        height: r(49);
        background: #FFFFFF;
    }
</style>