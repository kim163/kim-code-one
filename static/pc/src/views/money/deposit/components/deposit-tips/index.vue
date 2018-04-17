<template>
  <div class="deposit-tips" v-show="show">
    <div class="deposit-tips-content">
      <div class="title">网银/支付宝转账使用提醒 <i class="iconfont icon-close1 iclose" @click="close"></i></div>

      <div class="content-info">
        <div class="conent">
          1. 使用网银/支付宝转账请选择<font color="red">两小时到账功能</font>！若您使用<font color="red">次日到帐功能</font>，须请您于支付成功之后联系<font color="red">在线客服匹配您的款项</font>！<br>
          2. 微信转账业务于每日23:00-0:30无法选择2小时快速到账，该时段建议玩家<font color="red">使用其它支付方式就进行支付</font>。
        </div>
      </div>

      <div class="btn-group">
         <a class="blue-btn" @click="close">确定</a>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        show: true
      };
    },
    watch: {},
    props: {},
    activated() {

    },
    methods: {
      close(){
        this.show=false;
      }
    },
    computed: {},
    created() {
    },
    components: {}
  };
</script>
<style lang="scss">
  .deposit-tips{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    box-shadow: 1px 1px 50px rgba(0,0,0,.3);
    z-index: 200;
    text-align: center;
     &::before {
      content: '';
      height: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    .deposit-tips-content{
      width: 600px;
      display: inline-block;
      vertical-align: middle;
      border-radius: 2px;
      background-color: #fff;
      color: #666666;
      position: relative;
      text-align: left;
      .iclose {
        font-size:16px;
        color: #2E2D3B;
        cursor: pointer;
        float: right;
      }
      .title {
          padding: 0 10px 0 20px;
          height: 42px;
          line-height: 42px;
          border-bottom: 1px solid #eee;
          font-size: 14px;
          color: #333;
          overflow: hidden;
          background-color: #F8F8F8;
          border-radius: 2px 2px 0 0;
        }
      .content-info{
          position: relative;
          padding: 20px;
          line-height: 24px;
          word-break: break-all;
          overflow: hidden;
          font-size: 14px;
          overflow-x: hidden;
          overflow-y: auto;
        .conent{
             font-size: 16px;
             border: 1px solid #1e327e;
             margin: 10px;
             padding: 10px;
        }
      }
      .btn-group{
          text-align: right;
          padding: 0 10px 12px;
          pointer-events: auto;
        .blue-btn{
          height: 28px;
          line-height: 28px;
          margin: 0 6px;
          padding: 0 15px;
          border: 1px solid #4898d5;
          background-color: #2e8ded;
          color: #fff;
          border-radius: 2px;
          font-weight: 400;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          &:hover{
            background-color: #1e327e;
          }
        }
      }
    }
  }
</style>