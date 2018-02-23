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
     if(!$(this).hasClass('disable')){
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
       $('.j-submitBtn').addClass('disable');
       var data = {
                'apiUser': '9AnPRO',
                'apiKey':  'H2aXme67BNVxwRbc',
                'to': email,
                'from': 'service@9anpro.com',
                'fromName': '久安钱包',
                'replyTo': '',
                'subject': '欢迎订阅久安钱包',
                'html': '您好！<br/><br/>欢迎订阅久安钱包 我们将会定期推送最新资讯<br/><br/><img src="/images/juan-code.jpg"  alt="9An" />',
                'cc': '',
                'bcc': '',
                'file1': 'https://www.9security.com/images/juan-code.jpg',
                'file2': ''
       };
       $.ajax({
          method: "POST",
          url: 'https://api.sendcloud.net/apiv2/mail/send',
          dataType: "json", //指定服务器返回的数据类型
          data: data,
       //   jsonp: "theFunction",   //指定参数名称
      //    jsonpCallback: "showData",  //指定回调函数名称
          headers : {'Access-Control-Allow-Origin':'*'},
          success: function(result){
               $('.j-submitBtn').removeClass('disable');
               if(result.statusCode == 200){
                  tipsCon.removeClass('tips-error').addClass('tips-success');
                  tipsCon.html('* 邮件订阅成功');
               }else{
                  tipsCon.removeClass('tips-success').addClass('tips-error');
                  tipsCon.html(result.message);
               }
           }
        });
     }
  });

});
