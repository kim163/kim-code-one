<template>
  <div class="help-gold">
    <div class="title-tip">救援金有效时间为30天 (从派发当天开始计算)<br/>规定时间内未领取将自动取消，10倍流水。</div>
    <br/>
    <div class="moneywrap">
      <div v-for="item in listData" @click="submitData.pno=item.pno"
         :class="['moneybox',{active:submitData.pno==item.pno}]">
        <h2>{{item.promo}}  元</h2>
        <span class="date">截止 {{getUom(item)}} </span>
      </div>
    </div>
    <div class="v-align">
      <div class="form">
        <div class="inputbox">
          <label class="label">选择游戏平台：</label>
          <select v-model="submitData.platform">
            <option value="">选择游戏平台</option>
            <option v-for="item in platformData" :value="item.value">{{item.value}}</option>
          </select>
        </div>
        <div>
          <a href="javascript:;" class="formbtn  " @click="submit">确认转入</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {queryPTLosePromo, claimLosePromo} from "api/preferential-terms";
  import {platformData} from "@/assets/data"

  export default {
    data() {
      return {
        platformData,
        listData: [],
        searchLogData: {
          pageIndex: 1,
          total: 0,
          size: 100
        },
        submitData: {
          pno: "",
          platform: "",
          flag: 2
        }
      };
    },
    methods: {
      getUom(item) {
        var d1 =item.tempCreateTime.toString().toDate();
        var uom = new Date(d1 - 0 + 30 * 86400000);
        uom = uom.getFullYear() + "-" + (uom.getMonth() + 1) + "-" + uom.getDate();
        return uom;
      },
      submit() {
        if (this.submitData.pno == "") return toast("请选择救援金");
        if (this.submitData.platform == "") return toast("选择游戏平台");
        claimLosePromo(this.submitData).then(res => {
          toast(res.message);
          if (res.success) this.submitData.pno = "";
        }).catch(err => {
          toast("处理失败...")
        })
      }
    },
    activated() {
      queryPTLosePromo(this.searchLogData).then(data => {
        if (data.success) {
          this.listData = data.data.pageContents.filter(function (item, i) {
            return item.status == 0
          });
        } else {
          toast(data.message);
        }
      })
    },
    components: {}
  };
</script>
<style lang="scss">
  .help-gold {
    .moneywrap {
      margin: 0 auto 20px;
      text-align: center;
      color: #1e327e;
      cursor: pointer;
      .moneybox {
        &:hover,&.active{
          border: 1px solid #1e327e;
          background: #1e327e;
          color: #fff;
        }
        width: 180px;
        height: 67px;
        padding-top: 10px;
        border-radius: 5px;
        border: 1px solid #cfcfcf;
        float: none !important;
        background: #fff;
        display: inline-block;
        margin: 0 5px;
        margin-bottom: 10px;
        h2 {
          font-weight: normal;
          font-size: 18px;

          margin: 0 auto 5px;
          text-align: center;
        }
        .date {
          width: 100%;
          text-align: center;
          display: block;
          font-size: 12px;
        }
      }
    }

  }
</style>
