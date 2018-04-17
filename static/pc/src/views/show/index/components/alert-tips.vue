<template>
  <div class="dialog_wrap dialog_normal " v-show="show">
    <div class="dialog_main">
      <i class="iconfont icon-guanbi iclose" @click="close"></i>
      <div class="dialog_content index_prom">
        <div class="index_prom_content">
          <table>
            <tbody>
            <tr>
              <td>
                <h3 v-html="title" class="dialog_title"></h3>
                <p v-html="conent" class="dialog_des"></p>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="btn_bottom">
        <a href="javascript:void(0)" class="btn btn02">立即享受 &gt;</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {checkConfigSystem} from "api/show"
  import {$localStorage} from "@/util/storage"

  export default {
    data() {
      return {
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
        $localStorage.set("index_alert", true)
      }
    },
    computed: {},
    created() {
      if (!$localStorage.get('index_alert')) {
        checkConfigSystem(this.$data).then(res => {
          if (res.success) {
            var arydata = res.data.split('#');
            this.title = arydata[0];
            this.conent = arydata[1];
            this.show = true;
          }
        }).catch(err => {
        })
      }
    },
    components: {}
  };
</script>
<style lang="scss">
  .dialog_wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 99;
    text-align: center;
    .dialog_main {
      width: 90%;
      display: inline-block;
      margin-top: 10%;
      width: 500px;
      border-radius: 15px;
      background-size: 100% 100%;
      background-color: #fff;
      color: #000;
      position: relative;
      .iclose {
        position: absolute;
        right: 20px;
        top: 10px;
        font-size: 30px;
        color: #ccc;
        cursor: pointer;
      }
      .dialog_content {
        .dialog_title {
          text-align: center;
          font-size: 1.4em;
          line-height: 2em;
        }
        .dialog_des {
          padding: 1em;
          line-height: 1.3;
          max-height: 400px;
          overflow-x: hidden;
          oveflow-y: scroll;
        }
      }
    }
    .btn_bottom {
      text-align: center;
      .btn {
        display: inline-block;
        padding: 5px 10px;
        color: #fff;
        margin: 10px 0;
        border-radius: 0.3em;
      }
    }
  }
</style>
