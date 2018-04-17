<template>
  <div class="deposit">
    <!--<form ref="fm" target="_blank" method="post" action="/onlinepayment/onlinePayDispathcer.php">-->
    <div v-show="!isShowBank">
      <div class="inputbox">
        <span class="label">支付方式：</span>
        <div class="depositmenu select-group">
          <a href="javascript:void(0);"  @click="setPay_mc_wechat()" :class="{active:paySelect=='mc_wechat'}" v-show="this.mcData&&this.mcData.payChannelList!=undefined&&this.mcData.payChannelList.indexOf('wechat')>-1">
            <img src="~images/base/bonus-icon.png" class="hot-btn"> 
            微信秒存
          </a>
          <a href="javascript:void(0);" v-for="(item,i) in payTypeCh" :key="i" @click="setPaytype(item)" v-show="item.show" :class="{active:paySelect==item.type}">
            <img src="~images/base/bonus-icon.png" class="hot-btn" v-show="item.type=='mcpay'"> 
            {{item.name}}
          </a>
        </div>
      </div>
      <div v-show="isMcPlay">
        <div class="inputbox" v-show="paySelect!='mc_wechat'">
          <span class="label">支付类型：</span>
          <div class="styled-select">
            <select name="id" v-model="submitData.payBy">
              <option v-for='item in mcData.payChannelList' :key="item" :value="item">
                {{mcTypech[item]}}
              </option>
            </select>
          </div>
        </div>
        <div class="inputbox">
          <span class="label">存款账户姓名：</span>
          <input type="text" name="accountName" v-model="submitData.accountName">
        </div>
      </div>
      <div v-show="!isMcPlay">
        <div class="inputbox">
          <span class="label">支付类型：</span>
          <div class="styled-select">
            <select name="id" v-model="submitData.id">
              <option v-for='item in payItemData' :value="item.id" :key="item.id">
                {{item.remark}}
              </option>
            </select>
          </div>
        </div>
        <div class="inputbox" v-show="this.bankCodeData.length>0">
          <span class="label">支付银行：</span>
          <div class="styled-select">
            <select name="bankCode" v-model="submitData.bankCode">
              <option value="">请选择支付银行</option>
              <option v-for='item in bankCodeData' :value="item.value">
                {{item.name}}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="inputbox">
        <span class="label">充值金额：</span>
        <input name="order_amount" v-model="submitData.order_amount" type="text" :placeholder="placeholder">
      </div>
      <div class="inputbox">
        <span class="label">存款金额：</span>
        <div class="select-group">
          <a v-for="item in loadMoney" href="javascript:void(0);" @click="submitData.order_amount=item.value" :class="{active:submitData.order_amount==item.value}">{{item.name}}</a>
        </div>
      </div>
      <div class="inputbox">
        <span class="label"></span>
        <button type="submit" href="javascript:void(0);" @click="depositPost" class="formbtn">提交</button>
      </div>
      <div style="line-height: 2" class="cl-red">
        <p v-show="paySelect=='mcpay'">
          1.请务必按照填写的姓名和存款金额进行存款，否则您的款项将无法及时到账！
          <br> 2.如果您的款项5分钟未能到账，请联系24小时在线客服！
          <br> 3.支付宝转账招商23：00-凌晨01：00有延迟到帐现象，期间建议您使用其他支付方式！
        </p>
        <p v-show="paySelect=='wechat'">
          1.微信支付第三方需收取一定的手续费。
          <br> 2.若使用手机微信支付,必须使用第二部手机进行扫码支付,不能截屏保存支付.
          <br> 3.存款过程中如有任何问题，请及时联系24小时在线客服进行咨询。
        </p>
        <p v-show="paySelect=='ebank'">
          1.通过第三方支付进行存款的会员，如果出现掉单的情况，请及时联系在线客服，并提供订单号，存款金额，存款时间，以便我们尽快为您补单。
          <br> 2.第三方支付单笔存款最低额度为1元，最高10000元。
          <br>3.存款过程中如有任何问题，请及时联系24小时在线客服进行咨询
        </p>
        <p v-show="paySelect=='qqpay'">
          1.QQ支付第三方需收取一定的手续费。
          <br> 2.若不显示支付通道,代表该支付方式正在维护,请选用其他支付方式.
          <br> 3.存款过程中如有任何问题，请及时联系24小时在线客服进行咨询。
        </p>
        <p v-show="paySelect=='alipay'">1.支付宝支付第三方需收取一定的手续费。
          <br> 2.若不显示支付通道,代表该支付方式正在维护,请选用其他支付方式.
          <br> 3.存款过程中如有任何问题，请及时联系24小时在线客服进行咨询。
        </p>
      </div>
      <!--</form>-->
    </div>
    <div v-show="isShowBank">
      <div v-if="mcStep==2">
        <div class="mc_wx_tips inputbox">
          <div class="m_w_t_title">请您在
            <span class="m_w_t_time">{{help_time.min}}</span>：
            <span class="m_w_t_time">{{help_time.sec}}</span>时间内按下【确认】</div>
          <div>
            请您【确认】金额
            <span class="m_w_t_money">{{submitData.order_amount}}元</span>
          </div>
          <div class="m_w_t_tips">温馨提示:请您按下【确认】，方可产生订单
            <br/>并存入该金额，否则存款无法到账</div>
        </div>
        <div class="agrees">
          <div class="mc_wx_tips_agree">
            <label>
              <input type="checkbox" id="mc_wx_1" v-model="submitData.agree_first"> 我已明白需要转账
              <span class="red">{{submitData.order_amount}}</span>元。
            </label>
          </div>
          <div class="mc_wx_tips_agree">
            <label>
              <input type="checkbox" id="mc_wx_2" v-model="submitData.agree_second"> 本人已同意，如未转账
              <span class="red">{{submitData.order_amount}}</span>元，导致系统无法匹配存款，乐娱国际概不负责。
            </label>
          </div>
        </div>
        <div class="sec-btns cfx">
          <button type="submit" class="formbtn red" @click="wxSecCheck">确认</button>
        </div>
      </div>
      <div v-if="mcStep==3">
        <div class="inputbox">
          <span class="label"></span>
          <h2>我们的收款账户</h2>
        </div>
        <div class="inputbox">
          <span class="label">类别：</span>
          <input type="text" name="" class="strong" v-model="cardType" readonly="readonly">
        </div>
        <div class="inputbox">
          <span class="label">卡号：</span>
          <input type="text" name="" v-model="playBankCode" readonly="readonly">
          <span class="copyBtn" @click="playBankCode.$copy()">复制</span>
        </div>
        <div class="inputbox">
          <span class="label">姓名：</span>
          <input type="text" name="" v-model="playName" readonly="readonly">
          <span class="copyBtn" @click="playName.$copy()">复制</span>
        </div>
        <div class="inputbox">
          <span class="label"></span>
          <h2>您的存款信息</h2>
        </div>
        <div class="inputbox">
          <span class="label">存款姓名：</span>
          <input type="text" name="" v-model="saveName" readonly="readonly">
        </div>
        <div class="inputbox">
          <span class="label">存款金额：</span>
          <input type="text" name="" v-model="saveAmount" readonly="readonly">
        </div>
        <div class="inputbox">
          <span class="label">存款方式：</span>
          <input type="text" name="" v-model="mcTypech[payBy]" readonly="readonly">
        </div>
        <div class="sec-btns cfx">
          <button type="submit" href="javascript:void(0);" @click="mcStep=4" class="formbtn" v-if="payBy=='wechat'">微信转账教程</button>
          <button type="submit" href="javascript:void(0);" @click="toSuccess" class="formbtn">我已成功付款</button>
        </div>
      </div>
      <div v-if="mcStep==4&&payBy=='wechat'">
        <div class="mc_wx_helps">
          <span class="mc_wx_control left" @click="help_control('left')" v-show="help_img>1">
            <img src="./img/helps/control_left.png">
          </span>
          <div class="mc_wx_h_content">
            <div v-if="help_img=='1'">
              <p class="mc_wx_h_tips">
                点击微信
                <span class="mc_wx_red">【钱包】</span>-
                <span class="mc_wx_red">【收付款】</span>页面，使用
                <span class="mc_wx_red">【转账到银行卡功能】</span>即可进行转账！
              </p>
              <img src="./img/helps/01.jpg">
            </div>
            <div v-if="help_img=='2'">
              <p class="mc_wx_h_tips">
                点击微信
                <span class="mc_wx_red">【钱包】</span>-
                <span class="mc_wx_red">【收付款】</span>页面，使用
                <span class="mc_wx_red">【转账到银行卡功能】</span>即可进行转账！
              </p>
              <img src="./img/helps/02.jpg">
            </div>
            <div v-if="help_img=='3'">
              <p class="mc_wx_h_tips">
                点击微信
                <span class="mc_wx_red">【钱包】</span>-
                <span class="mc_wx_red">【收付款】</span>页面，使用
                <span class="mc_wx_red">【转账到银行卡功能】</span>即可进行转账！
              </p>
              <img src="./img/helps/03.jpg">
            </div>
            <div v-if="help_img=='4'">
              <p class="mc_wx_h_tips">
                请输入我方的
                <span class="mc_wx_red">【收款人姓名】</span>和对应的
                <span class="mc_wx_red">【银行卡号】</span>，核对无误点击确定
              </p>
              <img src="./img/helps/04.jpg">
            </div>
            <div v-if="help_img=='5'">
              <p class="mc_wx_h_tips">
                输入
                <span class="mc_wx_red">【系统指定的金额】</span>进行转账操作，转账成功后，方可自动到账！
              </p>
              <img src="./img/helps/05.jpg">
            </div>
          </div>
          <span class="mc_wx_control right" @click="help_control('right')" v-show="help_img<5">
            <img src="./img/helps/control_right.png">
          </span>
          <div class="mc_wx_h_btns">
            <button type="submit" class="formbtn red" @click="mcStep=3">已了解，继续存款</button>
            <button type="submit" class="formbtn red" @click="help_img=help_img+1" v-show="help_img<5">存款步骤(下一步)</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mcTips" v-show="isMcTips">
      <div>
        <h2>提示：您有未处理的存款订单</h2>
        <p>
          1. 如果您已经支付且超过10分钟，请联系在线客服处理该笔订单
          <br> 2. 如果未支付，请您先支付该笔订单，或者选择废弃该订单
        </p>
        <div>
          <span class="btn btn2" @click="selectMcOld">查看订单</span>
          <span class="btn" data-is="true" @click="newOrder">废弃并生成新订单</span>
        </div>
      </div>
    </div>

    <deposit-tips></deposit-tips>
  </div>
