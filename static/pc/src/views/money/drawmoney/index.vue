<template>
  <div class="drawmoney">
    <!-- step1 -->
    <div class="orangebox wt" v-show="step==1">
      <div class="transact_top">
        <h1 class="col1">主账户总余额：<span class="">{{userData.accountMoney}}</span></h1>
      </div>
      <form action="" id="form-withdraw">
        <div class="inputbox">
          <span class="label">金额：</span>
          <input v-model="sumitData.amount" type="text" placeholder="最少100元">
        </div>
        <div class="inputbox">
          <span class="label">取款至：</span>
          <select v-model="sumitData.id">
            <option value="">请选择</option>
            <option v-for="item in bankList" :value="item.id">{{item.bankname}}({{item.bankno}})</option>
          </select>
        </div>

        <div class="inputbox">
          <span class="label">支付密码：</span>
          <input type="password" v-model="sumitData.password" name="password" placeholder="支付密码是由6位纯数字组成的">
          <a href="javascript:;" id="pwds1" class="showpwd eyeclose"></a>
        </div>
        <div class="clear"></div>
        <input type="button" @click="submit" class="formbtn" value="提交">
      </form>
    </div>
    <div class="orangebox wt" v-show="step==3">
      <p class="txt1"><span>取款金额：</span> <span class="cl-red">{{sumitData.amount}}</span></p>
      <p class="txt1"><span class="" style="line-height: 1.5;">工作人员正在为您处理，如果您的各项资料正确，<br>取款金额会在1小时内到达您的绑定银行账户。</span>
      </p>
      <router-link :to="{name:'user_log',params:{type:'withdraw'}}" class="formbtn">
        查看取款记录
      </router-link>
    </div>
  </div>
</template>
<script>
  import md5 from "MD5";
  import {findUserBankList, checkWithdrawPwd, withdraw_new} from "api/payment";
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        step: 1,
        curBank: {},
        bankList: [],
        sumitData: {
          amount: "",
          id: "",
          password: "",
          tkType: ""// false string 若是代理提款，必填输入代理提款类型，提款类型，slotmachine-老虎机，liveall-其他部分
        }
      };
    },
    watch: {},
    methods: {
      checkForm() {
        if(!this.isSetPayPwd) {
          $confirm("请先设置支付密码!", "提示", {
            confirmText: "立即设置"
          }).then(() => {
            this.$router.push({name: 'user_security'});
          })
        }
        else if (this.sumitData.amount == "") toast("请输入取款金额!");
        else if (this.sumitData.amount <100) toast("最少取款100元!");
        else if (this.sumitData.amount > this.userData.accountMoney) toast("余额不足!");
        else if (this.sumitData.id == "") toast("请选银行卡!");
        else if (this.sumitData.password == "") toast("请输入支付密码!");
        else {
          return true;
        }
      },
      submit() {

        if(!this.checkForm()) return;
        this.sumitData.tkType = this.isAgent ? "slotmachine" : "";
        this.sumitData.password = md5(md5(this.sumitData.password))
        withdraw_new(this.sumitData).then(data => {
          this.sumitData.password = '';
          if (data.success) {
            this.$store.dispatch("UPDATE_USERDATA");
            this.step = 3;
          }
          toast(data.message);
        }).catch(err => {
          toast("取款失败,请稍后重新尝试!")
        })
      }
    },
    computed: {
      ...mapGetters(["userData", 'isSetPayPwd', 'isAgent'])
    },
    created() {
      if(this.userData.accountName == "") {
        $confirm("请先完善个人资料!", "提示", {
          confirmText: "立即完善"
        }).then(() => {
          this.$router.push({name: 'user_datum'});
        })
        return
      }
      findUserBankList().then(res => {
        if (res.success) {
          this.bankList = res.data;
        }
        else {
          toast(res.message)
        }
      }).catch(err => {
        toast("获取银行卡失败")
      })
    },
    components: {}
  };
</script>
<style lang="scss">

  .drawmoney {
    box-sizing: border-box;
    padding: 50px 30px 30px;
    .orangebox.wt {
      margin-top: -5px;
      border-radius: 10px;
      .txt1 {
        padding-bottom: 20px;
        font-size: 16px;
        color: #1e327e;
        text-align: center;
        width: 100%;
        .cl-red {
          color: #f00;
        }
      }
    }
    .col1 {
      color: #333;
      font-size: 24px;
      font-weight: lighter;
      text-align: center;
      .col2 {
        color: #1e327e;
        font-size: 24px;
      }
    }
    .transact_top {
      height: 70px;
    }
  }
</style>
