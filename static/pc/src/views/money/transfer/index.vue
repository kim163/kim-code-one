<template>
  <div class="transfer-info">

    <div class="orangebox wt">
      <div class="inputbox">
        <span class="label">转账类型：</span>
        <div class="styled-select">
          <select v-model="type">
            <option value="0">转入主账户</option>
            <option value="1">转入游戏账户</option>
          </select>
        </div>
      </div>
      <div v-show="type==0">
        <div class="inputbox">
          <span class="label">主账户：</span>
          <input type="text" readonly :value="userData.accountMoney">
        </div>
        <div class="inputbox">
          <span class="label">游戏账户：</span>
          <select ref="transOut" v-model="data.transferGameOut">
            <option value="">选择游戏平台</option>
            <option v-for="item  in platformData" :value="item.value">
              {{item.name}}
            </option>
          </select>
        </div>
      </div>
      <div v-show="type==1">
        <div class="inputbox">
          <span class="label">游戏账户：</span>
          <select v-model="data.transferGameIn" ref="indom">
            <option value="">选择游戏平台</option>
            <option v-for="item  in platformData" :value="item.value">
              {{item.name}}
            </option>
          </select>
        </div>
        <div class="inputbox">
          <span class="label">主账户：</span>
          <select v-model="data.transferGameOut">
            <option value="MAIN" selected="selected">主账户 ({{userData.accountMoney}})元</option>
            <option value="DEPUTY">副账户 ({{userData.deputyCredit}})元</option>
          </select>
        </div>
      </div>
      <div class="inputbox">
        <span class="label">金额： </span>
        <input type="text" v-model="data.transferGameMoney" placeholder="请输入转账金额">
      </div>
      <a class="formbtn" @click="transfer">确定</a>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {updateGameMoney} from "api/payment"
  import {getGameMoney} from "api/user"
  import {platformData} from "@/assets/data"

  export default {
    data() {
      return {
        platformData: platformData.concat([{name: "AG真人", value: "AGIN"}, {name: "EBET真人", value: "EBET_LIVE"}, { name: "沙巴体育", value: "SB" }]),
        type: 0,//0表示转入游戏账户  1表示转入主账户
        outMoney: '',
        data: {
          transferGameOut: "", //转出账号
          transferGameMoney: "",
          transferGameIn: "MAIN"//转入
        }
      };
    },
    watch: {
      "data.transferGameMoney"(val) {
        if (/[^\d]/g.test(val)) {
          this.data.transferGameMoney = this.data.transferGameMoney.toString().replace(/[^\d]/g, '')
        }
      },
      type(val) {
        if (val == 0) {
          this.data.transferGameIn = "MAIN"
          this.data.transferGameOut = ""

        } else {
          this.data.transferGameIn = "";
          this.data.transferGameOut = "MAIN"
        }
      },
      "data.transferGameOut"(val) {
        this.outMoney="";
        if (this.type == 0) {
          if (val == "") return;
          this.getGameMoney(val, this.$refs.transOut, 0)
        } else {
          this.outMoney = (val == 'MAIN' ? this.userData.accountMoney : this.userData.deputyCredit);
          if (val == 'DEPUTY' && (this.data.transferGameIn == 'EBET_LIVE' || this.data.transferGameIn == 'AGIN')) {
            $alert("副账户不能转入AG真人和EBTE真人");
            this.data.transferGameOut = "MAIN"
          }
        }
      },
      "data.transferGameIn"(val) {
        if (this.data.transferGameOut == 'DEPUTY' && (val == 'EBET_LIVE' || val == 'AGIN')) {
          this.data.transferGameIn = ""
          $alert("副账户不能转入AG真人和EBTE真人");
        }
        if (this.type == 1 && val != '')
          this.getGameMoney(val, this.$refs.indom,1)
      }
    },
    computed: {
      ...mapGetters(["userData"])
    },
    methods: {
      transfer() {
        if (this.outMoney!== '' && this.data.transferGameMoney * 1 > this.outMoney * 1) {
          return $alert("转出金额不足");
        }
        if (this.data.transferGameMoney == "") return $alert("请输入转账金额");
        else if (this.data.transferGameIn == "") return $alert(`请选择${this.type == 0 ? "转出" : "转入游戏"}平台`);
        else if (this.data.transferGameOut == "") return $alert(`请选择${this.type == 0 ? "游戏" : "转出"}平台`);
        updateGameMoney(this.data).then(res => {
          $alert(res.message);
          if (res.success) {
            this.$store.dispatch("UPDATE_USERDATA");
            if (this.type == 0) {
              this.getGameMoney(this.data.transferGameOut, this.$refs.transOut, 0)
            } else if (this.type == 1) {
              this.getGameMoney(this.data.transferGameIn, this.$refs.indom, 1)
            }
          }
        }).catch(err => {
          toast("转入失败");
        })
      },
      getGameMoney(val, dom, type) {
        let options = dom.options,
          curIndex = options.selectedIndex;
        options[curIndex].text = this.platformData[options.selectedIndex - 1].name + "(正在查询平台金额...)";
        getGameMoney({gameCode: val}).then(res => {
          if (res.success) {
            if (this.type == 0) {
              this.outMoney = res.data;
            }
            options[curIndex].text = this.platformData[curIndex - 1].name + " (" + res.data + ")元";
          } else {
            options[curIndex].text = this.platformData[curIndex - 1].name + " (" + res.message + ")";
            ;
          }
        }).catch(err => {
          options[curIndex].text = this.platformData[curIndex - 1].name + "(查询金额失败)";
        })
      }
    }
  }
</script>
<style lang="scss">
  .transfer-info {
    box-sizing: border-box;
    padding: 50px 30px 30px;
  }
</style>
