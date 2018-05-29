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
      ...mapGetters(["userId", "islogin"]),
    },
    methods: {
      getBalance(order){
          let userId = this.userId;
          this.request = {
            userId: userId
          }
          transaction.getAccountChainPage(this.request).then(res => {

            if(res.code == '10000'){
              this.balance=res.data[0].balance;
              this.assetCode=res.data[0].assetCode;
            }else{
              this.balance='刷新后再试';
            }

          }).catch(error => {
            this.reset(res.message);
          });
        }

    },
    created() {
      if (this.islogin) {
        this.getBalance()
      }
    },
    mounted() {

    },
    components: {
    }
  };
</script>

<style scoped lang="scss" >

</style>
































