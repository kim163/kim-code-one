<template>
  <div>
   <div class="notice-banner"></div>

  <div class="content notice-page">
    <div class="content-warp cfx show-notice">
      <div class="notice-left">
          <h2>联系我们</h2>
          <div class="notice-contact-us">
            <a class="online-text" target="_blank" :href="SETTING.live800">在线客服></a>
            <div>邮箱：{{SETTING.email}}</div>
            <!--<div>客服QQ:{{SETTING.qq}}</div>-->
          </div>
          <!--<div class="code">-->
            <!--<img src="~images/no-code.jpg" alt="">-->
            <!--<br><br><br>-->
            <!--<div>官网APP下载</div>-->
          <!--</div>-->
      </div>
      <div class="notice-list">
        <div v-for="(item,i) in data" class="list-item">
          <div class="list-title" @click="showView(item,i)">
            <h3>{{item.title}}
              <span class="list-time">{{item.createtime | Date}}</span>
            </h3>
          </div>
          <transition name="message">
            <div class="" v-show="item.already" :ref="item.id">
              <div class="item-info" v-html="item.content">
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import {getNewAnnouncement} from "api/show";
  import {SETTING} from "@/assets/data"
  export default {
    data() {
      return {
        SETTING,
        data: []  //records
      };
    },
    methods: {
      showView(item, i) {
        if (this.$refs[item.id][0].style.height == "") {
          this.$refs[item.id][0].style.height = this.$refs[item.id][0].css("height");
        }

        this.$nextTick(() => {
          item.already = !item.already;
        });
      }
    },
    created() {
      //加载数据
      getNewAnnouncement().then(res => {
        if (res.success) {
          this.data = res.data.map(item => {
            item.already = false;
            item.content = item.content.replace(/\r\n/g, "<br />").replace(/\n/g, "<br />");
            return item;
          });
        } else {
          toast(data.message);
        }
      })
    },
    components: {}
  }
</script>
<style lang="scss">

  .message-enter-active, .message-leave-active {
    transition: all 1s;
    overflow: hidden;
  }

  .message-enter,
  .message-leave-to {
    height: 0 !important;
  }

  .notice-banner{
    background: url("~images/banner/notice-banner.jpg") center center no-repeat;
    height: 260px;
  }

  .notice-page{
    
  }

  .show-notice{
    padding-top: 20px;
    background: #fff;
    padding: 20px 22px 30px;
    margin-bottom: 74px;
    min-height: 800px;
  }
  .notice-left{
    width: 230px;
    float: left;
    text-align: center;
    h2{
      font-size: 18px;line-height: 30px;
      background: #cbcbcb;
    }
    .notice-contact-us{
      background: #f6f6f6;
      height: 157px;
      overflow: hidden;
      line-height: 41px;
      font-size:16px;
      color: #333;
    }
    .online-text{
      height: 34px;width: 87px;
      line-height: 34px;
      border-radius: 17px;
      background: #ed7e12;
      display:inline-block;
      color: #fff;
      margin-top: 19px;
    }
    .code{
      margin: 63px  0 16px 0;
    font-size: 16px;
    }
  }
  .notice-list {
    padding: 0 20px 20px;
    background: #f6f6f6;
    width:790px;
    float: right;

    .list-item{
      border-bottom: 1px solid #fff;
      cursor: pointer;
    }
    .list-title {
      padding-top: 24px;
      padding-bottom: 11px;
      h3 {
        font-size: 18px;
        white-space: nowrap;
        font-weight: bold;
        .list-time {
          float: right;
          font-weight: lighter;
          color: #999;
        }
      }
    }
    .item-info{
      margin-top: 3px;
      background: #fff;
      padding:40px 20px;
      line-height: 25px;
      font-size: 14px;
    }
  }
</style>
