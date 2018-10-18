<template>
  <div>

  </div>
</template>

<script>
  import MobileHeader from 'components/m-header'
  export default {
    name: "m-bind-phone-email",
    data(){
      return{

      }
    },
    props:{
      bindType:{ //绑定类型 1是手机 2是邮箱
        type:Boolean,
        default:1
      }
    },
    components:{
      MobileHeader
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>