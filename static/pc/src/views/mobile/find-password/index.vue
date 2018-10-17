<template>
  <div>
    <MobileHeader>
      找回密码
    </MobileHeader>
    <find-pwd :is-mobile="true"></find-pwd>
  </div>
</template>

<script>
  import FindPwd from 'components/password/find-pwd'
  import MobileHeader from 'components/m-header'
  export default {
    name: "m-find-password",
    components:{
      FindPwd,
      MobileHeader
    }
  }
</script>

<style scoped>

</style>