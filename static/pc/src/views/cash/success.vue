<template>
  <div class="content-box">
    <div class="content">
      <div class="suc-con">
        <p class="i-suc">充值成功！</p>
        <div class="book-details">
          <p class="book-num">订单号：DSJW92JF00IDFKSPKFM020409232</p>
          <p class="book-time">订单时间：2018-12-12  18:02:03   <span class="fr shop-user">商户名：龙8国际</span></p>
          <p class="book-money">
            应付金额：<span class="red">5000  UET</span>   折合  <span class="red">50 CNY </span>    <span class="gray current-rate">&nbsp;&nbsp;当前汇率：100UET=1CNY	</span>
          </p>
          <p class="book-tips gray">交易内容：商户账户充值
          </p>

          <div class="back-user">
            <a class="btn">返回商户界面</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "success"
  }
</script>

<style lang="scss" scoped>
  .suc-con{
    padding:80px 0;
  }
  .i-suc{
    background: url(~images/suc.png) no-repeat top center;
    padding:146px 0 20px;
    width:156px;
    margin:0 auto;
    text-align: center;
    font-size:28px;
  }
  .book-details{
    width:600px;
    margin:0 auto;
    line-height: 35px;
  }
  .book-num{
    font-size:24px;
    text-align: center;
    padding:5px 0 10px;
  }
  .book-time{
    font-size:18px;
  }
  .back-user{
    width:250px;
    margin:40px auto 70px;
  }
  .back-user .btn{
    display:inline-block;
    background: url(~images/btn.png) no-repeat;
    height:99px;
    line-height: 75px;
    width:250px;
    text-align: center;
    color:#fff;
    font-size:20px;
  }
  .book-money{
    font-size:20px;
  }
</style>