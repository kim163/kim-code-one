<template>
  <popup>
    <div class="dialog-main">
      <div class="title">
        我的收款二维码
        <i class="iconfont icon-close close" @click="$emit('changeShowQr',false)"></i>
      </div>
      <div class="dialog-content center">
        <vue-qrcode :text="address"
                    v-if="address != ''"
                    :logoSrc="Logo"
                    :logoScale="0.2"
                    :margin="0"
                    :size="188"></vue-qrcode>
      </div>
    </div>
  </popup>
</template>

<script>
  import Popup from 'components/common-popup'
  import VueQrcode from 'vue-qr';
  import Logo from '@/assets/images/logo-blue.png'
  export default {
    name: "qrcode-dialog",
    data(){
      return{
        Logo
      }
    },
    props:{
      address:{
        type:String,
        default:""
      },
      show:{
        type:Boolean,
        default:false
      }
    },
    model:{
      prop:'show',
      event:'changeShowQr'
    },
    components:{
      Popup,
      VueQrcode
    }
  }
</script>

<style lang="scss" scoped>
  .dialog-main{
    width: 500px;
    border-radius: 10px;
    overflow: hidden;
    .title{
      width: 100%;
      height: 50px;
      background-color: #5087ff;
      padding-left: 30px;
      line-height: 50px;
      color: #ffffff;
      .close{
        font-size: 20px;
        color: #ffffff;
        float: right;
        margin-right: 20px;
        cursor: pointer;
      }
    }
    .dialog-content{
      background: #ffffff;
      padding: 20px 0;
    }
  }
</style>