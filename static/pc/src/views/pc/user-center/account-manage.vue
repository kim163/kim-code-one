<template>
  <div class="acc-main">
    <div class="account-list">

    </div>
    <div class="add-account">

    </div>
  </div>
</template>

<script>
  import {
    getCenterInfo
  } from 'api/user-center'
  export default {
    name: "account-man",
    data(){
      return{
        userList:[],
      }
    },
    computed:{
      ...mapGetters([
        "userId",
        "centerId",
      ])
    },
    methods:{
      getUserList(){
        getCenterInfo().then(res => {

        }).catch(err => {
          toast(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .acc-main{
    padding: 31px;
  }
</style>