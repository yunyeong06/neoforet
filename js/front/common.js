$(function(){
	resizeFunction();

	includeHTML();

	// header_gnb 메뉴 mouseenter
	$('header').off('mouseleave').on('mouseleave', function(){
		$('.gnbWrap .twoD').removeClass('show');
		$('.gnb_bg').stop(true, true).delay(200).fadeOut(300);
		$('.category_info').stop(true, true).fadeOut(300);
		$('header').removeClass('hover');
		$('#wrap').removeClass('gnb_on');
	});

	// header_gnb 메뉴 mouseleave
	$('.gnbWrap .oneD').each(function(q){
		$(this).find('.oneL').off('mouseenter').on('mouseenter', function(){
			$('.category_info .menu_list').hide();
			$('.category_info .menu_list').eq(q).show();
			$('.gnbWrap .twoD').removeClass('show');
			$(this).next().addClass('show');
			$('.gnb_bg').stop(true, true).fadeIn(300);
			$('.category_info').stop(true, true).fadeIn(300);
			$('header').addClass('hover');
			$('#wrap').addClass('gnb_on');
		});
	});




	// Action Up
	var $text = $('.action_up');
	var sections = document.querySelectorAll('.action_up');
	var textAction = {
		enter: function(){
			Array.prototype.forEach.call(sections, function(i){
				gsap.to(i, { autoAlpha: 1, y: 0, duration: 1,
					scrollTrigger: {
						trigger: i,
						start: 'top 100%',
						end: 'top 80%',
						scrub: 1,
						toggleClass: { targets: i, className: 'is_active' },
						toggleActions: 'play none none reverse',
						// markers: true
					}
				});
			});
		},
		set: function(){
			gsap.set($text, { opacity: 0, y: 100 });
		}
	}
	if ($text.length) textAction.set(); textAction.enter();


	// header_gnb 메뉴 scroll
	$(window).scroll(function(){
		var sct = $(window).scrollTop();
		if(sct>600){
			$('#header').addClass('on');
		}else{
			$('#header').removeClass('on');
		}
	});
});

function resizeFunction(){
    ioswidth = $(window).width();
    iosheight = $(window).height();

    $('.win_inner').width(ioswidth);
}

