<template>
  <div class="container min-width min-height max-width">
    <div class="tab-list">
      <div class="tab-item"
           :class="{active: type === item.type}"
           v-for="(item,index) in navList"
           :key="index"
           @click="changeTab(item.type)">
        {{$t(item.name)}}
      </div>
      <router-link class="go-center" :to="{name:'walletCenter'}">返回钱包中心</router-link>
    </div>
    <div class="user-content">
      <div class="content-list">
        <div class="list-item" @mouseenter="mouseenter(1)" @mouseleave="mouseleave(1)"
             :class="{'bindok':isbindOk,'active':mouseOverFirst,}">
          <div class="item-symbol"><span class="iconfont icon-bind-bankcard"></span></div>
          <div class="item-content">
            <p class="bind-title">绑定银行卡</p>
            <p class="bind-des">请用您本人姓名开户的银行卡进行绑定, 方便您以后的存提款</p>
          </div>
          <div class="item-btn" @click="getBankList(1)" v-if="filterArr.length<3">前去绑定</div>
          <div class="item-btn" @click="getBankList(1)" v-if="filterArr.length==3">修改绑定</div>
        </div>
        <div class="list-item" @mouseenter="mouseenter(2)" @mouseleave="mouseleave(2)"
             :class="{'active':mouseOverSecond,'bindok':filterZfb.length==1||bindAlipay}">
          <div class="item-symbol"><span class="iconfont icon-bind-zhifubao"></span></div>
          <div class="item-content">
            <p class="bind-title">绑定支付宝</p>
            <p class="bind-des">请用您本人姓名开户的银行卡进行绑定,方便您以后的存提款</p>
          </div>
          <div class="item-btn" @click="bindzhifubao" v-if="filterZfb.length==0&&!bindAlipay">前去绑定</div>
          <div class="item-btn" @click="opencheckAlipay" v-else>已绑定</div>
        </div>
        <div class="list-item" @mouseenter="mouseenter(3)" @mouseleave="mouseleave(3)"
             :class="{'active':mouseOverThird,'bindok':filterWx.length==1||bindWechat}">
          <div class="item-symbol"><span class="iconfont icon-bind-weixin"></span></div>
          <div class="item-content">
            <p class="bind-title">绑定微信</p>
            <p class="bind-des">请用您本人姓名开户的银行卡进行绑定,方便您以后的存提款</p>
          </div>
          <div class="item-btn" @click="bindWx" v-if="filterWx.length==0&&!bindWechat">前去绑定</div>
          <div class="item-btn" v-else @click="opencheckWchat">已绑定</div>
        </div>
        <div class="list-item" @mouseenter="mouseenter(4)" @mouseleave="mouseleave(4)"
             :class="{'active':mouseOverFourth,'bindok':userData.nickname&&userData.name}">
          <div class="item-symbol"><span class="iconfont icon-book-star"></span></div>
          <div class="item-content">
            <p class="bind-title">完善资料</p>
            <p class="bind-des">完善您的账户资料,这样会让您的账户更加安全</p>
          </div>
          <div class="item-btn" @click="writePersonInfo" v-if="!userData.nickname&&!userData.name">前去完善</div>
          <div class="item-btn" @click="writePersonInfo">修改资料</div>
        </div>
      </div>
    </div>
    <!--弹窗部分-->
    <!--绑定银行卡-->
    <commonPopup v-if="closeState">
      <div class="bind-card-info" v-if="isEmptyState">
        <div class="bind-title">
          <span class="main-title">绑定银行卡</span>
          <span class="iconfont icon-close close-btn" @click="closeContent"></span>
        </div>
        <div class="bind-content">
          <img src="~images/not-bind-card.png" alt="">
          <p class="content-info">尚未绑定银行卡</p>
        </div>
        <div class="add-bank" @click="addBindCard">添加新的银行卡</div>
      </div>
      <!--绑定了银行卡-->
      <div class="manage-card-info" v-if="isEmptyStateNext">
        <div class="bind-title">
          <span class="main-title">绑定银行卡</span>
          <span class="iconfont icon-close close-btn" @click="closeContent"></span>
        </div>
        <div class="bind-content">
          <div class="bank-list" v-for="(list,key) in filterArr">
            <img :src="getPicArr(list.bank)" alt="" class="bank-pic">
            <div class="bank-info">
              <p class="bank-name">{{list.bank}}</p>
              <p class="bank-type">储蓄卡</p>
              <p class="bank-num">{{list.account}}</p>
            </div>
            <div class="unbind-card" @click="unbindCard(list.account,key)">
              解绑 >>
            </div>
          </div>
        </div>
        <div class="add-bank" v-if="isAddCard" @click="addBindCard">添加新的银行卡</div>
      </div>

      <!--新增绑定银行卡-->
      <div class="add-card-info" v-if="needAddCard">
        <div class="bind-title">
          <span class="main-title">绑定银行卡</span>
          <span class="iconfont icon-close close-btn" @click="closeContent"></span>
        </div>
        <div class="bind-content">
          <p class="card-number">银行卡号 <input type="text" class="input-card-number" v-model="cardNumber"
                                             autocomplete="off" @blur="blurNumber"></p>
          <p class="bank-name">银行名称 <input type="text" class="input-bank-name" readonly autocomplete="off"
                                           :value="bankName"></p>
          <p class="user-name">持卡人姓名 <input type="text" v-if="userName.name==null" class="input-user-name"
                                            autocomplete="off" v-model="userName">
            <input type="text" class="input-user-name" :value="userData.name" v-else>
          </p>
        </div>
        <div class="bindCard" @click="bindCard">绑定</div>
        <div class="returnBack" @click="closeContent">关闭</div>
      </div>
    </commonPopup>
    <!--绑定支付宝-->
    <commonPopup v-if="zhifubaoPopup">
      <div class="bind-zhifubao-info">
        <div class="bind-title">
          <span class="main-title">绑定支付宝</span>
          <span class="iconfont icon-close close-btn" @click="closezhifubao"></span>
        </div>
        <div class="bind-content">
          <p class="content-notice">支付宝认证姓名,务必与真实姓名相同</p>
          <uploadImg :uploadImgSet="{maxUploadNum:1}" :showClose="true" @gitPicUrl="getPicUrl"></uploadImg>
          <p class="content-remind">点击上传您的收款二维码</p>
          <p class="zhifubaoAccount"><span>支付宝账号:</span> <input type="text" v-model="zhifubaoValue"></p>
          <p class="zhifubaoName"><span>支付宝认证姓名:</span> <input type="text" v-model="zhifubaoName"
                                                               v-if="userData.name==null">
            <input type="text" :value="userData.name" readonly v-else>
          </p>
        </div>
        <div class="bindzhifubao" @click="bindzhifubaoBtn" v-if="filterZfb.length==0">绑定支付宝</div>
      </div>
    </commonPopup>
    <!--绑定微信-->
    <commonPopup v-if="weixinPopup">
      <div class="bind-weixin-info">
        <div class="bind-title">
          <span class="main-title">绑定微信</span>
          <span class="iconfont icon-close close-btn" @click="closeWeixin"></span>
        </div>
        <div class="bind-content">
          <p class="content-notice">微信认证姓名,务必与真实姓名相同</p>
          <uploadImg :uploadImgSet="{maxUploadNum:1}" :showClose="true" @gitPicUrl="getPicUrl"></uploadImg>
          <p class="content-remind">点击上传您的收款二维码</p>
          <p class="weixinAccount">微信账号: <input type="text" v-model="wxValue"></p>
          <p class="weixinName">微信姓名: <input type="text" v-model="wxName" v-if="userData.name==null">
            <input type="text" :value="userData.name" readonly v-else>
          </p>
        </div>
        <div class="bindweixin" @click="binweixinBtn">绑定微信</div>
      </div>
    </commonPopup>
    <!--完善资料-->
    <commonPopup v-if="personInfoPopup">
      <div class="bind-person-info">
        <div class="bind-title">
          <span class="main-title">完善资料</span>
          <span class="iconfont icon-close close-btn" @click="closePersonInfo"></span>
        </div>
        <div class="bind-content">
          <p class="username">昵称 <input type="text" v-model="personUserName"></p>
          <p class="realname">真实姓名 <input type="text" v-model="personRealName" v-if="userData.name==null">
            <input type="text" :value="userData.name" readonly v-else></p>
        </div>
        <div class="bindInfo" @click='binkUserAccount'>绑定</div>
      </div>
    </commonPopup>
    <div v-if="bindPersonInfo">
      <confirm-dialog v-model="bindPersonInfo" :is-pc="true">
        <div slot="content">
          <div class="dialog-content">请前往设置您的真实姓名</div>
        </div>
        <div slot="leftBtn" class="confirm-btn-cancel dialog-cancel">取消</div>
        <div slot="rightBtn" class="dialog-btn-yes" @click="defineOk">确定</div>
      </confirm-dialog>
    </div>

    <commonPopup v-if="checkAlipayPopup">
      <div class="bind-zhifubao-info">
        <div class="bind-title">
          <span class="main-title">您已绑定的支付宝</span>
          <span class="iconfont icon-close close-btn" @click="closecheckAlipay"></span>
        </div>
        <div class="bind-content">
          <img :src="filterAlipay[0].qrCodeUrl" alt="" class="qrCodePic">
          <p class="zhifubaoAccount"><span>支付宝账号:</span> <input type="text" :value="filterAlipay[0].account" readonly>
          </p>
          <p class="zhifubaoName"><span>支付宝认证姓名:</span> <input type="text" v-model="zhifubaoName"
                                                               v-if="userData.name==null">
            <input type="text" :value="userData.name" readonly v-else>
          </p>
        </div>
        <div class="bindzhifubao" @click="closecheckAlipay">确认</div>
        <div class="bindTips">您已绑定支付宝账号,如需更换请联系<span class="hot-line"><getLive800></getLive800></span></div>
      </div>
    </commonPopup>

    <commonPopup v-if="checkWchatPopup">
      <div class="bind-weixin-info">
        <div class="bind-title">
          <span class="main-title">您已绑定的微信号</span>
          <span class="iconfont icon-close close-btn" @click="closecheckWchat"></span>
        </div>
        <div class="bind-content">
          <img :src="filterWchat[0].qrCodeUrl" alt="" class="qrCodePic">
          <p class="weixinAccount">微信账号: <input type="text" :value="filterWchat[0].account" readonly></p>
          <p class="weixinName">微信姓名: <input type="text" v-model="wxName" v-if="userData.name==null">
            <input type="text" :value="userData.name" readonly v-else>
          </p>
        </div>
        <div class="bindweixin" @click="closecheckWchat">确认</div>
        <div class="bindTips">您已绑定支付宝账号,如需更换请联系<span class="hot-line"><getLive800></getLive800></span></div>
      </div>
    </commonPopup>
  </div>

