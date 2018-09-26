<template>
  <div class="transell-main">
    <div class="section detail-content">
      <div class="go-back-part page-content cfx">
        <router-link :to="{name:'orderRecord'}" class="fr">返回上一页</router-link>
      </div>
      <div class="page-content detail-box" v-if="DetailList">
          <detail-title :isCredit="isCredit" :isDebit="isDebit" :orderId="orderId"></detail-title>
          <div class="detail-in cfx">
            <display-infor :DetailList="DetailList" :isCredit="isCredit" :isDebit="isDebit"></display-infor>
            <div class="col-33">
                <div class="order-time">
                  <p class="text-center time-stame" v-if="DetailList.status == 203">
                    <img src="~images/order-completed.png" height="107">
                    <span>订单已完成</span>
                  </p>
                  <p class="text-center time-stame" v-else-if="DetailList.status == 204">
                    <img src="~images/order-cancel.png" height="107">
                    <span >订单已取消</span>
                  </p>
                </div>
            </div>
          </div>
          <div class="detail-tips detail-tips-sell" v-if="DetailList.creditProofUrlTwin">
            <p v-if="isDebit" class="tips-title0">买家付款截图:</p>
            <p v-else-if="isCredit" class="tips-title0">您的付款截图:</p>
            <ul class="pic-ul">
              <li v-for="proofImg in DetailList.creditProofUrlTwin||[]">
                <viewer :images="DetailList.creditProofUrlTwin">
                  <img :src="proofImg" alt="付款截图">
                </viewer>
              </li>
            </ul>
            <span class="fl friend-txt">提示：点击缩略图可放大查看</span>
          </div>

      </div>
      <div class="page-content" v-else>
        <no-data-tip></no-data-tip>
      </div>

    </div>
    <div v-if="isShowpopup">
      <discountPopup :value="couponValueStr" :isPC="true"  @closeState="isNeedClose"></discountPopup>
    </div>

  </div>
</template>

<script>
  import DetailTitle from './detail-title';
  import DisplayInfor from './display-infor';
  import NoDataTip from 'components/no-data-tip'
  import { generateTitle } from '@/util/i18n'
  import { transaction } from 'api'
  import discountPopup from 'components/discount-popup'
  export default {
    data() {
      return {
        DetailList: {

        },
        request:{},
        orderId: '',
        isCredit: false,
        isDebit: false,
        isShowpopup:false
      };
    },
    methods: {
      generateTitle,
      fetchData(){
        this.request={
          transactionId:this.orderId
        }
        transaction.getCoinTransactionHistory(this.request).then(res => {
          this.DetailList = res.data;
          if(this.DetailList.credit == this.userId){
            this.isCredit = true;
          }else if(this.DetailList.debit == this.userId){
            this.isDebit = true;
          }
          //  多个图片分解
          if(res.data.creditProofUrlTwin && res.data.creditProofUrlTwin.length > 1){
            this.DetailList.creditProofUrlTwin = res.data.creditProofUrlTwin.split(',');
          }

        }).catch(error => {
          toast(error.message);
        });
      },
      isNeedClose(val){
        this.isShowpopup = val
      },
      fetchFinallyDiscount() {
        const request = {
          'orderId': this.orderId
        }
        transaction.getFinallyAmount(request).then((res) => {
          if (res.code == '10000') {
            if (res.data) {
              this.isShowpopup = true
              this.couponValueStr = res.data.couponValueStr
              this.isShowDiscount = true
            } else {
              this.isShowpopup = false
              this.isShowDiscount = false
            }
          }
        })
      }
    },
    created() {
      if (this.$route.params.id) {
        this.orderId = this.$route.params.id;
        this.fetchData();
      }
      setTimeout(()=>{
        this.fetchFinallyDiscount()
      },5000)
      this.$store.dispatch('GET_USERBALANCE')
    },
    watch: {
      "$route"(val) {
        this.orderId = val.params.id;
        this.fetchData();

      }
    },
    computed: {
      ...mapGetters(["userData","islogin","userId"]),
    },
    components: {
      DetailTitle, DisplayInfor, NoDataTip, discountPopup
    }
  };

</script>

<style lang="scss" scoped>
  .detail-content{
    min-height:300px;
    padding: 0 0 23px;
  }
  .go-back-part{
    height: 40px;
    a{
      font-size: 16px;
      padding: 5px 12px;
      border-radius: 15px;
      background-color: #86A5F8;
      color: #FFFFFF;
      display: block;
      line-height: 16px;
      margin-top: 7px;
      &:hover{
        background: #9490F6;
      }
    }
  }

  .detail-box{
    border:1px solid #d4d4d4;
  input{
    height:40px;
    line-height: 40px;
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
    padding: 105px 0 0;
    span{
      display: block;
      font-size:24px;
      color: #333333;
      line-height: 40px;
      margin-top: 20px;
    }
  }
  .col-33{
    display:block;
    width: 28%;
    float: left;
    margin:0;
    min-height:427px;
  }
  p {
    font-size: 16px;
    padding:5px 0;
    line-height: 25px;
  }
  .red{color:red;}
  }

  .order-time{
    padding:20px 50px;
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
  .popup_container {
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    .popup_content {
      background-color: #fff;
      width: r(250);
      height: r(274);
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translate(-50%);
      padding: r(20);
      .discount_info {
        width: r(210);
        height: r(108);
        background-color: #ff8b8b;
        border-radius: r(10);
        display: flex;
        .left_side {
          width: r(60);
          font-size: r(30);
          color: #fff;
          line-height: r(108);
          text-align: center;
          position: relative;

        }
        .right_side {
          flex: 1;
          font-size: r(16);
          color: #fff;
          height: r(108);
          position: relative;
          .middle_line {
            position: absolute;
            top: 0;
            left: r(-8);
            width: r(15);
            height: r(108);
            background: url('~images/discount_pink.png') no-repeat;
            background-size: 100%;
            background-color: transparent;
          }
          .rmb_value {
            text-align: center;
            padding-top: r(25);
          }
          .uet_value {
            text-align: center;
            padding-top: r(10);
          }
        }
      }
      .discount_uet {
        font-size: r(14);
        color: #333;
        padding-top: r(20);
        text-align: center;
        span {
          font-size: r(14);
          color: #ec3a4e;
        }
      }
      .go_watch {
        border-radius: r(3);
        background-color: #3573FA;
        color: #fff;
        text-align: center;
        margin-top: r(20);
        height: r(30);
        line-height: r(30);
      }
      .define_ok {
        margin-top: r(10);
        border-radius: r(3);
        background-color: #84a4e9;
        color: #fff;
        text-align: center;
        height: r(30);
        line-height: r(30);
      }
      .close_btn {
        width: r(25);
        height: r(25);
        text-align: center;
        background: url("~images/close_btn.png") no-repeat;
        background-size: 100%;
        margin: 0 auto;
        margin-top: r(40);
      }
    }
  }
</style>
