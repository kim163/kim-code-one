$( document ).ready(function() {
  // Define HTML elements to load content into
  var mobileNavBar = $('.m-nav-container');
  var desktopNavbar = $('.navbar');
  // Detect if mobile
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    // Hide Desktop Nav
    desktopNavbar.hide();
    mobileNavBar.show();
  } else {
    // Hide Mobile Nav
    mobileNavBar.hide();
  }

  $('#faqContent li').click(function(){
      var $that = $(this);
      $that.find('i.triangle-icon').toggleClass('down');
      $that.find('div.j-faqCont').slideToggle();
  });

  $('#j-videoCover').click(function(){
     $(this).fadeOut();
     $('#juanVideo').get(0).play();
  });

  $('div.j-issueShaItem').mouseenter(function() {
     $(this).addClass('active').siblings().removeClass('active');
  });

});
