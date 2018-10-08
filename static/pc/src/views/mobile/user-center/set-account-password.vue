<template>
  <div class="set-init-container">
    <MobileHeader :showLeftBtn="false">设置账户密码</MobileHeader>
    <div class="password-container">
      <div class="login-Info">您的登录账户
        <span class="account-name">{{userData.nickname}}</span>
        <span class="copy-account" @click="copy" :data-clipboard-text="userData.nickname">复制账户</span></div>
      <div class="login-password">密码 <input type="password" placeholder="请输入您的新密码" v-model="newPassoword"></div>
      <div class="login-passwordNext">确定密码 <input type="password" placeholder="请确定您的密码" v-model="confirmPassoword">
      </div>
      <div class="add-btn" @click="confirmBind">设置</div>
      <div class="add-next" @click="notBind">暂不设置</div>
      <div class="content-remind">
        <p class="remind-title">温馨提示</p>
        <p class="remind-content">1.设置账户密码之后,退出后可以通过账户密码登录;</p>
        <p class="remind-content">2.久安不同的合作商户,登录账户会有不同,请保存自己的账户名和密码;</p>
        <p class="remind-content">3.若忘记密码,请通过合作商户网站扫码登录,在资料设定修改密码;</p>
      </div>
    </div>
  </div>
</template>

<script>
  import MobileHeader from 'components/m-header'
  import {mapGetters} from 'vuex'
  import {userCenter} from 'api'
  import Clipboard from 'clipboard';

  export default {
    name: "set-account-password",
    data() {
      return {
        newPassoword: '',
        confirmPassoword: ''
      }
    },
    computed: {
      ...mapGetters(['centerId', 'userId', 'userData'])
    },
    methods: {
      confirmBind() {
        if (this.newPassoword !== this.confirmPassoword) {
          toast('两次密码不一致')
          return
        }
        const request = {
          userId: this.userId,
          password: this.newPassoword,

        }
        userCenter.updatePassword(request).then(res => {
          if (res.code == '10000') {
            toast('设置密码成功')
            this.$emit('closePage', false)
            this.$store.dispatch("UPDATE_USERDATA")
          } else {
            toast(res.message)
          }
        })
      },
      notBind() {
        this.$emit('closePage', false)
      },
      copy() {
        var clipboard = new Clipboard('span.copy-account');
        clipboard.on('success', e => {
          toast('复制成功')
          // 释放内存
          clipboard.destroy()
        });
        clipboard.on('error', e => {
          // 不支持复制
          // 释放内存
          clipboard.destroy()
        });
      },
    }
    ,
    components: {
      MobileHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .set-init-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    .password-container {
      margin-top: r(20);

      .login-Info {
        @include f(15px);
        color: #333;
        background-color: #fff;
        height: r(44);
        width: 100%;
        line-height: r(44);
        padding-left: r(20);
        display: flex;
        flex-direction: row;
        .copy-account {
          color: #ec3a4e;
          @include f(14px);
          padding-right: r(20);
        }
        .account-name {
          flex: 1;
          margin-left: r(20);
        }
        .copy-account {

        }
      }
      .login-password {
        margin-top: r(10);
        @include f(15px);
        color: #333;
        background-color: #fff;
        height: r(44);
        width: 100%;
        line-height: r(44);
        padding-left: r(20);
        input:focus {
          outline: none;
        }
        input {
          margin-left: r(20);
        }
      }
      .login-passwordNext {
        margin-top: r(10);
        @include f(15px);
        color: #333;
        background-color: #fff;
        height: r(44);
        width: 100%;
        line-height: r(44);
        padding-left: r(20);
        input:focus {
          outline: none;
        }
        input {
          margin-left: r(20);
        }
      }
      .add-btn {
        text-align: center;
        margin: 0 auto;
        background-color: #3573FA;
        width: 80%;
        color: #fff;
        height: r(44);
        line-height: r(44);
        border-radius: r(3);
        margin-top: r(20);
        @include f(18px)
      }
      .add-next {
        @include f(18px);
        color: #333;
        text-align: center;
        width: 80%;
        height: r(44);
        margin: 0 auto;
        line-height: r(44);
        margin-top: r(10);
      }
      .content-remind {
        margin-top: r(40);
        padding-left: r(20);
        padding-right: r(20);
        .remind-title {
          @include f(18px);
          color: #333;
        }
        .remind-content {
          @include f(14px);
          color: #787876;
          margin-top: r(10);
          line-height: r(25);
        }
      }
    }
  }
</style>
