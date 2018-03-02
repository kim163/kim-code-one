$( document ).ready(function() {
    var language = "";

    if (!sessionStorage.getItem('language-sel')) {
        language = $.i18n.normaliseLanguageCode({"language" : ""});
        sessionStorage.setItem('language-sel',language);
    } else {
        language = sessionStorage.getItem('language-sel');
        $.i18n.normaliseLanguageCode({"language": language});
    }
    langBtnText();      // 更新按钮文字
    loadBundles(language);

    $('.j-languageSel').click(function () {
        var language = sessionStorage.getItem('language-sel');
        if(language == 'en'){
            $('.j-languageSel').text('ENGLISH');
            loadBundles('zh');
            sessionStorage.setItem('language-sel','zh');
        }else{
            $('.j-languageSel').text('中文');
            loadBundles('en');
            sessionStorage.setItem('language-sel','en');
        }
    });

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
         tipsText = '* 请您输入正确的邮箱地址';
       }else if (!regex.test(email)) {
         isError = 0;
         tipsText = '* 您输入的邮箱地址错误';
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
          tipsCon.html('* 恭喜您成功订阅久安钱包，邮件已发您邮箱，请注意查收');
       },200);
  });

});

function updateHtml() {
    try {
        //初始化页面元素
        $('[data-i18n-placeholder]').each(function () {
            $(this).attr('placeholder', $.i18n.prop($(this).data('i18n-placeholder')));
        });
        $('[data-i18n-text]').each(function () {
            $(this).text($.i18n.prop($(this).data('i18n-text')));
        });
        $('[data-i18n-value]').each(function () {
            $(this).val($.i18n.prop($(this).data('i18n-value')));
        });
        $('[data-i18n-html]').each(function () {
            $(this).html($.i18n.prop($(this).data('i18n-html')));
        });
    }
    catch(ex){
        console.log(ex);
    }
}

function langBtnText() {
    var $langSel = $('.j-languageSel'),
        language = sessionStorage.getItem('language-sel');
    if(language == 'zh' || language == 'zh_CN'){
        $langSel.text('ENGLISH');
    }else {
        $langSel.text('中文');
    }
}