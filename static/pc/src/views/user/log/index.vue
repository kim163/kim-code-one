<template>
  <div class="user-conter user-log">
    <div class="style_f">
      <div v-for="item in filterMenu" @click="searchData.historyType=item.value"
           :class="['style_i',{active:searchData.historyType==item.value}]">
        {{item.name}}
      </div>
    </div>
    <div class="log-info">
      <div class="form-box">
        <div class="inputbox">
          <datepicker class="input" v-model="searchData.starttime"></datepicker>
        </div>
        <div class="inputbox">
          <datepicker class="input" v-model="searchData.endtime"></datepicker>
        </div>
        <div class="inputbox">
          <select class="input-item" v-model="searchData.friendtype" v-show="searchData.historyType=='friend'">
            <option value="0">推荐注册成功玩家</option>
            <option value="1">推荐奖金收入</option>
            <option value="2">推荐奖金支出</option>
          </select></div>
        <div class="btn" type="button" @click="search(1)">查询</div>
      </div>
      <div class="log-list">
        <tabledata @search="search" :thead="thead" :data="data">
          <tr v-for="(item,i) in data.pageContents||[]">
            <td v-for="twig in thead">
              {{!twig.filter ? item[twig.value] : twig.filter(item[twig.value], item)}}
            </td>
          </tr>
        </tabledata>
      </div>
    </div>
  </div>
