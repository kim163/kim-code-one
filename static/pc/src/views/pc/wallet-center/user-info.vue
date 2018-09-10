<template>
  <div class="user-info">
    <div class="main container">
      <div class="info-detail">
        <div class="avatar"></div>
        <span class="nick-name">{{userData.nickname}}</span>
        <router-link :to="{name:'userCenter'}" class="link-def" tag="div">个人中心</router-link>
        <div class="link-def">收款码</div>
        <div class="link-def">APP扫码登录</div>
        <div class="icon-font">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wallet-balance"></use>
          </svg>
        </div>
        <div class="user-balance">
          <div class="balance-info">可用余额：
            <animated-integer :value="calUserBalance(1)"></animated-integer> UET
            ≈ &yen;
            <animated-integer :value="formatCny(1)"></animated-integer>
          </div>
          <div class="balance-info">锁定资产：
            <animated-integer :value="calUserBalance(2)"></animated-integer> UET
            ≈ &yen;
            <animated-integer :value="formatCny(2)"></animated-integer>
          </div>
        </div>
      </div>
      <div class="btn-list">
        <div class="btn-item">
          <get-live800></get-live800>
        </div>
        <div class="btn-item" v-if="userData.nodeId < 10000"
             @click="$store.dispatch('LOGIN_OUT')">
          <i class="iconfont icon-shut-down"></i>
          退出
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import getLive800 from 'components/get-live800'
  import { getHomeInfo } from 'api/transaction'
  import AnimatedInteger from 'components/animated-integer'
  export default {
    name: "user-info",
    data(){
      return{
        homeInforma:{
          chainAmount:0,
          pendingAmount:0,
          lockedAmount:0,
        },
      }
    },
    computed:{
      ...mapGetters([
        'userData'
      ])
    },
    components:{
      getLive800,
      AnimatedInteger
    },
    methods:{
      getUserBalance(){
        const requestdata={
          userId: this.userData.userId
        };
        getHomeInfo(requestdata).then(res => {
          if(res.code === 10000){
            this.homeInforma = res.data;
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      calUserBalance(type){
        const balAmount = type === 1 ? this.homeInforma.chainAmount : Number(this.homeInforma.pendingAmount + this.homeInforma.lockedAmount);
        return !_.isNaN(Number(balAmount)) ? Number(balAmount) : 0;
      },
      formatCny(type){
        return _.floor(this.calUserBalance(type) * 0.01, 2);
      }
    },
    mounted(){
      this.getUserBalance()
    }
  }
</script>

<style lang="scss" scoped>
  .user-info{
    width: 100%;
    height: 100px;
    background: url(~images/user-info-bg.jpg) no-repeat center;
    background-size: 100% 100%;
  }
  .main{
    min-width: 1200px;
    height: 100%;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .info-detail{
      display: flex;
      align-items: center;
      .avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: url('~images/user.png') no-repeat left center;
      }
      .nick-name{
        margin-left: 10px;
      }
      .link-def{
        margin-left: 10px;
        padding: 5px 10px;
        background: #FFFFFF;
        border-radius: 3px;
        font-size: 14px;
        color: #4CA2E2;
        cursor: pointer;
      }
      .user-balance{
        margin-left: 10px;
      }
      .icon-font{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #ffffff;
        margin-left: 40px;
        .icon{
          width: 31px;
          height: 32px;
          margin-top: 9px;
          margin-left: 2px;
        }
      }
      .balance-info{
        line-height: 30px;
        text-align: left;
      }
    }
    .btn-list{
      display: flex;
      .btn-item{
        padding: 5px 10px;
        margin-left: 10px;
        border: 1px solid #FFFFFF;
        border-radius: 3px;
        cursor: pointer;
        font-size: 14px;
      }
    }
  }
</style>