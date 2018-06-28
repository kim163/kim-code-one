<template>
  <div>
    <Header></Header>
    <div class="container">
      <div class="top">
        <div class="title">{{type === 1 ? '绑定商户' : '快速创建久安账号'}}</div>
      </div>
      <div class="bottom">
        <div class="content">
          <bind-bussiness v-if="type === 1" :is-pc="true"></bind-bussiness>
          <quick-create v-else :is-pc="true"></quick-create>
        </div>
      </div>
    </div>
    <footer></footer>
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

<style lang="scss" scoped>
  .container{
    width: 80%;
    height: 883px;
    border: solid 1px #d4d4d4;
    margin: 150px auto 50px;
    .top{
      width: 100%;
      height: 62px;
      background-color: #f7f7f7;
      .title{
        width: 200px;
        height: 100%;
        line-height: 62px;
        text-align: center;
        font-size: 20px;
        color: #ffffff;
        background-color: #5087ff;
      }
    }
    .bottom{
      display: flex;
      width: 100%;
      height: 821px;
      justify-content: center;
      align-items: center;
    }
    .content{
      min-width: 500px;
      width: 50%;
      padding: 5%;
      background-color: #ffffff;
      box-shadow: 0 0 10px rgba(0,0,0,.2);
    }
  }
  @media only screen and (max-width: 999px) {
    .container{
      width: 96%;
    }
  }
</style>