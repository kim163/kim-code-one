<template>
  <div class="discount-code">
    <div class="form">
      <div class="title-tip">
        温馨提示：优惠券代码会以站内信形式发送给您，
        <br>请您注意查看站内信通知。
      </div>
      <div class="inputbox">
        <label class="label">选择游戏平台：</label>
        <select v-model="data.couponType">
          <option value="">---请选择平台---</option>
          <option v-for="item in platformData" :value="item.value">{{item.name}}</option>
        </select>
      </div>
      <div class="inputbox">
        <label class="label">填写转入金额：</label>
        <input type="text"
               v-model="data.couponRemit"
               placeholder="金额"
               maxlength="10">
      </div>
      <div class="inputbox">
        <label class="label">优惠代码：</label>
        <input type="text" v-model="data.couponCode" placeholder="优惠代码" name="amount" maxlength="20">
      </div>
      <div>
        <a href="javascript:void(0);" @click="submit" class="formbtn">确定转入</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {transferInforCoupon} from "api/preferential-terms"
  import {platformData} from "@/assets/data"

  export default {
    data() {
      return {
        platformData,
        data: {
          couponType: "", // true string
          couponRemit: "", //true string
          couponCode: "",//true string
        }
      };
    },
    props: {},
    watch: {
      "data.couponRemit"(val) {
        if (/[^\d]/g.test(val)) {
          this.data.couponRemit = this.data.couponRemit.toString().replace(/[^\d]/g, '')
        }
      }
    },
    methods: {
      check() {
        if (this.data.couponType == '') toast('请选择游戏平台');
        else if (!/^\d+$/.test(this.data.couponRemit)) toast('请输入整数金额');
        else if (this.data.couponCode == '') toast('请输入优惠代码');
        else {
          return true;
        }
      },
      submit() {
        if (!this.check()) return;
        transferInforCoupon(this.data).then((data) => {
          if (data.success) {
            this.data.couponCode = '';
          }
          toast(data.message);
        }).catch(() => {
          toast('请重新尝试');
        })
      }
    },
    created() {
    },
    components: {}
  };
</script>

<style lang="scss">
  .discount-code {

  }
</style>
