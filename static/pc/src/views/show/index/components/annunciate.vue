<template>
  <div class="tips-circular">
    <div class="content-warp">
      <marquee style="vertical-align: middle;">
        <router-link v-for="item in myData" :key="item.id" :to="{name:'notice'}">
          {{item.title}}&nbsp;[{{item.createtime|Date}}]&nbsp;&nbsp;&nbsp;
        </router-link>
      </marquee>
    </div>
  </div>
</template>
<script>
  import  {getNewAnnouncement} from 'api/show';
  export default {
    name: "",
    data() {
      return {
        myData:[]
      }
    },
    props: {},
    computed: {},
    watch: {},
    methods: {},
    created() {
      getNewAnnouncement().then(res=>{
        res.success&&(this.myData=res.data);
      })
    },
    activated() {
    },
    components: {}
  }
</script>
<style spcoed lang="scss">
  .tips-circular {
    height: 45px;
    background: #030c33;
    color: #fff;
    line-height: 45px;
    .content-warp {
      background: url(~images/base/icon1.png) no-repeat 80px center;
      padding-left: 132px;
      box-sizing: border-box;
    }
  }
</style>
