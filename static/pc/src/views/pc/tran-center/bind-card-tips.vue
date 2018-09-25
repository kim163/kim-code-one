<template>
  <confirm class="bind-tips" v-model="show" :isPc="true" :showLeftBtn="false">
    <div slot="title">请绑定您的</div>
    <div slot="content">银行卡号/微信/支付宝</div>
    <div slot="rightBtn" class="btn-yes" @click="toBindCard">去绑定</div>
  </confirm>
</template>

<script>
  import Confirm from 'components/confirm'
  export default {
    name: "bind-card-tips",
    data(){
      return{
        show:false
      }
    },
    computed:{
      ...mapGetters([
        'noBankCardTip',
      ])
    },
    components:{
      Confirm
    },
    model:{
      prop:'showBindCard',
      event:'change'
    },
    props:{
      showBindCard:{
        type:Boolean,
        default:false
      }
    },
    watch:{
      show(val){
        this.$emit('change',val)
      },
      showBindCard(val){
        this.show = val
      }
    },
    methods:{
      toBindCard(){
        this.$emit('change',false)
        this.$router.push({name:'userCenter'})
      }
    },
    created(){
      this.show = this.showBindCard
    }
  }
</script>

<style lang="scss" scoped>
  .bind-tips{
    /deep/ .confirm-footer{
      .confirm-btn{
        width: 100%;
      }
    }
  }
  .btn-yes{
    /*background: #3573FA;*/
    /*color: #FFFFFF;*/
  }
</style>