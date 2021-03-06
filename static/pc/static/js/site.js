$( document ).ready(function() {
    var language = "",
        userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (!localStorage.getItem('language-sel')) {
        // language = $.i18n.normaliseLanguageCode({"language" : ""});
      language = "zh";
        if(language.indexOf("zh") != -1){
           language = "zh";
        }else if(language.indexOf("en") != -1){
          language = "en";
        }
        localStorage.setItem('language-sel',language);
    } else {
        language = localStorage.getItem('language-sel');
        $.i18n.normaliseLanguageCode({"language": language});
    }
    loadBundles(language);
    updateSpeElem(language);

    $('.j-languageSel').click(function () {
        var language = localStorage.getItem('language-sel');
        if(language.indexOf('en') !== -1){
            loadBundles('zh');
            updateSpeElem('zh');
            localStorage.setItem('language-sel','zh');
            if(userAgent){
                $('.j-email').css('padding','0 82px 0 4%');
            }
        }else{
            loadBundles('en');
            updateSpeElem('en');
            localStorage.setItem('language-sel','en');
            if(userAgent){
                $('.j-email').css('padding','0 130px 0 4%');
            }
        }
    });

  // Define HTML elements to load content into
  var mobileNavBar = $('.m-nav-container');
  var desktopNavbar = $('.navbar');
  // Detect if mobile
  if(userAgent ) {
    // Hide Desktop Nav
    desktopNavbar.hide();
    mobileNavBar.show();
    if(localStorage.getItem('language-sel').indexOf('en') !== -1){
        $('.j-email').css('padding','0 130px 0 4%');
    }
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

  $('input.j-email').keyup(function(event) {
     if (event.keyCode == 13) {
         $('button.j-submitBtn').trigger( "click" );
     }
  });

  $('button.j-submitBtn').click(function(){
       var email = $.trim($('.j-email').val()),
           regex = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,  // email regex
           tipsCon = $('.j-tipsInform'),
           tipsText = '',
           isError = 1,  // 0 error , 1  success
           language = localStorage.getItem('language-sel');

       if(email == ''){
         isError = 0;
         if(language.indexOf('zh') !== -1){
             tipsText = '* 请您输入正确的邮箱地址';
         }else {
             tipsText ='* Please enter a valid email address';
         }
       }else if (!regex.test(email)) {
         isError = 0;
         if(language.indexOf('zh') !== -1){
             tipsText = '* 您输入的邮箱地址错误';
         }else {
             tipsText = '* The email address you entered is incorrect';
         }
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
           if(language.indexOf('zh') !== -1){
               tipsCon.html('* 恭喜您成功订阅久安钱包，邮件已发您邮箱，请注意查收');
           }else {
               tipsCon.html('* Congratulations, you have successfully subscribed to the JUAN wallet. The email was sent to you,please kindly check it');
           }
       },200);
  });

});

document.addEventListener("touchstart", function (event) {
    touchScreen(event);
}, false);

document.getElementsByClassName('m-nav-container')[0].addEventListener("touchstart", function () {
    event.stopPropagation();
}, false);

function touchScreen(event) {
    var $target = $(event.target),
        $toggle = $('#toggle');
    if(!$target.is('div.m-nav-container') && $toggle.is(':checked') ){
        $toggle.prop("checked", false);
    }
}

function loadBundles(language) {
    var pathname = window.location.pathname,
        filename = '',
        fileurl = '';
    if(pathname == '/'){
        filename = 'index';
    }else {
        if(pathname.indexOf('index') !== -1){
            filename = 'index';
        }else if(pathname.indexOf('about') !== -1){
            filename = 'about';
        }else if(pathname.indexOf('contact') !== -1){
            filename = 'contact';
        }else if(pathname.indexOf('white-paper') !== -1){
            filename = 'white-paper';
        }else if(pathname.indexOf('help') !== -1){
            filename = 'help';
        }
    }
    fileurl = 'i18n/'+ filename + '/';

    jQuery.i18n.properties({
        name:'strings',
        path: fileurl,
        mode:'both',
        language:language,
        cache: true,
        encoding: 'UTF-8',
        callback: function() {
            updateHtml();
        }
    });
}

function updateHtml() {
    try {
        //初始化页面元素
        $('[data-i18n-attrsrc]').each(function () {
            $(this).attr('src', $.i18n.prop($(this).data('i18n-attrsrc')));
        });
        $('.j-mobileNavLogo').show( "slow" );
        $('[data-i18n-html]').each(function () {
            $(this).html($.i18n.prop($(this).data('i18n-html')));
        });
        $('[data-i18n-text]').each(function () {
            $(this).text($.i18n.prop($(this).data('i18n-text')));
        });
        $('[data-i18n-value]').each(function () {
            $(this).val($.i18n.prop($(this).data('i18n-value')));
        });
        $('[data-i18n-placeholder]').each(function () {
            $(this).attr('placeholder', $.i18n.prop($(this).data('i18n-placeholder')));
        });
    }
    catch(ex){
        console.log(ex);
    }
}

function updateSpeElem(language) {
    var  userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if(language.indexOf('zh') !== -1){
        $('.j-whpaIssueAncRow').css('min-height','initial');
        $("title").html('久安钱包');
        $('[data-enmobile-bigtitle]').each(function () {
            $(this).removeClass('pubanner-title-en');
        });
        if(userAgent){
            $('[data-enmobile-bigtitle]').each(function () {
                $(this).removeClass('enmobile-pubanner-title');
            });
            $('[data-enmobile-lineheg]').each(function () {
                $(this).removeClass('enmobile-lineheg');
            });
        }
    }else {
       $('.j-whpaIssueAncRow').css('min-height','965px');
       $("title").html('JUAN Wallet');
       $('[data-enmobile-bigtitle]').each(function () {
            $(this).addClass('pubanner-title-en');
       });
       if(userAgent){
           $('[data-enmobile-bigtitle]').each(function () {
               $(this).addClass('enmobile-pubanner-title');
           });
           $('[data-enmobile-lineheg]').each(function () {
               $(this).addClass('enmobile-lineheg');
           });

       }
    }
}
