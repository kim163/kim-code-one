<template>
  <div class="main">
    <nav-menu></nav-menu>
    <bread-crumbs :bread-list="breadList"></bread-crumbs>
    <div class="container">
      <div class="tab-list">
        <div class="tab-item"
             :class="{active: type === item.type}"
             v-for="(item,index) in navList"
             :key="index"
             @click="changeTab(item.type)">
          {{$t(item.name)}}
        </div>
      </div>
      <div class="bottom">
        <div class="content">
          <card-list v-if="type === 3" :is-pc="true"></card-list>
          <bind-card v-else :is-pc="true" :tab-type="type"></bind-card>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import NavMenu from 'components/nav';
  import VFooter from 'components/footer';
  import BreadCrumbs from 'components/bread-crumbs'
  import BindCard from '../mobile/bind-payment/card-bind'
  import CardList from '../mobile/bind-payment/card-list'
  export default {
    name: "user-center",
    data(){
      return{
        navList:[
          {
            name:'userCenter.bindCard',
            type:3,
          },
          {
            name:'userCenter.bindAlipay',
            type:1,
          },
          {
            name:'userCenter.bindWeChat',
            type:2,
          }
        ],
        breadList: [
          {
            urlName: 'index',
            name: 'navbar.navHome'
          },
          {
            urlName: 'pcUserCenter',
            name: 'navbar.userCenter'
          },
        ],
        type:3,
        addNewCard:false,
      }
    },
    components:{
      NavMenu,
      VFooter,
      BreadCrumbs,
      BindCard,
      CardList
    },
    computed:{

    },
    methods:{
      changeTab(type){
        if(type != 3){
          this.type = type
        }else{
          this.type = type
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main{
    padding-top: 100px;
    .container{
      width: 80%;
      /*height: 883px;*/
      border: solid 1px #d4d4d4;
      margin: 20px auto 50px;
      .tab-list{
        width: 100%;
        height: 62px;
        background-color: #f7f7f7;
        .tab-item{
          display: inline-block;
          width: 200px;
          height: 100%;
          line-height: 62px;
          text-align: center;
          font-size: 20px;
          color: #333333;
          border-right: 1px solid #d4d4d4;
          cursor: pointer;
          &.active{
            color: #ffffff;
            background-color: #5087ff;
          }
        }
      }
      .bottom{
        display: flex;
        width: 100%;
        /*height: 821px;*/
        padding: 100px 0;
        justify-content: center;
        align-items: center;
      }
      .content{
        min-width: 500px;
        width: 50%;
        /*padding: 0%;*/
        /*background-color: #ffffff;*/
        /*box-shadow: 0 0 10px rgba(0,0,0,.2);*/
      }
    }
  }
</style>