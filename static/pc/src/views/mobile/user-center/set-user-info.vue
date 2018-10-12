<template>
  <div>
    <mobile-header v-if="!isPc">{{$t('userCenter.completeMaterial')}}</mobile-header>
    <div class="main">
      <div class="info-item">
        <div class="title">昵称:</div>
        <input class="info-input" type="text" v-model="nickName"/>
      </div>
      <div class="info-item">
        <div class="title">真实姓名:</div>
        <span v-if="userData.name != null">{{name}}</span>
        <input v-else class="info-input" type="text"
               v-model="name"
               :readonly="isNeedSyncName"
               @focus="checkName"
               :placeholder="isNeedSyncName ? '请在合作商户网站上设置姓名' : '请输入真实姓名'"/>
      </div>
      <div class="m-top-md">
        <div class="bind-def-btn" @click="setUserInfo">绑定</div>
      </div>
    </div>
  </div>
</template>

<script>
  import MobileHeader from 'components/m-header'
  import {mapGetters} from 'vuex'
  import {
    bindUserInfo
  } from 'api/user-center'
  export default {
    name: "set-user-info",
    data(){
      return{
        nickName:'',
        name:'',
        isNeedSyncName:false
      }
    },
    watch:{
      'userData.name':function(val){
        this.name = val.substring(0,1) + '******'
      }
    },
    computed:{
      ...mapGetters([
        'userData'
      ])
    },
    props:{
      isPc:{
        type:Boolean,
        default:false
      }
    },
    components:{
      MobileHeader
    },
    methods:{
      setUserInfo(){
        if(this.nickName === ''){
          toast('请输入昵称')
          return
        }
        // if(this.name === ''){
        //   toast('请输入真实姓名')
        //   return
        // }
        const data = {
          idCard:'',
          userId: this.userData.userId,
          name: _.isNull(this.userData.name) ? this.name : this.userData.name,
          nickname: this.nickName
        }
        console.log('set user',data)
        bindUserInfo(data).then(res => {
          if(res.code === 10000){
            toast('设置成功')
            this.$store.dispatch('UPDATE_USERDATA')
            if(!this.isPc){
              this.$router.replace({name:'mUserCenter'})
            }
          }else{
            toast(res.message)
          }
        }).catch(err => {
          toast(err)
        })
      },
      checkName(){
        if(this.userData.isNeedSync === 1){
          this.isNeedSyncName = true
          toast('您是合作商户用户，根据合作商户要求，您需要在商户网站上设置完真实姓名重新登录久安，姓名便会自动同步')
        }
      }
    },
    created(){
      this.nickName = this.userData.nickname
      this.name = _.isNull(this.userData.name) ? '' : this.userData.name.substring(0,1) + '******'
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";
  .main{
    padding: r(10);
    background: $white;
    .info-item{
      display: flex;
      justify-content: space-between;
      @include f(16px);
      height: r(50);
      line-height: r(50);
      border-bottom: 1px solid #d1d1d1;
      .info-input{
        flex-grow: 1;
        padding-left: r(15);
        @include f(16px);
      }
    }
    .m-top-md{
      margin-top: r(20);
    }
  }
</style>