</template>
<script>
  import {queryHistory} from "api/user";
  import tabledata from "components/table-data";
  import datepicker from "base/datepicker";

  let filterMenu = [
    {name: "在线存款", value: "deposit"},
    {name: "提款", value: "withdraw"},
    {name: "户内转账", value: "transfer"},
    {name: "优惠活动", value: "concessionReccords"},
    {name: "自助优惠", value: "couponRecords"}, {name: "自助返水", value: "ximaDetail"},
    {name: "副账户优惠", value: "deputyRecords"},
    {name: "好友推荐", value: "friend"},
  ]
  export default {
    data() {
      return {
        thead: [],
        filterMenu,
        data: {pageContents: []},
        searchData: {
          historyType: "deposit",
          starttime: "",
          endtime: '',
          pageIndex: 1,
          size: 10,
          friendtype: "0"
        }
      };
    },
    watch: {},
    methods: {
      search(index) {
        if (!isNaN(index)) {
          this.searchData.pageIndex = index;
        }
        this.data.pageContents = [];
        this.changeType(this.searchData.historyType);
        queryHistory(Object.assign({},this.searchData,{endtime:this.searchData.endtime+" 24:00:00"})).then((res) => {
          if (res.success) {
            this.data = res.data;
          } else {
            toast(res.message)
          }
        });
      },
      changeType(val) {
        switch (val) {
          case "deposit":
            return this.thead = [
              {name: '编号', value: 'billno'},
              {name: "存款金额", value: "money"},
              {name: "状态", value: "flag"},
              {name: "存款时间", value: "tempCreateTime"}
            ];
          case "withdraw":
            return this.thead = [
              {name: '编号', value: 'pno'},
              {name: '提款金额', value: 'amount'},
              {name: '状态', value: 'flag'},
              {name: '提款时间', value: 'tempCreateTime'}
            ];
          case "transfer":
            return this.thead = [
              {name: '编号', value: 'id'},
              {name: '转账金额', value: 'remit'},
              {name: '转账账号', value: 'loginname'},
              {name: '状态', value: 'remark'},
              {
                name: '转账类型',
                value: 'source',
                filter(val, record) {
                  val = val.toUpperCase();
                  let target = record.target.toUpperCase();
                  if (val == 'PT') {
                    return val + '账户 ➤ ' + target;
                  } else if (target == 'PT') {
                    return val + ' ➤ ' + target + '账户';
                  } else if (val == 'MG') {
                    return val + '账户 ➤ ' + target;
                  } else if (target == 'MG') {
                    return val + ' ➤ ' + target + '账户';
                  } else if (val == 'TTG') {
                    return val + '账户 ➤ ' + target;
                  } else if (target == 'TTG') {
                    return val + ' ➤ ' + target + '账户';
                  } else if (val == 'QT') {
                    return val + '账户 ➤ ' + target;
                  } else if (target == 'QT') {
                    return val + ' ➤ ' + target + '账户';
                  } else if (val == 'NT') {
                    return val + '账户 ➤ ' + target;
                  } else if (target == 'NT') {
                    return val + ' ➤ ' + target + '账户';
                  } else if (val == 'DT') {
                    return val + '账户 ➤ ' + target;
                  } else if (target == 'DT') {
                    return val + ' ➤ ' + target + '账户';
                  } else if (val == 'AGIN') {
                    return val + '账户 ➤ ' + target;
                  } else if (target == 'AGIN') {
                    return val + ' ➤ ' + target + '账户';
                  } else if (val == 'DG') {
                    return val + '账户 ➤ ' + target;
                  } else if (target == 'DG') {
                    return val + ' ➤ ' + target + '彩票账户';
                  } else {
                    return val + ' ➤ ' + target;
                  }
                }
              },
              {name: '转账时间', value: 'tempCreateTime'}
            ];
          case "concessionReccords":
            return this.thead = [
              {name: '优惠类型', value: 'type'},
              {name: '赠送金额', value: 'amount'},
              {name: '编号', value: 'pno'},
              {name: '帐户', value: 'loginname'},
              {name: '备注', value: 'remark'},
              {name: '创建时间', value: 'tempCreateTime'}
            ];
          case "couponRecords":
            return this.thead = [
              {name: '赠送', value: 'gifTamount'},
              {name: '存款', value: 'amount'},
              {name: '编号', value: 'pno'},
              {name: '类型', value: 'type'},
              {name: '倍数', value: 'betMultiples'},
              {name: '执行时间', value: 'tempCreateTime'},
            ];
          case "depositOrderRecord": //附言存款
            return this.thead = [
              {name: '附言', value: 'depositId'},
              {name: '银行', value: 'bankname'},
              {name: '状态', value: 'status'},
              {name: '创建时间', value: 'tempCreateTime'}
            ];
          case "deputyRecords":
            return this.thead = [
              {name: '编号', value: 'referenceNo'},
              {name: '类型', value: 'typeString'},
              {name: '存款金额', value: 'remit'},
              {name: '执行时间', value: 'tempCreateTime'}
            ];
          case "ximaDetail":
            return this.thead = [
              {name: '有效投注额', value: 'validAmount'},
              {name: '结算金额', value: 'ximaAmount'},
              {name: '状态', value: 'ximaStatus'},
              {value: 'pno', name: '编号'},
              {value: 'ximaType', name: '洗码类型'},
              {value: 'rate', name: '洗码率'},
              {value: 'statisticsTimeRange', name: '统计时间段'}
            ];
          case "friend":

            if (this.searchData.friendtype == 0) {
              return this.thead = [
                {name: '玩家账号', value: 'downlineuser'},
                {name: '时间', value: 'createtime'}
              ];
            }
            else {
              this.thead = [
                {name: '玩家账号', value: 'downlineuser'},
                {name: '金额', value: 'money'},
                {name: '类型', value: 'type'},
                {name: '时间', value: 'createtime'}
              ];
            }
            break;
          default:
            break;
        }
      },
    },
    created() {
      if (this.$route.params.type) {
        this.searchData.historyType = this.$route.params.type;
      }
      this.searchData.starttime = new Date().addDay(-30).format();
      this.searchData.endtime = new Date().format();
    },
    mounted() {
      this.search()
    },
    components: {
      tabledata, datepicker
    }
  };
</script>
<style lang="scss">
  .user-log {
    .log-info {
      padding: 50px 30px 30px;
    }
    .form-box {
      text-align: center;
      height: 40px;
      white-space: nowrap;
      margin: 0 auto 30px;
      padding-left: 40px;
    }
  }
</style>
