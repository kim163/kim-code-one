<template>
  <div class="banner index-banner">
    <transition-group name="fade">
    <a v-for="(item,i) in myData" :key="i"
       :class="['opacity-item',{active:active==i}]" v-show="active==i"
       ref="i"
       :href="item.hyperlinkUrl">
      <img :src="item.showUrl"/>
    </a>
    </transition-group>
    <div class="banner-page">
      <a v-for="(item,i) in myData" :class="{active:active==i}" href="javascript:void(0);"
         @click="active=i"
      ></a>
    </div>
  </div>
</template>
<script>
  import {queryBannerList} from "api/show"
//  import Velocity from 'velocity-animate';
  export default {
    data() {
      return {
        myData: [],
        active: 0,
        id: 0
      }
    },
    props: {},
    computed: {},
    watch: {
      active(cur, old) {
        this.move(cur, old)
      }
    },
    methods: {
      move(cur, old) {
//        let dom= document.querySelectorAll('.index-banner a');
//        Velocity(dom[old], {opacity: 0},1000);
//        Velocity(dom[cur],{opacity:1},1000);
      },
      next() {
        this.active = (this.active + 1) % this.myData.length;
      },
      prev() {
        if (this.active == 0) {
          this.active = this.myData.length - 1;
        }else{
          this.active--;
        }
      }
    },
    beforeDestroy() {
      window.clearInterval(this.id)
    },
    created() {
      queryBannerList({bannerType: 0}).then(res => {
        if (res.success) {
          this.myData = res.data;
          let $this = this;
          if (this.myData.length > 0) {
            $this.id = window.setInterval(() => {
              $this.next();
            },5000)
          }
        }
      })
    },
    mounted() {
    },
    components: {}
  }
</script>
<style lang="scss" spcoed>
  .index-banner {
    max-width: 1920px;
    height: 443px;
    overflow: hidden;
    position: relative;
    text-align: center;
    margin: 0 auto;
    .opacity-item {
      position: absolute;
      left: 0;
      top: 0;
      &.active {
        z-index: 1;
      }
    }
    .banner-page {
      width: 100%;
      text-align: center;
      z-index: 2;
      bottom: 15px;
      left: 0;
      position: absolute;
      > * {
        display: inline-block;
        height: 20px;
        width: 20px;
        margin: 0 5px;
        border-radius: 50%;
        background: #fff;
        &.active {
          background: #041238;
        }
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity 1.5s
    }
    .fade-enter,.fade-leave-to{
      opacity: 0
    }
  }
</style>
