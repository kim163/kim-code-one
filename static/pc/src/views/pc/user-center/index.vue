<template>
  <div class="container min-width min-height max-width">
    <div class="tab-list">
      <router-link tag="div" class="tab-item"
           v-for="(item,index) in navList"
           :key="index"
           :to="{name:item.linkName}">
        {{$t(item.name)}}
      </router-link>
      <router-link class="go-center" :to="{name:'walletCenter'}">返回钱包中心</router-link>
    </div>
    <div class="user-content">
      <transition mode="out-in"
                  name="fade-quick">
        <router-view></router-view>
      </transition>
    </div>
  </div>

</template>

<script>

  export default {
    name: "user-center",
    data() {
      return {
        navList: [
          {
            name: 'navbar.userCenter',
            linkName: 'userCenter'
          },
          {
            name: 'userCenter.accountManagement',
            linkName: 'accountManage'
          },
          {
            name: 'userCenter.myGift',
            linkName: 'myGift'
          }
        ],
      }
    },
    components: {
    },
    computed: {
    },
    watch: {
    },
    created() {
    },

    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .tab-list {
    padding-top: 20px;
    background-color: #fff;
    text-align: left;
    line-height: 50px;
    .tab-item {
      display: inline-block;
      width: 150px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      color: #fff;
      cursor: pointer;
      background-color: #86A5F8;
      margin-right: 10px;
      /*&:nth-child(2) {*/
        /*margin-left: 10px;*/
      /*}*/
      &.active {
        color: #ffffff;
        background-color: #3573FA;
      }
    }
    .go-center {
      float: right;
      padding: 5px 10px;
      border-radius: 15px;
      background-color: #86A5F8;
      color: #FFFFFF;
      line-height: 16px;
      margin-top: 8px;
    }
  }

  .user-content {
    border: 1px solid #D3D3D3;
    margin-bottom: 50px;

  }

</style>