</template>
<script>
  import {
    getPaymentConfigInfo,
    mobilePayByEbank,
    onlinePayDispathcer,
    thirdRedirct,
    createDepositeOrder,
    getWxZzQuota
  } from "api/payment"
  import {
    generateQRCode
  } from "api/show"
  import depositTips from "./components/deposit-tips/index"
  import check from '@/util/RegExp'
  export default {
    data() {
      return {
        loadMoney: [{
          name: "10元",
          value: 10
        }, {
          name: "20元",
          value: 20
        }, {
          name: "50元",
          value: 50
        }, {
          name: "100元",
          value: 100
        }, {
          name: "200元",
          value: 200
        }, {
          name: "1000元",
          value: 1000
        }],
        paySelect: 'mcpay',
        payItem: [], //支付详细数据组
        payMin: '', //存款最低额度
        payMax: '', //存款最高额度
        bankCodeData: [],
        submitData: {
          id: "",
          order_amount: "",
          bankCode: "",
          accountName: "",
          payBy: '',
          agree_first: false,
          agree_second: false
        },
        help_img: 1, //秒存教程
        help_time: {
          Interval: null,
          init: 0, //分钟整数，接口获取
          min: 0, //显示的分钟
          sec: '00', //显示的秒
        },
        mcStep: 1, //秒存步骤
        mcData: {
          payChannelList: ""
        },
        isMcPlay: true,
        isShowBank: false,
        playBankCode: '',
        playName: '',
        payBy: '',
        saveName: '',
        saveAmount: '',
        cardType: '',
        isMcTips: false,
        payTypeCh: [{
            name: "网银/支付宝/微信转账",
            type: "mcpay",
            show: false,
            order: -1
          },
          {
            name: "微信支付",
            type: "wechat",
            show: false,
            order: -1
          },
          {
            name: "网银支付",
            type: "ebank",
            show: false,
            order: -1
          },
          {
            name: "QQ支付",
            type: "qqpay",
            show: false,
            order: -1
          },
          {
            name: "京东支付",
            type: "jdpay",
            show: false,
            order: -1
          },
          {
            name: "银联扫码",
            type: "unionpay",
            show: false,
            order: -1
          },
          {
            name: "支付宝",
            type: "alipay",
            show: false,
            order: -1
          }
        ],
        mcTypech: {
          "zfb": "支付宝转账",
          "bank_phone": "手机银行转账",
          "bank_web": "网上银行转账",
          "wechat": "微信转账",
        },
      }
    },
    watch: {
      "submitData.bankCode" (val) {
        if (val == "") return;
        let cur = this.payItem.find(item => {
          return item.id == val;
        })
      },
      "submitData.id" (val) {
        if (!val && val !== 0 && val != 'undefined') return;
        if (this.paySelect != 'mcpay') {
          let curpay = this.payItem.find(item => {
            return item.id == val;
          })
          if (curpay != undefined) {
            this.payMin = curpay.lowerlimit;
            this.payMax = curpay.upperlimit;
          }
          this.bankCodeData = [];
          if (this.paySelect == 'ebank') {
            mobilePayByEbank({
              paymentId: val
            }).then((res) => {
              if (res.success) {
                if (Array.isArray(res.data) && res.data[0] != null) {
                  this.bankCodeData = res.data;
                }
              }
            });
          }
        }
      },
      mcStep(val) {
        if (val != 2) {
          window.clearInterval(this.help_time.Interval);
        }
        if (val == 1) {
          this.submitData.order_amount = '';
        }
      }
    },
    methods: {
      // 秒存生成新的订单
      newOrder() {
        this.mcSubmit(true);
        this.isMcTips = false;
      },
      selectMcOld() {
        this.isMcTips = false;
        this.isShowBank = false;
        this.mcStep = 3;
      },
      generateQRCode(url, size) {
        return generateQRCode(url, size)
      },
      setPay_mc_wechat(){
        this.setPaytype({
          type:"mc_wechat",
          tips:"mc_wechat",
        });
        this.submitData.payBy="wechat"
      },
      setPaytype(item) { // 支付方式
        this.paySelect = item.type;
        this.tips = item.tips;
        this.submitData.id = '';
        this.payMin = '';
        this.payMax = '';
        this.mcStep = 1;
        if (item.type == 'mcpay'||item.type == 'mc_wechat') {
          this.submitData.accountName = '';
          this.isMcPlay = true;
          this.payMin = this.mcData.lowerlimit;
          this.payMax = this.mcData.upperlimit;
        } else {
          this.isMcPlay = false;
        }
      },
      toSuccess() {
        this.isShowBank = false;
        this.mcStep = 1;
      },
      depositCheck() {
        if (this.isMcPlay) {
          this.submitData.id = this.submitData.payBy;
        }
        if (!this.submitData.id) {
          toast('请选择支付类型');
        } else if (!this.submitData.order_amount) {
          toast('请输入金额');
        } else if (this.payMin&&this.submitData.order_amount < this.payMin ) {
          toast('最低存款' + this.payMin + '元');
        } else if (this.payMax&&this.submitData.order_amount > this.payMax ) {
          toast('最高存款' + this.payMax + '元');
        } else if (this.isMcPlay && this.submitData.accountName == '') {
          toast('存款账户姓名不能为空');
        } else if (!check.intNum.test(this.submitData.order_amount)) {
          toast("请输入整数金额！");
        } else {
          return true;
        }
      },
      depositPost(e) {
        if (this.depositCheck()) {
          if (this.isMcPlay) {
            if (this.submitData.payBy == 'wechat') {
              this.getWxZzQuota();
            } else {
              this.mcSubmit(false);
            }
          } else {
            onlinePayDispathcer(this.submitData);
          }
        } else {
          e.stopPropagation()
          e.preventDefault()
        }
      },
      getWxZzQuota() {
        getWxZzQuota({
          amount: this.submitData.order_amount
        }).then((result) => {
          $load.close();
          if (result.success) {
            this.isShowBank = true;
            this.submitData.order_amount = result.data.amount;
            this.mcStep = 2;
            this.timer(result.data.min);
          } else {
            toast(result.message)
          }
        }).catch((err) => {

        })
      },
      timer(min) {
        // 倒计时
        this.help_time.init = min;
        this.help_time.min = min;
        this.help_time.sec = 0;
        window.clearInterval(this.help_time.Interval);
        this.help_time.Interval = window.setInterval(() => {
          if (this.help_time.min == 0 && this.help_time.sec == 0) {
            window.clearInterval(this.help_time.Interval);
            this.mcStep = 1;
            this.isShowBank=false;
          } else {
            if (this.help_time.sec > 0) {
              this.help_time.sec--;
            } else if (this.help_time.sec <= 0) {
              this.help_time.min--;
              this.help_time.sec = 59;
            }
            this.help_time.sec < 10 ? this.help_time.sec = '0' + parseInt(this.help_time.sec) : this.help_time.sec;
            this.help_time.min < 10 ? this.help_time.min = '0' + parseInt(this.help_time.min) : this.help_time.min;
          }
        }, 1000)
      },
      wxSecCheck() {
        if (this.submitData.agree_first && this.submitData.agree_second) {
          this.mcSubmit(false);
        } else {
          toast("请同意协议")
        }
      },
      mcSubmit(discard) {
        let data = {
          "payBy": this.submitData.payBy,
          "accountName": this.submitData.accountName,
          "amount": this.submitData.order_amount,
          "discard": discard,
        };
        createDepositeOrder(data).then((res) => {
          if (res.success) {
            let data = res.data;
            let type = data.type;

            this.cardType = data.bank;
            this.playName = data.accountname;
            this.playBankCode = data.bankno;
            this.payBy = data.payBy;
            this.saveName = data.uaccountname;
            this.saveAmount = data.amount;

            if ('UNPAID_ORDER' == type) {
              this.isMcTips = true;
            } else if ('NEW_ORDER' == type) {
              this.isShowBank = true;
              this.mcStep = 3;
            } else if ('BANKCARD_NOTAVAILABLE' == type) {
              toast('通道维护中，请选择其他存款方式');
            }
          } else {
            this.mcStep = 1;
            toast(res.message);
          }
        });
      },
      help_control(common) {
        if (common == 'left') {
          if (this.help_img == 1) {
            toast('已是第一张');
          } else {
            this.help_img--
          }
        } else if (common == 'right') {
          if (this.help_img == 5) {
            toast('已是最后一张');
          } else {
            this.help_img++
          }
        } else {
          return;
        }
      },
    },
    beforeDestroy() {
      window.clearInterval(this.help_time.Interval);
    },
    computed: {
      payItemData() {
        let fata = this.payItem.filter(item => {
          return item.type == this.paySelect;
        });
        this.$nextTick(() => {
          if (fata.length > 0) {
            this.submitData.id = fata[0].id;
          }
        })

        return fata;
      },
      placeholder() {
        if (this.payMin && this.payMax) {
          return "最少" + this.payMin + "元，最多" + this.payMax + "元";
        } else {
          return "请输入存款金额";
        }
      }
    },
    created() {
      this.mcStep = 1;
      getPaymentConfigInfo({
        terminalType: 0
      }).then((res) => {
        if (res.success) {
          this.payItem = res.data;
          for (let i = 0; i < this.payTypeCh.length; i++) {
            let item = this.payTypeCh[i];
            let index = this.payItem.findIndex(z => {
              return item.type == z.type;
            });

            item.show = index > -1;
            item.order = index;
            //特殊需求，处理秒存；
            if (index > -1 && this.payTypeCh[i].type == "mcpay") {
              this.mcData = res.data[index];
            }
          }

          this.payTypeCh = this.payTypeCh.sort((a, b) => {
            return a.order - b.order;
          });

          let activtType = this.payTypeCh.findIndex(v => {
            return v.show === true;
          });
          activtType != -1 && this.setPaytype(this.payTypeCh[activtType]);
        }
      });
    },
    components: {
      depositTips
    }
  };

