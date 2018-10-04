<template>
  <div class="acc-main">
    <div class="account-list">
      <div class="list-info" v-for="(item,index) in userList" :key="index">
        <div class="left">
          <div class="info-btn switch" v-if="userId === item.userId">主账户</div>
          <div class="switch-del" v-else>
            <div class="info-btn switch" @click="">切换账户</div>
            <div class="info-btn del" @click="">解除账户</div>
          </div>
          <div class="flex">
            <div class="info">
              <div class="info-detail">{{item.name}}</div>
              <div class="info-detail">
                账户余额：
                <span class="cl-red">
              <animated-integer :value="item.amount"></animated-integer>{{item.assetCode}}
            </span>
              </div>
              <div class="info-detail">
                {{item.address}}
              </div>
            </div>
            <div class="copy-btn-next copy-btn" :data-clipboard-text="item.address"
                 @click="copy">复制</div>
          </div>
        </div>
        <div class="right">
          <div class="right-btn pink" @click="">UET转出</div>
          <div class="right-btn blue" @click="">UET转入</div>
          <div class="right-btn light-blue" @click="">收款码</div>
        </div>
      </div>
    </div>
    <div class="add-account">
      <span class="add-icon"></span>
      添加关联账户
    </div>
  </div>
</template>

<script>
  import {
    getCenterInfo
  } from 'api/user-center'
  import Clipboard from 'clipboard';
  import AnimatedInteger from 'components/animated-integer'
  export default {
    name: "account-man",
    data(){
      return{
        userList:[],
      }
    },
    computed:{
      ...mapGetters([
        "userId",
        "centerId",
      ])
    },
    components:{
      AnimatedInteger
    },
    methods:{
      getUserList(){
        getCenterInfo({}).then(res => {
          console.log(res)
          if(res.code === 10000){
            this.userList = [...res.data]
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      copy() {
        var clipboard = new Clipboard('.copy-btn')
        clipboard.on('success', e => {
          toast('复制成功')
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          // 释放内存
          clipboard.destroy()
        })
      },
    },
    mounted(){
      this.getUserList()
    }
  }
</script>

<style lang="scss" scoped>
  .acc-main{
    padding: 31px;
    .list-info{
      width: 100%;
      height: 182px;
      background: #FFFFFF;
      border: 1px solid #D3D3D3;
      padding: 21px;
      display: flex;
      justify-content: space-between;
      .info-btn{
        width: 120px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #ffffff;
        cursor: pointer;
        font-size: 16px;
        margin-bottom: 20px;
        &.switch{
          background: #86A5F8;
        }
        &.del{
          background: #F68887;
          margin-left: 20px;
        }
      }
      .switch-del{
        display: flex;
      }
      .flex{
        display: flex;
        align-items: flex-end;
      }
      .info-detail{
        font-size: 16px;
        line-height: 16px;
        color: #333333;
        margin-bottom: 10px;
      }
      .copy-btn{
        display: inline-block;
        width: 63px;
        height: 30px;
        border: 1px solid #86A5F8;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        color: #86A5F8;
        text-align: center;
        line-height: 30px;
        margin-left: 20px;
        margin-bottom: 5px;
      }
      .right-btn{
        width: 160px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #ffffff;
        font-size: 16px;
        cursor: pointer;
        margin-bottom: 10px;
        &.pink{
          background: #F68887;
        }
        &.blue{
          background: #3573FA;
        }
        &.light-blue{
          background: #86A5F8;
        }
      }
    }
  }
</style>