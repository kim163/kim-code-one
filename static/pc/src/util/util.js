let util = {
  htmlEncode(html) {
    return document.createElement('a').appendChild(
      document.createTextNode(html)).parentNode.innerHTML;
  },
  htmlDecode(html) {
    var a = document.createElement('a');
    a.innerHTML = html;
    return a.textContent;
  },
  htmlEscape(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  },
// I needed the opposite function today, so adding here too:
  htmlUnescape(str) {
    return str
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
  },
  stringToArray(arr) {
    var tempArr = arr.split(',');
    var returnArr = new Array();
    var i, len = tempArr.length;
    for (i = 0; i < len; i++) {
      if (typeOf(tempArr[0] * 1) === 'number') {
        returnArr.push(tempArray[i] * 1);
      } else {
        returnArr.push(tempArray[i]);
      }
    }
    return returnArr;
  }
};

export default util;
