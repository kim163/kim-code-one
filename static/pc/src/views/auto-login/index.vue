<template>
  <div class="main">
    <div v-if="!showTip">
      正在跳转...
    </div>
    <div v-else>
      对不起！您的授权码已经失效，请在商户页刷新再试一下！
    </div>
  </div>
</template>

<script>
  import aesutil from '@/util/aesutil';
  import {$localStorage} from '@/util/storage'
  import {
    login
  } from 'api/show'
  export default {
    name: "index",
    data(){
      return{
        showTip:false,
        token: this.$route.query.token,
        merchantId: this.$route.query.merchantId,
        nodeId: this.$route.query.nodeId,   //定制版需要的参数 nodeId
        mode: this.$route.query.mode, //定制版需要的参数 mode=1, 打开钱包到首页，mode=2 打开快速买币， mode=3 打开快速卖币
        bankURL: this.$route.query.bankURL,  //商户返回地址
        menuStyle: this.$route.query.menuStyle, //定制版皮肤颜色
      }
    },
    created(){
      this.$store.dispatch('LOGIN_OUT', false)
      if(!_.isUndefined(this.bankURL)){
        $localStorage.set('bankURL', JSON.stringify(this.bankURL))
      }
      if(!_.isUndefined(this.menuStyle)){
        const style = JSON.parse(_.b64DecodeUnicode(this.menuStyle))
        $localStorage.set('menuStyle', JSON.stringify(style))
        // const styleText = `.main-bg-color{background-color: ${style.mainColor} !important;}
        //                     .main-color{color:${style.mainColor} !important;}
        //                     .sec-bg-color{background-color: ${style.secColor} !important;}
        //                     .sec-color{color:${style.secColor} !important;}`
        // _.loadCssCode(styleText)
      }
      const request = {
        type:11,
        token: this.token,
        merchantId: this.merchantId
      }
      console.log(request)
      login(request).then(res => {
        if(res.code === 10000){
          $localStorage.set('tokenInfo', JSON.stringify(res.data.tokenVo));
          //$localStorage.set('userData', aesutil.encrypt(JSON.stringify(res.data)));
          this.$store.commit('SET_USERDATA',res.data);
          this.$store.dispatch('CHECK_ONLINE', true);
          this.$store.dispatch('UPDATE_TOKEN_INFO', res.data.tokenVo);
          // if(this.nodeId && this.nodeId > 10000){
          //   this.saveCustomUser(res.data)
          // }
          this.jumpLink(true)
        }else{
          toast(res.message)
          if(this.nodeId && Number(this.nodeId) > 10000){
            this.showTip = true
          }else{
            $localStorage.set('needBind', aesutil.encrypt(JSON.stringify({merchantId: this.$route.query.merchantId})));
            this.$store.dispatch('LOGIN_OUT')
            this.jumpLink(false)
          }
        }
      }).catch(err => {
        toast(err)
        if(this.nodeId && Number(this.nodeId) > 10000){
          this.showTip = true
        }else{
          this.jumpLink(false)
        }
      })
    },
    methods:{
      jumpLink(success){
        const tranAddress = _.isMobile() ? (!_.isUndefined(this.mode) && Number(this.mode) > 1 ? 'mPendingBuy' : 'mIndex') : 'transaction'
        const loginAddress = _.isMobile() ? 'mobileLogin' : 'aindex'
        if(success){
          if(!_.isUndefined(this.mode)){
            this.$router.replace({name:tranAddress,query:{mode: this.mode}})
          }else{
            this.$router.replace({name:tranAddress})
          }
        }else{
          this.$router.replace({name:loginAddress})
        }
      },

      saveCustomUser(data){   //多账号切换   存储该账号必要信息
        const customUserList = $localStorage.get('customUserList')
        const customUserInfo = {
          merchantId: this.merchantId,
          icon: JSON.parse(_.b64DecodeUnicode(this.menuStyle)).icon,
          accessToken: data.tokenVo.accessToken,
          nickname: data.nickname
        }
        let arr = []
        if(!_.isUndefined(customUserList)){
          arr = JSON.parse(aesutil.decrypt(customUserList, true))
        }
        arr.push(customUserInfo)
        $localStorage.set('customUserList', aesutil.encrypt(JSON.stringify(arr), true))
      }

    }
  }
</script>

<style lang="scss" scoped>
  .main{
    position: absolute;
    width: 80%;
    left: 10%;
    text-align: center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>