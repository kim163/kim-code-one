<template>
  <div class="appeal-container">
     <div class="appeal-title">

     </div>
     <div class="appeal-content">
        <div class="content-title">
            <span v-for="list in titleArr" class="title-list">{{list}}</span>
        </div>
        <div class="content-item">

        </div>
     </div>
  </div>
</template>

<script>
  import  {} from 'api'
  export default {
    name: "appeal-record",
    data(){
      return{
        titleArr:['订单类型','对方','交易数量','交易单价','交易金额','状态','操作']
      }
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
