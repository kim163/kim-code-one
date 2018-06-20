
var browser={
  versions:function(){
    var u = navigator.userAgent, app = navigator.appVersion;
    return {//移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      weChat: u.indexOf('micromessenger') > -1, //是否是微信浏览器
      mobileQQ: /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(u) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(u), //是否是qq浏览器
    };
  }(),
  language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

_.mixin(
  {
    getUrlParam(name, href) { //获取get传参参数
      const params = {}
      const match = (href || window.location.href).match(/#?.*\?(.*)/)

      if (!match) {
        return match
      }

      match[1].split('&').forEach((arg) => {
        arg = arg.split('=')
        params[arg[0]] = decodeURI(arg[1])
      })

      if (name) {
        return params[name]
      }
      return params
    },

    isMobile(){
      if(browser.versions.mobile || browser.versions.ios || browser.versions.android ||
        browser.versions.iPhone || browser.versions.iPad){
        return true
      }else{
        return false
      }
    },

    isAndroid(){
      if(browser.versions.android){
        return true
      }else{
        return false
      }
    },

    isIos(){
      if( browser.versions.ios || browser.versions.iPhone || browser.versions.iPad){
        return true
      }else{
        return false
      }
    },

    isWeChat(){
      return browser.versions.weChat
    },
    openApp(openUrl, callback){
      //检查app是否打开
      function checkOpen(cb){
        var _clickTime = +(new Date());
        function check(elsTime) {
          if ( elsTime > 3000 || document.hidden || document.webkitHidden) {
            cb(1);
          } else {
            cb(0);
          }
        }
        //启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
        var _count = 0, intHandle;
        intHandle = setInterval(function(){
          _count++;
          var elsTime = +(new Date()) - _clickTime;
          if (_count>=100 || elsTime > 3000 ) {
            clearInterval(intHandle);
            check(elsTime);
          }
        }, 20);
      }

      //在iframe 中打开APP
      var ifr = document.createElement('iframe');
      ifr.src = openUrl;
      ifr.style.display = 'none';

      if (callback) {
        //客户端检测微信直接跳应用宝链接
       // var browser = BrowserInfo();
        //使用微链接
        var encodeUri = encodeURIComponent(openUrl);

        if (_.isWeChat()) {
          window.location.href = 'https://9anapp.com/app/9anapp.html';
        }else{
          checkOpen(function(opened){
            callback && callback(opened);
          });

        }
      }

      document.body.appendChild(ifr);
      setTimeout(function() {
        document.body.removeChild(ifr);
      }, 2000);
    },

    openAppFun() {
      var AppConfig = {

        // 协议头
        PROTOCAL:"",

        // 主页
        HOME: "",

        // 唤起失败时的跳转链接
        FAILBACK: {
          ANDROID: "",
          IOS:""
        },

        // Android apk 相关信息
        APK_INFO: {
          PKG: "cn.xx.xx",
          CATEGORY: "android.intent.category.DEFAULT",
          ACTION: "android.intent.action.VIEW"
        },

        // 唤起超时时间，超时则跳转到下载页面
        LOAD_WAITING: 3000
      };

      var ua = window.navigator.userAgent;

      // 是否为Android下的chrome浏览器，排除mobileQQ；
      // Android下的chrome，需要通过特殊的intent 来唤醒
      // refer link：https://developer.chrome.com/multidevice/android/intents
      var isAndroidChrome = (ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/))
        && browser.versions.android && !browser.versions.mobileQQ;

      return {
        /**
         * [mixinConfig 重新收拢配置]
         * @param  {[type]} config [description]
         * @return {[type]}        [description]
         */
        mixinConfig: function(config){
          if (!config) {
            return;
          }

          AppConfig.PROTOCAL = config.protocal || AppConfig.PROTOCAL;
          AppConfig.schema   = config.schema || AppConfig.HOME;
          AppConfig.LOAD_WAITING = config.loadWaiting || AppConfig.LOAD_WAITING ;

          if (_.isIos()) {
            AppConfig.FAILBACK.IOS = config.failUrl || AppConfig.FAILBACK.IOS;
          } else if (_.isAndroid()) {
            AppConfig.FAILBACK.ANDROID = config.failUrl || AppConfig.FAILBACK.ANDROID;
            AppConfig.APK_INFO = config.apkInfo || AppConfig.APK_INFO;
          }

        },
        /**
         * [generateSchema 根据不同的场景及UA生成最终应用的schema]
         * @return {[type]}                [description]
         */
        generateSchema: function(schema) {

          var localUrl  = window.location.href;
          var schemaStr = '';

          // 如果未定义schema，则根据当前路径来映射
          if (!schema) {
            schemaStr = AppConfig.HOME;
            // 在schema省略时，可以根据当前页面的url，设置不同的默认值
          } else {
            schemaStr = schema;
          }

          // 如果是安卓chrome浏览器，则通过intent方式打开
          // 修改为都是使用普通打开方式

          schemaStr = AppConfig.PROTOCAL + "://" + schemaStr;
          return schemaStr;
        },

        /**
         * [loadSchema 唤醒native App，如果无法唤醒，则跳转到下载页]
         * @return {[type]} [description]
         */
        loadSchema: function(config){

          this.mixinConfig(config);

          var schemaUrl = this.generateSchema(AppConfig.schema);

          var iframe    = document.createElement("iframe"),
            aLink     = document.createElement("a"),
            body      = document.body,
            loadTimer = null;

          // 隐藏iframe及a
          aLink.style.cssText = iframe.style.cssText = "display:none;width:0px;height:0px;";

          // Android 微信不支持schema唤醒，必须提前加入腾讯的白名单
          if (_.isWeChat() && _.isAndroid()) {

            window.location.href = AppConfig.FAILBACK.ANDROID;

            // ios 9 safari 不支持iframe的方式跳转
          } else if (_.isIos()) {
            if (_.isWeChat()) {
              window.location.href = AppConfig.FAILBACK.IOS;
            } else {
              aLink.href = schemaUrl;
              body.appendChild(aLink);
              aLink.click();
            }

            // Android chrome 不支持iframe 方式唤醒
            // 适用：chrome,leibao,mibrowser,opera,360
          }
          //else if (isAndroidChrome) {
          //    aLink.href = schemaUrl;
          //    body.appendChild(aLink);
          //    aLink.click();
          //
          //    // 其他浏览器
          //    // 适用：UC,sogou,firefox,mobileQQ
          //}
          else {
            body.appendChild(iframe);
            iframe.src = schemaUrl;
          }

          // 如果LOAD_WAITING时间后,还是无法唤醒app，则直接打开下载页
          // opera 无效
          var start = Date.now(),
            that  = this;
          loadTimer = setTimeout(function() {

            if (document.hidden || document.webkitHidden) {
              return;
            }

            // 如果app启动，浏览器最小化进入后台，则计时器存在推迟或者变慢的问题
            // 那么代码执行到此处时，时间间隔必然大于设置的定时时间
            if (Date.now() - start > AppConfig.LOAD_WAITING + 200) {
              // come back from app

              // 如果浏览器未因为app启动进入后台，则定时器会准时执行，故应该跳转到下载页
            } else {
              window.location.href = _.isIos() ? AppConfig.FAILBACK.IOS : AppConfig.FAILBACK.ANDROID;
            }

          }, AppConfig.LOAD_WAITING);


          // 当本地app被唤起，则页面会隐藏掉，就会触发pagehide与visibilitychange事件
          // 在部分浏览器中可行，网上提供方案，作hack处理
          var visibilitychange = function() {
            var tag = document.hidden || document.webkitHidden;
            tag && clearTimeout(loadTimer);
          };
          document.addEventListener('visibilitychange', visibilitychange, false);
          document.addEventListener('webkitvisibilitychange', visibilitychange, false);
          // pagehide 必须绑定到window
          window.addEventListener('pagehide', function() {
            clearTimeout(loadTimer);
          }, false);
        }
      };
    }
  }
)

