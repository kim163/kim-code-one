<template>
  <div class="transell-main">
    <nav-menu></nav-menu>
    <tran-headnav></tran-headnav>

    <div>这是手机端</div>
    <div>这是手机端</div>
    <div>这是手机端</div>
    <div>这是手机端</div>
    <div>这是手机端</div>
    <div>这是手机端</div>
    <div>这是手机端</div>
    <div>这是手机端</div>
    <div>这是手机端</div>
    <div>这是手机端</div>
    <div>这是手机端</div>
    <div>这是手机端</div>
    <div>这是手机端</div>

  </div>
</template>

<script>
  import navMenu from 'components/nav';
  import vFooter from 'components/footer';
  import tranHeadnav from 'components/master/tran-headnav';
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
    },
    created() {
    },
    watch: {

    },
    computed: {
      ...mapGetters(["userData","islogin"]),
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
    input:read-only {
      background: #f7f7f7;
    }
    .btn-sell{
      background: orange;
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
      padding:10px 10px 10px 10px;
      background-size: 30px;
      font-size:16px;
      &.bank-ttile{
         font-size:20px;
       }
    }
    .i-alipay{
      display:inline-block;
      float:left;
      height:50px;
      width:38px;
      background: url('~images/i-alipay.png') no-repeat left center;
      background-size: 30px;
    }
    .i-wechat{
      display:inline-block;
      float:left;
      height:50px;
      width:38px;
      background: url('~images/i-wechat.png') no-repeat left center;
      background-size: 30px;
    }
    .alipay-qrcode{
      background: #4aa9e9;
      color:#fff;
      text-align: center;
      padding:18px;
      &.text-left{
        text-align: left;
       }
      &.bank-txt-box{
        padding:18px 22px;
       }
       h3{
         font-weight:normal;
         font-size:18px;
         padding:2px 0 8px;
       }
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
  .tips-title-i{
    background: url(~images/tips.png) no-repeat left 4px;
    padding:0 0 15px 25px;
  }
  .tips-title0{
    padding:0 0 15px 0;
  }
}
.detail-tips-sell{
  padding:18px 30px 20px;
  overflow: hidden;
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

  .pic-ul{overflow: hidden;float:left;}
  .pic-ul li{float:left; margin-right:15px;}
  .pic-ul li img{ height:190px;}
  .friend-txt{
    margin-top:150px;
  }
  .bank-list-p{
    position:relative;
    margin-bottom:18px;
  }
  .btn-copy{
    position: absolute;
    right:0;
    bottom:0;
    color:#fff;
    border:0;
    cursor: pointer;
  }
  .i-bank{
    display:inline-block;
    height:40px;
    width:46px;
    vertical-align: -13px;
    &.icbc{
       background: url(~images/bankIcon/icbc.png) no-repeat;
       background-size: 40px;
     }
    &.cmbc{
       background: url(~images/bankIcon/cmbc.png) no-repeat;
       background-size: 40px;
     }
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
