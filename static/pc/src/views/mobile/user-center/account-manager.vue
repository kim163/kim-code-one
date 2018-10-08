<template>
  <div>
    <MobileHeader>账户管理
      <span class="del" @click="delContent" v-if="!isDel">删除</span>
      <span class="del" @click="saveContent" v-if="isDel">保存</span>
    </MobileHeader>
    <div class="account-list">
      <div class="list-item" v-for="list in accountArr">
        <div class="account-box" @click="goDetailPage(list.userId,list.address,list.name,list.nodeId)">
          <div class="up-line">
            <p class="user-symbol"><span class="iconfont icon-default-user"></span></p>
            <p class="user-name">{{list.name}}</p>
            <p class="order-num">{{list.address}}</p>
            <span class="iconfont icon-right-arrow right-direct"></span>
          </div>
          <div class="bottom-line">
            <span class="num">{{list.amount}}</span>UET
          </div>
        </div>
        <div class="del-box" v-if="isDel" @click="delAccount(list.name,list.userId)">
          <span class="iconfont icon-del-box"></span>
        </div>
      </div>
    </div>

    <confirmPopup :show="isConfirm">
      <div class="remind-title" slot="title">温馨提示</div>
      <div class="remind-content" slot="content">确定要删除{{accountName}}账号</div>
      <div slot="leftBtn" class="falsedefine" @click="cancelTrade">否</div>
      <div slot="rightBtn" class="okdefine" @click="okTrade">是</div>
    </confirmPopup>
    <div class="add-account" @click="addAccount">添加账户</div>
  </div>

</template>

<script>
  import MobileHeader from 'components/m-header'
  import {userCenter} from 'api'
  import confirmPopup from 'components/confirm'
  import {mapGetters} from 'vuex'

  export default {
    name: "account-manager",
    data() {
      return {
        isDel: false,
        accountArr: [],
        accountName: '',
        isConfirm: false,
        accountUserId: ''
      }
    },
    created() {
      this.getCenterInfo()
    },
    computed: {
      ...mapGetters(['centerId', 'userId'])
    },
    methods: {
      searchHomeInfo() {
        this.requestdata = {
          userId: this.userId
        };
        transaction.getHomeInfo(this.requestdata).then(res => {
          if (res.code == 10000) {
            this.homeInforma = res.data;
          }
        }).catch(err => {
          toast(err.message);
        })
      },
      getCenterInfo() {
        const request = {
          'id': this.centerId
        }
        userCenter.getCenterInfo(request).then(res => {
          if (res.code == '10000') {
            this.accountArr = res.data

          }
        })
      },
      cancelTrade() {
        this.isConfirm = false
      },
      okTrade() {
        this.isConfirm = false
        const request = {
          'userId': this.accountUserId
        }
        userCenter.deleteCenter(request).then(res => {
          if (res.code == '10000') {
            toast('删除关系成功！')
            this.getCenterInfo()
          }
        })
      },
      delAccount(val, cont) {
        this.accountName = val
        this.isConfirm = true
        this.accountUserId = cont
      },
      delContent() {
        this.isDel = true
      },
      saveContent() {
        this.isDel = false
      },
      addAccount() {
        this.$router.push({name: 'mAddAccount'})
      },
      goDetailPage(val,cont,name,id) {
        this.$router.push({name: 'mAccountDetail', params: {id: val,address:cont,username:name,node:id}})
      }
    },

    components: {MobileHeader, confirmPopup}
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
      background-color: #fff;
      display: flex;
      flex-direction: row;
      @include f(14px);
      margin-top: r(10);
      .account-box {
        flex: 1;
        .up-line {
          height: r(80);
          border-top: 1px solid #E9E9E9;
          border-bottom: 1px solid #E9E9E9;
          color: #333;
          position: relative;
          width: 100%;
          .user-symbol{
            width: r(40);
            height: r(40);
            background-color: #85abfc;
            border-radius: 50%;
            text-align: center;
            line-height: r(40);
            float: left;
            margin: r(10);
            span{
              color: #fff;
              @include f(24px)
            }
          }
          .user-name {
            @include f(14px);
            padding-top: r(12);
          }
          .order-num {
            @include f(14px);
            padding-top: r(6);
            width: 60%;
            word-break: break-all;
            overflow: hidden;
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
        text-align: center;
        line-height: r(102);
        background-color: #fff;
        border: 1px solid #E9E9E9;
        color: #ec3a4e;
        @include f(20px);
      }
    }
  }

  .remind-title {
    @include f(16px);
    color: #333;
    line-height: r(16);
  }

  .remind-content {
    @include f(14px);
    color: #787876;
    line-height: r(14);
    margin-top: r(48);
    margin-bottom: r(48);
  }

  /deep/ .confirm-main .confirm-footer .confirm-btn .falsedefine {
    background-color: #F5F5F5;
  }

  /deep/ .confirm-main .confirm-footer .confirm-btn .okdefine {
    background-color: #3573FA;
    color: #fff;
  }

  .add-account {
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
