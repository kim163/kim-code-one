import {mapGetters,mapMutations} from 'vuex'
export let games={
  data() {
    return {
      State:['DEM']//这个状态 只能试玩
    }
  },
  methods:{
    ...mapMutations(["SHOW_LOGIN"]),
    getImg(item){ 
      // 图片连接
      // if(item.category.toLowerCase()=='dt'||item.category.toLowerCase()=='png'||item.category.toLowerCase()=='ttg'){
      //   return `https://www.staticsources.com/images/${item.category.toLowerCase()}games/${item.id.toLowerCase()}.png`;
      // }else{
      //   return `https://www.staticsources.com/images/${item.category.toLowerCase()}games/${item.id.toLowerCase()}.jpg`;
      // }
      return `https://www.staticsources.com/images/${item.category.toLowerCase()}games/${item.pic}`;
    },
    showTry(){
      return obj.state=='PLA'?false:true;
    },
    showPlay(obj){
      return obj.state=='DEM'?false:true;
    },
    /**
     * 获取游戏地址
     * @param 游戏对象
     * @param 是否为试玩 ,true 为试玩，false 为真钱
     * @returns {string}
     */
    getGameUrl(obj,isFun){
      let localUrl=window.location.href;
      let url="";
      let isFunString=isFun?"1":"0";
      switch (obj.category){
        case 'PT': //
          url=`/game/v2/gamePT.php?gameId=${obj.id}&isfun=${isFunString}&deviceType=pc&lobbyUrl=${localUrl}`;
          break;
        case 'QT': //
          //return e.currentTarget.href=`/gameQT.php?gameCode=${obj.id}&isfun=0&type=${obj.subType=='H5'?'0':'1'}`;
          url=`/game/v2/gameQT.php?gameId=${obj.id}&isfun=${isFunString}&deviceType=${obj.subType=='H5'?'h5':'pc'}&lobbyUrl=${localUrl}`;
          break;
        case 'NT':
          url=`/game/v2/gameNT.php?gameId=${obj.id}&isfun=${isFunString}&deviceType=pc&lobbyUrl=${localUrl}`;
          break;
        case 'TTG':
          url=`/game/v2/gameTTG.php?gameId=${obj.id}&gameName=${obj.code}&deviceType=pc&isfun=${isFunString}&lobbyUrl=${localUrl}`;
          break;
        case 'DT':
          url=`/game/v2/gameDT.php?gameId=${obj.id}&isfun=${isFunString}&deviceType=pc&lobbyUrl=${localUrl}`;
          break;
        case 'MGS':
          url=`/game/v2/gameMGS.php?gameId=${obj.id}&isfun=${isFunString}&deviceType=${obj.subType=='H5'?'h5':'pc'}&lobbyUrl=${localUrl}&moduleid=${obj.moduleid}`;
          break;
        case 'PNG':
          url=`/game/v2/gamePNG.php?gameId=${obj.id}&pid=${obj.code}&isfun=${isFunString}&deviceType=pc&lobbyUrl=${localUrl}`;
          break;
        default:
          url="";
          break;
      }

      return url;
    },
    tryGame(obj,e){ //试玩连接
      let url='';
      let localUrl=window.location.href;

      if(obj.state=='PLA')return toast("此游戏不能试玩");    //PLA状态 不能试玩

      url=this.getGameUrl(obj,true);

      if(url){
        e.currentTarget.href=url;
      }
      return false;
    },
    playGame(obj,e){ //真玩 游戏
      let url="";
      let localUrl=window.location.href;
      if(obj.state=='DEM') return toast("此游戏只能试玩");    //DEM状态 不能真玩
      if(!this.islogin){return toast("请先登录")}
      if(this.isAgent){return $alert("抱歉!目前代理不能进行游戏")}

      url=this.getGameUrl(obj,false);

      if(url){
        e.currentTarget.href=url;
      }
      return false;
    },
    collect(item){   //收藏
      if (!this.islogin) {
        $confirm("系统检测到你未登陆...", "提示", {
          confirmText: "立刻登陆"
        }).then(() => {
          this.$router.push("/login/index");
        })
        return;
      }
      let $cur = this.statusData.findIndex(el => {
        return el.id == item.id;
      })
      if ($cur > -1) {
        this.statusData.splice($cur, 1);
      } else {
        this.statusData.unshift(item);
        this.statusData.length > 18 && this.statusData.pop()
      }
      saveOrUpdateGameStatus({gameList: JSON.stringify(this.statusData)}).then(res => {
        toast($cur > -1 ? "已取消收藏" : "收藏成功,最多收藏19个");
      }).catch(err => {
        toast("操作失败!请稍后重试");
      })
    }
  },
  computed:{
    ...mapGetters(["islogin",'isAgent'])
  }
};
