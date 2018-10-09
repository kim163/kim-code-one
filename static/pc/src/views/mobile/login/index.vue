<template>
  <div class="addAccount-container">
    <MobileHeader>账户登录
      <getLive800 class="service-logo" :isShowFont="false"></getLive800>
    </MobileHeader>
    <div class="addAccount-content">
      <div class="account">账号 <input type="text" class="account-input" v-model="userName" placeholder="账号 / 手机号 / 邮箱">
      </div>
      <div class="password">密码 <input type="password" class="password-input" v-model="userPassword"
                                      placeholder="请输入您的密码"></div>
      <div class="addAccount-btn" @click="loginAccount">登录</div>
      <div class="content-remind">
        <p class="remind-title">温馨提示</p>
        <p class="remind-content">1.久安旧用户可以输入账号、手机或者邮箱进行登录。</p>
        <p class="remind-content">2.通过合作商户跳转打开的用户，设置了账户密码后，也可以使用账号登录</p>
        <p class="remind-content">3.手机号登录，无需添加区号前缀</p>
      </div>
    </div>
  </div>
</template>

<script>
  import MobileHeader from 'components/m-header'
  import {userCenter} from 'api'
  import {mapGetters} from 'vuex'
  import {$localStorage} from '@/util/storage';
  import getLive800 from 'components/get-live800';
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
      strMapToObj(strMap) {
        let obj = Object.create(null);
        for (let [k, v] of strMap) {
          obj[k] = v;
        }
        return obj;
      },
      loginAccount() {
        if (this.userName == '') {
          toast('用户账号不能为空');
          return
        }
        else if (this.userPassword == '') {
          toast('用户密码不能为空');
          return
        }
        const request = {
          'userName': this.userName,
          'password': this.userPassword,
        }

        userCenter.chainLogin(request).then(res => {
          if (res.code == '10000') {
            toast('登录成功')
            this.$store.commit('SHOW_LOGIN', false)
            $localStorage.set('tokenInfo', JSON.stringify(res.data.tokenVo));
            this.$store.dispatch('CHECK_ONLINE', true);
            this.$store.dispatch('UPDATE_TOKEN_INFO', res.data.tokenVo);
            this.$store.dispatch('INIT_INFO');
            this.$store.commit('SET_USERDATA', res.data)
            _.initRongyun()
            this.$router.replace({name: 'mIndex'})

          } else {
            toast(res.message)
          }
        })
      },

    },
    components: {MobileHeader,getLive800}
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

  /deep/ .mobile-header .service-logo {
    float: right;
    padding-right: r(10);
  }
</style>
