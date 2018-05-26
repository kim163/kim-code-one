<template>
  <div class="transell-main transell-main-box">
    <!--<m-headnav>{{$t('postPend.postTitle')}}</m-headnav>-->
    <m-header>订单详情</m-header>

    <div class="cash-details">
      <div class="trade-time-bar">
        <span class="c-blue">买入</span>
        <span class="fr">等待付款 1小时59份59秒</span>
      </div>
      <ul class="details-ul">
        <li>
          <span class="l-title">订单号 :</span>
          <span class="fr">DSJW92JF00IDFKSPKFM020409232</span>
        </li>
        <li>
          <span class="l-title">卖方 :</span>
          <span class="fr">深圳马化腾</span>
        </li>
        <li>
          <span class="l-title">交易金额 :</span>
          <span class="fr">
                 <span class="red">50 CNY</span>
             </span>
        </li>
        <li>
          <span class="l-title">交易数量 :</span>
          <span class="fr">
                 <span class="red">5000 UET</span>
             </span>
        </li>
        <li>
          <span class="l-title">交易单价 :</span> <span class="fr">0.01 CNY</span>
        </li>
      </ul>
      <ul class="details-ul pay-detail">
        <li>
          <span class="l-title">卖家收款 :</span>
          <span class="fr">支付宝</span>
        </li>
        <li>
          <span class="l-title">收款姓名 :</span>
          <span class="fr">马云</span>
        </li>
        <li>
          <span class="l-title">收款账号 :</span>
          <span class="fr">
                 <span class="">fjafmcw@163.com</span>
             </span>
        </li>
        <li>
          <span class="l-title">收款二维码 :</span>
          <span class="fr">
                 <span class="red">二维码</span>
             </span>
        </li>

      </ul>


    </div>

  </div>
</template>

<script>
  import mHeader from "components/m-header"

  import { generateTitle } from '@/util/i18n'
  import { transaction } from 'api'
  import {mapGetters,mapActions,mapMutations} from 'vuex'

  export default {
    data() {
      return {
        DetailList: {

        },
        orderData:{
          orderId:this.$route.params.id,
          debitName:'', // 交易买方

        }
      };
    },
    methods: {
      generateTitle,
      fetchData(){
        this.loading = true;
        this.request={
          orderId:this.$route.params.id
        }
        transaction.getOrderx(this.request).then(res => {
          this.loading = false;
          console.log('订单详情记录:');
          console.log(res.data);
          this.DetailList = res.data;
          this.DetailList.creditProofUrlTwin = res.data.creditProofUrlTwin.split(',');

          console.log('图片分解')
          console.log(res.data.creditProofUrlTwin.split(','))
        }).catch(error => {
          this.reset(res.message);
        });

        this.loading = false;
      },
    },
    created() {
      this.fetchData();
    },
    watch: {

    },
    computed: {
      ...mapGetters(["userData","islogin"]),
    },
    components: {
      mHeader
    }
  };

</script>

<style lang="scss">
  @import "~assets/scss/mobile";

  .cash-details{

  }
  .cas-main{
    background: #F5F5F5;
  }

  .c-red,.red{color:red;}
  .c-blue{color:#5087FF;}
  .trade-time-bar{
    background: #fff;
    padding:r(20) r(15);
    height:r(60);
    border-bottom:1px solid #d8d8d8;
    margin-bottom:r(20);
  }
  .details-ul{
    border-bottom:1px solid #d8d8d8;
    border-top:1px solid #d8d8d8;
  li{
    background: #fff;
    height:r(50);
    padding:r(15);
    font-size:f(15);
    color:#8f8f8f;
  .l-title{
    display:inline-block;
    width:r(75);
    text-align: right;
    color:#333;
  }
  }
  }


</style>
