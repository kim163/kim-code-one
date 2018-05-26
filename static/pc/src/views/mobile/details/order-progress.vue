<template>
  <div class="transell-main transell-main-box">
    <!--<m-headnav>{{$t('postPend.postTitle')}}</m-headnav>-->
    <m-header>订单详情</m-header>

    <div class="cash-details">
      <div class="trade-time">
        <span class="c-blue">买入</span>
        <span class="red fr">等待付款 1小时59份59秒</span>
      </div>
      <ul class="trade-ul">
        <li>
          <span class="l-title">订单号 :</span>
          <span class="fr">DSJW92JF00IDFKSPKFM020409232</span>
        </li>
        <li>
          <span class="l-title">应付金额 :</span>
          <span class="fr">
                 <span class="red">5000 UET</span> 折合 <span class="red">50 CNY</span>
             </span>
        </li>
        <li>
          <span class="l-title">当前汇率 :</span> <span class="fr">100UET = 1CNY</span>
        </li>
        <li>
          <span class="l-title">商户名 :</span> <span class="fr"> 千赢国际 </span>
        </li>
        <li>
          <span class="l-title"></span> <span class="fr"> 更换其他支付方式&gt;&gt; </span>
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

  .cas-main{
    background: #F5F5F5;
  }

  .red{color:red;}
  .trade-time{
    padding:20px 15px;
    height:60px;
    border-bottom:1px solid #d8d8d8;
  }
  .trade-ul{

  li{
    height:50px;
    padding:15px 15px;
    border-bottom:1px solid #d8d8d8;
    font-size:15px;
    color:#8f8f8f;
  .l-title{
    display:inline-block;
    width:75px;
    text-align: right;
    color:#333;
  }
  }
  }
  .cash-main{

  .pay-btn{
    display:inline-block;
    text-align: center;
    height:50px;
    line-height: 50px;
    background: #BB9A55;
    color:#fff;
    font-size:18px;
  }
  .btn-block{
    display:block;
  }

  /* login */
  .m-login-box{
    padding:20px;
  }
  /* tab */
  .tab-box{
    color:#6b6b6b;
    border-bottom:0;
  .s{
    display:inline-block;
    height:42px;
    padding:0 10px;
    line-height: 42px;
    margin-right:10px;
    cursor: pointer;
    background: #D8D8D8;
    color:#333;
  &.active{
     background: #BB9A55;
     color:#fff;
   }
  &:hover,&:link,&:active{
                    opacity: .8;
                  }
  }
  }

  }
  .text-center{
    text-align: center;
  }
  .ps-input{
    height:40px;
    border: 1px solid #DEDEDE;
    padding:0 10px;
    width:90%;
  }
  .form-box-phone{
    border: 1px solid #DEDEDE;
    padding:15px;
  }
  .area-box{
    background: #FFEFCE;
  }
  .form-subtitle{
    padding:0 0 8px 0;
  }
</style>
