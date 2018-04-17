<template>
  <div class="nav" @mouseleave="$refs.ebat.style.display='';$refs.slotnav.style.display=''">
    <div class="content-warp cfx" >
      <a href="/">
      <img class="logo" src="./images/logo.png">

      </a>
      <ul class="cfx">
        <router-link tag="li" :to="{name:'index'}" class="none-border">
          <a href="javascript:void(0);">首页
            <small>HOME</small>
          </a>
        </router-link>
        <li  @mouseenter="$refs.slotnav.style.display='block';$refs.ebat.style.display=''">
          <a href="/slotgame" >电子游艺
            <small>GAME</small>
            </a>
          <img src="./images/hot.png">
        </li>
        <li   @mouseenter="$refs.ebat.style.display='block';$refs.slotnav.style.display=''">
          <a href="javascript:void(0);">真人娱乐
            <small>LIVE</small>
            </a><img src="./images/hot.png">
        </li>
        <li  >
          <img src="./images/hot.png">
          <a target="_blank" :href="SETTING.href_fish">AG捕鱼
            <small>AG FISH</small>
           </a>
        </li>

        <router-link tag="li" to="/promo">
          <a href="promo">优惠活动
            <small>PROMOTINS</small>
           </a>
          <img src="./images/hot.png">
        </router-link>
        <router-link tag="li" :to="{name:'download'}">
          <a href="javascript:void(0);">
            手机投注
            <small>MOBILE</small>
          </a>
        </router-link>
        <li >
          <a target="_blank" href="/game/loginSB.php">体育竞技
            <small>SPORT</small>
          </a>
          <img src="./images/hot.png">
        </li>
        <li>
          <a href="/static/index.html">VIP专区
            <small>VIP ZONE</small>
            </a><img src="./images/hot.png">
        </li>
        <li >
          <a href="/static/agent.html">代理加盟
            <small>AGENCY</small>
          </a>
        </li>
      </ul>
    </div>

    <div ref="slotnav" class="top-subnav-wp" >
       <div class="container m-row cfx">
            <router-link :to="{name:'slotgame',params:{type:'PT'}}" class="cell-5">
                <div  class="top-subnav-bd">
                    <div class="icon-wp"> <i class="sub-icon sp-nav-pt"></i>
                        <i class="iconfont icon-hot"></i></div>
                </div>
                <div class="top-subnav-ft"><button class="btn">PT老虎机 </button></div>
             </router-link>
            <router-link :to="{name:'slotgame',params:{type:'MG'}}" class="cell-5">
                <div  class="top-subnav-bd">
                    <div class="icon-wp"> <i class="sub-icon sp-nav-mg"></i>
                        <i class="iconfont icon-hot"></i></div>
                </div>
                <div class="top-subnav-ft"><button class="btn">MG老虎机</button></div>
             </router-link>
            <router-link :to="{name:'slotgame',params:{type:'DT'}}" class="cell-5">
                <div  class="top-subnav-bd">
                    <div class="icon-wp"><i class="sub-icon sp-nav-dt"></i></div>
                </div>
                <div class="top-subnav-ft"><button class="btn">DT老虎机</button></div>
            </router-link>
            <router-link :to="{name:'slotgame',params:{type:'NT'}}" class="cell-5">
                <div  class="top-subnav-bd">
                    <div class="icon-wp"> <i class="sub-icon sp-nav-nt"></i></div>
                </div>
                <div class="top-subnav-ft"><button class="btn">NT老虎机 </button></div>
            </router-link>
            <router-link :to="{name:'slotgame',params:{type:'QT'}}" class="cell-5">
                <div  class="top-subnav-bd">
                    <div class="icon-wp"> <i class="sub-icon sp-nav-qt"></i></div>
                </div>
                <div class="top-subnav-ft"><button class="btn">QT老虎机 </button></div>
             </router-link>
             <router-link :to="{name:'slotgame',params:{type:'TTG'}}" class="cell-5">
                <div class="top-subnav-bd">
                    <div class="icon-wp"><i class="sub-icon-ag sp-nav-ag1"></i></div>
                </div>
                <div class="top-subnav-ft"><button class="btn">TTG老虎机 </button></div>
             </router-link>
            <router-link :to="{name:'slotgame',params:{type:'PNG'}}" class="cell-5">
                <div class="top-subnav-bd">
                    <div class="icon-wp"><i class="sub-icon sp-nav-png"></i></div>
                </div>
                <div class="top-subnav-ft">
                    <button class="btn">PNG老虎机 </button>
                </div>
            </router-link>
        </div>
    </div>

    <div ref="ebat" class="top-subnav-wp ag-ebet">
       <div class="container m-row zr-box" style="text-align: center">
              <a class="ag-slot"  target="_blank" :href="SETTING.href_ag">
                  <div class="top-subnav-bd">
                      <div class="icon-wp"><i class="sub-icon-ag sp-nav-agnew"></i></div>
                  </div>
                  <div class="top-subnav-ft"><button class="btn">AG真人 </button></div>
              </a>

              <a class="ag-slot ebetOclick" target="_blank" :href="SETTING.href_ebet">
                  <div class="top-subnav-bd">
                      <div class="icon-wp"><i class="sub-icon-ag sp-nav-ebet"></i></div>
                  </div>
                  <div class="top-subnav-ft"><button class="btn">EBET真人 </button></div>
              </a>
       </div>
    </div>

  </div>
