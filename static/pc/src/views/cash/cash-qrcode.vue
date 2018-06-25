<template>
  <div>
    <p class="c-l-title"> 久安扫码支付</p>
    <div v-if="endTime > 0">
      <p v-show="qrCodeStatus != 1"> 二维码将在<span class="orange">{{qrCodeTime}}秒</span>后失效</p>
      <p v-show="qrCodeStatus === 1">支付中</p>
    </div>
    <div v-else>该笔订单已超时</div>
    <div class="qrcode-box">
      <div v-if="endTime > 0">
        <div class="pay-mask" v-show="qrCodeStatus === 1">正在支付......</div>
        <div class="pay-mask" v-show="qrCodeStatus === 2">
          <div>二维码已失效</div>
          <div class="qrcode-refresh" @click="$emit('qrcodeRefresh')">重新获取</div>
        </div>
      </div>
      <div class="pay-mask" v-else>订单已超时</div>
      <qrcode :value="infoData.qrCodeImg" v-if="infoData.qrCodeImg" :options="{ size: 248 }"></qrcode>
    </div>
    <p class="i-scan">打开久安钱包<br>扫一扫</p>
  </div>
</template>

<script>
  import Qrcode from '@xkeshi/vue-qrcode';
  export default {
    name: "cash-qrcode",
    data() {
      return {
        qrCodeTime:180, //二维码倒计时
        status:0,
      }
    },
    watch:{
      qrCodeStatus(){
        this.status = this.qrCodeStatus
        if(this.status === 0){
          this.qrCodeTime = 180
          this.qrCodeCountDown()
        }
      },
    },
    props:{
      infoData:{
        type:Object,
        default:{}
      },
      endTime:{
        type:Number,
        default:0
      },
      qrCodeStatus:{
        type:Number,
        default:0
      }
    },
    components:{
      Qrcode
    },
    methods:{
      qrCodeCountDown(){
        setTimeout(() => {
          this.qrCodeTime -= 1
          if(this.qrCodeTime <= 0){
            this.status = 2
          }else{
            this.qrCodeCountDown()
          }
        },1000)
      },
    },
    mounted(){
      this.status = this.qrCodeStatus
      this.qrCodeCountDown()
    }
  }
</script>

<style lang="scss" scoped>
  .c-l-title {
    font-size: 26px;
    padding: 8px 0;
  }
  .qrcode-box {
    width: 250px;
    height: 250px;
    border: 1px solid #ececec;
    margin: 20px auto;
    position: relative;
    .pay-mask{
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      background: rgba(0,0,0,.8);
      color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .qrcode-refresh{
      margin-top: 20px;
      width: 120px;
      height: 30px;
      background: #619eff;
      border-radius: 5px;
      font-size: 16px;
      line-height: 30px;
      cursor: pointer;
    }
  }

  .i-scan {
    background: url(~images/scan.png) no-repeat left center;
    padding-left: 52px;
    width: 170px;
    margin: 0 auto;
    text-align: left;
    font-size: 18px;
  }
  .orange {
    color: #ff9200;
  }
</style>