<template>
  <dialog-pop v-model="showPop">
    <div class="dialog-pop-main">
      <div class="title">
        账户余额：
        <span class="cl-red">
          <animated-integer :value="data.amount"></animated-integer>{{data.assetCode}}
        </span>
      </div>
      <div class="manual-transfer" v-if="showManual">
        <div class="title">手动转账</div>
        <div class="tran-info">
          <span>输入数量</span>
          <input class="tran-input" type="text" v-number-only v-model.number="manualOutAmonut">
          <span class="uet">{{data.assetCode}}</span>
        </div>
        <div class="tran-info">
          <span>钱包地址</span>
          <input class="tran-input" type="text" v-model="tranAddress">
        </div>
        <div class="dialog-btn" @click="toTansfer(1)">确定</div>
      </div>
      <div class="within-tran">
        <div class="title">{{isOut ? '内部账户转账' : '请选择以下账户，进行转账'}}</div>
        <div class="tran-list">
          <div class="within-info" v-for="(item,index) in userList"
               :key="index"
               :class="{active: showIndex === index}"
               @click="showIndex = index">
            <div class="user-name">{{item.name}}</div>
            <div class="user-balance" v-if="showIndex != index">余额：{{item.amount}}{{item.assetCode}}</div>
            <div class="tran-out" v-else>
              转出
              <input class="input-out" type="text" v-model.number="withinAmount" v-number-only/>
              <div class="tran-btn" @click="toTansfer(2)">确定</div>
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
        manualOutAmonut:0, //手动转账金额
        tranAddress:'',
        showIndex:0,
        withinAmount:0, //内部转账金额
        // selectUserBalance:0,//内部转账当前用户余额
        selectUser:{} //内部转账当前用户
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
      },
      showIndex(){
        this.withinAmount = 0
        this.selectUser = this.userList[this.showIndex]
      },
      manualOutAmonut(val){
        if(val > Number(this.data.amount)){
          toast('您的账户余额不足')
          this.manualOutAmonut = Number(this.data.amount)
        }
      },
      withinAmount(val){
        if(this.isOut){
          if(val > Number(this.data.amount)){
            toast('您的账户余额不足')
            this.withinAmount = Number(this.data.amount)
          }
        }else{
          if(val > Number(this.selectUser.amount)){
            toast('对应账户余额不足')
            this.withinAmount = Number(this.selectUser.amount)
          }
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
      showManual:{
        type:Boolean,
        default:true
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
      toTansfer(type){ // type: 1代表手动转账  2表示账户内转账
        if(type === 1){
          if(this.manualOutAmonut === '' || this.manualOutAmonut === 0){
            toast('请输入转账金额')
            return
          }else if(this.tranAddress === ''){
            toast('请输入钱包地址')
            return
          }
        }else{
          if(this.withinAmount === '' || this.withinAmount === 0){
            toast('请输入转账金额')
            return
          }
        }
        const Obj = this.isOut ? this.data : this.selectUser
        const data = {
          userId: Obj.userId,
          nodeId: Obj.nodeId,
          debitAccount: Obj.address,
          creditAccount: type === 1 ? this.tranAddress : (this.isOut ? this.selectUser.address : this.data.address),
          amount: type === 1 ? this.manualOutAmonut : this.withinAmount
        }
        assetTransfer(data).then(res => {
          if(res.code === 10000){
            toast('转账成功')
            this.$emit('tranSuccess')
            this.showPop = false
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
        // if(this.isOut){
        //   Object.assign(data,{
        //     userId: this.data.userId,
        //     nodeId: this.data.nodeId,
        //     debitAccount: this.data.address,
        //     creditAccount: type === 1 ? this.tranAddress : this.selectUser.address,
        //     amount: type === 1 ? this.manualOutAmonut : this.withinAmount
        //   })
        // }else{
        //   Object.assign(data,{
        //     userId: this.selectUser.userId,
        //     nodeId: this.selectUser.nodeId,
        //     debitAccount: this.selectUser.address,
        //     creditAccount: this.selectUser.address,
        //     amount: this.withinAmount
        //   })
        // }
      }
    },
    created(){
      this.selectUser = this.userList[this.showIndex]
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
    margin-top: 30px;
    .tran-list{
      width: 100%;
      height: 100px;
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      float:left;
    }
    .within-info{
      padding: 10px;
      background: #FFFFFF;
      border: 1px solid #E4E4E4;
      transition: all .5s;
      font-size: 16px;
      margin-right: 10px;
      cursor: pointer;
      display: inline-block;
      vertical-align: top;
      &.active{
        /*width: 263px;*/
        background: #F3F7FF;
        border-color: #D4DFF5;
      }
      .user-name{
        margin-bottom: 10px;
      }
      .user-balance{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: nowrap;
        padding-top: 7px;
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