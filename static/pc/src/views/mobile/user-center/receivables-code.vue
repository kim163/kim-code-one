<template>
  <div class="mreceiv-code">
    <mobile-header :mheadSet="mheadSet" @returnBtnEvent="returnBtnEvent">{{$t('userCenter.receivcode')}}</mobile-header>

    <div v-for="(item,i) in userData.accountChainVos" class="mreceiv-code-content">
      <p class="address"> {{item.address}} </p>
      <div class="qrcode">
        <qrcode :text="'UET,'+item.address" v-if="item.address" id="qrcode" :logoSrc="Logo" :logoScale="0.2" :margin="0" :size="150"></qrcode>
      </div>
      <a class="download-qrocode" id="downloadLink" @click="downloadQrocode">下载二维码</a>
      <a href="javascript:void(0);" class="copy-btn mobile-pubtn" :data-clipboard-text="item.address"
         @click="copy" >{{$t('transactionHome.copyBtn')}}</a>
    </div>

  </div>
</template>
<script>
  import MobileHeader from 'components/m-header';
  import { mapGetters} from 'vuex';
  import VueQrcode from 'vue-qr';
  import Logo from '@/assets/images/logo-blue.png';
  import Clipboard from 'clipboard';

  export default {
    data() {
      return {
        Logo,
        mheadSet:{
          returnBtnFun:false,
          returnBtnEvent:'returnBtnEvent'
        }
      };
    },
    props: {},
    methods: {
      copy() {
        var clipboard = new Clipboard('a.copy-btn');
        clipboard.on('success', e => {
          toast('复制成功')
          // 释放内存
          clipboard.destroy()
        });
        clipboard.on('error', e => {
          // 不支持复制
          // 释放内存
          clipboard.destroy()
        });
      },
      returnBtnEvent(){
        this.$emit('closeReceivables',false)
      },
      downloadQrocode(){
        var img = document.getElementById('qrcode').getElementsByTagName('img')[0];
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img,0,0);
        const url = canvas.toDataURL('image/png');
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.setAttribute('href',url);
        downloadLink.setAttribute('download','二维码.png');
      }
    },
    computed: {
      ...mapGetters(["userData"])
    },
    created() {
    },
    components: {
      qrcode: VueQrcode,
      MobileHeader
    }
  };
</script>
<style lang="scss">
  @import "~assets/scss/mobile";
.mreceiv-code{
  padding-bottom: r($footer-hg+20);
  width: 100%;
  background-color: #fff;
}

.mreceiv-code-content{
  background: #FFFFFF;
  text-align: center;
  padding: r(32) r(20) r(60);

  .address{
    @include  f(16px);
    color:$font-color;
    line-height: r(22);
    word-wrap:break-word;
    margin-bottom: r(31);
  }
  .qrcode{
    width: r(180);
    height: r(180);
    overflow: hidden;
    margin: r(0) auto r(10);

  }
  .download-qrocode{
    display: inline-block;
    margin-bottom: r(20);
    margin-top: r(10);
  }
}
</style>
