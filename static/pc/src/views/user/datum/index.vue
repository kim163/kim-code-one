<template>
  <div class="user-conter ">
    <component :is="showWhat"></component>
    <div class="bank-list">
      <p>银行卡资料</p>
      <bank-list></bank-list>
    </div>
  </div>
</template>
<script>
  import vPerfect from './components/perfect.vue'
  import vUpdate from './components/update.vue'
  import bankList from 'components/bank-list'

  export default {
    data() {
      return {};
    },
    computed: {
      showWhat() {
        let name = this.$store.getters.userData.accountName;
        return name!=null&&name!= "" ? vUpdate : vPerfect;
      }
    },
    components: {
      vPerfect, vUpdate, bankList
    }
  };
</script>
<style lang="scss">
  .bank-list {
    border: solid 1px #ccc;
    margin: 20px;
    overflow: hidden;
    p {
      font-size: 16px;
      color: #333;
      padding-left:20px;
      font-weight: 400;
      height:41px;
      line-height: 41px;
    }
  }
</style>
