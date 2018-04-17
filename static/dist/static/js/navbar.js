$( document ).ready(function() {

  // Global Variables
  $window = $(window);
  var ScreenWidth = screen.width;
  var hrefLocation = window.location.href.split('/')[3];

  // Hide Header on on scroll down
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('.navbar').outerHeight();

  // Detect Scroll
  $(window).scroll(function(event){
      didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // When at the top of the page
    if (st <= 0) {
      $('.navbar').addClass('nav-start');
    } else {
      $('.navbar').removeClass('nav-start');
    }

    // OLD NAV SETUP
    // if (st > lastScrollTop && st > navbarHeight){
    //   $('.navbar').addClass('nav-down').removeClass('nav-up');
    // } else {
    //   if(st + $(window).height() < $(document).height()) {
    //       $('.navbar').addClass('nav-up').removeClass('nav-down');
    //   }
    // }

    lastScrollTop = st;
  }

});
