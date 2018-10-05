<template>
  <dialog-pop v-model="showPop">
    <div class="dialog-pop-main">
      <div class="title">
        账户余额：
        <span class="cl-red">
          <animated-integer :value="userBalance"></animated-integer>{{userData.accountChainVos[0].assetCode}}
        </span>
      </div>
      <div class="manual-transfer" v-if="isOut">
        <div class="title">手动转账</div>
        <div class="tran-info">
          <span>输入数量</span>
          <input class="tran-input" type="text" v-number-only v-model="tranOutAmonut">
          <span class="uet">{{userData.accountChainVos[0].assetCode}}</span>
        </div>
        <div class="tran-info">
          <span>钱包地址</span>
          <input class="tran-input" type="text" v-model="tranAddress">
        </div>
        <div class="dialog-btn" @click="">确定</div>
      </div>
      <div class="within-tran">

      </div>
    </div>
  </dialog-pop>
</template>

<script>
  import DialogPop from 'components/dialog'
  import AnimatedInteger from 'components/animated-integer'
  export default {
    name: "transfer-dialog",
    data(){
      return{
        showPop:true,
        tranOutAmonut:0,
        tranAddress:''
      }
    },
    computed:{
      ...mapGetters([
        'userBalance',
        'userData',
      ])
    },
    props:{
      isOut:{
        type:Boolean,
        default:true
      }
    },
    components:{
      DialogPop,
      AnimatedInteger
    },
    methods:{
      toTansfer(){

      }
    }
  }
</script>

<style lang="scss" scoped>
  .manual-transfer{
    .title{
      margin-bottom: 20px;
    }
    .tran-info{
      font-size: 16px;
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 20px;
      .tran-input{
        width: 372px;
        height: 40px;
        background: #FFFFFF;
        border: 1px solid #E4E4E4;
        padding-left: 10px;
        margin-left: 10px;
      }
      .uet{
        position: absolute;
        right: 20px;
      }
    }
  }
</style>