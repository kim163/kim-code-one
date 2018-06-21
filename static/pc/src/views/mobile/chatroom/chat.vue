<template>
  <div class="transell-main0 transell-main-box">
    <m-header>会话详情</m-header>
     <div class="order_info">
        <div class="order_state">
          <div class="state_b">
            <span class="state_d">买入</span>
            <span class="order_num">UET订单编号:</span>
            <span class="order_d">订单详情</span>
          </div>
           <div class="order_c">3d00982345jkhkjasasdsajkd</div>
        </div>
       <div>
         <!--展开-->
       <div class="display-box" v-if="isDisplay">
         <div class="line">
           <span>卖家:</span>
           <span class="fr lineColor">saasda</span>
         </div>
         <div class="line">
           <span>交易金额:</span>
           <span class="fr lineColor">100000</span>
         </div>
         <div class="line">
           <span>交易数量:</span>
           <span class="fr lineColor">10000</span>
         </div>
         <div class="display" @click="showDisplay">
           <img src="../../../../static/images/chatWith/hidden.png" alt="">
         </div>
       </div>
         <!--隐藏-->
       <div class="hidden-box" v-if="!isDisplay">
          <div class="hiddenbox" @click="showDisplay">
            <img src="../../../../static/images/chatWith/display.png" alt="">
          </div>
       </div>
     </div>
     </div>
      <!--付款倒计时-->
      <p class="countdown">
        等待付款倒计时: 09: 09
      </p>
     <!--聊天框-->
      <div class="chatbox">

      </div>
     <!--输入框-->
      <div class="input_chatbox">
        <div class="chatbox">
        <input type="text" class="input_message" v-model="messageValue">
        <img :src="imgSrc" alt="" class="more" @click="takePic" v-if="!needSend">
        <input type="button" value="发送" class="sendMessage" v-if="needSend">
        </div>
        <!--照片 照相机-->
        <div class="photo_area">
          <div>
            <input type="file" accept="image/*" value="获取图片">
            <input type="file" accept="image/*" capture="camera" value="打开照相机">
            <img src="../../../../static/images/chatWith/camera.png" alt="">
            <span>照片</span>
          </div>
          <div>
            <img src="../../../../static/images/chatWith/photo.png" alt="">
            <span>照相机</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import mHeader from "components/m-header"
    export default {
        data(){
          return{
            imgSrc:'../../../../static/images/chatWith/more.png',
            isDisplay:true,
            messageValue:'',
            needSend: false
          }
        },
        created(){

        },
        watch:{
          messageValue(val){
            if(val){
              this.needSend = true
            }else {
              this.needSend = false
            }
          }
        },
        methods:{
          showDisplay(){
            this.isDisplay = !this.isDisplay;
          },
          takePic(){
            this.imgSrc = '../../../../static/images/chatWith/input.png'
          }
        },
        components:{
          mHeader
        }
    }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";
  .fr{
    float: right;
  }
  .order_info {
    width: 100%;
    background-color: #fff;

    .order_state {
      padding: r(24) r(10);
      border-bottom: 1px solid #D8D8D8;
      .state_b {
        overflow: hidden;
        .state_d {
          display: inline-block;
          width: r(33);
          height: r(16);
          background-color: #4982FF;
          color: #fff;
          border-radius: r(2);
          font-size: r(12);
          padding: 2px;
          line-height: r(14);
          margin: 0 auto;
          text-align: center;
        }
        .order_num {
          padding-left: r(8);
          font-size: r(15);
          color: #333333;
          line-height: 15px;
        }
        .order_d {
          font-size: 15px;
          color: #4982FF;
          letter-spacing: 0;
          line-height: 15px;
          float: right;
        }
      }
      .order_c {
        padding-top: r(12);
        font-size: 15px;
        color: #787876;
        letter-spacing: 0;
        line-height: 15px;
      }
    }
  }
  .line {
    height: 44px;
    padding: 0 r(10);
    border-bottom: 1px solid #D8D8D8;
    line-height: 44px;
    font-size: r(15);
    color: #333333;
    overflow: hidden;
  }
  .lineColor{
    font-size: 15px;
    color: #8F8F8F;
    letter-spacing: 0;

  }
  .display{
    background-color: #f5f5f5;
  }
  .display img{
    display: block;
    width: 70px;
    height: 20px;
    margin: 0 auto;
  }
  .hiddenbox{
    background-color: #F5F5F5;
  }
  .hiddenbox img{
    display: block;
    width: 70px;
    height: 20px;
    margin: 0 auto;
  }
  .countdown{
    margin-top: r(10);
    font-size: r(15);
    color: #F43531;
    letter-spacing: 0;
    line-height: r(44);
    height: r(44);
    width: 100%;
    text-align: center;
    background-color: #fff;
  }
  .input_chatbox{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid #e0e0e2;

    background-color: #f4f4f6;
    .chatbox{

      display: flex;
      flex-direction: row;
    }
    .more{
      width: r(33);
      height: r(33);
      margin: r(10)  r(5);
    }
  }
  .input_message{
    width: r(312);
    height: r(42);
    border-radius: r(6);
    margin: r(8) r(10);
    background-color: #fdfdfe;
    border: 1px solid #b4b6be;
    flex: 1;
  }
  .sendMessage{
    width: r(43);
    height: r(33);
    margin: r(12) r(5);
    background-color: #4982FF;
    border-radius: r(4);
    color: #fff;
  }
  .photo_area{
    width: 100%;
    height: r(132);
    img{
      width: r(70);
      height: r(70);
    }
  }
</style>
