<template>
  <div>
    <Header></Header>
  </div>
</template>

<script>
  import BindBussiness from '../mobile/business-bind'
  import QuickCreate from '../mobile/quick-create'
  import Footer from 'components/footer'
  import Header from 'components/header-bind-create'
  export default {
    name: "bind-and-create",
    data(){
      return{

      }
    },
    props:{
      type:{ // 页面类型  1为商户绑定 2为快速创建
        type:Number,
        default:1
      }
    },
    components:{
      BindBussiness,
      QuickCreate,
      Footer,
      Header
    },
    methods:{

    },
    created(){

    }
  }
</script>

<style scoped>

</style>