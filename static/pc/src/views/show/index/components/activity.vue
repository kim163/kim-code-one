<template>
  <div class="prod-recommond">
    <router-link tag="a" class="prod-recommond-item1 active" :to="{name:'slotgame'}">
      <img src="~images/index/prd1.jpg">
      <p><span>老虎机</span> 七大顶级热门老虎机平台</p>
    </router-link>
    <!--<a href="" class="prod-recommond-item1">

    </a>-->
    <a href="/gameAginReal.php" class="prod-recommond-item2 active">	<img src="~images/index/prd2.jpg">
      <p>AG真人游戏</p>
    </a>
    <a href="/gameAgFish.php" class="prod-recommond-item2 active">	<img src="~images/index/prd3.jpg">
      <p>捕鱼游戏</p></a>
  </div>
</template>
<script>
  let myData=[
    {title:"注册送18-88元"},
    {title:"免费筹码1288元"},
    {title:"首存100%"},
    {title:"返水最高1.1%"},
    {title:"次次存送最高25%"}
  ]
    export default {
        name: "",
        data() {
            return {
              active:0,
              myData
            }
        },
        props: {},
        computed: {},
        watch: {},
        methods: {},
        created() {
        },
        activated() {
        },
        components: {}
    }
</script>
<style spcoed>
  .prod-recommond{ height:316px; margin-top: 14px; color: #343434;font-size: 14px;;}
  .prod-recommond p{ height: 50px; line-height: 50px; background:#f6f6f6; text-align: center;}
  .prod-recommond-item1{ cursor: pointer; width: 552px;float: left;}
  .prod-recommond-item1 span{ display: inline-block; font-size:18px; border-right:1px solid #cecece ; line-height: 28px; vertical-align: middle; padding-right: 13px; margin-right: 15px;}
  .prod-recommond-item2{cursor: pointer; width:269px;float: left; margin-left: 5px;}
  .prod-recommond>a{display: block; overflow: hidden;}
  .prod-recommond>a img{ height: 265px; width: 100%; vertical-align: top; transition: all .3s;}
  .prod-recommond>a:hover p,.prod-recommond>a.active p{ background: #ed7e12; color: #fff;position: relative;  z-index: 2; }
  .prod-recommond>a:hover img{ transform: scale(1.1); opacity: .8}

</style>
