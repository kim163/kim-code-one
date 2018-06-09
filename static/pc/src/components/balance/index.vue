<template>
  <span>
       {{balance}} {{assetCode}}
  </span>
</template>
<script>
  import {transaction} from 'api'
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        balance:'0',
        assetCode:''
      }
    },
    computed: {
      ...mapGetters(["userId", "islogin", "userData"]),
    },
    watch: {
      islogin(newParam, oldParam) {
        this.getBalance()
      }
    },
    methods: {
      getBalance(order){
          let userId = this.userId;
          const userData = this.userData
          this.assetCode = userData.accountChainVos[0].assetCode
          this.request = {
            userId: userId,
            assetCode: this.assetCode,
            address: userData.accountChainVos[0].address,
          }
          transaction.getRealBalance(this.request).then(res => {
            console.log(res)
            if(res.code == '10000'){
              this.balance=res.data.key;
              // this.assetCode=res.data[0].assetCode;
              this.$emit('getBalance',this.balance)
            }else{
              this.balance='刷新后再试';
            }

          }).catch(error => {
            toast(error.message);
          });
        }

    },
    created() {
      if (this.islogin) {
        this.getBalance()
      }
      Vue.$global.bus.$on('update:balance', () => {
        this.getBalance()
      })
    },
    mounted() {

    },
    components: {
    }
  };
</script>

<style scoped lang="scss" >

</style>
































