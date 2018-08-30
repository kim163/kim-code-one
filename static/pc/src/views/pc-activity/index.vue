<template>
  <div class="container min-width main">
    <swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide v-for="(item,index) in 2" :key="item">
        <div class="act-item" :class="`item-${index}`">

        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    name: "pc-activity",
    data(){
      return{
        swiperOption:{
          pagination: {
            el: '.swiper-pagination'
          },
          autoplay: {
            delay: 5000,
          },
          loop: true,
        }
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    methods:{

    }
  }
</script>

<style lang="scss" scoped>
  .main{
    margin-top: 30px;
    .swiper-container{
      overflow: initial;
    }
  }
  .act-item{
    width: 100%;
    height: 100px;
    &.item-0{
      background-image: linear-gradient(44deg, #FEE140 0%, #FCA96D 50%, #FCA96D 50%, #FA709A 100%);
    }
    &.item-1{
      background-image: linear-gradient(45deg, #69EDFF 0%, #AD7EFD 100%);
    }
    &.item-2{
      background-image: linear-gradient(47deg, #EE69FF 0%, #955AF9 100%);
    }
    &.item-3{
      background-image: linear-gradient(-236deg, #FB9F75 0%, #FA709A 100%);
    }
  }
  .swiper-pagination{
    bottom: -20px;
  }
</style>