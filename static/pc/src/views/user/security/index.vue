<template>
  <div class="user-conter user-security">
    <div class="style_f">
      <a @click="showWhat=0" href="javascript:void(0)" :class="['style_i',{active:showWhat==0}]">修改登录密码</a>
      <a v-if="!isSetPayPwd" @click="showWhat=1" href="javascript:void(0)" :class="['style_i',{active:showWhat==1}]">设置支付密码</a>
      <a v-else @click="showWhat=2" href="javascript:void(0)" :class="['style_i',{active:showWhat==2}]">修改支付密码</a>
      <a v-if="isSetPayPwd" @click="openFindPWD(2)" href="javascript:void(0)" :class="['style_i']">重置支付密码</a>
    </div>
     <component  :is="menuList[showWhat].component"></component>
     <findback @change="findTypeTo" v-model="findType"></findback>
  </div>
</template>
<script>
  import loginUpdate from "components/password/login-update"
  import paySet from "components/password/pay-set"
  import payUpdate from "components/password/pay-update"
  import findback from "components/findback"
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  let menu = [
    {name: "修改登录密码", component: loginUpdate},
    {name: "设置支付密码", component: paySet},
    {name: "修改支付密码", component: payUpdate}
  ]
  export default {
    data() {
      return {
        findType: "0",//0 找回密码，1 找回账户名，2 找回支付密码
        showWhat: 0,
        menuList: menu
      }
    },
    props: {},
    methods: {
      openFindPWD(findType){
        this.findType = findType;
      },
      findTypeTo(val){
        this.findType = val;
      }
    },
    computed: {
      ...mapGetters(["isSetPayPwd"])
    },
    created() {
    },
    components: {
      loginUpdate, paySet, payUpdate,findback
    }
  };
</script>
<style>
  .user-security{

  }
</style>