<template>
  <div class="prom-helpcent">
     <display-nav></display-nav>
     <div class="helpcent-banner-part"></div>

     <div class="helpcent-content-part">
       <div class="container max-width">
         <div class="row">
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
             <h2>如何买币？</h2>
             <p>在PC，H5, APP上面发布买币需求，通过匹配卖家，跟卖家进行交易；</p>
             <h2>如何卖币？</h2>
             <p>在PC，H5, APP上面发布卖币需求，通过匹配买家，跟买家进行交易；</p>

             <h2>资金安全吗？</h2>
             <p>在久安流转的是数字货币不是法币，一方面避免金流监管，同时数字货币都是通过区块链技术保存，不用担心被盗的风险；</p>
             <h2>商户自己的UET怎么提现？</h2>
             <p>商户获得的UET，可以直接在久安平台卖出去给任何一个用户，也可以通过久安回购的方式进行提现，但是我们更加鼓励前种方式，因为这对于商户来说要更加安全；</p>
             <h2>一般接入需要多久？</h2>
             <p>一般从确认对接，到正式上线，10个工作日左右；</p>
             <h2>会被黑客攻击吗？</h2>
             <p>久安区块链货币，是使用了区块链技术，所有的资金信息都是通过区块链记账，不可篡改；</p>
             <h2>隐私信息会泄露吗？</h2>
             <p>久安不保存用户的隐私信息，用户的交易记录也是通过多层加密存放在区块链；</p>
           </div>

         </div>
       </div>
     </div>

     <v-footer :isDisplayFoot="true" ></v-footer>
  </div>
</template>
<script>
  import displayNav from 'components/nav/display-nav';
  import vFooter from 'components/footer';

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
        helpcentType:"howAccess"
      };
    },
    props: {},
    methods: {},
    computed: {},
    created() {
    },
    components: {
      displayNav, vFooter
    }
  };
</script>
<style lang="scss">
 .helpcent-banner-part{
   min-height: 420px;
   background: url(~images/prom/help-banner.jpg) no-repeat center center;
   background-size: cover;
 }

 .helpcent-content-part{
   background: #F5F5F5;
   padding: 30px 0;
   .row{
     background: #FFFFFF;
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
     }
   }
 }

 @media only screen and (max-width: 799px) {

 }

</style>
