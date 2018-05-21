<template>
  <div class="transell-main">
    <nav-menu></nav-menu>
    <!--<tran-headnav></tran-headnav>-->

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
        <div class="row00 detail-box" v-if="DetailList.type == '12'">
          <!--买入   type=12 为买入订单，type=11 为卖出订单-->
          <div class="detail-title">
            <span class="title-btn btn-primary">买入</span>
            <span class="order-num">
              订单号：   {{$route.params.id}}
            </span>
          </div>
          <div class="detail-in">
            <div class="row">
              <div class="col-33" >
                <h3 class="h3">卖方：
                    {{DetailList.debitName}}

                </h3>
                <ul class="details-data">
                  <li>
                    <p>交易金额:</p>
                    <input type="text" class="red" readonly :value="DetailList.debitAmountTwin+' CNY'" >
                  </li>
                  <li>
                    <p>交易数量:</p>
                    <input type="text" readonly  :value="DetailList.debitAmount+' UET'">
                  </li>
                  <li>
                    <p>交易单价:</p>
                    <input type="text" readonly value="0.01 CNY">
                  </li>
                </ul>
              </div>
              <div class="col-33">
                 <div class="alipay-box" v-if="DetailList.debitAccountMerchantTwin == '支付宝'">
                   <p class="alipay-box-title">
                     <i class="i-alipay" v-if="DetailList.debitAccountMerchantTwin == '支付宝'"></i>
                     <i class="i-wechat" v-if="DetailList.debitAccountMerchantTwin == '微信'"></i>
                     {{DetailList.debitAccountNameTwin}}<br> {{DetailList.debitAccountTwin}}</p>
                   <div class="alipay-qrcode">
                       <img src="~images/qrcode.jpg"  :src="DetailList.debitAccountQrCodeUrlTwin">
                       <p>打开{{DetailList.debitAccountMerchantTwin}} [扫一扫] </p>
                   </div>
                 </div>
                 <div class="alipay-box" v-if="DetailList.debitAccountMerchantTwin == '微信'">
                   <p class="alipay-box-title">
                     <i class="i-wechat" v-if="DetailList.debitAccountMerchantTwin == '微信'"></i>
                     {{DetailList.debitAccountNameTwin}}<br> {{DetailList.debitAccountTwin}}</p>
                   <div class="alipay-qrcode">
                       <img src="~images/qrcode.jpg"  :src="DetailList.debitAccountQrCodeUrlTwin">
                       <p>打开{{DetailList.debitAccountMerchantTwin}} [扫一扫] </p>
                   </div>
                 </div>
                 <div class="alipay-box" v-else>
                   <p class="alipay-box-title">
                     <i class="i-bank"></i>
                     {{DetailList.debitAccountMerchantTwin}} </p>
                   <div class="alipay-qrcode">

                     银行卡号:<br>
                     {{DetailList.debitAccountTwin}} 复制卡号<br>
                     开户姓名：<br>
                     {{DetailList.debitAccountNameTwin}}   复制姓名<br>

                     银行类别：<br>
                     {{DetailList.debitAccountMerchantTwin}}<br>
                   </div>
                 </div>
              </div>
              <div class="col-33">
                <div class="order-time">
                  <p class="text-center time-stame">等待付款   <span class="red">{{DetailList.intervalTime | formatDateMs}}</span></p>

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
        <div class="row00 detail-box" v-if="DetailList.type == '11'">
          <!--卖出-->
          <div class="detail-title">
            <span class="title-btn btn-sell">卖出</span>
            <span class="order-num">
              订单号：   {{$route.params.id}}
            </span>
          </div>
          <div class="detail-in">


            <div class="row">
              <div class="col-33" >
                <h3 class="h3">买方：
                    {{DetailList.debitName}}

                </h3>
                <ul class="details-data">
                  <li>
                    <p>交易金额:</p>
                    <input type="text" class="red" readonly :value="DetailList.debitAmountTwin+' CNY'" >
                  </li>
                  <li>
                    <p>交易数量:</p>
                    <input type="text" readonly  :value="DetailList.debitAmount+' UET'">
                  </li>
                  <li>
                    <p>交易单价:</p>
                    <input type="text" readonly value="0.01 CNY">
                  </li>
                </ul>
              </div>
              <div class="col-33">
                <div class="alipay-box" v-if="DetailList.debitAccountMerchantTwin == '支付宝'">
                  <p class="alipay-box-title">
                    <i class="i-alipay" v-if="DetailList.debitAccountMerchantTwin == '支付宝'"></i>
                    <i class="i-wechat" v-if="DetailList.debitAccountMerchantTwin == '微信'"></i>
                    {{DetailList.debitAccountNameTwin}}<br> {{DetailList.debitAccountTwin}}</p>
                  <div class="alipay-qrcode">
                    <img src="~images/qrcode.jpg"  :src="DetailList.debitAccountQrCodeUrlTwin">
                    <p>打开{{DetailList.debitAccountMerchantTwin}} [扫一扫] </p>
                  </div>
                </div>
                <div class="alipay-box" v-else-if="DetailList.debitAccountMerchantTwin == '微信'">
                  <p class="alipay-box-title">
                    <i class="i-wechat" v-if="DetailList.debitAccountMerchantTwin == '微信'"></i>
                    {{DetailList.debitAccountNameTwin}}<br> {{DetailList.debitAccountTwin}}</p>
                  <div class="alipay-qrcode">
                    <img src="~images/qrcode.jpg"  :src="DetailList.debitAccountQrCodeUrlTwin">
                    <p>打开{{DetailList.debitAccountMerchantTwin}} [扫一扫] </p>
                  </div>
                </div>
                <div class="alipay-box" v-else>
                  <p class="alipay-box-title text-center bank-title">
                    <i class="i-bank" :class="DetailList.debitAccountMerchantTwin | bankIcon"></i>{{DetailList.debitAccountMerchantTwin}} </p>
                  <div class="alipay-qrcode text-left bank-txt-box">
                    <div class="bank-list-p">
                      <h3>银行卡号:</h3>
                    {{DetailList.debitAccountTwin}}
                      <button class="copyBtn btn-copy" :data-clipboard-text="DetailList.debitAccountTwin" @click="copy">复制卡号</button>
                      <br>
                    </div>
                    <div class="bank-list-p">
                    <h3>开户姓名：</h3>
                    {{DetailList.debitAccountNameTwin}}
                      <button class="copyBtn btn-copy" :data-clipboard-text="DetailList.debitAccountNameTwin" @click="copy">复制姓名</button>
                      <br>
                    </div>

                    <div class="bank-list-p">
                    <h3>银行类别：</h3>
                    {{DetailList.debitAccountMerchantTwin}} (储蓄卡)<br>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-33">
                <div class="order-time">
                  <p class="text-center time-stame">等待释放UET  <span class="red">{{DetailList.intervalTime | formatDateMs}}</span></p>

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
          <div class="detail-tips detail-tips-sell">
              <p class="tips-title0">买方付款说明：买方已付款至您的  {{DetailList.debitAccountMerchantTwin}}</p>
              <ul class="pic-ul">
                <li v-for="proofImg in DetailList.creditProofUrlTwin">
                  <img :src="proofImg">
                </li>
              </ul>
            <span class="fl friend-txt">友情提示：点击可查看大图</span>

          </div>
          <div class="detail-tips">
              <p class="tips-title tips-title-i">温馨提示</p>
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
  import { transaction } from 'api'
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  import Clipboard from 'clipboard';

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
      copy() {
        var clipboard = new Clipboard('.copyBtn')
        clipboard.on('success', e => {
          toast('复制成功')
          console.log('复制成功')
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          console.log('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
      }


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
      navMenu, vFooter, tranHeadnav
    },
    filters: {
      formatDateMs(time) {
        var date = new Date(time);
        return formatDate(date, "mm:ss");
      },
      bankIcon: function (value) {
        if (!value) return 'icbc';
        if(value == '工商银行'){
          return 'icbc';
        }
        if(value == '招商银行'){
          return 'cmbc';
        }
        //value = value.toString()
        return value
      }
    }
  };
// 时间格式过滤
  export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  };

  function padLeftZero(str) {
    return ('00' + str).substr(str.length);
  }
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
