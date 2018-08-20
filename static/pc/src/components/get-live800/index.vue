<template>
  <a class="item-href live-800" target="_blank" :href="live800Url">
    <i class="iconfont icon-online-service"></i>{{$t('navbar.onlineService')}}
  </a>
</template>
<script>
  import { show } from 'api';

  export default {
    data() {
      return {
        live800Url: ''
      };
    },
    props: {},
    methods: {
      getLive800Url(){
        show.getLive800Url({}).then(res => {
          if (res.code == 10000) {
            this.live800Url = res.data.url;
          }else{
            toast(res.message);
          }
        }).catch(err => {
          toast(err.message);
        })
      }
    },
    computed: {},
    created() {
      this.getLive800Url();
    },
    components: {}
  };
</script>
<style lang="scss">

</style>
