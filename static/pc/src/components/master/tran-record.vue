<template>
  <div class="tranrecord-main">
    <nav-menu></nav-menu>
    <tranred-headnav></tranred-headnav>
    <transact-menu></transact-menu>
    <tranred-subnav></tranred-subnav>

    <router-view></router-view>

    <v-footer ></v-footer>
  </div>
</template>
<script>
  import navMenu from 'components/nav';
  import tranredHeadnav from './tranred-headnav';
  import transactMenu from 'components/transact-menu';
  import vFooter from 'components/footer';
  import tranredSubnav from 'components/transact-menu/tranred-subnav';

  export default {
    data() {
      return {};
    },
    props: {},
    methods: {},
    computed: {},
    created() {
    },
    components: {
      navMenu, tranredHeadnav, transactMenu, vFooter, tranredSubnav
    }
  };
</script>
<style lang="scss">
.tranrecord-main{
  padding-top: 100px;


}

</style>
