<template>
  <div>
    <v-header></v-header>
    <div class="container">

    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import VFooter from 'components/footer'
  import VHeader from 'components/header-bind-create'
  export default {
    name: "bind-list",
    components:{
      VFooter,
      VHeader
    },
  }
</script>

<style scoped>

</style>