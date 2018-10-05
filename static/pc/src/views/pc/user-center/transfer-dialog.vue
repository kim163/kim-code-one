<template>
  <dialog-pop v-model="showPop">
    <div class="dialog-pop-main">
      <div class="title">
        账户余额：
        <span class="cl-red">
          <animated-integer :value="data.amount"></animated-integer>{{data.assetCode}}
        </span>
      </div>
      <div class="manual-transfer" v-if="isOut">
        <div class="title">手动转账</div>
        <div class="tran-info">
          <span>输入数量</span>
          <input class="tran-input" type="text" v-number-only v-model="tranOutAmonut">
          <span class="uet">{{data.assetCode}}</span>
        </div>
        <div class="tran-info">
          <span>钱包地址</span>
          <input class="tran-input" type="text" v-model="tranAddress">
        </div>
        <div class="dialog-btn" @click="toTansfer">确定</div>
      </div>
      <div class="within-tran">
        <div class="title">{{isOut ? '内部账户转账' : '请选择以下账户，进行转账'}}</div>
        <div class="tran-list">
          <div class="within-info" v-for="(item,index) in userList"
               :key="index"
               v-if="item.userId != data.userId"
               :class="{active: showIndex === index}"
               @click="showIndex = index">
            <div class="user-name">{{item.name}}</div>
            <div class="user-balance" v-if="showIndex != index">余额：{{item.amount}}{{item.assetCode}}</div>
            <div class="tran-out" v-else>
              转出
              <input class="input-out" type="text" v-number-only/>
              <div class="tran-btn" @click="toTansfer">确定</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog-pop>
</template>

<script>
  import DialogPop from 'components/dialog'
  import AnimatedInteger from 'components/animated-integer'
  import {
    assetTransfer
  } from 'api/user-center'
  export default {
    name: "transfer-dialog",
    data(){
      return{
        showPop:true,
        tranOutAmonut:0,
        tranAddress:'',
        showIndex:0,
      }
    },
    computed:{
      // ...mapGetters([
      //   'userBalance',
      //   'userData',
      //   'userId',
      // ])
    },
    watch:{
      showPop(val){
        if(!val){
          this.$emit('changeShow',false)
        }
      }
    },
    model:{
      prop:'show',
      event:'changeShow'
    },
    props:{
      isOut:{ //是否为转出
        type:Boolean,
        default:true
      },
      show:{ //显示弹窗
        type:Boolean,
        default:false
      },
      data:{ //转账账户信息
        type:Object,
        default:{}
      },
      userList:{ //关联账户列表
        type:Array,
        default:[]
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
  .within-tran{
    width: 100%;
    height: 130px;
    margin-top: 30px;
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    .tran-list{
      display: flex;
      align-items: center;
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .within-info{
      min-width: 136px;
      padding: 10px;
      height: 78px;
      background: #FFFFFF;
      border: 1px solid #E4E4E4;
      transition: all .5s;
      font-size: 16px;
      margin-right: 10px;
      cursor: pointer;
      &.active{
        width: 243px;
        background: #F3F7FF;
        border-color: #D4DFF5;
      }
      .user-name{
        margin-bottom: 10px;
      }
      .user-balance{
        display: flex;
        align-items: center;
      }
      .tran-out{
        display: flex;
        align-items: center;
      }
      .input-out{
        width: 120px;
        height: 30px;
        padding-left: 10px;
        margin: 0 10px;
        background: #FFFFFF;
        border: 1px solid #D4DFF5;
      }
      .tran-btn{
        width: 50px;
        height: 30px;
        background: #3573FA;
        color: #ffffff;
        text-align: center;
        line-height: 30px;
      }
    }
    .title{
      margin-bottom: 20px;
    }
  }
</style>