</script>
<style lang="scss" scoped>
  .deposit {
    box-sizing: border-box;
    padding: 50px 30px 30px;
    p {
      color: #ff4c67;
      font-size: 14px;
      width: 100%;
      padding-left: 150px;
    }
    .strong {
      font-size: 16px;
      color: #ff4c67 !important;
      border: 0 !important;
      background: none !important;
    }
    .inputbox {
      width: 590px !important;
    }
    .depositmenu a {
      position: relative;
    }
    .depositmenu .hot-btn {
      animation: topbtm 0.5s linear infinite alternate;
      position: absolute;
      right: 0;
    }
    @keyframes topbtm {
      from {
        top: -23px
      }
      to {
        top: -19px
      }
    }

    .copyBtn {
      cursor: pointer;
      width: 50px;
      height: 40px;
      line-height: 40px;
      display: block;
      font-size: 16px;
      background: #d5b04b;
      border-radius: 4px;
      color: #fff;
      text-align: center;
      font-weight: bold;
      float: right;
      margin-top: 3px;
    }

    .formbtn {
      margin: 24px 0px;
    }

    .mcTips {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;

      >div {
        background: #fff;
        border: 0;
        box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.3);
        border-radius: 0;
        padding: 35px;
        width: 400px;
        height: 250px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -200px;
        margin-top: -300px;

        >div {
          margin-top: 10px;
          text-align: center;
        }
      }

      h2 {
        margin-bottom: 10px;
      }

      p {
        line-height: 20px;
        font-size: 14px;
        color: #000;
        text-align: left;
        padding-left: 0;
      }

      .btn {
        background: #e06566;
        border-radius: 0;
        border: 1px solid #e06566;
        width: 200px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        padding: 5px 30px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
      }

      .btn2 {
        border: 1px solid #5b68ab;
        background: #5b68ab;
      }
    }
  }

  .sec-btns {
    text-align: center !important;
    .formbtn {
      display: inline-block !important;
      width: 240px !important;
      margin: 30px 20px !important;
    }
  }

  .mc_wx_tips {
    color: #e7091a;
    font-size: 26px;
    text-align: left;
    line-height: 1.5;
    .m_w_t_money {
      border: solid 2px #e7091a;
      font-size: 30px;
      padding: 0 20px;
      font-weight: bold;
      display: inline-block;
      margin: 20px 0 20px 10px;
    }
    .m_w_t_title {
      font-size: 24px;
    }
    .m_w_t_tips {
      font-size: 24px;

    }
    .m_w_t_time {
      display: inline-block;
      border-radius: 50em;
      margin: 0 10px;
      height: 60px;
      width: 60px;
      text-align: center;
      box-shadow: 2px 2px 10px 4px #ccc;
      border: solid 2px red;
      text-shadow: 2px 2px 5px #ccc;
      font-size: 34px;
      line-height: 60px;
      padding: 0;
    }
  }

  .agrees {
    width: 600px;
    margin: 0 auto 12px;
    color: #333;
    font-size: 14px;
    .mc_wx_tips_agree {
      .red {
        color: #e7091a;
        font-weight: bold;
      }
      input {
        width: 40px !important;
      }
    }
  }

  .mc_wx_helps {
    text-align: center;
    position: relative;
    .mc_wx_h_content {
      min-height: 270px;
      .mc_wx_h_tips {
        color: #333;
        margin: 20px 0;
        .mc_wx_red {
          color: red;
          font-weight: bold;
        }
      }
      img {
        height: 100%;
      }
    }
    .mc_wx_h_btns {
      text-align: center;
      .formbtn {
        display: inline-block;
        width: 240px;
        margin: 30px 20px;
      }
    }
    .mc_wx_control {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      transition: all .4s;

      &:hover {
        opacity: 0.8;
      }
      &.left {
        left: 0;
      }
      &.right {
        right: 0;
      }
    }

  }

</style>
