<template>
  <div>
    <display-nav :isOfficialWeb="isOfficialWeb"></display-nav>
    <transition mode="out-in"
                enter-active-class="animated-quick fadeIn"
                leave-active-class="animated-quick fadeOut">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import displayNav from 'components/nav/display-nav';
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
      displayNav
    }
  }
</script>

<style scoped>

</style>