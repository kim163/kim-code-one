<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="!$route.meta.noCache"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="$route.meta.noCache"></router-view>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'

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
    created() {
      this.$store.dispatch("UPDATE_USERDATA");
      this.dwMobilePage();
    },
    methods: {
      dwMobilePage(){
        if(this.$route.meta.isMobilePage){
          let element = document.getElementsByTagName('body')[0];
          let classN = this.$route.meta.isMobilePage;
          if((' ' + element.className + ' ').indexOf(' ' + classN + ' ') < 0){
            element.className = classN;
          }
        }
      }
    },
    watch:{
      "$route"(to,from){
        this.dwMobilePage();
//        document.title=to.meta.title||to.meta.headName||"久安钱包";
      }
    },
    components:{

    }
  }
</script>
