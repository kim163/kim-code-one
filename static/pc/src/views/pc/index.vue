<template>
  <div>
    <display-nav :isOfficialWeb="isOfficialWeb"></display-nav>
    <transition mode="out-in"
                name="fade-quick">
      <router-view></router-view>
    </transition>
    <v-footer :isDisplayFoot="true" :isOfficialWeb="isOfficialWeb" ></v-footer>
  </div>
</template>

<script>
  import DisplayNav from 'components/nav/display-nav';
  import vFooter from 'components/footer';
  export default {
    name: "pc-index",
    data(){
      return{

      }
    },
    props: {
      isOfficialWeb:{
        type:Boolean,
        default:false
      }
    },
    components:{
      DisplayNav,
      vFooter
    }
  }
</script>

<style scoped>

</style>