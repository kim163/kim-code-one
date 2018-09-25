<template>
  <div class="detail-container">
    <MobileHeader>账户详情</MobileHeader>
    <div>
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
          <div class="transfer-address">
            <input type="text" placeholder="请手动输入地址">
          </div>
          <div class="transfer-amount">
            <input type="text" placeholder="请填写转账数量">
            <span class="amount-value">UET</span>
          </div>
          <div class="btn">确定转账</div>
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

  .detail-container {
    height: -webkit-fill-available;
    background-color: #fff;
    .account-person-single {
      text-align: center;
      padding-top: r(20);
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
          span {
            display: inline-block;
            color: #9a9a9a;
            @include f(40px)
          }
          p {
            margin-top: r(10);
            color: #333;
          }
        }
        .right-side {
          width: 50%;
          span {
            display: inline-block;
            color: #9a9a9a;
            @include f(40px)
          }
          p {
            margin-top: r(10);
            color: #333333;
          }
        }
      }
      .person-manager {
        display: flex;
        flex-direction: row;
        .btn {
          width: 50%;
          text-align: center;
          height: r(52);
          color: #333;
          line-height: r(52);
          border-top: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
        }
        .active {
          background-color: #85abfc;
          color: #fff;
        }
      }
      .manager-content {
        .de-title {
          @include f(16px);
          color: #333;
          padding: r(20);
          text-align: left;
        }
        .transfer-address {
          border-top: 1px solid #E9E9E9;
          border-bottom: 1px solid #E9E9E9;
          height: r(44);
          line-height: r(44);
          text-align: left;
          @include f(15px);
          input {
            width: 80%;
            height: r(38);
            text-indent: r(10);
            margin-left: r(10);
          }
        }
        .transfer-amount {
          margin-top: r(10);
          border-top: 1px solid #E9E9E9;
          border-bottom: 1px solid #E9E9E9;
          height: r(44);
          text-align: left;
          @include f(15px);
          line-height: r(44);
          input {
            width: 80%;
            height: r(38);
            text-indent: r(10);
            margin-left: r(10);
          }
          .amount-value {
            @include f(15px);
            color: #949494;
          }
        }
        .btn {
          display: block;
          margin: 0 auto;
          margin-top: r(20);
          background-color: #3573FA;
          border-radius: r(3);
          text-align: center;
          @include f(18px);
          color: #fff;
          width: r(335);
          height: r(44);
          line-height: r(44);
        }
      }
    }
  }
</style>
