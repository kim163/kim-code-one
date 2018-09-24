<template>
  <div>
    <MobileHeader>账户详情</MobileHeader>
    <div class="detail-container">
      <div class="account-person-single">
        <p class="account-pic"><span class="iconfont icon-default-user"></span></p>
        <p class="account-name">ANSON001</p>
        <p class="account-num"><span>1000000</span>UET</p>
        <div class="address-info">
          <div class="left-side">
            <span class="iconfont icon-qrcode-address"></span>
            <p>二维码</p>
          </div>
          <div class="right-side">
            <span class="iconfont icon-copy-address"></span>
            <p>复制地址</p>
          </div>
        </div>
        <div class="person-manager">
            <div class="btn active">UET转出</div>
            <div class="btn">收款</div>
        </div>
        <div class="manager-content">
           <div class="de-title">手动转账</div>
           <div>
             <input type="text" >
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MobileHeader from 'components/m-header'

  export default {
    name: "account-detail",
    data() {
      return {}
    },
    components: {
      MobileHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";

  .account-person-single {
    text-align: center;
    padding-top: r(20);
    background-color: #fff;
    .account-pic {
      display: block;
      width: r(80);
      height: r(80);
      border-radius: 50%;
      background-color: #85abfc;
      text-align: center;
      line-height: r(70);
      @include f(35px);
      margin: auto;
    }
    color: #fff;
    .account-name {
      margin-top: r(20);
      @include f(18px);
      color: #333333;
    }
    .address-info {
      display: flex;
      flex-direction: row;
      padding-bottom: r(30);
      .left-side {
        width: 50%;
        span{
          display: inline-block;
          color: #9a9a9a;
          @include f(40px)
        }
        p{
          margin-top: r(10);
          color: #333;
        }
      }
      .right-side {
        width: 50%;
        span{
          display: inline-block;
          color: #9a9a9a;
          @include f(40px)
        }
        p{
          margin-top: r(10);
          color: #333333;
        }
      }
    }
    .person-manager{
      display: flex;
      flex-direction: row;
      .btn{
        width: 50%;
        text-align: center;
        height: r(52);
        color: #333;
        line-height: r(52);
        border-top: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
      }
      .active{
        background-color: #85abfc;
        color: #fff;
      }
    }
  }
</style>
