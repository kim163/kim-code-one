<template>
  <popup class="main" v-if="show">
    <!--<div class="main-bg"></div>-->
    <div class="container" :class="{'is-pc':isPc}">
      <div class="title">温馨提示</div>
      <div class="bg"></div>
      <div class="tip">提款审核中,请稍后...</div>
      <div class="close-btn" @click="hideDialog">关闭按钮</div>
    </div>
  </popup>
</template>

<script>
  import aesutil from '@/util/aesutil';
  import {$localStorage} from '@/util/storage'
  // import {mapGetters} from 'vuex'
  import Popup from 'components/common-popup'
  export default {
    name: "withdraw-tip",
    data(){
      return{
        amount:0,
        bankNo:'',
        time: _.noop(),
      }
    },
    model:{
      prop: 'show',
      event: 'change'
    },
    computed:{
      ...mapGetters([
        'userId',
        'withdrawInfo'
      ])
    },
    props:{
      show:{
        type:Boolean,
        default:false
      },
      isPc:{
        type:Boolean,
        default:false
      }
    },
    watch:{
      show(val){
        if(!val){
          clearTimeout(this.time)
        }
      },
      "withdrawInfo":{
        handler(newVal) {
          if(newVal.pass){
            toast('提款审核已通过！')
            this.toQuickSell()
          }
        },
        deep: true
      }
    },
    components:{
      Popup
    },
    methods:{
      hideDialog(){
        this.$emit('change', false)
      },
      getWithdrawInfo(){
        const withdrawInfo = $localStorage.get(`withdraw_${this.userId}`)
        if(withdrawInfo && !_.isUndefined(withdrawInfo) && !_.isNull(withdrawInfo)){
          const info = JSON.parse(aesutil.decrypt(withdrawInfo))
          this.amount = info.amount
          this.bankNo = info.bankNo
        }
      },
      toQuickSell(){
        $localStorage.remove(`withdraw_${this.userId}`)
        this.$emit('change', false)
        if(_.isMobile()){
          this.$router.push({name:'mPendingBuy',query:{mode:3,amount: this.withdrawInfo.amount,bankNo: this.withdrawInfo.bankNo,withdraw: true}})
        }else{
          this.$router.push({name:'quickBuySell'})
          // const query = {mode:3,amount: this.amount,bankNo: this.bankNo,auto: 1}
          // if(this.$route.name === 'transaction'){
          //   Vue.$global.bus.$emit('open:QuickSell',query);
          // }else{
          //   this.$router.push({name:'transaction',query})
          // }
        }
      }
    },
    created(){
      // this.getWithdrawInfo()
      // Vue.$global.bus.$on('update:withdrawSuccess',() => {
      //   toast('提款审核已通过！')
      //   this.toQuickSell()
      // });
      if(!this.time){
        this.time = setTimeout(() => {
          this.$emit('change', false)
        },3600000)
      }
    },
    destroyed(){
      // Vue.$global.bus.$off('update:withdrawSuccess');
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";
  .main{
    .container{
      width: 80%;
      background: $white;
      border-radius: r(5);
      display: flex;
      flex-direction: column;
      align-items: center;
      &.is-pc{
        width: r(400);
        .bg{
          width: r(222);
          height: r(141);
        }
      }
      .title{
        @include f(18px);
        color: #333333;
        margin-top: r(30);
      }
      .bg{
        width: 74%;
        height: r(141);
        background: url(~images/withdraw-bg.png) no-repeat;
        background-size: 100% 100%;
        margin-top: r(10);
      }
      .tip{
        @include f(16px);
        color: #FF0000;
        margin-top: r(18);
      }
      .close-btn{
        width: 100%;
        height: r(40);
        line-height: r(40);
        text-align: center;
        border-top: 1px solid #E5E5E5;
        margin-top: r(25);
        cursor: pointer;
      }
    }
  }

</style>