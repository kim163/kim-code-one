<template>
  <span class="pubeyes iconfont icon-yanjing" @click="checkpwd">
  </span>
</template>
<script>
    export default {
        name: "",
        data() {
            return {}
        },
        props:["dom"],
        computed: {},
        watch: {},
        methods: {
          checkpwd(e){
            e.currentTarget.classToggle("icon-yanjing icon-yanjing1")
            let dom= e.currentTarget.previousElementSibling;
            if(['text','password'].indexOf(dom.type)>-1){
              dom.type=dom.type=='password'?"text":"password";
            }else{
              dom=e.currentTarget.nextElementSibling;
              if(['text','password'].indexOf(dom.type)>-1){
                dom.type=dom.type=='password'?"text":"password";
              }
            }
          },
        },
        created() {
        },
        activated() {
        },
        components: {}
    }
</script>
<style spcoed>
  span.pubeyes {
    position: absolute;
    top: 0;
    right: 5%;
    font-size: 24px;
    cursor: pointer;
    height: 100% !important;
    color: #f66;
  }
</style>
