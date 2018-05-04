<template>
  <div class="transaction-main">
    <nav-menu></nav-menu>
    <div class="tranheader-part"></div>
    <head-nav></head-nav>
    <transact-menu></transact-menu>

    <div class="section ">
      <div class="container">
        <div class="row">
          <div class="col-18 fl">

          </div>

          <div class="col-19 fr">

          </div>
        </div>
      </div>
    </div>

    <v-footer ></v-footer>
  </div>
</template>
<script>
  import navMenu from 'components/nav';
  import vFooter from 'components/footer';
  import headNav from './components/head-nav';
  import transactMenu from 'components/transact-menu';

  import { transaction } from 'api'

  export default {
    data() {
      return {
        reqData: {
          limit:10,
          offset:0
        }
      };
    },
    methods: {
      searchTranBuyList(index) {
        transaction.getOrderxPageForHallSell(this.reqData).then(res => {
           console.log('data:', res);

        }).catch(error => {
          this.reset("请求失败")
        });
      }
    },
    created() {
        this.searchTranBuyList();
    },
    mounted() {
    },
    activated() {
    },
    deactivated(){
    },
    beforeDestroy(){
    },
    components: {
      navMenu, vFooter, headNav, transactMenu
    }
  };
</script>
<style lang="scss">
  .transaction-main {
     .tranheader-part{
        height: 100px;
        background: #5087FF;
     }


  }
</style>
