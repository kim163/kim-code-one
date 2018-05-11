<template>
  <div class="transell-main">
    <nav-menu></nav-menu>
    <tran-headnav></tran-headnav>

    <!--<router-link v-for="(item,i) in transactMenuData" class="item-info" :to="item.to" :key="i">-->
      <!--{{generateTitle(item.name)}}-->
    <!--</router-link>-->
    <div class="tranred-headnav">
      <div class="container">
        <div>
          <a href="/index" class="item-info">
            首页
          </a> &gt;
          <a href="/transaction" class="item-info">
            交易大厅
          </a> &gt;
          <a href="/tranRecord" class="item-info">
            订单记录
          </a> &gt;
          <a href="javascript:;" class="item-info active">
            订单详情
          </a>
        </div>
      </div>
    </div>

    <div class="section detail-content">

      <div class="container">
        <div class="row00 detail-box">
          <div class="detail-title">
              <span class="title-btn btn-primary">卖出</span>
            <span>
              订单号：sdf2933jf92mf0fs292rmdu2mdsi2

            </span>
          </div>
          <div class="detail-in">


            <div class="row">
              <div class="col-33">
                <h3 class="h3">卖方：jiuan12345    深圳腾讯马化腾</h3>
                <ul class="details-data">
                  <li>
                    <p>交易金额:</p>
                    <input type="text" class="red" readonly value="2000.00 CNY">
                  </li>
                  <li>
                    <p>交易数量:</p>
                    <input type="text" readonly value="200000 UET">
                  </li>
                  <li>
                    <p>交易单价:</p>
                    <input type="text" readonly value="0.001 CNY">
                  </li>
                </ul>
              </div>
              <div class="col-33">
                 <div class="alipay-box">
                   <p class="alipay-box-title"><i class="i-alipay"></i>马云<br>nihaojiejie163@163.com</p>
                   <div class="alipay-qrcode">
                       <img src="~images/qrcode.jpg">
                       <p>打开支付宝 [扫一扫] </p>
                   </div>
                 </div>
              </div>
              <div class="col-33">
                <div class="order-time">
                  <p class="text-center time-stame">等待付款   <span class="red">09:25</span></p>

                  <input type="button" class="btn btn-normal" value="我已付款">
                  <p>请在付款后，点击“我已付款”</p>
                  <br/>
                  <input type="button" class="btn btn-orange" value="取消交易">
                  <p class="text-center">
                    <span class="red">如果您已向卖家付款，千万不要取消</span><br>
                    取消规则：买方当日连续取消2笔，或累计取消6笔，将限制交易24小时。
                  </p>

                </div>
              </div>
            </div>
          </div>
          <div class="detail-tips">
              <p class="tips-title">温馨提示</p>
              <p>1.您的汇款将直接进入卖方账户，交易过程中卖方出售的UET由平台托管保护。<br>
                2.请在规定时间内完成付款，并务必点击“我已付款”，卖方确认收款后，系统会将UET划转到您的账户。</p>
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
  import tranHeadnav from 'components/master/tran-headnav';
  import { generateTitle } from '@/util/i18n'



  export default {
    data() {
      return {
      };
    },
    methods: {
      generateTitle,
        fetchData(){
          this.loading = true;

          //拿到查询字段，商品的id后进行http请求
          var id = this.id;


          this.loading = false;
        }
    },
    created() {
      this.fetchData();
    },
    watch: {

    },
    computed: {

    },
    components: {
      navMenu, vFooter, tranHeadnav
    }
  };
</script>

<style lang="scss">

.detail-content{
  min-height:300px;
  margin:30px 0;
}

.detail-box{
  border:1px solid #d4d4d4;
  input{
    height:50px;
    line-height: 50px;
    border:1px solid #d4d4d4;
    width:100%;
    padding:0 20px;
    font-size:16px;
  }
  .time-stame{
    font-size:22px;
    padding:10px 0;
  }
  .col-33{
    display:inline-block;
    width:33%;
    border-right:1px solid #d4d4d4;
    margin:0;
    min-height:427px;
    min-width:350px;
    &:last-child{
      border:0;
     }
  }
   p {
    font-size: 16px;
     padding:5px 0;
     line-height: 25px;
  }
   .red{color:red;}
  .alipay-box{
    margin:50px;
    .alipay-box-title{
      border:1px solid #d4d4d4;
      padding:10px 10px 10px 55px;
      /*text-align: center;*/
      background: url('~images/i-alipay.png') no-repeat 15px center;
      background-size: 30px;
      font-size:16px;
    }
    .alipay-qrcode{
      background: #4aa9e9;
      color:#fff;
      text-align: center;
      padding:18px 0;
      img{
        width:160px;
        height:160px;
        padding:12px;
        background: url('~images/j.png') no-repeat;
        margin-bottom:5px;
      }
    }
  }
}

.order-time{
  padding:20px 50px;
}
.detail-title{
  height:80px;
  border-bottom:1px solid #d4d4d4;
}
.title-btn{
   height:80px;
   line-height: 80px;
   display:inline-block;
   width:140px;
  color:#fff;
  text-align: center;
  background: #5087ff;
  margin:0 20px 0 0;
  font-size:18px;
}

.detail-tips{
  border-top:1px solid #d4d4d4;
  color:#787876;
  line-height:30px;
  padding:18px 30px 50px;
  p{
    font-size:16px;
  }
  .tips-title{
    color:red;
    font-size:18px;
    padding:0 0 15px 0;
  }
}

.h3{
  font-weight:normal;
  color:#333;
  font-size:22px;
  padding:20px 30px 0;
}
.details-data{
 padding:0 30px 30px;
  li{
    padding:20px 0 0 0;
  }
  p{
    font-size:16px;
    padding: 0 0 8px 0;
  }
  .red{color:red;}
}

input[type="button"]{
  &.btn{
    display:inline-block;
    border:1px solid #5087ff;
    color:#5087ff;
    border-radius: 4px;
    height:50px;
    line-height: 50px;
    padding:0 20px;
    margin:10px 0 0 0;
    cursor: pointer;
  &:hover{opacity: .8;}
  }
  .btn-blue{
    border:1px solid #5087ff;
    color:#5087ff;
  }
  &.btn-orange{
    border:1px solid #ffa500;
    color:#ffa500;
  }
  &.btn-normal{
    border:1px solid #5087ff;
    background:#5087ff ;
    color:#fff;
  }
}
  .item-info{
    color:#333;
  }
  .item-info.active{
    color:#5087FF;
  }

.tranred-headnav {
  /*height: 56px;*/
  line-height: 56px;
  height: auto;
  border-bottom: 1px solid #D4D4D4;
}
  .text-center{
    text-align: center;
  }

@media(max-width:1330px){
    .detail-box .col-33{
      width:50%;
        border-right:1px solid #d4d4d4;
      border-bottom:1px solid #d4d4d4;
        height:430px;

  }
}
</style>
