$(function(){
    // main_intro
    gsap.set('.intro_txt .btn_link', { opacity: 0, className: '+=btn_link is_hidden' });
    gsap.to('.intro_txt .btn_link', { opacity: 1, duration: 1, className: '-=btn_link',
        scrollTrigger: {
            trigger: '.introD .intro_video',
            start: 'top 50%',
            end: 'top',
            scrub: 1,
        }
    });

    var introHeadAction = {
        enter: function(){
            $('.intro_txt').addClass('is_break');
        },
        leave: function(){
            $('.intro_txt').removeClass('is_break').removeAttr('style');
        }
    }


    gsap.to('.introD .main_headline', { color: '#ffffff', duration: 1,
        scrollTrigger: {
            trigger: '.introD .intro_video',
            start: 'top 50%',
            end: 'top',
            scrub: 1,
            toggleClass: { targets: '.intro_txt', className: 'is_active' }
        }
    });

    gsap.to('header', {
        scrollTrigger: {
            trigger: '.introD .videoD',
            start: 'top',
            end: 'bottom',
            onEnter: function(){
                introHeadAction.enter();
            },
            onLeave: function(){
                $('.intro_txt').addClass('is_break').css('top', $(window).scrollTop());
                introHeadAction.enter();
            },
            onEnterBack: function(){
                introHeadAction.enter();
            },
            onLeaveBack: function(){
                introHeadAction.leave();
            }
        }
    });

    ScrollTrigger.matchMedia({
        // Desktop
        "(min-width: 1280px) and (max-width: 1919px)": function() {
            $('.introD .videoD').removeAttr('style');
            gsap.to('.introD .videoD', { width: '100vw', duration: 1,
                scrollTrigger: {
                    trigger: '.introD .videoD',
                    start: 'top 506px',
                    end: 'top',
                    scrub: 1,
                    ease: 'power4',
                }
            });
        },
        // Desktop
        "(min-width: 1920px)": function() {
            $('.introD .videoD').removeAttr('style');
            gsap.to('.introD .videoD', { width: '100vw', duration: 1,
                scrollTrigger: {
                    trigger: '.introD .videoD',
                    start: 'top 786px',
                    end: 'top',
                    scrub: 1,
                    ease: 'power4',
                }
            });
        }
    });


    // video ratio
    var $video = $('.introD video');
    var $visualContainer = $('.introD .visual');
    var videoRatioAction = {
        set: function(){
            var videoRatio = 0.5625;
            var targetW = $(window).width();
            var targetH = $(window).height();
            var targetRatio = targetW / targetH;
            var imgRatio = 1920 / 960;

            if (targetRatio > imgRatio) {
                $video.removeAttr('style');
                $video.css({ 'top': '50%' ,'left': '50%', 'width': targetW + 'px', 'height': targetW / imgRatio + 'px', 'marginTop': ((targetW / imgRatio) / 2) * -1 + 'px', 'marginLeft': (targetW / 2) * -1 + 'px'});
            } else {
                $video.removeAttr('style');
                $video.css({ 'top': '50%' ,'left': '50%', 'width': imgRatio * targetH + 'px', 'height': targetH + 'px', 'marginTop': (targetH / 2) * -1 + 'px', 'marginLeft': ((imgRatio * targetH) / 2) * -1 + 'px'});
            }
        }
    }
    if ($video.length) videoRatioAction.set();
});

$(window).on('resize', function(){
    videoRatioAction.set();
});