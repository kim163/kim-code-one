<template>
  <div :class="['navbar',{'nav-start':!isScrollTop}]">
    <div class="container min-width">
      <div class="row cfx">
        <div class="logo">
          <a class="nav-logo-link" href="/static/index.html"></a>
        </div>
        <div class="link-part">
          <div class="col-2">
            <a href="/static/index.html">{{$t('navbar.navHome')}}</a>
          </div>
          <div class="col-2">
            <a href="/transaction">{{$t('navbar.tradingHall')}}</a>
          </div>
          <div class="col-2">
            <a href="/static/about.html">{{$t('navbar.navAbout')}}</a>
          </div>
          <div class="col-2">
            <a href="/static/help.html">{{$t('navbar.navHelp')}}</a>
          </div>
          <div class="col-2">
            <a href="/static/white-paper.html">{{$t('navbar.navWhitepaper')}}</a>
          </div>
          <div class="col-2">
            <a href="/static/contact.html">{{$t('navbar.navContactus')}}</a>
          </div>
          <v-header></v-header>

          <div class="lang-icons">
            <a href="javascript:void(0);" class="lang-en j-languageSel" @click="handleSetLanguage" >{{$t('navbar.languageSel')}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {SETTING} from "@/assets/data"
  import vHeader from 'components/header'
  export default {
    name: "",
    data() {
      return {
        isScrollTop: false,
        SETTING
      }
    },
    props: {},
    computed: {
      language() {
        return this.$store.getters.language
      }
    },
    watch: {},
    methods: {
      handleSetLanguage() {
        this.$i18n.locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh';
        this.$store.dispatch("SET_LANGUAGE", this.$i18n.locale);
      },

      handleScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop > 0){
           this.isScrollTop = true;
        }else{
          this.isScrollTop = false;
        }
      }
    },
    created() {
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll);
    },
    activated() {
    },
    components: {
      vHeader
    }
  }
</script>
<style lang="scss">
  .navbar {
    position: fixed;
    top: 0px;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 10px 0 ;
    background-color: rgba(255,255,255,0.85);
    box-shadow: 1px 1px 4px rgba(0,0,0,0.5);
    -moz-box-shadow: 1px 1px 4px rgba(0,0,0,0.5);
    -webkit-box-shadow: 1px 1px 4px rgba(0,0,0,0.5);
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -ms-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
  }
  .navbar .logo {
    float: left;
  }
  .navbar a {
    font-weight: 300;
  }
  .navbar a:hover {
    color: #5087FF;
  }
  .navbar .link-part{
    float: right;
  }
  .navbar .link-part .col-2{
    width: auto;
    margin: 15px 18px 0;
  }
  .nav-start .link-part .col-2{
    width: auto;
    margin: 25px 18px 0;
  }
  .navbar .link-part .col-2 a{
    font-size: 20px;
  }
  .navbar .link-part .lang-icons{
    margin: 8px 0 0 20px;
    float: right;
  }
  .nav-start .link-part .lang-icons{
    margin: 18px 0 0 20px;
  }
  a.lang-en{
    font-size: 18px;
    padding: 7px 16px;
    border: 1px solid #14171a;
    border-radius: 35px;
    display: block;
  }
  .navbar a.lang-en,.navbar .lang-icons a:hover{
    border: 1px solid #14171a;
  }
  .nav-start a.lang-en,.nav-start .lang-icons a:hover{
    border: 2px solid #ffffff;
  }
  .nav-start a.btn-other, .nav-start a.btn-other:hover{
    border: 1px solid #ffffff;
  }

  @media only screen and (min-width: 800px) and (max-width: 1020px) {
    .navbar .link-part .col-2{
      width: auto;
    }
  }

  .nav-down {
    top: -200px;
  }
  .nav-start {
    padding: 10px 0;
    transition: all 0.2s ease-in-out;
    background: #5087FF;
    box-shadow: 1px 1px 4px rgba(0,0,0,0);
    -moz-box-shadow: 1px 1px 4px rgba(0,0,0,0);
    -webkit-box-shadow: 1px 1px 4px rgba(0,0,0,0);
  }
  .nav-start a {
    color: white;
  }
  .navbar a{
    display: block;
  }
  .nav-start a:hover {
    border-bottom: 1px solid white;
    color: white;
  }
  .nav-start .nav-logo-link{
    width: 80px;
    height: 80px;
    background: url(~images/logo.png) no-repeat center center;
    background-size: contain;
  }
  .nav-logo-link{
    width: 60px;
    height: 60px;
    background: url(~images/logo-blue.png) no-repeat center center;
    background-size: contain;
  }
  .nav-logo-link:hover, .nav-start .nav-logo-link:hover{
    border-bottom:none;
  }
  .lang-icons a:hover , a.btn-other:hover{
    box-shadow: 1px 1px 4px rgba(0,0,0,0.5);
    -moz-box-shadow: 1px 1px 4px rgba(0,0,0,0.5);
    -webkit-box-shadow: 1px 1px 4px rgba(0,0,0,0.5);
    text-decoration: none;
    border: 1px solid #5087FF;
  }
</style>
