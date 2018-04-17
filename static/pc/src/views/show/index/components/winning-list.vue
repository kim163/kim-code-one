<template>
  <div class="awards-list">
    <div class="name">中奖喜讯</div>
    <div class="list-warp">
      <ul class="cfx" ref="lists" style="position: relative; top: -7.25545px;">
        <li v-for="item in myData" :key="item.prizeTime">
          <a href="/slotgame" >
            玩家
          <span class="cl-bigred">{{item.userName}}</span> 在{{item.platform.toUpperCase()}}<span class="cl-bigred">{{item.gameName}}</span>投注<span class="cl-bigred">{{item.betAmt}}</span>赢得<span class="cl-bigred">{{item.prize}}</span>元</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {getCarouselListAll} from "api/show"
  import Velocity from 'velocity-animate';

  export default {
    data() {
      return {
        myData: [],
        id:0
      }
    },
    watch:{
      myData(val){
        if (val.length>0) {
          this.id=window.setInterval(() => {
            this.move();
          }, 1900)
        }
      }
    },
    methods: {
      move() {
        let $this = this;
        Velocity(this.$refs.lists, {
          top: "-28px;"
        }, {
          duration: 1000,
          complete() {
            $this.$refs.lists.appendChild($this.$refs.lists.childNodes[0])
            $this.$refs.lists.style.top = 0;
          }
        })
      }
    },
    beforeDestroy(){
      window.clearInterval(this.id)
    },
    created() {
      getCarouselListAll().then(res => {
        if (res.success) {
          this.myData = res.data;
        }
      })
    }
  }
</script>
<style lang="scss" spcoed>
  .awards-list {
    padding: 18px 0 15px 12px;
    position: relative;
    float: left;
    width: 517px;
    background: #fff;
    height: 147px;
    border-radius: 30px;
    li {
      white-space: nowrap;
      margin: 0 0 0 28px;
      line-height: 28px;
    }
    .list-warp {
      overflow: hidden;
      height: 112px;;
    }
    .name {
      width: 23px;
      position: absolute;
      padding-top: 35px;
      border-radius: 20px;
      text-align: center;
      height: 125px;
      top: 12px;
      left: -11px;
      background: #ed7e12;
      color: #fff;
    }
  }
</style>
