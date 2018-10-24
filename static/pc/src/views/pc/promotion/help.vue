<template>
  <div class="prom-helpcent">
     <div class="helpcent-banner-part">
       <!--<div class="container max-width context">-->
         <!--<div class="row">-->
             <!--<h2>如有疑问 我们帮您解答</h2>-->
             <!--<h3>请点击每个问题获取答案。<br>如果你的问题不在这里，请不要犹豫与我们联系。</h3>-->
         <!--</div>-->
       <!--</div>-->
       <img src="~images/prom/help-mobile-banner.jpg"/>
     </div>

     <div class="helpcent-content-part">
       <div class="container max-width">
         <div class="row" :class="{isOfficialWeb:isOfficialWeb}">
           <div class="helpcent-nav">
             <a href="javascript:void(0);" v-for="(item,i) in helpcentNav" :key="i" @click="helpcentType=item.value" :class="{active:helpcentType==item.value}">
               {{item.name}}
             </a>
           </div>

           <div class="context product-access" v-show="helpcentType=='howAccess'">
             <h2>如何接入</h2>
             <p>久安钱包提供PC，H5，手机APP接入，全平台覆盖，商户只需要提供一个登录令牌的接口，久安使用该登录令牌做快速登录，从而隔离玩家的隐私信息，
               建立商户与久安之间的信任关系，如果商户不知道如何开发登录令牌的接口，久安技术团队会全程支持；</p>
             <h2>接入流程</h2>
             <img src="~images/prom/access-process.png" class="width-100">
             <h2>产品费率</h2>
             <p>为建立久安品牌，目前不收费率，我们欢迎需要解决金流问题的伙伴与我们共谋大事</p>
             <h2>合作领域</h2>
             <p>久安钱包与多家国际公司建立合作关系，合作领域包括电商平台，实体餐饮，线上游戏，在线支付，实体赌场等，久安钱包是一个支付工具，
               它是可以无缝接入任何领域的，它是基于去中心化的区块链开发的，所以它的运用场景是非常广泛的，我们非常欢迎各个领域的公司与我们合作，共建区块货币生态圈；
             </p>
           </div>

           <div class="context common-problem" v-show="helpcentType=='commonProblem'">
              <div class="tutorial-item"
                   v-for="(item,index) in tutorial"
                   :key="index"
                   >
                <div class="title" @click="tutorialOpen === index + 1 ? tutorialOpen = 0 : tutorialOpen = index + 1">
                  {{item.title}}
                  <i class="iconfont" :class="{'icon-up-arrow-circle': tutorialOpen === index + 1,'icon-down-arrow-circle': tutorialOpen != index + 1}"></i>
                </div>
                <div class="detail" v-if="tutorialOpen === index + 1">
                  <tutorial-detail :detail="item.detail"></tutorial-detail>
                </div>
              </div>
           </div>

         </div>
       </div>
     </div>

  </div>
</template>
<script>
  import TutorialDetail from './tutorial-detail'
  import TutoriadCfg from './tutorial'
  export default {
    data() {
      return {
        helpcentNav:[
          {
            name: "如何接入",
            value: "howAccess"
          },
          {
            name: "常见问题",
            value: "commonProblem"
          }
        ],
        helpcentType:"howAccess",
        tutorialOpen: 0,
        tutorial:TutoriadCfg,
      };
    },
    props: {
      isOfficialWeb:{
        type:Boolean,
        default:false
      }
    },
    methods: {},
    computed: {},
    created() {
      if(this.isOfficialWeb){
        this.helpcentType = 'commonProblem';
      }
    },
    components: {
      TutorialDetail
    }
  };
</script>
<style lang="scss">
 .helpcent-banner-part{
   min-height: 700px;
   background: url(~images/prom/help-banner.jpg) no-repeat center center;
   background-size: cover;
   img{
     display: none;
   }
   .context{
     display: none;
   }
 }

 .helpcent-content-part{
   background: #F5F5F5;
   padding: 30px 0;
   .row{
     background: #FFFFFF;
   }
   .isOfficialWeb {
     .helpcent-nav{
       display: none;
     }
     .context{
       width: 100%;
       float: none;
       border-left: none;
     }
   }
   .helpcent-nav{
      width: 15%;
      float: left;
     padding-top: 38px;
     a{
       display: block;
       line-height: 40px;
       font-size: 16px;
       color: #333333;
       border-right: 2px solid transparent;
       text-align: center;
       margin-bottom: 12px;
       &.active,&:hover{
         color: #3573FA;
         border-right: 2px solid #3573FA;
       }
     }
   }
   .context{
     width: 85%;
     float: right;
     border-left: 1px solid #E6E6E6;
     min-height: 930px;
     padding: 27px 41px;
     h2{
       font-size: 24px;
       color: #333333;
       line-height: 50px;
       font-weight: normal;
     }
     p{
       font-size: 14px;
       color: #A9A9B1;
       line-height: 24px;
       margin-bottom: 25px;
     }
     .width-100{
       margin: 30px 0 50px;
       max-width: 31%;
     }
   }
 }
 .tutorial-item{

   .title{
     font-size: 24px;
     cursor: pointer;
     display: flex;
     align-items: center;
     .iconfont{
       margin-left: 10px;
       color: #c1c0c0;
     }
   }
 }
 /*@media only screen and (max-width: 1199px) and (min-width: 1000px) {*/
   /*.helpcent-banner-part{*/
     /*min-height: 460px;*/
   /*}*/
 /*}*/

 /*@media only screen and (max-width: 999px) and (min-width: 800px) {*/
   /*.helpcent-banner-part{*/
     /*min-height: 270px;*/
   /*}*/
 /*}*/
 @media only screen and (max-width: 1199px) and (min-width: 800px) {
   .helpcent-banner-part{
     min-height: 460px;
   }
 }
 @media only screen and (max-width: 799px) {
   .helpcent-banner-part{
     min-height: auto;
     padding-top: 44px;
     /*background: url(~images/prom/help-mobile-banner.jpg) no-repeat center center;*/
     /*background-size: cover;*/
     img{
       display: block;
       width: 100%;
       height: auto;
     }
     .context{
       display: block;
       padding-top: 68px;
       h2{
         font-size: 24px;
         color: #FFFFFF;
         line-height: 54px;
         font-weight: normal;
       }
       h3{
         font-size: 18px;
         color: #FFFFFF;
         line-height: 28px;
         font-weight: normal;
       }
     }
   }
   .helpcent-content-part{
      background: #FFFFFF;
      padding: 0 0 20px;
     .helpcent-nav{
       width: 100%;
       float: none;
       padding-top: 0;
       height: 58px;
       border-bottom: 2px solid #E7E7E7;
       a{
         width: 50%;
         float: left;
         line-height: 56px;
         font-size: 18px;
         color: #787876;
         border-right: none;
         margin-bottom:0;
         &:hover,&.active{
           color: #3573FA;
           border-right: none;
           border-bottom: 2px solid #3573FA;;
         }
       }
     }
     .context{
       width: 100%;
       float: none;
       border-left:none;
       padding:16px 0;
       h2{
         font-size: 20px;
       }
       .width-100{
         margin: 15px 0 28px;
         max-width: 86%;
       }
     }
   }

 }

</style>
