<template>
  <div class="user-conter form-rowbox">
    <div class="style_f hidden">
      <router-link class="style_i subnav" to="deposit">
        存款
      </router-link>
      <router-link class="style_i" to="drawmoney">
        取款
      </router-link>
      <router-link class="style_i" to="transfer">
        转账
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    props: {},
    methods: {},
    computed: {},
    created() {
    },
    components: {}
  };
</script>
<style lang="scss">

</style>
