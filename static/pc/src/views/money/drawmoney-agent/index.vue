<template>
  <div class="agent-content">
    <div class="style_f">
      <div class="style_i active">申请提款</div>
    </div>
    <div class="data-wrap">
      <div class="deposit-form form-box">
        <table border="0" cellpadding="0" cellspacing="0">
          <tbody>
          <tr>
            <td class="txt">老虎机佣金余额：</td>
            <td><input type="text" :value="userData.slotAccount" id="slot_money" disabled=""></td>
          </tr>
          <tr>
            <td class="txt">其他佣金余额：</td>
            <td><input type="text" class="inpt" :value="userData.liveAccount" disabled=""></td>
          </tr>
          <tr>
            <td class="txt">提款金额：</td>
            <td><input type="text" v-model="sumitData.amount" maxlength="6" placeholder="单次提款金额最低100元">
            </td>
          </tr>
          <tr>
            <td class="txt">银行名称：</td>
            <td>
              <select v-model="sumitData.id">
                <option value="">请选择银行</option>
                <option v-for="item in bankList" :value="item.id">{{item.bankname}}({{item.bankno}})</option>
              </select>
              <router-link :to="{name:'bind_bank'}">绑定卡/折号？</router-link>

            </td>
          </tr>
          <tr>
            <td class="txt">提款类型：</td>
            <td>
              <select  v-model="sumitData.tkType" >
                <option value="slotmachine">老虎机</option>
                <option value="liveall">其他</option>
              </select>
            </td>
          </tr>
          <tr>
            <td class="txt">支付密码：</td>
            <td>
              <input v-model="sumitData.password" type="password" maxlength="6">
              <router-link v-if="!isSetPayPwd" :to="{name:'personal_paySet'}">设置/修改支付密码？</router-link>
            </td>
          </tr>
          </tbody>
        </table>
        <p class="btn-box">
          <a href="javascript:;" class="btn" @click="submit" >提交</a>
        </p>
      </div>
      <!--<div class="orangebox wt">-->
        <!--<p class="txt1"><span>取款金额：</span> <span class="cl-red">{{sumitData.amount}}</span></p>-->
        <!--<p class="txt1"><span class="" style="line-height: 1.5;">工作人员正在为您处理，如果您的各项资料正确，<br>取款金额会在1小时内到达您的绑定银行账户。</span>-->
        <!--</p>-->
        <!--<router-link :to="{name:'user_log',params:{type:'withdraw'}}" class="formbtn">-->
          <!--查看取款记录-->
        <!--</router-link>-->
      <!--</div>-->
      <div class="bottom-tip">
        <p class="r">代理账号提款需要审核，会在12小时内为您到账；我们会尽快为您处理，请您耐心等待，谢谢您的支持！！</p>
      </div>
    </div>
  </div>
</template>
<script>
  import md5 from "MD5";
  import {findUserBankList, withdraw_new} from "api/payment";
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
          tkType: "slotmachine"// false string 若是代理提款，必填输入代理提款类型，提款类型，slotmachine-老虎机，liveall-其他部分
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
            this.$router.push({name: 'personal_paySet'});
          })
        }
        else if (this.sumitData.amount == "") toast("请输入取款金额!");
        else if (this.sumitData.amount < 100) toast("最少取款100元!");
        else if (this.sumitData.tkType == 'slotmachine' && this.sumitData.amount > this.userData.slotAccount)
            toast("老虎机佣金余额不足")
        else  if (this.sumitData.tkType == "liveall" && this.sumitData.amount > this.userData.liveAccount)
          toast("其他佣金余额不足")
        else if (this.sumitData.id == "") toast("请选择银行卡!");
        else if (this.sumitData.password == "") toast("请输入支付密码!");
        else {
          return true;
        }
      },
      submit() {
        if (!this.checkForm()) return;
        this.sumitData.password = md5(md5(this.sumitData.password))
        withdraw_new(this.sumitData).then(data => {
          this.sumitData.password = '';
          if (data.success) {
            this.$store.dispatch("UPDATE_USERDATA");
            this.step = 3;
            $alert('代理账号提款需要审核，会在12小时内为您到账；我们会尽快为您处理，请您耐心等待，谢谢您的支持！！')
            this.sumitData.amount = '';
          }
         else{
            toast(data.message);
          }
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
<style spcoed>
</style>
