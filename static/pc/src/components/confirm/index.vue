<template>
  <popup class="confirm-main" v-if="show">
    <div class="mask-bg" @click="hideDialog"></div>
    <div class="container" :class="{'container-pc': isPc}">
      <div class="header" v-if="isPc">
        <slot name="header-title">温馨提示</slot>
        <a class="close" @click="hideDialog">
          <i class="iconfont icon-close"></i>
        </a>
      </div>
      <div class="confirm-title">
        <slot name="title"></slot>
      </div>
      <div class="confirm-content">
        <slot name="content"></slot>
      </div>
      <div class="confirm-footer">
        <div class="confirm-btn" v-if="showLeftBtn" :class="{'confirm-btn-pc': isPc}" @click="hideDialog">
          <slot name="leftBtn">{{$t('postPend.cancel')}}</slot>
        </div>
        <div class="confirm-btn" v-if="showRightBtn" :class="{'confirm-btn-pc': isPc}">
          <slot name="rightBtn"></slot>
        </div>
      </div>
    </div>
  </popup>
</template>

<script>
  import Popup from 'components/common-popup'
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
    components:{
      Popup
    },
    props:{
      show: {
        type: Boolean,
        default: false
      },
      isPc:{
        type:Boolean,
        default:false
      },
      showLeftBtn:{
        type:Boolean,
        default:true
      },
      showRightBtn:{
        type:Boolean,
        default:true
      }
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
    .header{
      width: 100%;
      height: r(50);
      background-color: #5087ff;
      line-height: r(50);
      padding: 0 r(20);
      display: flex;
      justify-content: space-between;
      color: #ffffff;
      @include f(20px);
      .close{
        cursor: pointer;
        .icon-close{
          @include f(14px);
          color: #FFFFFF;
        }
      }
    }
    .container{
      width: 72%;
      overflow: hidden;
      background: #FFFFFF;
      border-radius: 5px;
      &.container-pc{
        width: 500px;
        .icon-close{
          @include f(20px);
        }
      }
      .confirm-title,.confirm-content{
        width: 100%;
        text-align: center;
        font-size: 18px;
        color: #333333;
        margin-top: r(15);
        padding: 0 r(10);
      }
      .confirm-title{
        margin-top: r(30);
        padding: 0 r(10);
      }
    }
    .confirm-footer{
      width: 100%;
      border-top: 1px solid #e5e5e5;
      display: flex;
      justify-content: space-around;
      margin-top: r(25);
      .confirm-btn{
        width: 50%;
        height: r(40);
        line-height: r(40);
        text-align: center;
        cursor: pointer;
        >div{
          height: 100%;
        }
        &.confirm-btn-pc{
          height: r(60);
          line-height: r(60);
        }
      }
    }
  }

</style>
