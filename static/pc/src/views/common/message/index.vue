<template>
  <div class="user-conter">
    <div class="user-message">
      <ul>
        <li v-for="(item,i) in data.pageContents"
            :class="['message-item',{active:i==active}]" @click="showView(item,i)">
          <span v-show="!item.read" class="mark"></span>
          <a href="javascript:void(0);">
            <h2>{{item.title}}</h2>
            <div class="date">{{item.createDate}}</div>
          </a>
          <transition name="message">
            <div :ref="item.id" v-show="!!viewList['x-'+item.id]">
              <div class="letter-content">
                <div v-html="viewList[item.id]"></div>
              </div>
            </div>
          </transition>
        </li>
        <li v-show="showLoadding">
          <loadding></loadding>
        </li>
        <li v-show="!data.pageContents||data.pageContents.length==0" style="text-align: center; padding: 30px">
          暂无站内消息
        </li>
      </ul>
      <paging-by :data="data" @search="search"></paging-by>
    </div>
  </div>
</template>
<script>
 // import {getMessageByUser, readMsg} from "api/show";
  import pagingBy from "components/paging-by";
  import loadding from "components/loadding";
  export default {
    data() {
      return {
        active:-1,
        data: {},  //records
        viewList: {},
        showLoadding: true,
        searchData: { //查询条件
          size: "10",  // true string
          pageIndex: "1"//
        }
      };
    },
    methods: {
      showView(item, i) {
        this.active=i;
        item.read=true;
        if (typeof this.viewList["x-" + item.id] == "boolean") {
          this.$set(this.viewList, "x-" + item.id, !this.viewList["x-" + item.id]);
          return;
        }
       /* readMsg({msgID: item.id}).then((data) => {
          this.$set(this.viewList, item.id, data.data.content.replace(/\r\n/g, "<br />").replace(/\n/g, "<br />"));
          this.$nextTick(() => {
            this.$refs[item.id][0].style.height = this.$refs[item.id][0].css("height");
            this.$set(this.viewList, "x-" + item.id, true);
          });
        });*/
      },
      search(index) {
        if(!isNaN(index)) {
          this.searchData.pageIndex = index;
        }
        /*getMessageByUser(this.searchData).then(res => {
          this.showLoadding = false
          if (res.success) {
            this.data = res.data;
          } else {
            toast(res.message);
          }
        })*/
      }
    },
    created() {
      this.search();
    },
    components: {
      pagingBy, loadding
    }
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

  .user-message {
    padding: 20px 10px 20px;
    .message-item {
      cursor: pointer;
      min-height: 60px;
      border-bottom: 1px solid #cccccc;
      margin: 15px 20px 18px;
      overflow: visible;
      position: relative;
      &:hover {
        background: #f8f8f8;
      }
      &.active .letter-content {
        border-top: dashed 1px #ccc;
      }

      .letter-content {
        padding: 16px 10px;
        color: #888;
        line-height: 1.5;
        font-size: 14px;
      }
      .mark {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        display: block;
        background: #f66;
        position: absolute;
        top: 7px;
        left: -10px;
      }
      h2 {
        color: #606060;
        font-size: 14px;
        display: block;
        font-weight: bold;
        line-height: 19px;
      }
      .date {
        font-size: 12px;
        color: #999999;
        display: block;
        line-height: 16px;
        margin: 5px 0 10px;
      }
    }

  }
</style>
