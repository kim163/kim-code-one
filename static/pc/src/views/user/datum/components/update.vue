<template>
  <div class="updata-info">
    <p>真实姓名： <span class="realname">{{userData.accountName}}</span></p>
    <p>手机号码： <span class="mobile">{{userData.phone}}</span>
      <a href="javascript:;" class="btn-submit" v-show="userData.phoneValidStatus==0" @click="verify">手机验证</a>
    </p>
    <div class="lines" v-if="userData.phoneValidStatus==0&&showVerify">
      <verifyPhone :data="reverseData"></verifyPhone>
    </div>
    <p v-if="oldDetail.email!=''">电子邮箱： <span
      class="email">{{ oldDetail.email | conceal(0, oldDetail.email.length - oldDetail.email.indexOf('@'))}}</span>
    </p>
    <p v-else>电子邮箱： <span class="qq"><input v-model="newDetail.email" :placeholder='oldDetail.email|conceal(1,1)'/>
							</span><a class="btn-submit" @click="upData('email')">修改</a></p>
    <p>Q&nbsp;&nbsp;Q号码： <span class="qq"><input v-model="newDetail.qq" :placeholder='oldDetail.qq|conceal(1,1)'/>
							</span><a class="btn-submit" @click="upData('qq')">修改</a></p>
    <p>微信号码： <span class="qq"><input v-model="newDetail.wechat" :placeholder='oldDetail.wechat|conceal(1,1)'/>
							</span>
      <a class="btn-submit" @click="upData('wechat')">修改</a>
    </p>
    <p>出生日期： <span class="bdate">{{userData.birthday | Date}}</span></p>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import {modifyCustomerSocialInfo, getPhoneAndCode} from 'api/user';
  import verifyPhone from './verify'

  export default {
    data() {
      return {
        showVerify: false,
        reverseData: null,
        newDetail: {
          qq: "",
          wechat: "",
          email: ''
        },
        oldDetail: {
          qq: "",
          wechat: "",
          email: ''
        },
      };
    },
    watch: {},
    props: {},
    methods: {
      upData(type) {
        if (this.newDetail[type] == "")
          return toast("请填写要修改的数据");
        modifyCustomerSocialInfo({[type]: this.newDetail[type]}).then(data => {
          if (data.success) {
            this.oldDetail[type] = this.newDetail[type];
            this.newDetail[type] = "";
          }
          toast(data.message);
        }).catch(err => {
          toast("加载失败")
        })
      },
      verify() {
        getPhoneAndCode().then(res => {
          if (res.success) {
            this.showVerify = true;
            this.reverseData = res.data;
          }
        })
      }
    },
    created() {
      this.oldDetail.qq = this.userData.qq;
      this.oldDetail.wechat = this.userData.wechat;
      this.oldDetail.email = this.userData.email;
    },
    computed: {
      ...mapGetters(["userData"])
    },
    components: {
      verifyPhone
    }
  };
</script>
<style lang="scss">
  .updata-info {
    margin: 20px;
    border: solid 1px #ccc;
    padding-bottom: 10px;
    p, div.lines {
      padding-top: 10px;
      padding-bottom: 10px;
      font-size: 16px;
      color: #333;
      padding-left: 45px;
      font-weight: 400;
    }
    .red {
      color: #f00;
    }
    .btn-submit {
      float: none !important;
      display: inline-block;
      width: 82px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      color: #fff;
      background: #1e327e;
      border-radius: 4px;
      margin-left: 11px;
    }
    input {
      padding: 6px;
      border: 1px #ccc solid;
    }
  }
</style>
