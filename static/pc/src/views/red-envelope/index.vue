<template>
 <div>
  <popup class="red-envelope-main" v-if="showRedEnvelope">
    <div class="container">
       <div class="header cfx">
         <a class="close fr" href="javascript:void(0);" @click="closeDialog">
           <i class="iconfont icon-close"></i>
         </a>
       </div>
       <div class="logo">
          <span class="circle">
             <i class="iconfont icon-juan-logo1"></i>
          </span>
       </div>
       <div class="amount-part">
          <h4>{{sendUserName}}<br />给您发了一个红包</h4>
          <h1>{{amount}}UET</h1>
          <div class="receive-btn">
            <a href="javascript:void(0);" @click="collarEnvelope" ></a>
          </div>
          <p>
            红包将于{{endTime | Date('yyyy-MM-dd')}}后过期，过期将自动返回给对方，请及时领取！
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
  import {
    myGift,
    receiveCoupon
  } from 'api/user-center'
  export default {
    data() {
      return {
        showRedEnvelope:false,
        id: '',
        endTime: 0,
        amount: 0,
        userType:0,// 0 是系统发放 1是用户发放
        sendUserName:'久安钱包', //红包发放者
        index:0,//当前红包
        redArr:[],//红包数组
      };
    },
    components: {
      Popup
    },
    computed:{
      ...mapGetters([
        'userId'
      ])
    },
    methods: {
      collarEnvelope(){
        const data = {
          id: this.id,
          couponType: 105,
          userId: this.userId
        }
        receiveCoupon(data).then(res => {
          if(res.code === 10000){
            toast('红包领取成功')
            this.$refs.music.play();
            this.showRedEnvelope = false
            this.$store.dispatch('GET_USERBALANCE')
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      checkRedEnvelope(){
        const data = {
          limit:10,
          offset:0,
          couponType:105,
          couponStatus:2,
          loading:false
        }
        myGift(data).then(res => {
          console.log(res)
          if(res.code === 10000){
            if(!_.isNull(res.data) && !_.isEmpty(res.data)){
              this.redArr = [...res.data]
              this.index = 0
              this.getRedInfo()
            }
          }
        }).catch(err => {

        })
      },
      getRedInfo(){
        this.id = this.redArr[this.index].id
        this.endTime = this.redArr[this.index].couponEndtime
        this.amount = this.redArr[this.index].couponValueStr
        this.userType = this.redArr[this.index].userType
        if(this.userType === 1){
          this.sendUserName = this.redArr[this.index].userName
        }
        const now = _.now()
        if(now < this.endTime){
          this.showRedEnvelope = true
        }
      },
      closeDialog(){
        this.showRedEnvelope = false
        this.index += 1
        if(this.index < this.redArr.length){
          this.getRedInfo()
        }else{
          this.index = 0
          this.redArr = []
        }
      }
    },
    created() {
    },
    mounted(){
      this.checkRedEnvelope()
      this.timer = setInterval(() => {
        this.checkRedEnvelope()
      },10000)
    },
    beforeDestroy(){
      clearInterval(this.timer)
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
