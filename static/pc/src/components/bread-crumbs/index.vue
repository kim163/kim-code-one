<template>
  <div class="section tranhome-nav">
    <div class="container">
      <div class="row">
        <router-link v-if="breadList.length > 0" v-for="(item,index) in breadList"
                     :to="{item:urlName}"
                     :class="{active: index === breadList.length - 1}">
          {{item.name}}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    methods: {},
    created() {
    },
    mounted() {
    },
    activated() {
    },
    components: {
    },
    props:{
      breadList:{
        type: Object,
        default:{}
      },
    }
  };
</script>
<style lang="scss">
.tranhome-nav{
  height: 56px;
  line-height: 56px;
  min-height: auto;
  border-bottom: 1px solid #D4D4D4;
  a{
    font-size: 16px;
    color: #333333;
    &.active, &:hover{
      color: #5087ff;
    }
  }
}

</style>
