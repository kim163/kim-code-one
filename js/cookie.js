createCookie = function(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

readCookie = function(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

deleteCookie = function(name) {
  createCookie(name,"",-1);
}

if (readCookie("sensetoken_sign_up")) {
  $("#referral-widget").removeAttr("style");
  $("#milestone-widget").removeAttr("style");
}

var params = document.location.search
if (params.match(/autoTrigger/) && params.match(/autoDetect/)) {
  createCookie("sensetoken_sign_up", true);
} else {
  console.log("failed to create cookie");
}
