<template>
  <!--底部内容-->
  <div class="footer">
    <div class="footer-website">
      <div class="content-warp">
        <div class="website-link">
          <router-link :to="{path:'/aboutus/aboutustab1'}" class="bdnone" >关于我们</router-link>
          <router-link :to="{path:'/aboutus/aboutustab2'}">用户协议</router-link>
          <router-link :to="{path:'/aboutus/aboutustab3'}">关于博彩</router-link>
          <img src="./images/logo-two.png">
          <router-link :to="{path:'/aboutus/aboutustab4'}" class="bdnone">免责条款</router-link>
          <router-link :to="{path:'/aboutus/aboutustab5'}">联系我们</router-link>
          <router-link :to="{path:'/aboutus/aboutustab6'}">用户隐私</router-link>
         <!-- <router-link :to="{name:'aboutus'}">牌照展示</router-link>-->
        </div>
      </div>
    </div>
    <div class="footer-btm">
      <div class="content-warp">
        <div class="friend-link">
          <a href="javascript:void(0);"><img src="./images/icon-qt.png"></a>
          <a href="javascript:void(0);"><img src="./images/f01.png"></a>
          <a href="javascript:void(0);"><img src="./images/f02.png"></a>
          <a href="javascript:void(0);"><img src="./images/f03.png"></a>
          <a href="javascript:void(0);"><img src="./images/f04.png"></a>
          <a href="javascript:void(0);"><img src="./images/icon-dt.png"></a>
          <a href="javascript:void(0);"><img src="./images/f07.png"></a>
          <a href="javascript:void(0);"><img src="./images/f08.png"></a>
          <a href="javascript:void(0);"><img src="./images/icon-dc.png"></a>
          <a href="javascript:void(0);"><img src="./images/icon-visa.png"></a>
        </div>
        <div class="footer-tips">
          <p> copyright© Reserved 2017 tpcc.All Rights Reserved </p>
          <div class="footer-browser fr">
             <span>推荐浏览器</span>
             <a href="https://www.google.com/chrome/browser/" target="_blank" class="chrome-icon">chrome</a>
             <a href="http://www.firefox.com/" target="_blank" class="firefox-icon">firefox</a>
             <a href="https://support.apple.com/downloads/safari" target="_blank" class="safari-icon">safari</a>
             <a href="http://windows.microsoft.com/zh-cn/internet-explorer/download-ie" target="_blank" class="ie-icon">ie</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        props:{},
        methods:{},
        computed:{},
        created(){
        },
        components:{}
    };
</script>
<style lang="scss">
  div.footer{
    .footer-website{ background: #1f1f1f; text-align: center; height: 79px; line-height: 79px; color: #fff;}
    .footer-website a{ padding: 0 40px; border-left: #5e5e5e solid 1px;}
    .footer-website a.bdnone{ border:none}
    .footer-website img{ margin-top: -35px;width: 70px; }
    .footer-btm{ background: #2d2d2d; height: 140px;}
    .friend-link{ text-align: center; line-height: 87px;}
    .friend-link a{ margin: 0 5px;}
    .footer-tips{color: #efefef; line-height: 31px;}
    .footer-tips p{display: inline-block;}
    .footer-browser a{display: inline-block;width: 31px; height: 31px;background-image: url(./images/footer-browser.png); background-repeat: no-repeat; text-indent:-9999px;margin: 0 2px; }
    .footer-browser .chrome-icon{background-position: -20px -156px;}
    .footer-browser .firefox-icon{background-position: -20px -88px;}
    .footer-browser .safari-icon{background-position: -20px -224px;}
    .footer-browser .ie-icon{background-position: -20px -20px;}
  }

</style>