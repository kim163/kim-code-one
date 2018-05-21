<template>
  <div class="transell-main">

    <header class="m-header">
      <span class="i-back"> &lt; </span>
      交易大厅
    </header>

    <div  class="m-tran-box">

      <ul class="pop-tab tab-box">
        <li v-for="item in tranType" @click="tranItem=item.value" class="s" :class="{active:tranItem==item.value}" :key="item.value">
          {{item.value}}
          <!--{{generateTitle(item.name)}}-->
        </li>
      </ul>

      <div v-if="tranItem=='买入UET'">
        买入UET
      </div>
     <div v-if="tranItem=='卖出UET'">
        卖出UET
      </div>
     <div v-if="tranItem=='近期订单'">
        近期订单
      </div>

    </div>

  </div>
</template>

<script>

  import { generateTitle } from '@/util/i18n'
  import { transaction } from 'api'
  import {mapGetters,mapActions,mapMutations} from 'vuex'

  export default {
    data() {
      return {
        tranType:[
          {name: "login.accloginTitle1", value: "买入UET"},
          {name: "login.mobloginTitle2", value: "卖出UET"},
          {name: "login.emailloginTitle3", value: "近期订单"}
        ],
        tranItem: '买入UET',
      };
    },
    methods: {
      generateTitle,



    },
    created() {
    },
    watch: {

    },
    computed: {
      ...mapGetters(["userData","islogin"]),
    },
    components: {
    }
  };

</script>

<style lang="scss" scoped>
  /*@import '@/assets/scss/base.scss';*/
  .m-tran-box{
    padding:20px 0;
  }
  .m-header{
    height:44px;
    line-height: 44px;
    background: #BB9A55;
    color:#fff;
    text-align: center;
    position:relative;
  .i-back{
    position:absolute;
    left:0;
    font-size:24px;
    display:inline-block;
    padding:0 15px;
    cursor: pointer;
  }
  }

  .transell-main{
  /* tab */
    .tab-box{
      color:#6b6b6b;
      border: 1px solid #BB9A55;
      border-radius: 5px;
      margin:0 30px;

    .s{
      display:inline-block;
      height:42px;
      padding:0 10px;
      width:33.3%;
      line-height: 42px;
      cursor: pointer;
      background: #D8D8D8;
      color:#333;
      border-right: 1px solid #BB9A55;
    &:last-child{
      border:0;
     }
    &.active{
       /*border-bottom:3px solid #87b5ff;*/
       background: #BB9A55;
       color:#fff;
     }
    &:hover,&:link,&:active{
                      opacity: .8;
                    }
    }
    }
  }

</style>
