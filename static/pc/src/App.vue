<template>
  <div id="app">
    <v-header></v-header>
    <nav-menu></nav-menu>
    <transition :name="transitionName">
        <router-view v-if="!$route.meta.noCache"></router-view>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="$route.meta.noCache"></router-view>
    </transition>
    <right-server></right-server>
    <v-footer ></v-footer>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'

  import navMenu from 'components/nav'
  import rightServer from 'components/right-server'
  import vFooter from 'components/footer'
  import vHeader from 'components/header'
  export default {
    data(){
      return {
        transitionName:"slide",
      }
    },
    computed:{
      isExclude(){
        return this.$route.meta.cache ? "" : this.$route.name;
      }
    },
    created(){
    },
    watch:{
      "$route"(to,from){
//        document.title=to.meta.title||to.meta.headName||"乐娱国际";
      }
    },
    components:{
      navMenu,vFooter,vHeader,rightServer
    }
  }
</script>
