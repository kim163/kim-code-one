<template>
  <p class="bind-card-part">
     <select class="my-input" v-model="selBankCard">
         <option value="">{{$t(setBankcard.pleaseSelTitle)}}</option>
         <option v-for="item in bankList.data||[]" :value="item">
            <span  v-if="item.type === 1">支付宝 {{item.account}}</span>
            <span  v-else-if="item.type === 2">微信 {{item.account}}</span>
            <span  v-else-if="item.type === 3">{{item.bank}} {{subData(item.account)}}</span>
            <span  v-else>{{$t(item.account)}}</span>
         </option>
     </select>

     <span class="nocard-tips cl-sky-blue" v-if="noCardTips">
        没绑卡?去<router-link :to="userCenterLink()" class="link-item cl-red">{{$t('navbar.userCenter')}}</router-link>绑定
     </span>
  </p>
</template>
<script>
  import { show } from 'api'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        selBankCard:'',
        bankList: {
          data: []
        },
        requestdata:{},
        noCardTips:false
      };
    },
    props: {
      setBankcard: {
        type: Object,
        default() {
          return {
            pleaseSelTitle:'component.pleaseSelCard',    // 请选择标题文字
            addOption:[]                  // 添加的选项
          }
        }
      },
      reset:{
        type:Boolean,
        default:false
      }
    },
    model:{
      prop: 'reset',
      event: 'change'
    },
    watch: {
      "selBankCard"(val){
        this.$emit("selCardChange", val);
      },
      reset(val){
        if(val){
          this.selBankCard = '';
          this.$emit("selCardChange", this.selBankCard);
          this.$emit('change',false);
        }
      }
    },
    methods: {
      getBankInfo(){
        this.requestdata={
          userId: this.userId
        }
        show.getBankInfo(this.requestdata).then((res) => {
          this.bankList = res;
          if(this.bankList.data.length<1){
            this.noCardTips = true;
          }
          if(this.setBankcard.addOption.length>0){
            for (let i in this.setBankcard.addOption){
              this.bankList.data.push(this.setBankcard.addOption[i]);
            }
          }
        }).catch(err => {
          toast(err.message);
        })
      },
      subData(item){
        return (item.substring(item.length-4))
      },
      userCenterLink(){
        let routerName = '';
        if(_.isMobile()){
          routerName = 'mUserCenter';
        }else {
          routerName = 'pcUserCenter';
        }
        return {name: routerName};
      }
    },
    computed: {
      ...mapGetters([
        'userId'
      ])
    },
    created() {
      this.getBankInfo();
    },
    components: {}
  };
</script>
<style lang="scss">
  .bind-card-part{
    display: inline-block;
    .nocard-tips{
      a{
        padding: 5px 2px;
        border-bottom: 1px solid #ff1e1e;
      }
    }
  }

</style>