</template>
<script>
  import  {SETTING} from "@/assets/data"
  export default {
    name: "",
    data() {
      return {
        SETTING
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
<style lang="scss">
  div.nav {
    height: 82px;
    border-bottom: 1PX solid #041238;
    position: relative;
    border-top: 1px solid #021646;
    background: #02091c;
    padding: 32px 0 0 0;
    .content-warp {
      padding-left: 142px;
      box-sizing: border-box;
    }
    .logo {
      width: 120px;
      left: 0;
      vertical-align: top;
      position: absolute;
      top: -32px;
      z-index: 110;
    }
    li{
      float: left;
      color: #fff;
      position: relative;
      text-align: center;
      border-left: 1px solid #1c2233;
      &:hover  div{
        display: block!important;
      }
    }
    li.none-border{
      border-left: none;
    }
    li.active:after, nav li:hover:after {
      content: "";
      z-index: 100;
      position: absolute;
      height: 2px;
      background: #ffed24;
      width: 80%;
      bottom: -14px;
      left: 50%;
      margin-left: -40%;

    }
    li>a {
      display: block;
      font-size: 14px;
      margin: 0 25px;
    }
    li small {
      display: block;
      color: #909090;
      font-size: 12px;
      margin-top: 11px;
    }
    li>img {
      animation: topbtm 0.5s linear infinite alternate;
      position: absolute;
    }
    @keyframes topbtm {
      from {
        top: -23px
      }
      to {
        top: -19px
      }
    }
    .top-subnav-wp {
      display: none;
      text-align: center;
      position: absolute;
      top: 78px;
      left: 0;
      right: 0;
      width: 100%;
      height: 202px;
      background-color: rgba(0,13,49,0.8);
      z-index:99;
      transition:all .15s ease-out;
      .container{
          width: 1100px;
          margin: 0 auto;
          position: relative;
      }
      .cell-5 {
        float: left;
      }

       a:hover .sub-icon-ag{transform:rotateY(180deg)}
       a:hover .sub-icon{transform:rotateY(180deg)}
       .sp-nav-mg{background-position:0 -315px}
       .sp-nav-dt{background-position:0 -143px}
       .sp-nav-nt{background-position:0 -826px}
       .sp-nav-pt{background-position:0 18px}
       .sp-nav-png{background-position:0 -500px}
       .sp-nav-qt{background-position:0 -663px}
       i.sp-nav-ag1{background: url(./images/subnav-ag.png) no-repeat;    background-position: -22px -170px; width: 155px;}
       .zr-box>a {margin:0; padding: 19px 0;}
       .buyu-box>a {margin:0 100px;}
       .sub-icon{background-image:url(./images/subnav-slot.png?v=1);background-repeat:no-repeat;display:block;transition:.6s all linear;width:144px;height:140px}
       a { display: inline-block; text-align: center; position: relative;padding: 19px 22px; }
       .m-row>.cell-5{width:155px;padding:12px 0!important}
       .top-subnav-bd:before{content:'';height:100%;vertical-align:middle;display:inline-block}
       .top-subnav-bd{display:block;height:140px;text-align:center;position:relative}
       .top-subnav-bd .icon-wp{display:inline-block;vertical-align:middle}
       .top-subnav-ft{color:#fff;padding:5px}
       .btn{background-color:#09affe;padding:0 20px;height:22px;line-height:22px;border-radius:10px;font-size:12px;display: inline-block;color: #fff;text-align: center; cursor: pointer;}
       .btn:hover{background-color:#f3d759;transition:.3s;color: #4f2f12;}
       .top-subnav .app{width:372px;height:256px}
       i.sp-nav-ebet{background: url(./images/zr02.png) no-repeat;background-position: center;}
       .sub-icon-ag{background: url(./images/zr04.png) no-repeat;background-position: center;display: block;transition:.6s all linear;width:170px;height:150px}
    }
  }
</style>
