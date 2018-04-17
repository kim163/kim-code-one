<template>
  <div class="down-page">
    <div class="content app-download">
      <div class="content-warp">
        <div class="tab-ment">
					<!--<span>-->
						<!--手机APP-->
					<!--</span>-->
          <span v-for="item in data" :class="{active:cur==item}" @click="cur=item">
            {{item}}
          </span>
        </div>
        <div class="content-info" v-show="cur=='乐娱客户端'">
          <div>
            <h3 class="i2">手机客户端</h3>
            <p>
              下载方法【1】
            </p>
            <p>
              使用手机二维码扫描软件扫码下载
            </p>
            <img width="140" ref="imgs" v-lazy="SETTING.appQr">

            <p>
              下载方法【2】
            </p>
            <p>
              手机任意浏览器输入网址
            </p>
            <a class="url">{{SETTING.app}}</a>
          </div>
        </div>
        <div class="content-info" v-show="cur=='DT客户端'">
          <div>
            <h3 class="i1">苹果IOS</h3>
            <p>
              下载方法【1】
            </p>
            <p>
              使用手机二维码扫描软件扫码下载（请不要微信扫描哦）
            </p>
            <img width="140" v-lazy="generateQRCode(SETTING.dtIos,140)">
            <p>
              下载方法【2】
            </p>
            <p>
              手机任意浏览器输入网址
            </p>
            <a class="url">{{SETTING.dtIos}}</a>
          </div>
          <div>
            <h3 class="i2">Android</h3>
            <p>
              下载方法【1】
            </p>
            <p>
              使用手机二维码扫描软件扫码下载（请不要微信扫描哦）
            </p>
            <img width="140"  v-lazy="generateQRCode(SETTING.dtAndroid,140)">
            <p>
              下载方法【2】
            </p>
            <p>
              手机任意浏览器输入网址
            </p>
            <a class="url">{{SETTING.dtAndroid}} </a>
          </div>
        </div>
        <div class="content-info" v-show="cur=='PT客户端'">
          <div>
            <h3 class="i2">Android</h3>
            <p>
              下载方法【1】
            </p>
            <p>
              使用手机二维码扫描软件扫码下载（请不要微信扫描哦）
            </p>
            <img width="140" ref="imgs" v-lazy="generateQRCode(SETTING.ptMobile,140)">

            <p>
              下载方法【2】
            </p>
            <p>
              手机任意浏览器输入网址
            </p>
            <a class="url">{{SETTING.ptMobile}}</a>
          </div>
          <div class="hauto">
            <h3 class="i3">电脑客户端</h3>
            <p>
              下载地址
            </p>
            <a target="_blank" :href="SETTING.ptpc">点击下载</a>
            <p>
              温馨提示：PT电脑客户端登录需在账号前加大写字母“HU”。
            </p>
            <p>
              例如：乐娱国际账号leyu登录PT电脑客户端需输入“HULEYU“
            </p>
          </div>
        </div>
        <div class="content-info" v-show="cur=='EBET客户端'">
          <div>
            <h3 class="i2">手机客户端</h3>
            <p>
              下载方法【1】
            </p>
            <p>
              使用手机二维码扫描软件扫码下载（请不要微信扫描哦）
            </p>
            <img width="140" ref="imgs" v-lazy="generateQRCode(SETTING.ebetMobile,140)">

            <p>
              下载方法【2】
            </p>
            <p>
              手机任意浏览器输入网址
            </p>
            <a class="url">{{SETTING.ebetMobile}}</a>
          </div>
        </div>
        <div class="content-info" v-show="cur=='AG客户端'">
          <div>
            <h3 class="i2">手机客户端</h3>
            <p>
              下载方法【1】
            </p>
            <p>
              使用手机二维码扫描软件扫码下载（请不要微信扫描哦）
            </p>
            <img width="140" ref="imgs" v-lazy="generateQRCode(SETTING.agMobile,140)">

            <p>
              下载方法【2】
            </p>
            <p>
              手机任意浏览器输入网址
            </p>
            <a class="url">{{SETTING.agMobile}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import  {generateQRCode} from "api/show"
  import  {SETTING} from "@/assets/data"
  export default {
    name: "",
    data() {
      return {
        SETTING,
        cur:"乐娱客户端",
        data:['乐娱客户端','PT客户端','DT客户端',"EBET客户端",'AG客户端']
      }
    },
    props: {},
    computed: {},
    watch: {},
    methods: {
      generateQRCode(url,size){
        return   generateQRCode(url,size)
      }
    },
    created() {
      this.generateQRCode("text")
    },
    activated() {
    },
    components: {}
  }
</script>
<style lang="scss" spcoed>
  .down-page{background:url(~images/banner/phone-banner.jpg) top center no-repeat; padding-top: 257px; }
  .content {
    padding-bottom: 75px;
    .content-warp {
      width: 1140px;
      margin: 0 auto;
      background: url(~images/download/bg.jpg) no-repeat #fff;
      box-shadow: 0px 2px 4px #dde2e7;
      min-height: 948px;

      .hauto {
        height: auto !important;
      }
      .banner2 {
        position: relative;
        margin: 0 auto;
        max-width: 1920px;
        overflow: hidden;
      }
      .banner2 img {
        position: relative;
        display: block;
        width: 1920px;
        margin-left: -960px;
        left: 50%;
      }
      .tab-ment {
        padding: 50px 0 20px;
        margin: 0 50px;
        border-bottom: 1px solid #e6e6e6;
        text-align: center;
        span {
          display: inline-block;
          height: 32px;
          line-height: 32px;
          text-align: center;
          padding: 0 26px;
          border-radius: 16px;
          background: #d7d7d7;
          color: #333333;
          margin: 0 10px;
          margin-bottom: 10px;
          font-size: 16px;
          cursor: pointer;
          &.active {
            background: #ed7e12;
            color: #fff;
            i {
              background-position: center -24px !important;
            }
            i.i5 {
              background-position: center -25px !important;
            }
          }
        }
      }
      .content-info {
        overflow: hidden;
        margin: 0 18px;
        padding: 60px 134px;
        background: none;
        padding-right: 0;
        div {
          width: 480px;
          float: left;
          font-size: 14px;
          color: #666666;
          height: 480px;
          h3 {
            padding-left: 40px;
            line-height: 40px;
            font-size: 16px;
            color: #333333;
            font-weight: bold;
            margin-bottom: 15px;
            &.i1 {
              background: url(~images/download/01.png) no-repeat left top;
              line-height: 45px;
            }
            &.i2 {
              background: url(~images/download/02.png) no-repeat left top;
            }
            &.i3 {
              background: url(~images/download/03.png) no-repeat left top;
            }
          }
          p {
            margin-bottom: 20px;
          }
          img {
            box-shadow: 0px 2px 4px #dde2e7;
            margin-bottom: 20px;
          }
          input,.url {
            width: 390px;
            height: 30px;
            box-sizing: border-box;
            padding-left: 20px;
            color: #333333;
            font-weight: bold;
            font-size: 16px;
            background: #e0e0e0;
            border-radius: 15px;
            margin-top: 10px;
          }
          a {
            display: inline-block;
            padding: 7px 30px;
            color: #fff;
            background: #ed7e12;
            border-radius: 30px;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 20px;
          }
        }
      }
    }
  }
</style>
