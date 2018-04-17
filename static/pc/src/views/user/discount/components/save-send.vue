<template>
  <div class="save-send">
    <div class="title-tip">
      再存优惠无限次数领取，红利单日上限8888元
      <br/>更有限时限量100%存送惊喜等你来抢！
    </div>
    <div class="inputbox">
      <label class="label">填写转入金额：</label>
      <input type="text" v-model="submitData.remit"
             name="amount" placeholder="转入金额"/>
    </div>
    <div class="inputbox">
      <label class="label">选择游戏平台：</label>
      <select v-model="Type">
        <option value="">选择游戏平台</option>
        <option v-for="item in platformData" :value="item">
          {{item}}
        </option>
      </select>
    </div>
    <div class="inputbox">
      <label class="label">择优惠幅度：</label>
      <select v-model="submitData.youhuiConfigId">
        <option value="">选择优惠幅度</option>
        <option v-for="(item,i) in filterData" :value="item.id">
          {{item.name}}
        </option>
      </select>
    </div>
    <div class="bottom-tip">
      <p>可获得红利:<span class="cl-yl">{{percentMoney | toFixed}} 元</span></p>
      <p>取款流水要求: <span class="cl-dd">{{limitMoney | toFixed}} 元</span></p>
      <!--<p>投注限额: <span class="cl-dd"> {{touzhuLimit | toFixed }} 元</span></p>-->
    </div>

    <div>
      <a href="javascript:void(0);" type="button" @click="submit" class="btn-submit formbtn">确认转入</a>
    </div>
  </div>
</template>
<script>
  import {youhui, getSelfYouHuiObject} from "api/preferential-terms"
  import {mapGetters} from "vuex"

  export default {
    data() {
      return {
        listData: [], //优惠数据
        percentMoney: 0,  //可获得红利
        limitMoney: 0, //取款流水要求
        touzhuLimit: 0,//投注限额
        Type: '',//选择平台
        submitData: {  //数据提交
          youhuiConfigId: '', // true number
          youHuiType: "", //true string
          platform: "",// true string
          remit: ''//true number
        }
      }
    },

    methods: {
      submit() {
        if (this.phoneCheck() && this.check()) {
          getSelfYouHuiObject(this.submitData).then((data) => {
              toast(data.message)
            }
          ).catch(() => {
            toast("请求错误请稍后重新尝试...")
          })
        }
      },
      check() {
        if (!/^\d+$/.test(this.submitData.remit)) toast("请输入整数金额");
        else if (this.Type == '') toast("请选择优惠平台");
        else if (this.submitData.youhuiConfigId == '') toast("请选择优惠幅度");
        else {
          return true
        }
      },
      computedMoney() { //计算金额
        let _data = this.listData.filter(item => item.id == this.submitData.youhuiConfigId);
        if (_data.length <= 0 || this.submitData.youhuiConfigId == '' || this.submitData.remit == '') return;
        _data = _data[0];
        this.submitData.youHuiType = this.submitData.platform = _data.title;
        let _remit = Math.min((this.submitData.remit * _data.percent).toFixed(2), _data.limitMoney);
        let _limitMoney = _data.betMultiples * (parseFloat(_remit) + parseFloat(this.submitData.remit));
        _remit = _remit < 0 ? 0 : _remit;
        this.percentMoney = _remit;
        this.limitMoney = _limitMoney;
        this.touzhuLimit = (this.submitData.remit + _remit) * 0.1
      },
      getYouHui() {
        youhui().then(data => {
          if (data.success) {
            this.listData = data.data
          }
        }).catch(() => {
          toast("获取优惠信息失败...")
        });
      },
      phoneCheck() {
        if (this.userData.phoneValidStatus == 0) {
          $confirm("检测到你未验证手机号!", "提示", {
            confirmText: "立即验证"
          }).then(() => {
            this.$router.push({name: 'user_datum'});
          });
          return false;
        } else {
          return true;
        }
      }
    },
    watch: {
      "submitData.youhuiConfigId"(val) {
        val == "" || this.computedMoney();
      },
      "submitData.remit"(val, old) {
        if (/[^\d]/g.test(val)) {
          this.submitData.remit=this.submitData.remit.toString().replace(/[^\d]/g, '')
        }else{
          val == ""||this.computedMoney();
        }
      }
    },
    computed: {
      ...mapGetters(["userData"]),
      filterData() {
        this.submitData.youhuiConfigId = '';
        let filterList = this.listData.filter((item, i) => {
          return item.platform == this.Type
        });
        this.$nextTick(() => {
          this.submitData.youhuiConfigId = (filterList.length == 1 ? filterList[0].id : "");
        })
        return filterList;
      },
      platformData() {
        let pf = []
        this.listData.forEach(item => {
          if (!pf.includes(item.platform)) {
            pf.push(item.platform)
          }
        });
        return pf;
      }
    },
    created() {
      this.phoneCheck();
      this.getYouHui();
    }
  };
</script>
