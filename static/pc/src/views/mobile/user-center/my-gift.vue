<template>
  <div>
    <MobileHeader>我的获赠</MobileHeader>
    <div class="gift_content">
       <div class="gift_tab">
         <span class="is_cash" :class="{'active':currentShow}" @click="changeTab">已兑现</span>
         <span class="no_cash" :class="{'active':!currentShow}" @click="changeTab">未兑现</span>
       </div>
      <!--以兑现-->
      <div class="isCash_content">
          <div></div>
      </div>
      <!--未兑现-->
      <div class="noCash_content">

      </div>
    </div>
  </div>

</template>

<script>
  import MobileHeader from 'components/m-header'
    export default {
        name: "my-gift",
        data(){
          return{
              currentShow:true
          }
        },
        methods:{
          changeTab(){
            this.currentShow = !this.currentShow
          }
        },
        components:{
          MobileHeader
        }
    }
</script>

<style lang="scss" scoped>
  .gift_content{
    background-color: #f5f5f5;
    .gift_tab{
      width: r(300);
      height: r(35);
      text-align: center;
      .is_cash{
        display: inline-block;
        width: r(150);
        height: r(35);
        font-size: r(15);
        color: #333333;
        line-height: r(15);
        background-color: #fff;
      }
      .no_cash{

      }
    }
  }
</style>
