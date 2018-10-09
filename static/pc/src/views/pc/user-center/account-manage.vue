<template>
  <div class="acc-main">
    <div class="account-list">
      <div class="list-info" v-for="(item,index) in userList" :key="index">
        <div class="left">
          <div class="info-btn switch" v-if="userId === item.userId">主账户</div>
          <div class="switch-del" v-else>
            <div class="info-btn switch" @click="switchAccount(item)">切换账户</div>
            <div class="info-btn del" @click="delAccountConfirm(item)">解除账户</div>
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
          <div class="right-btn pink" @click="toTransfer(item,1)">UET转出</div>
          <div class="right-btn blue" @click="toTransfer(item,2)">UET转入</div>
          <div class="right-btn light-blue" @click="qrcodeDetail(item.address)">收款码</div>
        </div>
      </div>
    </div>
    <div class="add-account" @click="showAddUser = true">
      <span class="add-icon"></span>
      添加关联账户
    </div>
    <!--关联账户-->
    <cus-login v-if="showAddUser" v-model="showAddUser" :is-add="true" @addSuccess="getUserList"></cus-login>
    <!--展示账户二维码-->
    <qrcode-dialog v-if="showQrcode" v-model="showQrcode" :address="qrcodeAddress"></qrcode-dialog>
    <!--删除用户提示框-->
    <confirm v-model="deleteConfrim" :is-pc="true">
      <div slot="content">您确定要解除{{delUserName}}账户吗？</div>
      <div class="blue-btn" slot="rightBtn" @click="delAccount">确认</div>
    </confirm>
    <!--账户转账-->
    <transfer-dialog v-if="showTran"
                     v-model="showTran"
                     :is-out="isTranOut"
                     :show-manual="showManual"
                     :data="tranData"
                     :user-list="otherUserList"
                     @tranSuccess="getUserList"></transfer-dialog>
  </div>
</template>

<script>
  import {
    getCenterInfo,
    deleteCenter
  } from 'api/user-center'
  import {
    login
  } from 'api/show'
  import Clipboard from 'clipboard';
  import AnimatedInteger from 'components/animated-integer'
  import CusLogin from 'components/auth/login/customize-login'
  import QrcodeDialog from 'components/qrcode-dialog'
  import Confirm from 'components/confirm'
  import {$localStorage} from '@/util/storage'
  import TransferDialog from './transfer-dialog'
  export default {
    name: "account-man",
    data(){
      return{
        userList:[],
        showAddUser:false,
        showQrcode:false,
        qrcodeAddress:'',
        deleteConfrim:false,
        delUserId:'',
        delUserName:'',
        showTran:false,
        isTranOut:false,
        showManual:false,
        tranData: null,
        otherUserList:[],
      }
    },
    computed:{
      ...mapGetters([
        "userId",
        "centerId",
      ])
    },
    watch:{
      showQrcode(val){
        if(!val){
          this.qrcodeAddress = ''
        }
      },
      deleteConfrim(val){
        if(!val){
          this.delUserId = ''
          this.delUserName = ''
        }
      }
    },
    components:{
      AnimatedInteger,
      CusLogin,
      QrcodeDialog,
      Confirm,
      TransferDialog
    },
    methods:{
      getUserList(){
        getCenterInfo({}).then(res => {
          if(res.code === 10000){
            this.userList = [...res.data]
            this.$store.commit('GET_CENTERID',res.data[0].centerId)
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
      qrcodeDetail(val){ //展示收款二维码
        this.qrcodeAddress = 'UET,' + val
        this.showQrcode = true
      },
      delAccountConfirm(item){
        this.delUserId = item.userId
        this.delUserName = item.name
        this.deleteConfrim = true
      },
      delAccount(){ //删除账户
        deleteCenter({userId:this.delUserId}).then(res => {
          if(res.code === 10000){
            toast(`解除${this.delUserName}账户成功`)
            this.deleteConfrim = false
            this.getUserList()
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      switchAccount(item){ //切换账户
        const data = {
          type:11,
          token: item.token,
          merchantId: item.merchantId
        }
        login(data).then(res => {
          if(res.code === 10000){
            $localStorage.set('tokenInfo', JSON.stringify(res.data.tokenVo));
            this.$store.commit('SET_USERDATA',res.data);
            this.$store.dispatch('CHECK_ONLINE', true);
            this.$store.dispatch('UPDATE_TOKEN_INFO', res.data.tokenVo);
            this.$store.dispatch("GET_BANKCARD");
            this.$store.dispatch('GET_USERBALANCE')
            _.initRongyun()
            toast('切换用户成功')
            this.$router.push({name:'walletCenter'})
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      toTransfer(data,type){ //type 1转出 2转入
        this.tranData = data
        this.isTranOut = type === 2 ? false : true
        this.showManual = type === 2 ? false : data.userId === this.userId
        this.otherUserList = this.userList.filter(item => {
          return item.userId != data.userId
        })
        if(type === 1){
          this.showTran = true
        }else{
          if(this.otherUserList.length > 0){
            this.showTran = true
          }else{
            toast('您尚未关联其他账户，无法进行账户内转账')
          }
        }
      }
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
      margin-bottom: 30px;
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
        justify-content: space-between;
        width: 530px;
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
    .add-account{
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: #FFFFFF;
      border: 1px dashed #D3D3D3;
      margin-top: 30px;
      cursor: pointer;
      font-size: 18px;
      color: #333333;
      display: flex;
      justify-content: center;
      align-items: center;
      .add-icon{
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url("~images/add-account.png") no-repeat;
        background-size: 100% 100%;
        margin-right: 10px;
        transition: all .5s;
      }
      &:hover{
        .add-icon{
          transform: rotate(180deg);
        }
      }
    }
    .blue-btn{
      background-color: #5087ff;
      color: #ffffff;
    }
  }
</style>