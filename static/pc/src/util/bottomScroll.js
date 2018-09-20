
const scrollBottom={
   getScrollTop(){
     var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
     if (document.body) {
       bodyScrollTop = document.body.scrollTop;
     }
     if (document.documentElement) {
       documentScrollTop = document.documentElement.scrollTop;
     }
     scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
     return scrollTop;
   },
  getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  },
  getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
      this.bSH = document.body.scrollHeight;
    }
    if (document.documentElement) {
      this.dSH = document.documentElement.scrollHeight;
    }
    scrollHeight = (this.bSH - this.dSH > 0) ? this.bSH : this.dSH;
    return scrollHeight;
  },
}

export  default  scrollBottom
