<template>
  <div>
    <mobile-header>绑定银行卡</mobile-header>
    <div class="p-def">
      <div class="card-item" v-for="(item,i) in cardList" :key="i">
        <div class="card-info">
          <div class="title">银行卡号</div>
          <div class="info">{{item.account}}</div>
        </div>
        <div class="card-info">
          <div class="title">开户行</div>
          <div class="info">{{item.bank}}</div>
        </div>
        <div class="card-info">
          <div class="title">持卡人姓名</div>
          <div class="info">{{item.name}}</div>
        </div>
        <div class="card-info">
          <div class="unbind" @click="unbindBankConfrim(item.account)">解除绑定</div>
        </div>
      </div>
      <div class="m-top-md">
        <router-link :to="{name: 'mBindCard',params: {id: 3}}" class="bind-def-btn" v-if="cardList.length < 3">添加新的银行卡
        </router-link>
        <div v-else class="bind-def-btn disabled">添加新的银行卡</div>
      </div>
    </div>
    <confirm-dialog v-model="showConfirm">
      <div slot="content">
        <div class="dialog-content">您是否确定解绑该银行卡？</div>
      </div>
      <div slot="leftBtn" class="confirm-btn-cancel dialog-cancel">暂不解绑</div>
      <div slot="rightBtn" class="dialog-btn-yes" @click="unbind">确定解绑</div>
    </confirm-dialog>
  </div>
</template>

<script>
  import MobileHeader from 'components/m-header'
  import {mapGetters} from 'vuex'
  import ConfirmDialog from 'components/confirm'
  import {
    getBankList,
    unbindBank
  } from 'api/user-center'

  export default {
    name: "card-list",
    data() {
      return {
        cardList: [],
        showConfirm: false,
        account: '',
      }
    },
    components: {
      MobileHeader,
      ConfirmDialog
    },
    computed: {
      ...mapGetters([
        'userId'
      ])
    },
    methods: {
      unbindBankConfrim(account) {
        if (account) {
          this.account = account
          this.showConfirm = true
        }
      },
      getBankListInfo() {
        getBankList({userId: this.userId}).then(res => {
          console.log(res)
          if (res.code === 10000) {
            console.log('card list:',res)
            this.cardList = res.data.filter((item) => {
              return item.type === 3
            })
          } else {
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      unbind() {
        const data = {
          userId: this.userId,
          account: this.account
        }
        unbindBank(data).then(res => {
          if (res.code === 10000) {
            toast(res.message)
            this.getBankListInfo()
          } else {
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      }
    },
    mounted() {
      this.getBankListInfo()
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .card-item {
    width: 100%;
    background: $white;
    border-radius: r(5);
    margin-bottom: r(20);
    box-shadow: 0px 0px 5px rgba(0,0,0,.2);
    .card-info {
      display: flex;
      justify-content: space-between;
      padding: 0 r(15);
      height: r(50);
      line-height: r(50);
      border-bottom: 1px solid #dfdfdf;
      @include f(18px);
      &:last-child {
        border-bottom: none;
      }
    }
    .unbind {
      width: 100%;
      text-align: center;
      color: #ff0000;
    }
  }

  .m-top-md {
    margin-top: r(30);
  }
</style>