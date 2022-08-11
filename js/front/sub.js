$(function(){
    resizeFunction();
});

function resizeFunction(){
    ioswidth = $(window).width();
    iosheight = $(window).height();
    
    $('.visualArea').height(iosheight);
}


var introHeadAction = {
    enter: function(){
        $('.intro_txt').addClass('is_on');
    },
    leave: function(){
        $('.intro_txt').removeClass('is_on').removeAttr('style');
    }
}


