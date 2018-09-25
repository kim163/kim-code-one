<template>
  <div class="trad-detail" :class="[{active: showBuySell,sell:isSell}]">
    <div class="detail-info">
      <div class="info-item">
        <div>
          <div class="avatars-item" :style="{'background':item.avatarColor}"> {{(item.userName).substring(0, 1)}} </div>
          <div v-if="item.sponsorOnlineStatus === 1" class="avatar-online now-online">在线</div>
          <div v-else-if="item.sponsorOnlineStatus === 0" class="avatar-online not-online">离线</div>
        </div>
        <span class="nick-name">{{item.userName}}</span>
      </div>
      <div class="info-item">
        <animated-integer :value="item.balance"></animated-integer>
      </div>
      <div class="info-item">
        <i class="iconfont card-icon" :class="getPayInfo(item.accountTypeTwin).className"></i>
        {{$t(getPayInfo(item.accountTypeTwin).name)}}支付
      </div>
      <div class="info-item">
        <div class="buy-sell-btn" :class="[{active: showBuySell,sell:isSell,disabled: userData.userId === item.userId}]"
             @click="buyBtn">
          {{isSell ? '卖币给ta' : '向ta买币'}}
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="buy-sell" v-show="showBuySell">
        <div class="user-balance" v-if="isSell">您最高可卖：
          <animated-integer :value="userBalance"></animated-integer>
          UET
        </div>
        <div class="buy-info">
          <input type="text" class="buy-sell-input" v-number-only
                 :maxlength="max"
                 v-model="amount"
                 :placeholder="`请您输入${isSell ? '卖出' : '购买'}数量`">
          <span class="uet">UET</span>
          <div class="def-btn all-in" :class="{sell:isSell}" @click="allIn">{{isSell ? '全卖' : '全买'}}</div>
          <div class="def-btn order-btn" @click="toBuySell">下单</div>
          <div class="def-btn cancel-btn" @click="showBuySell = false">取消</div>
        </div>
        <div class="bank-info" v-show="isSell">
          <label>收款方式：</label>
          <div class="bank-sel">
            <get-bankcard :auto-select="true" :filter-bank="filterBank" @selCardChange="selCardChange"></get-bankcard>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import getBankcard from 'components/get-bankcard'
  import AnimatedInteger from 'components/animated-integer'
  import {
    placeAnOrder
  } from 'api/transaction';
  export default {
    name: "trading-detail",
    data(){
      return{
        showBuySell:false,
        max:9,
        amount:'',
        filterBank: this.isSell ? true : false,
        payType: '',
      }
    },
    props:{
      item:{
        type:Object,
        default:{}
      },
      isSell:{
        type:Boolean,
        default:false
      }
    },
    computed:{
      ...mapGetters([
        'userData',
        'userBalance',
      ])
    },
    components:{
      getBankcard,
      AnimatedInteger
    },
    watch:{
      showBuySell(val){
        if(!val){
          this.amount = ''
        }
      }
    },
    methods:{
      getPayInfo(data) {
        const obj = {
          name: '',
          className: ''
        }
        switch (data) {
          case 1:
            obj.name = 'transactionHome.payAlipay'
            obj.className = 'icon-pay-type-ali'
            break
          case 2:
            obj.name = 'transactionHome.payWechat'
            obj.className = 'icon-pay-type-wechat'
            break
          case 3:
            obj.name = 'transactionHome.payBank'
            obj.className = 'icon-pay-type-bank'
            break
        }
        return obj
      },
      selCardChange(selCard){
        this.payType = selCard;
      },
      buyBtn(){
        if(this.userData.userId !== this.item.userId){
          this.showBuySell = !this.showBuySell
        }
      },
      allIn(){
        if(this.isSell){
          this.amount = Number(this.userBalance) > Number(this.item.balance) ? this.item.balance : this.userBalance
        }else{
          this.amount = this.item.balance
        }
      },
      toBuySell(){
        if(this.amount === '' || this.amount === '0'){
          toast(`请输入正确${!this.isSell ? '买入' : '卖出'}数量`)
          return
        }
        if(!this.isSell){
          if(Number(this.amount) > Number(this.item.balance)){
            toast('您输入的金额超出对方剩余')
            this.amount = this.item.balance
            return
          }
        }else{
          if(Number(this.amount) > Number(this.userBalance)){
            toast('您输入的金额已超出您的账户余额')
            this.amount = this.userBalance
            return
          }
        }
        if(this.isSell && this.payType === ''){
          toast('请选择收款方式')
          return
        }
        let payTypeBank = ''
        if(this.payType.type =='1'){
          payTypeBank='支付宝'
        }else if(this.payType.type =='2'){
          payTypeBank='微信'
        }else{
          payTypeBank=this.payType.bank
        }
        const requestda = {
          orderId: this.item.id,
          userId: this.userData.userId,
          accountChainVo: {
            name: this.userData.nickname,
            address: this.userData.accountChainVos[0].address,
            assetCode: 'UET', //资产编码 默认 UET,登录后资产的编码
            amount: this.amount //uet的数量
          },
          accountCashVo: {
            account: this.payType.account,
            bank: payTypeBank, //机构名称
            name: this.payType.name,
            type: this.payType.type,
            amount: Number(this.amount) / 100
          }
        }
        placeAnOrder(requestda).then(res => {
          console.log(res)
          if (res.code == 10000) {
            toast('下单成功')
            this.amount = ''
            this.$store.dispatch('GET_USERBALANCE')
            this.$router.push({name:'orderDetail',params:{id: res.data.key}})
          }else {
            toast(res.message);
          }
        }).catch(err => {
          toast(err.message);
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .trad-detail{
    width: 100%;
    transition: all .5s;
    border-bottom: 1px solid #D3D3D3;
    &.active,&:hover{
      background: #F3F7FF;
    }
    &.sell{
      &.active,&:hover{
        background: #FFF8F7;
      }
    }
    .detail-info{
      width: 100%;
      height: 80px;
      display: flex;
      font-size: 14px;
      .info-item{
        width: 23%;
        display: flex;
        justify-content: center;
        align-items: center;
        &:first-child{
          width: 30%;
          justify-content: left;
          padding-left: 20px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
      .avatars-item{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        color: #ffffff;
        font-size: 18px;
      }
      .avatar-online{
        width: 35px;
        height: 15px;
        font-size: 12px;
        text-align: center;
        line-height: 13px;
        border-radius: 2px;
        border: 1px solid transparent;
        margin-top: 5px;
        margin-left: 2.5px;
        &.now-online{
          border-color: #16AC00;
          color: #16AC00;
        }
        &.not-online{
          border-color: #787876;
          color:  #787876;
        }
      }
      .nick-name{
        margin-left: 5px;
      }
      .card-icon{
        margin-right: 10px;
        &.icon-pay-type-ali {
          color: #03A9F3;
        }
        &.icon-pay-type-wechat {
          color: #14CA39;
        }
        &.icon-pay-type-bank {
          color: #ec3a4e;
        }
      }
      .buy-sell-btn{
        width: 80px;
        height: 25px;
        text-align: center;
        line-height: 23px;
        color: #3573FA;
        border: 1px solid #3573FA;
        border-radius: 3px;
        cursor: pointer;
        transition: all .5s;
        &.active{
          background: #3573FA;
          color: #FFFFFF;
        }
        &.sell{
          border-color: #FF1100;
          color: #FF1100;
          transition: all .5s;
          &.active{
            background: #FF1100;
            color: #FFFFFF;
          }
        }
        &.disabled{
          background: #DCDCDC;
          border: 1px solid #DCDCDC;
          color: #333333;
        }
      }
    }
    .buy-sell{
      border-top: 1px solid #D3D3D3;
      padding: 15px 20px;
      font-size: 14px;
      .user-balance{
        margin-bottom: 15px;
      }
      .buy-info{
        display: flex;
        align-items: center;
        position: relative;
      }
      .buy-sell-input{
        width: 240px;
        height: 35px;
        padding-left: 10px;
        background: #FFFFFF;
        border: 1px solid #D3D3D3;
      }
      .uet{
        position: absolute;
        left: 40%;
      }
      .def-btn{
        width: 60px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        cursor: pointer;
        color: #ffffff;
        margin-right: 10px;
      }
      .all-in{
        background: #FF9600;
        border: 1px solid #FF9600;
        &.sell{
          background: #FF1100;
          border: 1px solid #FF1100;
        }
      }
      .order-btn{
        background: #5087FE;
        border: 1px solid #5087FE;
      }
      .cancel-btn{
        background: #DCDCDC;
        border: 1px solid #DCDCDC;
        color: #333333;
      }
      .bank-info{
        margin-top: 15px;
        display: flex;
        align-items: center;
      }
      .bank-sel{
        width: 363px;
        height: 35px;
      }
    }
  }
</style>