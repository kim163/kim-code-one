<template>
  <div class="recommend-firend">
    <div class="title-tip">好友成功领取体验金，您即获得推荐奖金，<br/>其当日30%的负盈利彩金也会在次日派发给您！</div>

    <div class=" form">
      <div class="moneywrap">
        <div class="moneybox" >
          <h2>
          <span>{{money}}</span>元
          </h2>
          <span class="date">推荐礼金</span>
        </div>
      </div>
      <div class="inputbox">
        <label class="label">选择游戏平台：</label>
        <select v-model="myData.platform">
          <option value="">选择游戏平台</option>
          <option v-for="item in platformData" :value="item.value">
            {{item.name}}
          </option>
        </select>
      </div>
      <div class="inputbox">
        <label class="label">填写转入金额：</label>
        <input type="text" placeholder="填写转入金额"
               v-model.number="myData.money"
        />
      </div>
      <div>
        <!--disablebtn-->
        <a href="javascript:;" @click="submit" class="btn-submit formbtn ">确定转入</a>
      </div>

      <br/>
      <div class="my-link-copy" @click="friendLink.$copy()">
        您的专属推荐链接 (
        <button class="cl-dd">点击可复制</button>
        ) <br/>
        <span class="link_ref">{{friendLink}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import {queryFriendBonue, transferInforFriend} from "api/preferential-terms";
  import {platformData} from "@/assets/data"

  export default {
    data() {
      return {
        platformData,
        step: 1,
        money: 0,
        url: "",
        myData: {
          platform: "", //true string
          money: ""
        }
      };
    },
    watch:{
      "myData.money"(val) {
        if (/[^\d]/g.test(val)) {
          this.myData.money = this.myData.money.toString().replace(/[^\d]/g, '')
        }
      }
    },
    computed: {
      friendLink() {
        return window.location.origin + "?friendcode=" + this.url;
      }
    },
    methods: {
      submit() {
        if (this.myData.platform == "") return toast("请选择转入平台")
        if (!/^\d+$/.test(this.myData.money)) return toast("请输入整数金额")
        if (this.myData.money>this.money) return toast("推荐奖励金额不足")
        transferInforFriend(this.myData).then(res => {
          if(res.success){
            this.myData.platform='';
            this.myData.money=""
          }
          toast(res.message)
        }).catch(err => {
          toast("领取失败")
        })
      }
    },
    created() {
      queryFriendBonue().then(data => {
        if(data.success){
          this.money=data.data.money*1;
          this.url=data.data.url;
        }
      })
    },
    components: {}
  };
</script>

<style lang="scss">
  .recommend-firend{
    .moneywrap {
      margin: 0 auto 20px;
      text-align: center;
      color: #1e327e;
      cursor: pointer;
      .moneybox {

          border: 1px solid #1e327e;
          background: #1e327e;
          color: #fff;

        width: 180px;
        height: 67px;
        line-height: 1.4;
        padding-top: 10px;
        border-radius: 5px;

        float: none !important;

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



    .bottom-tip{
      margin: 50px 0;
    }
    .my-link-copy {
      cursor: pointer;
      padding: 15px;
      border: 1px dashed #f66;
      border-radius: 5px;
      line-height: 24px;
      color: #999;
      background: #fff;
      width: 300px;
      margin: 0 auto;
    }
  }

</style>
