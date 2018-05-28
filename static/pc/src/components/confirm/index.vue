<template>
  <div class="confirm-main" v-if="show">
    <div class="mask-bg" @click="hideDialog"></div>
    <div class="container">
      <div class="confirm-title">
        <slot name="title"></slot>
      </div>
      <div class="confirm-content">
        <slot name="content"></slot>
      </div>
      <div class="confirm-footer">
        <div class="confirm-btn" @click="hideDialog">
          <slot name="leftBtn">{{$t('postPend.cancel')}}</slot>
        </div>
        <div class="confirm-btn">
          <slot name="rightBtn"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "confirm-dialog",

    model: {
      prop: 'show',
      event: 'change'
    },

    data() {
      return {
      }
    },

    props:{
      show: {
        type: Boolean,
        default: false
      },
    },
    watch: {
      show: {
        handler(val) {
          this.$nextTick(() => {
            if (val) {
              this.show = true
            } else {
              this.show = false
            }
          })
        },
        immediate: true
      },
    },
    methods:{
      hideDialog(){
        this.$emit('change', false)
      },
    },
    beforeDestroy(){
      this.$emit('change', false)
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";
  .confirm-main{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    .mask-bg{
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.40);
    }
    .container{
      width: r(300);
      height: r(160);
      background: #FFFFFF;
      border-radius: 5px;
      z-index: 1001;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -#{r(80)};
      margin-left: -#{r(150)};
      .confirm-title,.confirm-content{
        width: 100%;
        text-align: center;
        font-size: 18px;
        color: #333333;
        margin-top: r(15);
      }
      .confirm-title{
        margin-top: r(30);
      }
    }
    .confirm-footer{
      width: 100%;
      border-top: 1px solid #e5e5e5;
      display: flex;
      justify-content: space-around;
      margin-top: r(25);
      .confirm-btn{
        width: 49.5%;
        height: r(40);
        line-height: r(40);
        text-align: center;
        &:first-child{
          border-right: 1px solid #e5e5e5;
        }
      }
    }
  }

</style>