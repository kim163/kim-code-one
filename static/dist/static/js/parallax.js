$( document ).ready(function() {

  // Global Variables
  $window = $(window);
  var ScreenWidth = screen.width;

  // PARALAX CODE
  $('.img-parallax[data-type="background"]').each(function(){
    // Only do parallax if screen width is more than 699px
    var ScreenWidth = screen.width;
    if (ScreenWidth > 799 ){
    var $bgobj = $(this); // assigning the object
      $(window).scroll(function() {
        var yPos = -($window.scrollTop() / $bgobj.data('speed'));
        // Put together our final background position
        var coords = '55% '+ yPos + 'px';
        // Move the background
        $bgobj.css({ backgroundPosition: coords });
      });
    }
    else {
      // don't do it
    }
  });

});
