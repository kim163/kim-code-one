<template>
  <div class="safe-main">
    <div class="top-header" :class="{high: safeLevel === 1}">
      <div class="nav">
        <i class="iconfont icon-left-arrow" @click="$router.back()"></i>
        安全中心
      </div>
      <i class="iconfont icon-mark icon-safe-level-high" v-if="safeLevel === 1"></i>
      <i class="iconfont icon-mark icon-safe-level-low" v-else></i>
      <div class="text">账号安全等级{{safeLevel === 1 ? '高' : '低'}}</div>
    </div>
    <div class="link-list">
      <router-link :to="{name:'mSetUserInfo'}" class="item-ink">
        <div class="item-text">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-complete-material"></use>
          </svg>
          完善资料
        </div>
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
      <router-link :to="{name:'mSetPassword',query:{c: '1'}}" class="item-ink">
        <div class="item-text">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-change-password"></use>
          </svg>
          修改密码
        </div>
        <i class="iconfont icon-right-arrow"></i>
      </router-link>
      <div class="item-ink" @click="userData.phone === null ? toLink(1) : ''">
        <div class="item-text">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bind-phone"></use>
          </svg>
          绑定手机
        </div>
        <i class="iconfont icon-right-arrow" v-if="userData.phone === null"></i>
        <span class="info" v-else>{{formatPhone}}</span>
      </div>
      <div class="item-ink" @click="userData.email === null ? toLink(2) : ''">
        <div class="item-text">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bind-email"></use>
          </svg>
          绑定邮箱
        </div>
        <i class="iconfont icon-right-arrow" v-if="userData.email === null"></i>
        <span class="info" v-else>{{formatEmail}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "m-safe-center",
    data() {
      return {
        safeLevel: 0, //账户安全等级 0表示低 1表示高
        phone:'',
        email:''
      }
    },
    computed: {
      ...mapGetters([
        'userData'
      ]),
      formatPhone(){
        return this.phone.substring(0,3) + '****' + this.phone.substring(this.phone.length - 4,this.phone.length)
      },
      formatEmail(){
        const arr = this.email.split("@");
        let star = "";
        if (arr[0].length <= 3) {
          star = "*";
          arr[0] = arr[0].substr(0, arr[0].length - 1) + star;
        } else {
          star = "***";
          arr[0] = arr[0].substr(0, arr[0].length - 3) + star;
        }
        return this.email = arr[0] + "@" + arr[1];
      }
    },
    watch:{
      "getNewOrder":{
        handler(newVal){
          this.phone = newVal.phone
          this.email = newVal.email
        },
        deep: true
      },
    },
    created(){
      this.safeLevel = !_.isNull(this.userData.email) && !_.isNull(this.userData.phone) ? 1 : 0
      this.phone = this.userData.phone
      this.email = this.userData.email
    },
    methods: {
      toLink(type){
        this.$router.push({name:'mBindPhoneEmail', query:{t: type}})
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .safe-main {
    .top-header {
      background: #E95752;
      transition: all .5s;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      color: #ffffff;
      &.high {
        background: #3FB044;
      }
      .nav {
        width: 100%;
        height: r(44);
        text-align: center;
        line-height: r(44);
        @include f(18px);
        color: #ffffff;
        position: relative;
        .iconfont {
          position: absolute;
          left: r(10);
        }
      }
      .icon-mark {
        margin: r(21) 0;
        @include f(80px);
      }
      .text {
        @include f(18px);
        margin-bottom: r(41);
      }
    }
    .link-list{
      padding-left: r(20);
      background: #ffffff;
      .item-ink{
        width: 100%;
        height: r(50);
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #E4E4E4;
        box-sizing: border-box;
      }
      .item-text{
        display: flex;
        justify-content: center;
      }
      .icon{
        width: r(25);
        height: r(25);
        margin-right: r(10);
      }
      .icon-right-arrow,.info{
        margin-right: r(20);
      }
    }
  }

</style>