</template>

<script>
  import {userCenter} from 'api'
  import {mapGetters} from 'vuex'
  import getBankUrl from '../../../util/bankurl'
  import commonPopup from 'components/common-popup/index'
  import uploadImg from 'components/upload-img/index'
  import ConfirmDialog from 'components/confirm'
  import getLive800 from 'components/get-live800';

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
        closePopup: false,
        cardNumber: '',
        closeState: '',
        bankName: '',
        userName: '',
        isEmptyState: false,
        isAddCard: true,
        needAddCard: false,
        filterArr: [],
        picArr: [],
        isEmptyStateNext: false,
        isbindOk: false,
        zhifubaoPopup: false,
        zhifubaoValue: '',
        zhifubaoName: '',
        filterZfb: [],
        filterWx: [],
        picUrl: '',
        wxValue: '',
        wxName: '',
        weixinPopup: false,
        personInfoPopup: false,
        personUserName: '',
        personRealName: '',
        bindCardState: false,
        bindAlipay: false,
        bindWechat: false,
        showConfirm: true,
        bindPersonInfo: false,
        filterAlipay: [],
        filterWchat: [],
        checkAlipayPopup: false,
        checkWchatPopup: false
      }
    },
    components: {
      commonPopup,
      uploadImg,
      ConfirmDialog,
      getLive800
    },
    computed: {
      ...mapGetters([
        'userId',
        'userData',
        'bankCardInfo'
      ]),
    },
    watch: {
      bankCardInfo() {
        this.filterAlipay = this.bankCardInfo.filter(item => item.type === 2)

        this.filterWchat = this.bankCardInfo.filter(item => item.type === 1)

      }
    },
    created() {
      this.getBankList(0)

    },

    methods: {
      opencheckAlipay() {
        this.checkAlipayPopup = true
      },
      opencheckWchat() {
        this.checkWchatPopup = true
      },
      closecheckAlipay() {
        this.checkAlipayPopup = false
      },
      closecheckWchat() {
        this.checkWchatPopup = false
      },
      changeTab(type) {
        this.type = type
        if (type == 2) {
          this.$router.push({name: 'myGift'})
        }
      },
      addBindCard() {
        this.needAddCard = true
        this.isEmptyState = false
        this.isEmptyStateNext = false
      },
      defineOk() {
        this.bindPersonInfo = false
        this.personInfoPopup = true
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
      unbindCard(num, key) {
        const requests = {
          userId: this.userId,
          account: num
        }
        userCenter.unbindBank(requests).then(res => {
          if (res.code == '10000') {
            toast('解绑成功')
            this.filterArr.splice(key, 1)
            this.isAddCard = true
            this.$store.dispatch('UPDATE_USERDATA')
            this.$store.dispatch('GET_BANKCARD')
            if (this.filterArr.length == 0) {
            }
          } else {
            toast(res.message)
          }
        })
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
      blurNumber() {

        if (this.cardNumber.length == 0) {
          return
        }
        const match = /^(\d{16}|\d{17}|\d{18}|\d{19})$/

        if (!match.test(this.cardNumber)) {
          toast("请输入正确的银行卡长度!")
          this.bindCardState = false
          return
        } else {
          let requests = {
            bankNo: this.cardNumber
          }
          console.log(this.cardNumber, '数控刀具')
          userCenter.autoRecognize(requests).then(res => {
            if (res.code == 10000) {
              if (res.data == null) {
                toast('该卡号无法识别,请输入正确的卡号!')
                this.bankName = ''
                this.bindCardState = false
              } else {
                this.bankName = res.data.bankName
                this.bindCardState = true
              }
            } else {
              toast(res.message)
            }

          })
        }
      },
      closePersonInfo() {
        this.personInfoPopup = false
      },
      closeContent() {
        this.closeState = false
        this.needAddCard = false
      },
      bindCard() {
        if (!this.bindCardState) {
          return
        }
        const requests = {
          userId: this.userId,
          account: this.cardNumber,
          type: 3,
          name: this.userName,
          bank: this.bankName
        }
        userCenter.bindBankV2(requests).then(res => {
          if (res.code == 10000) {
            toast('绑卡成功!')
            this.closeState = false
            this.needAddCard = false
            this.isbindOk = true
            this.$store.dispatch('UPDATE_USERDATA')
            this.$store.dispatch('GET_BANKCARD')
          } else {
            toast(res.message)
          }
        })
      },
      getPicArr(cont) {
        return getBankUrl(cont)
      },
      closezhifubao() {
        this.zhifubaoPopup = false
      },
      bindzhifubao() {
        if (this.userData.name == null) {
          this.bindPersonInfo = true
        } else {
          this.zhifubaoPopup = true
        }
      },
      getPicUrl(val) {
        this.picUrl = val.join()
      },
      bindzhifubaoBtn() {
        const requests = {
          userId: this.userId,
          account: this.zhifubaoValue,
          type: 1,
          qrCodeUrl: this.picUrl,
          name: this.zhifubaoName == '' ? this.userData.name : this.zhifubaoName,
        }
        if (this.picUrl == '') {
          toast("二维码不能为空")
          return
        }
        if (this.zhifubaoValue == '') {
          toast('支付宝账号不能为空')
          return
        }
        userCenter.bindBankV2(requests).then(res => {
          if (res.code == 10000) {
            toast('绑定支付宝成功')
            this.zhifubaoPopup = false
            this.bindAlipay = true
            this.$store.dispatch('UPDATE_USERDATA')
            this.$store.dispatch('GET_BANKCARD')
          } else {
            toast(res.message)
          }
        })
      },
      getBankList(num) {
        if (num == 1) {
          if (this.userData.name == null) {
            this.bindPersonInfo = true
          } else {
            this.closeState = true
          }
        }
        let requests = {
          userId: this.userId
        }
        userCenter.getBankList(requests).then(res => {
          /*银行卡*/
          this.filterArr = res.data.filter(item => item.type === 3)
          /*支付宝*/
          this.filterZfb = res.data.filter(item => item.type === 1)
          /*微信*/
          this.filterWx = res.data.filter(item => item.type === 2)
          if (this.filterArr.length == 0) {
            this.isEmptyState = true
            this.isEmptyStateNext = false
            this.isbindOk = false
          } else {
            this.isEmptyStateNext = true
            this.isEmptyState = false
            this.bindBankCard = true
            this.isbindOk = true
            /*过滤符合条件的*/
            if (this.filterArr.length == 3) {
              this.isAddCard = false
            }
          }

        })
      },
      bindWx() {
        if (this.userData.name == null) {
          this.bindPersonInfo = true
        } else {
          this.weixinPopup = true
        }

      },
      closeWeixin() {
        this.weixinPopup = false
      },
      writePersonInfo() {
        this.personInfoPopup = true
        this.personUserName = this.userData.nickname
        this.personRealName = this.userData.name
      },
      binkUserAccount() {
        const requests = {
          idCard: '',
          userId: this.userId,
          nickname: this.personUserName,
          name: this.personRealName,
        }
        userCenter.bindUserInfo(requests).then(res => {
          if (res.code == 10000) {
            toast('修改信息成功')
            this.$store.dispatch('UPDATE_USERDATA')
            this.$store.dispatch('GET_BANKCARD')
            this.personInfoPopup = false
          } else {
            toast(res.message)
          }
        })

      },
      binweixinBtn() {
        const requests = {
          userId: this.userId,
          account: this.wxValue,
          type: 2,
          qrCodeUrl: this.picUrl,
          name: this.wxName == '' ? this.userData.name : this.wxName,
        }
        /*二维码判断*/
        if (this.picUrl == '') {
          toast("二维码不能为空")
          return
        }
        /*用户账户名判断*/
        if (this.wxValue == '') {
          toast('微信账号不能为空')
          return
        }
        userCenter.bindBankV2(requests).then(res => {
          if (res.code == 10000) {
            toast('绑定微信成功')
            this.weixinPopup = false
            this.bindWechat = true
          } else {
            toast(res.message)
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
    text-align: left;
    line-height: 50px;
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
    .go-center {
      float: right;
      padding: 5px 10px;
      border-radius: 15px;
      background-color: #86A5F8;
      color: #FFFFFF;
      line-height: 16px;
      margin-top: 8px;
    }
  }

  .user-content {
    border: 1px solid #D3D3D3;
    padding: 31px;
    .content-list {
      .list-item {
        margin-bottom: 20px;
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
          font-size: 35px;
          line-height: 90px;
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
          border: 1px solid #3573FA !important;
          .item-btn {
            background-color: #3573FA !important;
            color: #fff;
          }
          .item-symbol {
            background-color: #3573FA !important;
          }
        }
        &.bindok {
          border: 1px solid #86A5F8;
          .item-btn {
            background-color: #86A5F8;
            color: #fff;
          }
          .item-symbol {
            background-color: #86A5F8;
          }
        }
      }

    }
  }

  /*绑定银行卡*/

  .bind-card-info {
    background-color: #fff;
    padding: 20px;
    .bind-title {
      overflow: hidden;
    }
    .main-title {
      font-size: 24px;
      color: #333;
      float: left;
    }
    .close-btn {
      color: #c8c8c8;
      font-size: 20px;
      float: right;
      cursor: pointer;
    }
    .bind-content {
      padding-top: 81px;
      img {
        display: block;
        width: 100px;
        height: 100px;
        line-height: 440px;
        margin: 0 auto;
        text-align: center;
      }
      .content-info {
        text-align: center;
        color: #787876;
        font-size: 20px;
        padding-top: 20px;
      }
    }
    .add-bank {
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

  .manage-card-info {
    background-color: #fff;
    padding: 20px;
    .bind-title {
      overflow: hidden;
      .main-title {
        font-size: 24px;
        color: #333;
        float: left;
      }
      .close-btn {
        font-size: 20px;
        color: #c8c8c8;
        float: right;
        cursor: pointer;
      }
    }
    .bind-content {
      .bank-list {
        margin-top: 20px;
        background-color: #86a5f8;
        width: 446px;
        height: 120px;
        border-radius: 5px;
        padding: 13.5px;
        display: flex;
        flex-direction: row;
        .bank-pic {
          width: 45px;
          height: 45px;
        }
        .bank-info {
          flex: 1;
          padding-left: 10px;
          .bank-name {
            font-size: 20px;
            color: #fff;

          }
          .bank-type {
            font-size: 16px;
            color: #fff;
            padding-top: 10px;
            opacity: .7;
          }
          .bank-num {
            font-size: 24px;
            color: #fff;
            padding-top: 10px;
          }
        }
        .unbind-card {
          font-size: 16px;
          color: #fff;
          opacity: .7;
          text-align: center;
          line-height: 93px;
          cursor: pointer;
        }
      }

    }
    .add-bank {
      width: 446px;
      height: 50px;
      background-color: #3573FA;
      text-align: center;
      color: #fff;
      font-size: 18px;
      line-height: 50px;
      margin-top: 20px;
      border-radius: 5px;
      cursor: pointer;

    }
  }

  .add-card-info {
    background-color: #fff;
    padding: 20px;
    .bind-title {
      overflow: hidden;
      .main-title {
        font-size: 24px;
        color: #333;
        float: left;
      }
      .close-btn {
        font-size: 20px;
        color: #c8c8c8;
        float: right;
        cursor: pointer;
      }
    }
    .bind-content {
      padding-top: 26px;
      .card-number {
        font-size: 16px;
        color: #333;
        padding-left: 15px;
        .input-card-number {
          border: 1px solid #e4e4e4;
          color: #333;
          font-size: 16px;
          text-indent: 10px;
          height: 40px;
          width: 356px;
        }
      }
      .bank-name {
        margin-top: 21px;
        padding-left: 15px;
        .input-bank-name {
          border: 1px solid #e4e4e4;
          color: #333;
          font-size: 16px;
          text-indent: 10px;
          height: 40px;
          width: 356px;
        }
      }
      .user-name {
        padding-top: 21px;

        .input-user-name {
          border: 1px solid #e4e4e4;
          color: #333;
          font-size: 16px;
          text-indent: 10px;
          height: 40px;
          width: 356px;
        }
      }
    }
    .bindCard {
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
    .returnBack {
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

  /*绑定支付宝*/
  .bind-zhifubao-info {
    width: 506px;
    background-color: #fff;
    padding: 20px;
    .bind-title {
      overflow: hidden;
      .main-title {
        font-size: 24px;
        color: #333;
        float: left;
      }
      .close-btn {
        font-size: 20px;
        color: #c8c8c8;
        float: right;
        cursor: pointer;
      }
    }
    .bind-content {
      text-align: center;
      .content-notice {
        font-size: 16px;
        color: #ff1100;
        text-align: center;
        padding-top: 20px;
      }
      .qrCodePic {
        width: 150px;
        height: 120px;
        padding-top: 20px;
        padding-bottom: 20px;
      }
      .content-remind {
        font-size: 16px;
        color: #787876;
      }
      .zhifubaoAccount {
        padding-top: 10px;
        font-size: 16px;
        color: #333;
        display: flex;
        flex-direction: row;
        margin-left: 33px;
        span {
          line-height: 40px;
        }

        input {
          flex: 1;
          border: 1px solid #e4e4e4;
          width: 325px;
          height: 40px;
          text-indent: 10px;
          margin-right: 32px;
          margin-left: 10px;
        }
      }
      .zhifubaoName {
        padding-top: 20px;
        font-size: 16px;
        color: #333;
        display: flex;
        flex-direction: row;
        span {
          line-height: 40px;
        }
        input {
          flex: 1;
          border: 1px solid #e4e4e4;
          width: 325px;
          height: 40px;
          margin-right: 32px;
          text-indent: 10px;
          margin-left: 10px;
        }
      }
    }
    .bindzhifubao {
      margin: 0 auto;
      background-color: #3573FA;
      border-radius: 5px;
      width: 446px;
      height: 50px;
      font-size: 18px;
      color: #fff;
      text-align: center;
      line-height: 50px;
      margin-top: 30px;
      margin-bottom: 20px;
      cursor: pointer;
    }
    .bindTips {
      color: #333;
      /deep/ i {
        display: none;
      }
      .hot-line {
        color: #ec3a4e;
      }
    }
  }

  /*绑定微信*/
  .bind-weixin-info {
    width: 506px;
    background-color: #fff;
    padding: 20px;
    .bind-title {
      overflow: hidden;
      .main-title {
        font-size: 24px;
        color: #333;
        float: left;
      }
      .close-btn {
        font-size: 20px;
        color: #c8c8c8;
        float: right;
        cursor: pointer;
      }
    }
    .bind-content {
      text-align: center;
      .content-notice {
        font-size: 16px;
        color: #ff1100;
        text-align: center;
        padding-top: 20px;
      }
      .qrCodePic {
        width: 150px;
        height: 120px;
        padding-top: 20px;
        padding-bottom: 20px;
      }
      .content-remind {
        font-size: 16px;
        color: #787876;
      }
      .weixinAccount {
        padding-top: 10px;
        font-size: 16px;
        color: #333;

        input {
          border: 1px solid #e4e4e4;
          width: 325px;
          height: 40px;
          text-indent: 10px;
        }
      }
      .weixinName {
        padding-top: 20px;
        font-size: 16px;
        color: #333;
        input {
          border: 1px solid #e4e4e4;
          width: 325px;
          height: 40px;
          text-indent: 10px;
        }
      }
    }
    .bindweixin {
      margin: 0 auto;
      background-color: #3573FA;
      border-radius: 5px;
      width: 446px;
      height: 50px;
      font-size: 18px;
      color: #fff;
      text-align: center;
      line-height: 50px;
      margin-top: 30px;
      margin-bottom: 30px;
      cursor: pointer;
    }
    .bindTips {
      color: #333;
      /deep/ i {
        display: none;
      }
      .hot-line {
        color: #ec3a4e;
      }
    }
  }

  .bind-person-info {
    width: 506px;
    background-color: #fff;
    padding: 20px;
    .bind-title {
      overflow: hidden;
      .main-title {
        font-size: 24px;
        color: #333;
        float: left;
      }
      .close-btn {
        font-size: 20px;
        color: #c8c8c8;
        float: right;
        cursor: pointer;
      }
    }
    .bind-content {
      padding-top: 30px;
      .username {
        padding-top: 10px;
        font-size: 16px;
        color: #333;
        margin-left: 32px;
        input {
          border: 1px solid #e4e4e4;
          width: 325px;
          height: 40px;
          text-indent: 10px;
          margin-left: 10px;
        }
      }
      .realname {
        padding-top: 20px;
        font-size: 16px;
        color: #333;

        input {
          border: 1px solid #e4e4e4;
          width: 325px;
          height: 40px;
          text-indent: 10px;
          margin-left: 10px;

        }
      }
    }
    .bindInfo {
      margin: 0 auto;
      background-color: #3573FA;
      border-radius: 5px;
      width: 446px;
      height: 50px;
      font-size: 18px;
      color: #fff;
      text-align: center;
      line-height: 50px;
      margin-top: 30px;
      margin-bottom: 20px;
      cursor: pointer;

    }

  }

</style>
