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

  $('.j-submitBtn').click(function(){
       var email = $.trim($('.j-email').val()),
           regex = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,  // email regex
           tipsCon = $('.j-tipsInform'),
           tipsText = '',
           isError = 1;  // 0 error , 1  success

       if(email == ''){
         isError = 0;
         tipsText = '* 请输入邮箱地址';
       }else if (!regex.test(email)) {
         isError = 0;
         tipsText = '* 邮箱地址输入错误';
       }

       if(isError == 0){
         tipsCon.removeClass('tips-success').addClass('tips-error');
         tipsCon.html(tipsText);
         return false;
       }

       tipsCon.html('');
       $('.j-emailSubForm').submit();
       setTimeout(function(){
          tipsCon.removeClass('tips-error').addClass('tips-success');
          tipsCon.html('* 欢迎订阅久安钱包，邮件已发您邮箱，请注意查收');
       },200);
  });

});