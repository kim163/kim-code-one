<template>
  <div>
    <div class="cfx">
      <h2 style="padding-left: 20px;padding-top: 50px;: ">最高人气游戏</h2>
      <ul class="game-menu fl">
        <li v-for="(item,i) in platformData" :class="{active:active==item.value}" @click="active=item.value">
          <a href="javascript:void(0);" :class="{bdnone:i==platformData.length-1}">
            {{item.name}}
          </a>
        </li>
        <li></li>
      </ul>
      <router-link :to="{name:'slotgame'}" class="fr game-menu-more">更多</router-link>
    </div>
    <ul class="game-list">
      <li v-for="(item,i) in filterData" :key="item.gameId">
        <img v-lazy="getImg({pic:item.picPath,category:item.platform,id:item.gameId})">
        <div class="list-item">
          <h2>{{item.gameName}}</h2>
          <div class="star-list">
            评分星级
            <div class="star-info"></div>
          </div>
          <p class="tag-list">
            <span>游戏平台</span><span>{{item.platform}}电子</span>
          </p>
          <a target="_blank" href="javascript:void(0);" @click="playGame(extend(item),$event)" class="game-in">进入游戏</a>
        </div>
      </li>
    </ul>
  </div>

</template>
<script>
  import {games} from "@/vue-extend/mixins/game";
  import {queryRecommandGamesList} from "api/show"
  import {platformData} from "@/assets/data"

  export default {
    mixins: [games],
    data() {
      return {
        active: "PT",
        platformData,
        myData: [],
      };
    },
    methods: {
      extend(item) {
        return {
          "eName": "",
          "name": item.gameName,
          "id": item.gameId,
          "code": item.code||'',
          "category": item.platform,
          "type": "SLO",
          "line": "",
          "state": 1,
          subType:item.subType||'',
          "pic": item.picPath,
          "tag": []
        }
      }
    },
    computed: {
      filterData() {
        if (this.active == '')
          return this.mydata.slice(0, 6);
        return this.myData.filter(item => {
          return item.platform.indexOf(this.active)>-1;
        }).slice(0, 6)
      }
    },
    created() {
      queryRecommandGamesList({gameType: 0}).then(res => {
        if(res.success&&res.data)
        {
          this.myData = res.data;
          //热门游戏封面切换服务器地址时的遗留问题
          for(let j = 0,len=this.myData.length; j < len; j++) {
            if(this.myData[j].platform.toLowerCase()=='dt'||this.myData[j].platform.toLowerCase()=='png'||this.myData[j].platform.toLowerCase()=='ttg'){
              this.myData[j].picPath=this.myData[j].gameId.toLowerCase()+'.png';
            }else{
              this.myData[j].picPath=this.myData[j].gameId.toLowerCase()+'.jpg';
            }
          }
        }
      });
    },
    activated() {
    },
    components: {}
  }
</script>
<style spcoed>

  .game-menu {
    height: 49px;
    margin: 21px 0;
  }

  .game-menu li {
    position: relative;
    float: left;
    border: 2px transparent solid;
    color: #3d3d3d;
    font-size: 18px;
    line-height: 45px;
    height: 45px;
  }

  .game-menu li a {
    line-height: 28px;
    height: 28px;
    padding: 0 24px;
    border-right: 1px solid #e4e4e4;
    display: inline-block;
    vertical-align: middle;
  }

  .game-menu li.active {
    border-color: #ed7e12;
    color: #ed7e12;
  }

  .game-menu li.active a, .game-menu li .bdnone {
    border: none;
  }

  .game-menu li.active:after, .game-menu li.active:before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -20px;
    margin-left: -10px;
    height: 0;
    width: 0;
    border: 10px solid transparent;
  }

  .game-menu li.active:after {
    border-top-color: #fff;
    bottom: -18px;
  }

  .game-menu li.active:before {
    border-top-color: #ed7e12;
  }

  .game-menu-more {
    margin-top: 21px;
    line-height: 49px;
    background: url(~images/index/more.png) no-repeat right;
    font-size: 14px;
    padding-right: 28px;
  }

  .game-list {
    overflow: hidden;
    margin-bottom: 60px;
  }

  .game-list li {
    float: left;
    width: 358px;;
    background: #f6f6f6;
    margin-right: 8px;
    height: 166px;
    margin-bottom: 3px;
  }

  .game-list .item-other, .game-list .item-other img {
    float: right;
    margin: 0;
    width: 294px;
    height: 335px;
    margin-right: 0;
  }

  .game-list li img {
    height: 166px;
    float: left;
    width: 166px;
  }

  .game-list li .list-item {
    padding-left: 186px;
    padding-top: 33px;;
  }

  .game-list li .list-item h2 {
    font-size: 18px;
    font-weight: bold;
    color: #3d3d3d;
  }

  .game-list li .star-list {
    line-height: 33px;
  }

  .game-list li .star-info {
    display: inline-block;
    height: 11px;
    width: 55px;
    background: url(~images/index/xing.png) repeat-x;
  }

  .game-list li .tag-list span {
    font-size: 14px;
    display: inline-block;
    margin-right: 21px;
  }

  .game-list li .game-in {
    display: inline-block;
    width: 87px;
    height: 26px;
    margin-top: 22px;
    text-align: center;
    border-radius: 15px;;
    line-height: 26px;
    color: #fff;
    background: #ed7e12;
  }

</style>
