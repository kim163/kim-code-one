<template>
  <div>
    <mobile-header>{{title}}</mobile-header>
    <div class="card-main">
      <div class="card-item">
        <label class="title">银行卡号:</label>
        <input class="card-input" type="text" v-model.trim="account"/>
      </div>
      <div class="card-item">
        <label class="title">开户行:</label>
        <input class="card-input" type="text" v-model.trim="bank"/>
      </div>
      <div class="card-item">
        <label class="title">持卡人姓名:</label>
        <input class="card-input" type="text" v-model.trim="name"/>
      </div>
      <div class="bind-def-btn" @click="bindCard">绑定</div>
    </div>
  </div>
</template>

<script>
  import MobileHeader from 'components/m-header'
  import {mapGetters} from 'vuex'
  export default {
    name: "bind-card",
    data(){
      return{
        title:'绑定银行卡',
        account:'',
        bank:'',
        name:'',
      }
    },
    components:{
      MobileHeader,
    },
    computed:{
      ...mapGetters([
        'userData'
      ])
    },
    methods:{
      bindCard(){
        if(this.account === ''){
          toast('请输入银行卡号')
          return false
        }
        if(this.name === ''){
          toast('请输入持卡人姓名')
          return false
        }

      }
    },
    created(){
      this.name = this.userData.name
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mobile";
  .card-main{
    padding: r(10);
    background: #FFFFFF;
    .card-item{
      width: 100%;
      @include f(18px);
      border-bottom: 1px solid #dfdfdf;
      height: r(50);
      line-height: r(50);
      display: flex;
      .card-input{
        flex-grow: 1;
        padding-left: r(15);
        @include f(18px);
        border: none;
      }
    }
    .bind-def-btn{
      margin-top: r(20);
    }
  }

</style>