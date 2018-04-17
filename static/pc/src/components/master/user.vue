<template>
  <div class="user-page">
    <div class="content-warp cfx" style="background:#fff">
      <v-menu></v-menu>
      <router-view></router-view>
    </div>
  </div>

</template>
<script>
//  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import vMenu from "components/menu-user/"
  export default {
    data() {
      return {};
    },
    props: {},
    methods: {},
    computed: {
//      ...mapGetters(["userData", "islogin", "isAgent", 'isUser', 'showLogin'])
    },
    created() {
    },
    components: {
      vMenu
    }
  };
</script>
<style>
  .user-page{
    background: url("~images/top.jpg") top center no-repeat;
    padding-top: 260px;
  }
</style>

