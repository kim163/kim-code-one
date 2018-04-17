<template>
  <div class="vip-gold">
    <h3 class="title-tip">会员每个月只享有一次晋级的机会</h3>
    <br/>
    <vipStep v-model="disabled"></vipStep>
    <p class="txtct">
      <a href="javascript:void(0);" @click="submit"
         :class='["formbtn",{"disablebtn":!disabled}]'>检测升级</a>
    </p>
    <div class="bottom-tip">每月仅可自助申请一次哟</div>
  </div>
</template>
<script>
  import {checkUpgrade} from "api/preferential-terms"
  import vipStep from "components/vip-step"
  export default {
    data() {
      return {
        disabled:false
      };
    },
    methods: {
      submit() {
        if(!this.disabled)return;
        this.disabled=false;
        checkUpgrade().then(data => {
          toast(data.message)
        })
      }
    },
    components: {
      vipStep
    }
  };
</script>
<style lang="scss">
  .vip-gold {
    .formbtn{
      margin-top: 24px;
    }
    .disablebtn{
      background-color: #ccc!important;
      cursor: not-allowed!important;
    }
  }
</style>
