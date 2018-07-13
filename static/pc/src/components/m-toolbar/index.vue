<template>
  <transition name="fade">
    <div class="tool-warp" v-show="myValue" @click.self="myValue=false">
      <transition name="toolSlideLeft">
        <div v-show="myValue" class="tool-bar">

          <div @click="myValue=false" class="tool-user-info">
            <div class="account-img">
               <img src="./images/juan-logo.svg" >
            </div>
          </div>
          <div v-if="islogin" @click="myValue=false">
             <!--<div class="tool-item-href">-->
               <!--{{$t('navbar.userAccount')}} <span class="fr"> {{userData.userName}} </span>-->
             <!--</div>-->
            <div class="tool-item-href">
              {{$t('navbar.nickName')}} <span class="fr"> {{userData.nickname}} </span>
            </div>
            <div class="tool-item-href">
              {{$t('navbar.accountBalance')}} <span class="fr"><balance></balance></span>
            </div>
            <router-link :to="{name:'mBindList'}" class="tool-item-href"><i class="iconfont icon-busine-list"></i>{{$t('navbar.busineList')}}</router-link>
            <router-link :to="{name:'mCardList'}" class="tool-item-href"><i class="iconfont icon-pay-bank"></i>{{$t('navbar.bindCard')}}</router-link>
            <router-link :to="{name:'mBindCard',params:{id:1}}" class="tool-item-href"><i class="iconfont icon-pay-alipay"></i>{{$t('navbar.bindAlipay')}}</router-link>
            <router-link :to="{name:'mBindCard',params:{id:2}}" class="tool-item-href"><i class="iconfont icon-pay-wechat"></i>{{$t('navbar.bindWeChat')}}</router-link>
            <get-live800></get-live800>
            <a class="tool-item-href" target="_blank" :href="SETTING.appUrl">
              <i class="iconfont icon-download"></i>{{$t('navbar.juanApp')}}
            </a>
            <div class="tool-item-href border-bot" @click="$store.dispatch('LOGIN_OUT')">
              <i class="iconfont icon-log-out"></i>{{$t('navbar.logOut')}}
            </div>
          </div>
          <div v-else @click="myValue=false">
            <router-link :to="{name:'mobileLogin'}" class="tool-item-href"><i class="iconfont icon-user-login"></i>{{$t('login.iWantLogin')}}</router-link>
            <router-link :to="{name:'mobileRegister'}" class="tool-item-href"><i class="iconfont icon-user-register"></i>{{$t('login.iWantRegister')}}
            </router-link>
            <get-live800></get-live800>
            <a class="tool-item-href border-bot" target="_blank" :href="SETTING.appUrl">
              <i class="iconfont icon-download"></i>{{$t('navbar.juanApp')}}
            </a>
          </div>
          <div class="tool-item-href border-bot hidden" @click="handleSetLanguage" > {{$t('navbar.languageSel')}} </div>

        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
  import { show } from 'api';
  import {SETTING} from "@/assets/data"
  import {mapGetters} from 'vuex'
  import Balance from 'components/balance'
  import getLive800 from 'components/get-live800'

  export default {
    data() {
      return {
        SETTING,
        myValue: false
      }
    },
    props: ["value"],
    components:{
      Balance, getLive800
    },
    computed: {
      ...mapGetters(["userData", 'islogin']),
      language() {
          return this.$store.getters.language
      }
    },
    watch: {
      value(val) {
        this.myValue = val;
      },
      myValue(val) {
        this.$emit("input", val);
      }
    },
    methods: {
      handleSetLanguage() {
        this.$i18n.locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh';
        this.$store.dispatch("SET_LANGUAGE", this.$i18n.locale);
      }

    },
    created(){

    }
  }
</script>
<style lang="scss" >
  @import "~assets/scss/mixin";

  .tool-warp {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.40);
    z-index: 100;
    .tool-bar {
      @include f(15px);
      transition: transform 0.5s;
      top: 0;
      left: 0;
      text-align: left;
      background: $white;

      height: 100%;
      width: r(250);
      color: $font-color;
      &.active {
        display: block;
        transform: translateX(0);
      }
      .tool-user-info {
        text-align: center;
        padding: r(51) 0 ;
      }
      .tool-item-href {
        display: block;
        height: r(44);
        line-height: r(44);
        border-top: 1px solid #D8D8D8;
        padding: 0 r(10) 0 r(20);
        .iconfont{
          @include f(18px);
          margin-right: r(10);
          color: #ABABAB;
        }
        i.icon-download{
          @include f(20px);
          margin-right: r(8);
        }
        span{
          color: #787876;
        }
      }
      .border-bot{
        border-bottom: 1px solid #D8D8D8;
      }
      .mt-line{
        margin-top: r(10);
      }
    }
  }
</style>
