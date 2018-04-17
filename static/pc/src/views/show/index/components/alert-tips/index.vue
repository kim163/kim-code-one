<template>
  <div class="alert-tips" v-show="show">
    <div class="alert-tips-content">
      <i class="iconfont icon-guanbi iclose" @click="close"></i>
      <div class="content-info">
        <div class="title">{{title}}</div>
        <div class="conent" v-html="conent"></div>
      </div>
      <div class="de-code">
         <span>乐娱国际APP下载二维码：</span>
         <img width="140" ref="imgs" v-lazy="SETTING.appQr">
      </div>
    </div>
  </div>
</template>
<script>
  import {checkConfigSystem} from "api/show"
  import {$localStorage,$sessionStorage} from "@/util/storage"
  import {SETTING} from "@/assets/data"

  export default {
    data() {
      return {
        SETTING,
        myData: {
          itemNo: "type002", //true string
          typeNo: "001",
        },
        title: "",
        conent: "",
        show: false
      };
    },
    watch: {},
    props: {},
    activated() {

    },
    methods: {
      close(){
        this.show=false;
        $sessionStorage.set("index_alert", true)
      }
    },
    computed: {},
    created() {
     /* if(!$sessionStorage.get('index_alert')) {*/
        checkConfigSystem(this.$data).then(res => {
          if (res.success) {
            var arydata = res.data.split('#');
            this.title = arydata[0];
            this.conent = arydata[1];
            this.show = true;
          }
        }).catch(err => {
        })
     /* } */
    },
    components: {}
  };
</script>
<style lang="scss">
  .alert-tips{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 200;
    text-align: center;
    .alert-tips-content{
      background: url("./bg.png");
      width: 836px;
      height: 628px;
      display: inline-block;
      margin-top: 10%;
      border-radius: 15px;
      background-size: 100% 100%;
      color: #000;
      padding: 88px 264px 120px 30px;
      position: relative;
      .iclose {
        position: absolute;
        right:76px;
        top: 18px;
        font-size:50px;
        color: #fff;
        cursor: pointer;
        background-color: #0e1a95;
        border-radius: 50%;
      }
      .content-info{
        height: 425px;
        overflow-y: auto;
        .title {
          text-align: center;
          font-size: 24px;
          color: #333333;
          white-space: nowrap;
          padding-left: 180px;
          padding-right: 46px;
          line-height: 46px;
        }
        .conent{
          font-size: 18px;
          color:#333333;
          line-height: 28px;
          overflow-x: hidden;
          text-align: left;
          padding: 0 0 5px 0;
        }
      }
      .de-code {
        position: absolute;
        bottom: 120px;
        left: 30px;
        width: 521px;
        height: 140px;
        text-align: left;
        span{
          color: #f00;
          font-size: 18px;
        }
      }
    }
  }
</style>
