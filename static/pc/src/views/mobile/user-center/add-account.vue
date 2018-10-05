<template>
  <div class="addAccount-container">
    <MobileHeader>账户添加</MobileHeader>
    <div class="addAccount-content">
      <div class="account">账号 <input type="text" class="account-input" v-model="userName"></div>
      <div class="password">密码 <input type="password" class="password-input" v-model="userPassword"></div>
      <div class="addAccount-btn" @click="loginAccount">添加</div>
      <div class="content-remind">
        <p class="remind-title">温馨提示</p>
        <p class="remind-content">1.账户添加后可快速切换登录和UET互转</p>
        <p class="remind-content">2.钱包旧用户,可以使用旧账户和手机邮箱登录;</p>
      </div>
    </div>
  </div>
</template>

<script>
  import MobileHeader from 'components/m-header'
  import {userCenter} from 'api'
  import {mapGetters} from 'vuex'
  import {$localStorage} from '@/util/storage';

  export default {
    name: "add-account",
    data() {
      return {
        userName: '',
        userPassword: "",
        userId: ''
      }
    },
    computed: {
      ...mapGetters(["centerId"])
    },
    methods: {
      loginAccount() {
        const request = {
          'userName': this.userName,
          'password': this.userPassword,
          'id': this.centerId == '' ? '' : this.centerId
        }

        userCenter.chainLogin(request).then(res => {
          console.log(res, '撒看见了的')
          if (res.code == '10000') {
            toast('添加成功')
            this.userId = res.data.userId
            this.userName = ''
            this.userPassword = ''
            this.$store.commit('SET_ACCOUNT_MANAGER_TOKEN', {type: 'add', value: 'userToken', userId: this.userId})
          } else {
            toast(res.message)
          }
        })
      },

    },
    components: {MobileHeader}
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .addAccount-content {
    margin-top: r(20);
    .account {
      background-color: #fff;
      height: r(44);
      width: 100%;
      padding-left: r(20);
      line-height: r(44);
      .account-input {
        height: r(30);
        padding-left: r(10);
        margin-left: r(10);
      }
      input:focus {
        outline: none;
      }
    }
    .password {
      background-color: #fff;
      height: r(44);
      padding-left: r(20);
      margin-top: r(10);
      line-height: r(44);
      .password-input {
        height: r(30);
        padding-left: r(10);
        margin-left: r(10);
      }
      input:focus {
        outline: none;
      }
    }
    .addAccount-btn {
      text-align: center;
      margin: 0 auto;
      background-color: #3573FA;
      width: 80%;
      color: #fff;
      height: r(44);
      line-height: r(44);
      border-radius: r(3);
      margin-top: r(20);
    }
    .content-remind {
      margin-top: r(40);
      padding-left: r(20);
      .remind-title {
        @include f(18px);
        color: #333;
      }
      .remind-content {
        @include f(14px);
        color: #787876;
        margin-top: r(10);
      }
    }
  }
</style>
