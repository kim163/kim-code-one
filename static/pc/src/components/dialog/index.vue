<template>
  <popup>
    <div class="dialog-main">
      <a class="close iconfont icon-close" @click="$emit('change',false)"></a>
      <slot></slot>
    </div>
  </popup>
</template>

<script>
  import Popup from 'components/common-popup'
  export default {
    name: "index",
    components:{
      Popup
    },
    props:{
      show:{
        type:Boolean,
        default:false
      }
    },
    model:{
      props:"show",
      event:'change'
    }
  }
</script>

<style lang="scss" scoped>
  .dialog-main{
    padding: 30px;
    background: #FFFFFF;
    position: relative;
    width: 506px;
    .close{
      font-size: 20px;
      position: absolute;
      top: 30px;
      right: 30px;
      cursor: pointer;
      z-index: 2;
      color: #C8C8C8;;
    }
  }
</style>