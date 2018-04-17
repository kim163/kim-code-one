<template>
  <div class="award-money">
    <h1>老虎机奖池</h1>
    <p>千万奖池，一触即中</p>
    <div class="money-view">{{total|stringSplit}}</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        total: 0,
        tickerStartTime: (new Date()).getTime(),
        startNum: 0,
        step:0.1,
        interval:null
      };
    },
    beforeDestroy() {
      window.clearInterval(this.interval)
    },
    methods: {
      randomMoney() {
        let _this=this;
        let x = _this.startNum*1+( (((new Date()).getTime() - _this.tickerStartTime)/2689)*_this.step);
        _this.total=x.toString().$toFixed().strSplit();
      },
      Start(){
        let _this=this;
        _this.interval=setInterval(() => {
          _this.randomMoney();
        },199)
      }
    },
    created() {
      if (!window.xmlstring||!window.xmlstring.jpxml){
        let _this = this;
        window.xmlstring = {}
        let _script = document.createElement('script');
        _script.src = '//tickers.playtech.com/jpdata/datalink/playtech.xml.js';
        _script.onload = function () {
          let xmldoc = {};
          if (typeof(DOMParser) != "undefined") {
            var parser = new DOMParser();
            xmldoc = parser.parseFromString(xmlstring.jpxml, "text/xml");
          } else {
            try {
              xmldoc = new ActiveXObject("Microsoft.XMLDOM");
              xmldoc.async = false;
              xmldoc.loadXML(xmlstring.jpxml);
            } catch (e) {
            }
          }
          var a = xmldoc.querySelector('amount[currency="cny"]');
          xmlstring.jpxml='1';
          _this.startNum =xmlstring.startNum= Number(a.firstChild.nodeValue);
          _this.step =xmlstring.step=Number(a.getAttribute("step"));
          _this.Start();
        }
        document.body.appendChild(_script)
      }else{
        this.startNum =window.xmlstring.startNum||552568331.52;
        this.step =window.xmlstring.step||40.10874;
        this.Start();
      }
    }
  }
</script>
<style>
  .award .award-money {
    width: 318px;
    text-align: center;
    color: #ed7e12;
    float: left;
  }

  .award .award-money h1 {
    line-height: 50px;
    font-size: 21px;
  }

  .award .award-money p {
    font-size: 17px;
    color: #5e5e5e;
    margin: 0 0 22px 0;
  }

  .award .award-money .money-view {
    font-size: 38px;;
  }
</style>
