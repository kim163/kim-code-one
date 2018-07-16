<template>
  <div>
    <mobile-header>完善资料</mobile-header>
    <div class="main">
      <div class="info-item">
        <div class="title">昵称:</div>
        <input class="info-input" type="text" v-model="nickName"/>
      </div>
      <div class="info-item">
        <div class="title">真实姓名:</div>
        <span v-if="name != ''">{{name}}</span>
        <input v-else class="info-input" type="text" v-model="name" placeholder="请输入真实姓名"/>
      </div>
    </div>
    <div class="p-def">
      <div class="bind-def-btn" @click="setUserInfo">绑定</div>
    </div>
  </div>
</template>

<script>
  import MobileHeader from 'components/m-header'
  import {mapGetters} from 'vuex'
  export default {
    name: "set-user-info",
    data(){
      return{
        nickName:'',
        name:''
      }
    },
    computed:{
      ...mapGetters([
        'userData'
      ])
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
        if(this.name === ''){
          toast('请输入真实姓名')
          return
        }
      }
    },
    created(){
      this.nickName = this.userData.nickname
      this.name = _.isNull(this.userData.name) ? '' : this.userData.name
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";
  .main{
    padding: r(10);
    .info-item{
      display: flex;
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
  }
</style>