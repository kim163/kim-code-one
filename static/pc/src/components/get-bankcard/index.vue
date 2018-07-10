<template>
     <select class="my-input" v-model="selBankCard">
         <option value="">{{$t(setBankcard.pleaseSelTitle)}}</option>
         <option v-for="item in bankList.data||[]" :value="item">
            <span  v-if="item.type === 1">支付宝 {{item.account}}</span>
            <span  v-else-if="item.type === 2">微信 {{item.account}}</span>
            <span  v-else-if="item.type === 3">{{item.bank}} {{subData(item.account)}}</span>
            <span  v-else>{{$t(item.account)}}</span>
         </option>
     </select>
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
        requestdata:{}
      };
    },
    props: {
      setBankcard: {
        type: Object,
        default() {
          return {
            pleaseSelTitle:'component.pleaseSelCard',
            addOption:[]
          }
        }
      }
    },
    watch: {
      "selBankCard"(val){
        this.$emit("selCardChange", val);
      }
    },
    methods: {
      getBankInfo(){
        this.requestdata={
          userId: this.userId
        }
        show.getBankInfo(this.requestdata).then((res) => {
          this.bankList = res;
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

</style>
