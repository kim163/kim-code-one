<template>
  <div class="experience-gold">
    <div class="guide-page" v-show="step==0">
       <h2 class="guide-tip">请下载乐娱国际手机APP进行体验金申请！</h2>
       <img src="./images/app_download.png" width="453">
    </div>
    <div v-show="step==1">
      <h3 class="title-tip">无投注额要求，游戏账户达到{{limitAmount}}元即可提款！</h3>
      <br>
      <button  :disabled="!success"  v-if="userData.accountName!=''"   :class="['formbtn',{disabled:!success}]"   @click="getMoney">{{msg}}</button>
      <router-link v-else class="formbtn"  :to="{name:'user_datum'}">立即完善个人资料</router-link>
    </div>
    <div class="orangebox " v-show="step==2">
      <!--<h3 class="title-tip">恭喜您获得<span>8</span>元体验金</h3>-->
      <p>部分厅TTG、NT需进入游戏激活，方可转入使用<br>（点击游戏名称进入激活）</p>
      <br>
      <div class="inputbox">
        <span class="label">选择游戏平台：</span>
        <select v-model="platform">
          <option value="">请选择游戏平台</option>
          <option v-for="item in platformData" :value="item.value">
            {{item.name}}
          </option>
        </select>
      </div>
      <br>
      <a href="javascript:;" @click="submit" class="formbtn cmargin">提交</a>
    </div>
  </div>
</template>
<script>
  import {commitPT8Self, canGetPt8CouponCheck,youhuiDisplay} from "api/preferential-terms"
  import {platformData} from "@/assets/data"
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        success:false, //是否领取过体验金
        msg: "正在查询体验金资格",
        limitAmount:0,
        money: "0",
        step: 0,       // 0 指引用户到 APP 中领取。
        platformData,
        platform: ""
      };
    },
    methods: {
      getMoney(){
        if(this.success){
          this.step=2;
        }
        else{
          toast(this.msg)
        }
      },
      submit() {
        if (this.platform == "") return toast("请选择转入平台")
        if (this.userData.accountName == "") {
          $confirm("请先完善个人资料!", "提示", {
            confirmText: "立即完善"
          }).then(() => {
            this.$router.push({name:'user_datum'});
          })
          return
        }
        else if (this.userData.phoneValidStatus==0){
          $confirm("请先验证注册手机号!", "提示", {
            confirmText: "立即验证"
          }).then(() => {
            this.$router.push({name:'user_datum'});
          })
          return
        }

        commitPT8Self({platform: this.platform}).then(res => {
          if (res.success) {
            $confirm("转入成功!", "提示", {
              confirmText: "进入游戏"
            }).then(() => {
              this.$router.push({name:'slotgame'});
            })
            this.step = 1;
          }
          else {
            toast(res.message);
          }
        }).catch(err => {
          toast("领取体验金失败了");
        })
      }
    },
    computed: {
      ...mapGetters(["userData"])
    },
    created() {
      youhuiDisplay({'youhuiType':'pt8'}).then(res=>{
        if(res.success){
          this.limitAmount=res.data.lowestAmount
          this.money = res.data.amount
        }
      })
      canGetPt8CouponCheck().then(res => {
        this.success=res.success;
        this.msg = res.message
        if (res.success) {
          this.money = res.data.amount;
          this.limitAmount=res.data.limitAmount;
        }
      })
    },
    components: {}
  };
</script>
<style lang="scss">
  .experience-gold{
     p {
      color: #1e327e;
      text-align: center;
      width: 100%;
      font-size: 24px;
    }
    
    .guide-page{
      text-align: center;
      .guide-tip{
        color: #f00;
        font-size: 16px;
        font-weight: normal;
        line-height: 30px;
        margin-bottom: 15px;
      }
      img{
        margin-left: 60px;
      }
    }

  }

</style>
