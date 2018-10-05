<template>
 <div>
  <popup class="red-envelope-main" v-if="showRedEnvelope">
    <div class="container">
       <div class="header cfx">
         <a class="close fr" href="javascript:void(0);" @click="showRedEnvelope=false">
           <i class="iconfont icon-close"></i>
         </a>
       </div>
       <div class="logo">
          <span class="circle">
             <i class="iconfont icon-juan-logo1"></i>
          </span>
       </div>
       <div class="amount-part">
          <h4>久安钱包<br />给您发了一个红包</h4>
          <h1>1000UET</h1>
          <div class="receive-btn">
            <a href="javascript:void(0);" @click="collarEnvelope" ></a>
          </div>
          <p>
            红包将于2018-10-10后过期，过期将自动返回给对方，请及时领取！
          </p>
       </div>
    </div>
  </popup>

   <audio ref="music" muted>
     <source src="~assets/music/red-envelope.ogg" type="audio/ogg"/>
     <source src="~assets/music/red-envelope.mp3" type="audio/mpeg"/>
   </audio>

 </div>
</template>
<script>
  import Popup from 'components/common-popup';
  export default {
    data() {
      return {
        showRedEnvelope:false
      };
    },
    props: {},
    methods: {
      collarEnvelope(){
        this.$refs.music.play();
      }
    },
    computed: {},
    created() {
    },
    mounted(){

    },
    components: {
      Popup
    }
  };
</script>
<style lang="scss" scoped>
  @import "~assets/scss/mixin";

  .red-envelope-main{
     .container{
        width: 70%;
        max-width: r(250);
        min-height: r(367);
        background: url("~images/red-envelope.png") no-repeat center center;
        background-size: contain;

        .header{
          .close{
            padding: r(10) r(15) 0;
            display: block;
            i.icon-close{
              @include  f(18px);
              color: #FFFFFF;
            }
            &:hover i.icon-close{
              color: #A38CFD;
            }
          }
        }
        .logo{
          margin-bottom: r(12);
          text-align: center;
          .circle{
             display: inline-block;
             width: r(60);
             height: r(60);
             border-radius: r(35);
             background: #FFFFFF;
             @include  f(40px);
             color: #3573FA;
          }
        }
        .amount-part{
          color: #F9E3A7;
          text-align: center;
          h4{
            @include  f(14px);
            line-height: r(26);
            font-weight: normal;
          }
          h1{
            @include  f(30px);
            line-height: r(52);
            font-weight: normal;
            margin-bottom: r(5);
          }
          .receive-btn{
             margin-bottom:r(17);
             text-align: center;
            a{
              display: inline-block;
              width: r(82);
              height: r(80);
              background: url("~images/receive-btn.png") no-repeat center center;
              background-size: contain;
              -webkit-animation: heartbeat 0.2s linear 0.5s infinite alternate;
              -webkit-animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
              animation: heartbeat 0.2s linear 0.5s infinite alternate;
              animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
            }
          }
          p{
            @include  f(12px);
            line-height: r(20);
            padding:0 r(18);
          }
        }

     }
  }

</style>
