<template>
  <div>
    <mobile-header>绑定{{typeName}}</mobile-header>
    <div class="title-tip" v-if="type != 3">{{typeName}}认证姓名，务必与真实姓名相同</div>
    <div class="card-main">
      <div class="p-def" v-if="type === 3">
        <div class="card-item">
          <label class="title">银行卡号:</label>
          <input class="card-input" type="text" v-model.trim="account"/>
        </div>
        <div class="card-item">
          <label class="title">开户行:</label>
          <input class="card-input" type="text" v-model.trim="bank" @mouseover="getBankName"/>
        </div>
        <div class="card-item">
          <label class="title">持卡人姓名:</label>
          <input class="card-input" type="text" v-model.trim="name"/>
        </div>
      </div>
      <div v-else>
        <div class="add-qrcode">
          <upload-img :upload-img-set="upLoadCfg" @gitPicUrl="getQrcodeUrl"></upload-img>
        </div>
        <div class="card-item p-LR-sm">
          <label class="title qr-title">{{typeName}}账号:</label>
          <input class="card-input" type="text" v-model.trim="account"/>
        </div>
        <div class="card-item p-LR-sm">
          <label class="title qr-title">{{typeName}}认证姓名:</label>
          <input class="card-input" type="text" v-model.trim="name"/>
        </div>
      </div>
      <div class="p-def">
        <div class="bind-def-btn" @click="bindCard">绑定</div>
      </div>
    </div>

  </div>
</template>

<script>
  import MobileHeader from 'components/m-header'
  import {mapGetters} from 'vuex'
  import UploadImg from 'components/upload-img'
  import {
    autoRecognize,
    bindBankV2
  } from 'api/user-center'
  export default {
    name: "bind-card",
    data(){
      return{
        account:'',
        bank:'',
        name:'',
        type:1,  // 绑定类型  1支付宝 2微信 3银行卡
        typeName:'',
        upLoadCfg:{
          maxUploadNum:1,
          uploadImgTips:'点击上传您的收款二维码',
          isShowUploadTip:true
        },
        qrCodeUrl:'',
      }
    },
    components:{
      MobileHeader,
      UploadImg,
    },
    computed:{
      ...mapGetters([
        'userData'
      ])
    },
    methods:{
      getQrcodeUrl(url){
        this.qrCodeUrl = url[0]
      },
      bindCard(){
        if(this.account === ''){
          const txt = this.type === 3 ? '请输入银行卡号' : `请输入${this.typeName}账号`
          toast(txt)
          return false
        }
        if(this.type === 3 && this.bank === ''){
          toast('请输入银行名称')
          return false
        }
        if(this.name === ''){
          const txt = this.type === 3 ? '请输入持卡人姓名' : `请输入${this.typeName}认证姓名`
          toast(txt)
          return false
        }
        if(this.type != 3 && this.qrCodeUrl === ''){
          toast('请点击上传您的收款二维码')
          return false
        }
        const data = {
          userId: this.userData.userId,
          account: this.account,
          type: this.type
        }

        console.log('bind Card',data)
        bindBankV2(data).then(res => {
          if(res.code === 10000){
            toast('绑定成功')
            this.$router.push({name:'mCardList'})
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      getBankName(){
        const data = {
          bankNo:this.account
        }
        autoRecognize(data).then(res => {
          console.log(res)
          if(res.code === 10000){
            if(res.data && !_.isEmpty(res.data)){
              this.bank = res.data.bankName
            }else{
              toast('您输入的银行卡号不能识别，请重新输入')
            }
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      }
    },
    created(){
      this.name = this.userData.name
      this.type = Number(this.$route.params.id)
      this.typeName = this.type === 1 ? '支付宝' : (this.type === 2 ? '微信' : '银行卡')
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";
  .title-tip{
    height: r(40);
    line-height: r(40);
    @include f(16px);
    color: #8f8f8f;
    border-bottom: 1px solid #dfdfdf;
    padding-left: r(10);
  }
  .card-main{
    background: #FFFFFF;
    .p-def{
      padding: r(10);
    }
    .card-item{
      width: 100%;
      @include f(18px);
      border-bottom: 1px solid #dfdfdf;
      height: r(50);
      line-height: r(50);
      display: flex;
      .card-input{
        /*flex-grow: 1;*/
        padding-left: r(15);
        @include f(18px);
        border: none;
      }
      .qr-title{
        /*flex-grow: 1;*/
      }
      &.p-LR-sm{
        padding: 0 r(20);
      }
    }
    .bind-def-btn{
      margin-top: r(20);
    }
    .add-qrcode{
      padding: r(20);
      text-align: center;
      border-bottom: 1px solid #dfdfdf;
      .add-icon{
        width: 50%;
        height: 50%;
        background: url('~images/add-qrcode.png') no-repeat;
      }
    }
  }

</style>