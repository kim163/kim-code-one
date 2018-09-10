<template>
  <div class="container max-width">
    <div class="tab-list">
      <div class="tab-item"
           :class="{active: type === item.type}"
           v-for="(item,index) in navList"
           :key="index"
           @click="changeTab(item.type)">
        {{$t(item.name)}}
      </div>
      <div class="user-content">
        <div class="content-list">
          <div class="list-item" @mouseenter="mouseenter(1)" @mouseleave="mouseleave(1)"
               :class="{'active':mouseOverFirst}">
            <div class="item-symbol"><span class="iconfont icon-bind-bankcard"></span></div>
            <div class="item-content">
              <p class="bind-title">绑定银行卡</p>
              <p class="bind-des">请用您本人姓名开户的银行卡进行绑定, 方便您以后的存提款</p>
            </div>
            <div class="item-btn" @click="bindBankCard">前去绑定</div>
          </div>
          <div class="list-item" @mouseenter="mouseenter(2)" @mouseleave="mouseleave(2)"
               :class="{'active':mouseOverSecond}">
            <div class="item-symbol"><span class="iconfont icon-bind-zhifubao"></span></div>
            <div class="item-content">
              <p class="bind-title">绑定支付宝</p>
              <p class="bind-des">请用您本人姓名开户的银行卡进行绑定,方便您以后的存提款</p>
            </div>
            <div class="item-btn">前去绑定</div>
          </div>
          <div class="list-item" @mouseenter="mouseenter(3)" @mouseleave="mouseleave(3)"
               :class="{'active':mouseOverThird}">
            <div class="item-symbol"><span class="iconfont icon-bind-weixin"></span></div>
            <div class="item-content">
              <p class="bind-title">绑定微信</p>
              <p class="bind-des">请用您本人姓名开户的银行卡进行绑定,方便您以后的存提款</p>
            </div>
            <div class="item-btn">前去绑定</div>
          </div>
          <div class="list-item" @mouseenter="mouseenter(4)" @mouseleave="mouseleave(4)"
               :class="{'active':mouseOverFourth}">
            <div class="item-symbol"><span class="iconfont icon-book-star"></span></div>
            <div class="item-content">
              <p class="bind-title">完善资料</p>
              <p class="bind-des">完善您的账户资料,这样会让您的账户更加安全</p>
            </div>
            <div class="item-btn">前去完善</div>
          </div>
        </div>
      </div>
    </div>
    <!--弹窗部分-->
    <div class="bindCard-popup" v-if="closeState">
      <!--绑定银行卡-->
      <div class="bindCard-content">
        <div class="bind-card-info" v-if="finallyStep">
          <div class="bind-title">
            <span class="main-title">绑定银行卡</span>
            <span class="iconfont icon-close close-btn" @click="closeContent"></span>
          </div>
          <div class="bind-content">
            <img src="~images/not-bind-card.png" alt="">
            <p class="content-info">尚未绑定银行卡</p>
          </div>
          <div class="add-bank" @click="addBankcard">添加新的银行卡</div>
        </div>
        <div class="add-card-info" v-if="!finallyStep">
          <div class="bind-title">
            <span class="main-title">绑定银行卡</span>
            <span class="iconfont icon-close close-btn" @click="closeContent"></span>
          </div>
          <div class="bind-content">
            <p class="card-number">银行卡号 <input type="text" class="input-card-number" v-model="cardNumber" autocomplete="off" @blur="blurNumber"></p>
            <p class="bank-name">银行名称 <input type="text" class="input-bank-name" readonly autocomplete="off" :value="bankName"></p>
            <p class="user-name">持卡人姓名 <input type="text" class="input-user-name" autocomplete="off" v-model="userName"></p>
          </div>
          <div class="bindCard" @click="bindCard">绑定</div>
          <div class="returnBack">关闭</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {userCenter} from 'api'
  import {mapGetters} from 'vuex'

  export default {
    name: "user-center",
    data() {
      return {
        navList: [
          {
            name: 'navbar.userCenter',
            type: 1
          },
          {
            name: 'userCenter.myGift',
            type: 2
          }
        ],
        contentList: [
          {
            url: '',
            title: '绑定银行卡',
            content: '请用您本人姓名开户的银行卡进行绑定,方便您以后的存提款',
            btnInfo: '前去绑定'
          }
        ],
        type: 1,
        mouseOverFirst: false,
        mouseOverSecond: false,
        mouseOverThird: false,
        mouseOverFourth: false,
        closePopup:false,
        finallyStep:false,
        cardNumber:'',
        closeState:'',
        bankName:'',
        userName:''
      }
    },
    created() {

    },
    computed: {
      ...mapGetters([
        'userId'
      ])
    },
    methods: {
      changeTab(type) {
        this.type = type
      },
      mouseenter(num) {
        if (num == 1) {
          this.mouseOverFirst = true;
        } else if (num == 2) {
          this.mouseOverSecond = true
        } else if (num == 3) {
          this.mouseOverThird = true
        } else if (num == 4) {
          this.mouseOverFourth = true
        }
      },
      mouseleave(num) {
        if (num == 1) {
          this.mouseOverFirst = false;
        } else if (num == 2) {
          this.mouseOverSecond = false
        } else if (num == 3) {
          this.mouseOverThird = false
        } else if (num == 4) {
          this.mouseOverFourth = false
        }
      },
      addBankcard(){
        this.finallyStep = true
      },
      blurNumber(){
        if(this.cardNumber.length==0){
          return
        }
        let requests={
          bankNo: this.cardNumber
        }

        userCenter.autoRecognize(requests).then(res=>{
             if(res.data==null){
               toast('该卡号无法识别,请输入正确的卡号')
               this.bankName = ''
             }else {
               this.bankName = res.data.bankName
             }
        })
      },
      closeContent(){
        this.closeState = false
      },
      bindCard(){
        const requests={
           userId: this.userId,
           account: this.cardNumber,
           type:3,
           name: this.userName,
           bank: this.bankName
        }
        userCenter.bindBankV2(requests).then(res=>{
            if(res.code==10000){
              toast('绑卡成功!')

            }else {
              toast(res.message)
            }
        })
      },
      bindBankCard() {
        this.closeState =true
        let requests = {
          userId: this.userId
        }
        userCenter.getBankList(requests).then(res => {
          if (res.data.length == 0) {

          } else {

          }

        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tab-list {
    padding-top: 20px;
    background-color: #fff;
    .tab-item {
      display: inline-block;
      width: 150px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      color: #fff;
      cursor: pointer;
      background-color: #86A5F8;
      &:nth-child(2) {
        margin-left: 10px;
      }
      &.active {
        color: #ffffff;
        background-color: #3573FA;
      }
    }
    .user-content {
      border: 1px solid #D3D3D3;
      padding: 31px;
      .content-list {
        .list-item {
          margin-bottom: 20px;
          width: 1138px;
          height: 100px;
          display: flex;
          flex-direction: row;
          cursor: pointer;
          background-color: #fff;
          border: 1px solid #D3D3D3;
          .item-symbol {
            width: 100px;
            height: 98px;
            background-color: #d3d3d3;
            color: #fff;
            text-align: center;
            font-size: 25px;
            line-height: 100px;
          }
          &:last-child {
            margin-bottom: 0;
          }
          .item-content {
            flex: 1;
            padding: 20px;
            .bind-title {
              font-size: 20px;
              color: #333333;
            }
            .bind-des {
              font-size: 16px;
              color: #787876;
              padding-top: 12px;
            }
          }
          .item-btn {
            width: 120px;
            height: 40px;
            border: 1px solid #D3D3D3;
            color: #787876;
            text-align: center;
            font-size: 16px;
            line-height: 40px;
            margin-top: 30px;
            margin-right: 20px;
          }
          &.active {
            border: 1px solid #3573FA;
            .item-btn {
              background-color: #3573FA;
              color: #fff;
            }
            .item-symbol {
              background-color: #3573FA;
            }
          }
        }

      }
    }
  }

  .bindCard-popup {
    background: rgba(0,0,0,0.6);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    /*绑定银行卡*/
    .bindCard-content{
      background-color: #fff;
      width: 506px;
      height: 440px;
      position: absolute;
      top: 25%;
      left: 50%;
      transform: translate(-50%);

      .bind-card-info{
        padding: 25px;
        .bind-title{
          overflow: hidden;
        }
        .main-title{
          font-size: 24px;
          color: #333;
          float: left;
        }
        .close-btn{
          color: #c8c8c8;
          font-size: 20px;
          float: right;
          cursor: pointer;
        }
        .bind-content{
          padding-top: 81px;
           img{
             display: block;
             width: 100px;
             height: 100px;
             line-height: 440px;
             margin: 0 auto;
             text-align: center;
           }
          .content-info{
            text-align: center;
            color: #787876;
            font-size: 20px;
            padding-top: 20px;
          }
        }
        .add-bank{
          background-color: #3573FA;
          border-radius: 5px;
          text-align: center;
          color: #fff;
          font-size: 18px;
          width: 446px;
          height: 50px;
          line-height: 50px;
          margin-top: 85px;
          cursor: pointer;
        }
      }
      .add-card-info{
        padding: 25px;
        .bind-title{
           overflow: hidden;
           .main-title{
             font-size: 24px;
             color: #333;
             float: left;
           }
          .close-btn{
            font-size: 20px;
            color: #c8c8c8;
            float: right;
          }
        }
        .bind-content{
          padding-top: 26px;

           .card-number{
              font-size: 16px;
              color: #333;
             padding-left: 15px;
             .input-card-number{
               border: 1px solid #e4e4e4;
               color: #333;
               font-size: 16px;
               text-indent: 10px;
               height: 40px;
               width: 356px;
             }
           }
          .bank-name{
            margin-top: 21px;
            padding-left: 15px;
            .input-bank-name{
              border: 1px solid #e4e4e4;
              color: #333;
              font-size: 16px;
              text-indent: 10px;
              height: 40px;
              width: 356px;
            }
          }
          .user-name{
            padding-top: 21px;

            .input-user-name{
              border: 1px solid #e4e4e4;
              color: #333;
              font-size: 16px;
              text-indent: 10px;
              height: 40px;
              width: 356px;
            }
          }
        }
        .bindCard{
          width: 446px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          background-color: #3573FA;
          color: #fff;
          text-align: center;
          border-radius: 5px;
          margin-top: 31px;
          cursor: pointer;
        }
        .returnBack{
          width: 446px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          background-color: #f0f0f0;
          color: #333333;
          text-align: center;
          margin-top: 20px;
          cursor: pointer;
          border-radius: 5px;
        }
      }
    }

  }
</style>
