<template>
  <div>
    <MobileHeader>账户管理
      <span class="del" @click="delContent" v-if="!isDel">删除</span>
      <span class="del" @click="saveContent" v-if="isDel">保存</span>
    </MobileHeader>
    <div class="account-list">
      <div class="list-item">
        <div class="account-box" @click="goDetailPage">
          <div class="up-line">
            <p class="user-name">anson001</p>
            <p class="order-num">195374465456465456456</p>
            <span class="iconfont icon-right-arrow right-direct"></span>
          </div>
          <div class="bottom-line">
            <span class="num">100000</span>UET
          </div>
        </div>
        <div class="del-box" v-if="isDel">
          <span class="iconfont icon-del-box"></span>
        </div>
      </div>
    </div>
    <div class="add-account" @click="addAccount">添加账户</div>
  </div>

</template>

<script>
  import MobileHeader from 'components/m-header'

  export default {
    name: "account-manager",
    data() {
      return {
        isDel: false
      }
    },
    methods: {
      delContent() {
        this.isDel = true
      },
      saveContent() {
        this.isDel = false
      },
      addAccount(){
         this.$router.push({name:'mAddAccount'})
      },
      goDetailPage(){
        this.$router.push({name:'mAccountDetail'})
      }
    },
    components: {MobileHeader}
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .del {
    float: right;
    padding-right: r(10);
    @include f(16px)
  }

  .account-list {
    margin-top: r(20);
    .list-item {
      width: 100%;
      height: r(102);
      background-color: #fff;
      display: flex;
      flex-direction: row;
      @include f(14px);
      .account-box {
        flex: 1;
        .up-line {
          height: r(61);
          border-top: 1px solid #E9E9E9;
          border-bottom: 1px solid #E9E9E9;
          color: #333;
          padding: r(12);
          position: relative;
          .user-name {
            @include f(14px)
          }
          .order-num {
            @include f(14px);
            padding-top: r(6);
          }
          .right-direct {
            position: absolute;
            right: r(10);
            top: r(20);
            @include f(22px);
            color: #c2c2c2;

          }
        }
        .bottom-line {
          height: r(40);
          text-align: right;
          color: #333;
          padding: r(12);
          .num {
            color: #ec3a4e;
            padding-right: r(5);
          }
        }
      }

      .del-box {

        width: r(49);
        height: r(102);
        text-align: center;
        line-height: r(102);
        background-color: #fff;
        border: 1px solid #E9E9E9;
        color: #ec3a4e;
        @include f(20px);
      }
    }
  }
  .add-account{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: r(44);
    background-color: #3573FA;
    color: #fff;
    text-align: center;
    line-height: r(44);
  }
</style>
