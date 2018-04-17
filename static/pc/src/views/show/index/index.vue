<template>
  <div class="index-main">
    <!--<div>-->
      <!--<img src="~images/banner/banner1.jpg" alt="">-->
    <!--</div>-->
    <banner></banner>
    <annunciate>公告组件</annunciate>
    <div class="content">
      <div class="content-warp">
        <div class="superiority">
          <div class="superiority-item">
            <img src="~images/index/superiority1.png">
            <img class="active" src="~images/index/superiority1-1.png">
            <h1 @click="s=true">01分27秒
              <small>存款平均到账时间</small>
            </h1>
          </div>
          <div class="superiority-item">
            <img src="~images/index/superiority2.png">
            <img class="active" src="~images/index/superiority2-1.png">
            <h1>03分12秒
              <small>取款平均到账时间</small>
            </h1>
          </div>
          <div class="superiority-item">
            <img src="~images/index/superiority3.png">
            <img class="active" src="~images/index/superiority3-1.png">
            <h1>全年无休
              <small>24小时随时提款</small>
            </h1>
          </div>
        </div>
        <div class="award">
          <jackpot>奖池</jackpot>
          <winningList>中奖喜讯</winningList>
          <img src="~images/index/money-icon.png" class="rt-img">
        </div>
        <!--<activity></activity>-->
        <recommandGames></recommandGames>
      </div>
    </div>
    <alert-tips></alert-tips>
  </div>
</template>
<script>

  import annunciate from "./components/annunciate"
  import jackpot from "components/jackpot";
  import recommandGames from "./components/recommand-games";

  import activity from "./components/activity";
  import winningList from "./components/winning-list";
  import banner from "./components/banner";
  import alertTips from "./components/alert-tips/index"
  export default {
    data() {
      return {
      };
    },
    methods: {},
    created() {

    },
    activated() {
    },
    components: {
       recommandGames, winningList, activity, banner, annunciate,jackpot,alertTips
    }
  };
</script>
<style lang="scss">
  .index-main {
    .content>.content-warp{
      width: 1140px;
      padding:0 20px 20px;
      background-color: rgba(255,255,255,0.9);
    }
    .superiority {
      height:194px;
      background: #fefefe;
      padding: 63px 0 49px 0;
      .superiority-item {
        cursor: pointer;
        border-left: 1px solid #e5e5e5;
        float: left;
        color: #7f7f7f;
        width: 360px;
        padding: 0 75px 0 31px;
        box-sizing: border-box;
        font-weight: lighter;
        white-space: nowrap;
        font-size: 22px;
        &:first-child{border: none;}
        &:hover{ color: #ed7e12; }
        &:hover .active { display: inherit;}
        &:hover img{display: none;}
        .active{  display: none;}
        img{ float: left;}
        h1{ margin-left: 102px;font-weight: lighter;}
        small{ display: block; margin-top: 14px; font-size: 18px;}
      }
    }

    .award {
      height: 167px;
      background: #f4f4f4;
      padding-top: 13px;
      position: relative;
      .rt-img{ position:absolute; right:-17px; top:-42px;}
    }

  }
</style>
