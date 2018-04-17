<template>
  <div class="wrapcards">
    <div  v-for="item in list" :class="['box',getClass(item)]">
      <div class="bank_card_info"  >
        <h2 class="bankname">{{item.bankname}}</h2><span
        class="acctnumber">**** **** **** {{item.bankno}}</span><span
        class="acctname">持卡人：{{userData.accountName}}</span></div>
    </div>
    <div class="box add" @click="add"><a href="javascript:;"><span>+</span>添加银行卡</a></div>
    <addBank v-model="showAdd"></addBank>
  </div>
</template>
<script>
  import {findUserBankList, validateBankNo, bindBankNo} from "api/payment"
  import {mapGetters} from 'vuex'
  import addBank from "components/addBank"
  import  check from "@/util/RegExp"
  export default {
    data() {
      return {
        loadding: false,
        bankno: "",
        banktxt: "",
        validateBankNo: false,
        showAdd: false,
        list: []
      }
    },
    props: {
      text: {
        type: String,
        default: ""
      }
    },
    methods: {
      add(){
        if(!this.userData.accountName){
          $confirm("请先完善个人资料!", "提示", {
            confirmText: "确定"
          })
        }
        else this.showAdd=true;
      },
      getClass(item){
        switch(item.bankname){
          case "中国银行": return "bg1"
          case "中国农业银行":
          case "农业银行": return "bg2"
          case "光大银行": return "bg3"
          case "交通银行": return "bg4"
          case "民生银行": return "bg5"
          case "中国建设银行":
          case "建设银行": return "bg6"
          case "北京银行": return "bg7"
          case "华夏银行": return "bg8"
          case "邮政储蓄": return "bg9"
          case "兴业银行": return "bg10"
          case "": return "bg11"
          case "工商银行": return "bg12"
          case "招商银行": return "bg13"
          default:
            return "bg11"
        }
      },
    },
    computed: {
      ...mapGetters(["userData"])
    },
    created() {
      findUserBankList().then(data => {
        if (data.success) {
          this.list = data.data;
        } else {
          toast(data.message)
        }
      }).catch(err => {
        toast("银行卡加载失败");
      })
    },
    components:{
      addBank
    }
  }
</script>
<style lang="scss">

  .wrapcards {
    overflow: hidden;
    width: 100%;
    margin: 0 auto 40px;
    padding-bottom: 40px;
    .box {
      margin: 0 23px 20px;
      height: 188px;
      width: 320px;
      display:inline-block;
      vertical-align: top;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      &.bg1{ background-image: url("./images/01.jpg");}
      &.bg2{ background-image: url("./images/02.jpg");}
      &.bg3{ background-image: url("./images/03.jpg");}
      &.bg4{ background-image: url("./images/04.jpg");}
      &.bg5{ background-image: url("./images/05.jpg");}
      &.bg6{ background-image: url("./images/06.jpg");}
      &.bg7{ background-image: url("./images/07.jpg");}
      &.bg8{ background-image: url("./images/08.jpg");}
      &.bg9{ background-image: url("./images/09.jpg");}
      &.bg10{ background-image: url("./images/10.jpg");}
      &.bg11{ background-image: url("./images/11.jpg");}
      &.bg12{ background-image: url("./images/12.jpg");}
      &.bg13{ background-image: url("./images/13.jpg");}

      background-size: contain;
      &.add{
        border: dashed 2px #13a1ca!important;
        cursor: pointer;
        background: none;
        border-radius: 18px;
        a{
          font-size: 16px;
          margin-top: 75px;
          margin-left: 110px;
          display: block;
          color: #13a1ca;
        }
      }
      h2 {
        margin: 18px auto 20px;
        font-weight: normal;
        color: #FFFFFF;
        font-size: 16px;
        padding: 15px 20px;
        border-bottom: solid 1px #fff;
        display: block;
        font-width: bold;
      }
      .acctnumber, .acctname {
        font-weight: normal;
        color: #fff;
        font-size: 16px;
        margin-left: 18px;
        display: block;
        margin-top: 20px;
      }
    }
  }

</style>
