// (function setMainHeight(){
//     var heightLen = document.querySelectorAll('section').length;
//     var realHeight = heightLen*window.innerHeight;
//     document.querySelector('main').style.height = realHeight +'px';
// })();


window.onload = function(){
	if (matchMedia("screen and (min-width: 1025px)").matches) { 
		var pageScroll = true;
		var pageSpeed = 1000;
		var pageScrollSection01 = false;
		var pageScrollSection02 = false;
		var _pageScrollSection01_infor = { p_h : 0, idx : 0, s_b : 0, c_idx : 0, s_p : 0, e_p : 0}
		var _pageScrollSection02_infor = { p_h : 0, idx : 0, s_b : 0, c_idx : 0, s_p : 0, e_p : 0}

		function updateController() {
			controller.update(true);
		}

		// * * * GSAP setting * * *

		var controller = new ScrollMagic.Controller();
		var controller_hook01 = new ScrollMagic.Controller();
		var controller_hook02 = new ScrollMagic.Controller();

		var scence01Timeline = gsap.timeline();
		var scencd02Timeline = gsap.timeline();
		var scencd03Timeline = gsap.timeline();
		var scencd04Timeline = gsap.timeline();
		var scencd05Timeline = gsap.timeline();

		// * * * GSAP init * * *
		mainScene();
		scene01();
		newScene02();
		scene03();

		// * * * main animation * * *
		// main visual fade out

		function mainScene(){
			var main_section = gsap.to('.main_section', 2, {
				opacity:0,
			});

			var scene_main_section = new ScrollMagic.Scene({            
				triggerElement: ".main_section",
				offset:500,
				duration : 400,
			})
			.setTween(main_section)
			.addTo(controller)

			var mainPin = new ScrollMagic.Scene({
				triggerHook:0,
				triggerElement: ".main_section",
				offset:0,
				duration : window.innerHeight/2,
			})
			.setPin('.main_section', {pushFollowers: false})
			.addTo(controller_hook02)
        }
		function scene01(){
			gsap.set('.main_section01 .section01_merge_logo01 img', {opacity:0, top:100})
			gsap.set('.main_section01 .section01_merge_logo02 img', {opacity:0, top:100})

			var section01 = scence01Timeline.to('.main_section01 .section01_merge_logo01 img', 3, {
				opacity:1,
				top:0,
				ease:Power3.easeIn,
			}).to('.main_section01 .section01_merge_logo02 img', 3, {
				delay:0.5,
				top:0,
				opacity:1,
				ease:Power3.easeIn,
			}).to('.main_section01 .merge_logo', 3, {
				delay:1.5,
				top:(document.querySelector('.pureal_logo').clientHeight/100)*45,
				ease:Power3.easeIn,
			}).to('.main_section01 .merge_logo img', 3, {
				scale:1.1,
				ease:Power3.easeIn,
			}).to('.main_section01 .merge_logo', 2, {
				delay:1,
			});

			var scene_1st_section = new ScrollMagic.Scene({
				triggerElement: ".main_section01",
				offset:-200,
				duration : window.innerHeight,
			})
			.setTween(section01)
			.addTo(controller)

			scene_1st_section.on('enter',function(e){
				if(e.scrollDirection === "FORWARD"){
					$('html').animate({scrollTop: $('.pureal_infor').offset().top - 100}, 2400,function(){})
				}
			})

			var section01_text = scencd02Timeline.to('.main_section01 .merge_logo', 1.5, {
				scale:0.3,
				top:15,
				left:document.querySelector('.main_section01 .section_sub_title').scrollWidth + document.querySelector('.main_section01 .section_sub_title').offsetLeft + 165/2 ,
				ease:Power3.easeOut,
			}).add('start')
			.to('.main_section01 .pureal_infor', 1.5, {
				delay:-1,
				opacity:1,
				top:0,
				ease:Power3.easeOut,
			});
			var scene_1st_section_in_pin = new ScrollMagic.Scene({
				triggerElement: ".main_section01",
				offset:0,
				duration : window.innerHeight/2,
			})
			.setPin('.pureal_logo')
			.addTo(controller)

			var scene_1st_section_in_text = new ScrollMagic.Scene({
				triggerElement: ".main_section01",
				offset:window.innerHeight/2.5,
				duration : window.innerHeight/2.5,
			})
			.setTween(section01_text)
			.addTo(controller)
            		
            $(window).on("resize", function() {
                scene_1st_section.refresh();
            });
		}


		// function scene02(){
		// 	var pageHeight = window.innerHeight*3;
		// 	var contentLength = 5;
		// 	var content = document.querySelectorAll('.pureal_circle_item');

		// 	var scene02_bottom = new ScrollMagic.Scene({
		// 		triggerHook:1,
		// 		offset:document.querySelector('.main_section01').offsetHeight - 50,
		// 		triggerElement:'.main_section01',
		// 		duration:pageHeight*1,
		// 	})
		// 		.setPin('.main_section01', {pushFollowers: true})
		// 		.addTo(controller_hook01)
		// 	gsap.set('.main_section01 .line', {opacity:0 , scale:0});
		// 	gsap.set('.main_section01 .text_box h2', {opacity:0});
		// 	gsap.set('.main_section01 .text_box p', {opacity:0});
		// 	for(var i = 0; i < contentLength; i ++){
		// 		function anonFunc(ii){
		// 			var contentScene = new ScrollMagic.Scene({
		// 				triggerElement:'.main_section01',
		// 				triggerHook : 1,
		// 				offset: (pageHeight/4)*ii + (pageHeight/contentLength)*2,
		// 				duration:(pageHeight/4)
		// 			})
		// 				.addTo(controller)
		// 				.setClassToggle(content[ii], "on")
		// 				// .addIndicators({name:'content '+ii+' ::'})
					
		// 			contentScene.on('enter',function(e){init('in', ii)})
		// 			contentScene.on('leave',function(e){init('out', ii)})

		// 			function init(type, idx){
		// 				killAni(idx);
		// 				if(type === 'in'){
		// 					gsap.set(content[idx].querySelector('.line'), {opacity:0 , scale:1});
		// 					// gsap.set(content[idx].querySelector('.text_box'), {opacity:0 , y:40});
		// 					gsap.set(content[idx].querySelector('.text_box h2'), {opacity:0 , y:40});
		// 					gsap.set(content[idx].querySelector('.text_box p'), {opacity:0 , y:40});
		// 					inAni(idx)
		// 				}else{
		// 					gsap.set(content[idx].querySelector('.line'), {opacity:1 , scale:1});
		// 					// gsap.set(content[idx].querySelector('.text_box'), {opacity:0 , y:0});
		// 					gsap.set(content[idx].querySelector('.text_box h2'), {opacity:0 , y:0});
		// 					gsap.set(content[idx].querySelector('.text_box p'), {opacity:0 , y:0});
		// 					outAni(idx)
		// 				}
		// 			}

		// 			function killAni(idx){
		// 				gsap.killTweensOf(content[idx].querySelector('.line'));
		// 				// gsap.killTweensOf(content[idx].querySelector('.text_box'));
		// 				gsap.killTweensOf(content[idx].querySelector('.text_box h2'));
		// 				gsap.killTweensOf(content[idx].querySelector('.text_box p'));
		// 			}

		// 			function inAni(idx){
		// 				gsap.to(content[idx].querySelector('.line'), 1.6, {opacity:0.8 , scale:1});
		// 				// gsap.to(content[idx].querySelector('.text_box'), 0.6, {opacity:1 , y:0});
		// 				gsap.to(content[idx].querySelector('.text_box h2'), 0.9, {opacity:1 , y:0, delay:0.3});
		// 				gsap.to(content[idx].querySelector('.text_box p'), 0.9, {opacity:1 , y:0, delay:0.4});
		// 			}
					
		// 			function outAni(idx){
		// 				gsap.to(content[idx].querySelector('.line'), 1.2, {opacity:0 , scale:1.2});
		// 				// gsap.to(content[idx].querySelector('.text_box'), 0.6, {opacity:0 , y:-40});
		// 				gsap.to(content[idx].querySelector('.text_box h2'), 0.6, {opacity:0 , y:-40});
		// 				gsap.to(content[idx].querySelector('.text_box p'), 0.6, {opacity:0 , y:-40});
		// 			}
		// 		}
		// 		anonFunc(i)
		// 	}

		// }

		function newScene02(){
			gsap.set('.icon_box01', {x:0})
			gsap.set('.icon_box02', {x:0})
			gsap.set('.icon_box04', {x:0})
			gsap.set('.icon_box05', {x:0})

			var section02Ani = 
				gsap.timeline()
				.add('icon_union')
				.to('.icon_box01', 0.5, {x:80},'icon_union')
				.to('.icon_box02', 0.5, {x:40},'icon_union')
				.to('.icon_box04', 0.5, {x:-40},'icon_union')
				.to('.icon_box05', 0.5, {x:-80},'icon_union')
			

			var section02Scene = new ScrollMagic.Scene({
				triggerElement:'.pureal_circle',
				offset: 50,
			})
				.setTween(section02Ani)
				.addTo(controller)
				// .addIndicators({name:'new'})
		}

		function scene03(){
			var duration = window.innerHeight/2;
			var spaceBetween = 322;
			var idx = 3;
			var sectionHeight = duration + spaceBetween;
			_pageScrollSection02_infor.p_h = duration+spaceBetween;
			_pageScrollSection02_infor.s_b = spaceBetween;
			_pageScrollSection02_infor.idx = idx;

			var scene03_wrap = new ScrollMagic.Scene({
				triggerElement:".main_section02",
				triggerHook:1
			})
				.addTo(controller)
				// .addIndicators({
				// name: "prd01",
				// colorStart: "#000",
				// colorEnd: "#000"
				// })

			scene03_wrap.on('enter',function(event){
			    if(event.scrollDirection == 'FORWARD'){
			        $('html').animate({scrollTop: $('.main_section02').offset().top}, 800, function(){})
			    }
			})

			var textBlockHeight = 322;
			var half_window = window.innerHeight/2;
			var section02Height = document.querySelector('.main_section02').offsetHeight;
			// scene03 bg pin

			var scene03_quick = new ScrollMagic.Scene({
				offset:half_window,
				triggerElement:'.main_section02',
				duration:half_window*3+textBlockHeight*2,
			})
			.setPin('.side_quick',{pushFollowers: true})
			.addTo(controller)
			// .addIndicators({
			//     name: "prd01",
			//     colorStart: "#000",
			//     colorEnd: "#000"
			// })

			var scene03_right = new ScrollMagic.Scene({
				offset:half_window,
				triggerElement:'.main_section02',
				duration:half_window*3+textBlockHeight*2+800,
			})
			.setPin('.right_area',{pushFollowers: true})
			.addTo(controller)
			// .addIndicators({
			//     name: "prd01",
			//     colorStart: "#000",
			//     colorEnd: "#000"
			// })

			scene03_quick.on('enter',function(e){
				// console.log('s3_enter!')
				pageScrollSection02 = true;
			})
			scene03_quick.on('leave',function(e){
				// console.log('s3_leave!')
				pageScrollSection02 = false;
			})

			var startPosition = scene03_quick.scrollOffset();
			var endPosition = scene03_quick.scrollOffset() + scene03_quick.duration() ;
			_pageScrollSection02_infor.s_p = startPosition;
			_pageScrollSection02_infor.e_p = endPosition;

			var scene03_quick01 = new ScrollMagic.Scene({
				triggerElement:'.main_section02',
				duration:half_window*2,
			})
			.setClassToggle('.side_quick .quick01','on')
			.addTo(controller)
			// .addIndicators({
			//     name: "prd01",
			//     colorStart: "#ff0000",
			//     colorEnd: "#ff0000"
			// })

			var scene03_prd01 = new ScrollMagic.Scene({
				triggerElement:'.main_section02',
				duration:half_window*2,
			})
			.setClassToggle('.right_area .prd_block01','on')
			.addTo(controller)
			// .addIndicators({
			//     name: "prd01",
			//     colorStart: "#ff0000",
			//     colorEnd: "#ff0000"
			// })
			var scene03_text01 = new ScrollMagic.Scene({
				triggerElement:'.main_section02',
				duration:half_window*2,
			})
			.setClassToggle('.left_area .text_block01','on')
			.addTo(controller)
			// .addIndicators({
			//     name: "pin01",
			//     colorStart: "#ff0000",
			//     colorEnd: "#ff0000"
			// })
			scene03_text01.on('leave',function(e){
				setTimeout(function(){
					document.querySelector('.left_area .text_block01').classList.add('on')
				},100)
			})


			var scene03_bg01 = new ScrollMagic.Scene({
				triggerElement:'.main_section02',
				duration:half_window*2,
			})
			.setClassToggle('.main_section02','product01')
			.addTo(controller)
			// .addIndicators({
			//     name: "pin01",
			//     colorStart: "#ff0000",
			//     colorEnd: "#ff0000"
			// })
			var scene03_left01 = new ScrollMagic.Scene({
				offset:half_window,
				triggerElement:'.main_section02',
				duration:half_window,
			})
			.setPin('.left_area',{pushFollowers: true})
			.addTo(controller)
			// .addIndicators({
			//     name: "pin01_left",
			//     colorStart: "#ff0000",
			//     colorEnd: "#ff0000"
			// })

			var scene03_quick02 = new ScrollMagic.Scene({
				offset:half_window*2,
				triggerElement:'.main_section02',
				duration:half_window+textBlockHeight,
			})
			.setClassToggle('.side_quick .quick02','on')
			.addTo(controller)
			// .addIndicators({
			//     name: "pin02",
			//     colorStart: "#00ff00",
			//     colorEnd: "#00ff00"
			// })
			var scene03_prd02 = new ScrollMagic.Scene({
				offset:half_window*2,
				triggerElement:'.main_section02',
				duration:half_window+textBlockHeight,
			})
			.setClassToggle('.right_area .prd_block02','on')
			.addTo(controller)
			// .addIndicators({
			//     name: "pin02",
			//     colorStart: "#00ff00",
			//     colorEnd: "#00ff00"
			// })
			var scene03_text02 = new ScrollMagic.Scene({
				offset:half_window*2,
				triggerElement:'.main_section02',
				duration:half_window+textBlockHeight,
			})
			.setClassToggle('.left_area .text_block02','on')
			.addTo(controller)
			// .addIndicators({
			//     name: "pin02",
			//     colorStart: "#00ff00",
			//     colorEnd: "#00ff00"
			// })
		
			scene03_text02.on('enter',function(){
				setTimeout(function(){
					document.querySelector('.left_area .text_block01').classList.remove('on')
				},100)
			})

			var scene03_bg02 = new ScrollMagic.Scene({
				offset:half_window*2,
				triggerElement:'.main_section02',
				duration:half_window+textBlockHeight,
			})
			.setClassToggle('.main_section02','product02')
			.addTo(controller)
			// .addIndicators({
			//     name: "pin02",
			//     colorStart: "#00ff00",
			//     colorEnd: "#00ff00"
			// })
			var scene03_left02 = new ScrollMagic.Scene({
				offset:half_window*2+textBlockHeight,
				triggerElement:'.main_section02',
				duration:half_window,
			})
			.setPin('.left_area',{pushFollowers: true})
			.addTo(controller)
			// .addIndicators({
			//     name: "pin02_left",
			//     colorStart: "#00ff00",
			//     colorEnd: "#00ff00"
			// })


			var scene03_quick03 = new ScrollMagic.Scene({
				offset:half_window*3+textBlockHeight,
				triggerElement:'.main_section02',
				duration:half_window*2,
			})
			.setClassToggle('.side_quick .quick03','on')
			.addTo(controller)
			// .addIndicators({
			//     name: "pin03",
			//     colorStart: "#0000ff",
			//     colorEnd: "#0000ff"
			// })
			var scene03_prd03 = new ScrollMagic.Scene({
				offset:half_window*3+textBlockHeight,
				triggerElement:'.main_section02',
				duration:half_window*2,
			})
			.setClassToggle('.right_area .prd_block03','on')
			.addTo(controller)
			// .addIndicators({
			//     name: "pin03",
			//     colorStart: "#0000ff",
			//     colorEnd: "#0000ff"
			// })
			var scene03_text03 = new ScrollMagic.Scene({
				offset:half_window*3+textBlockHeight,
				triggerElement:'.main_section02',
				duration:half_window*2,
			})
			.setClassToggle('.left_area .text_block03','on')
			.addTo(controller)
			// .addIndicators({
			//     name: "pin03",
			//     colorStart: "#0000ff",
			//     colorEnd: "#0000ff"
			// })

			scene03_text02.on('enter',function(e){
                console.log('chk')
				if(e.scrollDirection === "FORWARD"){
					$('html').animate({scrollTop: $('.main_section02').offset().top + half_window*2+textBlockHeight}, 1000)
				}
			})

			scene03_text03.on('enter',function(e){
				if(e.scrollDirection === "FORWARD"){
					$('html').animate({scrollTop: $('.main_section02').offset().top + half_window*3+textBlockHeight}, 1000)
				}
			})

			var scene03_bg03 = new ScrollMagic.Scene({
				offset:half_window*3+textBlockHeight,
				triggerElement:'.main_section02',
				duration:half_window*2,
			})
			.setClassToggle('.main_section02','product03')
			.addTo(controller)
			// .addIndicators({
			//     name: "pin03",
			//     colorStart: "#0000ff",
			//     colorEnd: "#0000ff"
			// })
			var scene03_left03 = new ScrollMagic.Scene({
				offset:half_window*3+textBlockHeight*2,
				triggerElement:'.main_section02',
				duration:half_window+800,
			})
			.setPin('.left_area',{pushFollowers: true})
			.addTo(controller)
			// .addIndicators({
			//     name: "pin03_left",
			//     colorStart: "#0000ff",
			//     colorEnd: "#0000ff"
			// })
		}

		// function onePage(){
		// 	var screen_h = 0;
		// 	var last_y = 0;
		// 	var isScroll = false;        
		// 	var target = document.querySelector('html');

		// 	target.addEventListener('wheel',function(e){
		// 		if(pageScrollSection01){
		// 			pageScroll = false;
		// 			if(pageScroll) return;

		// 			pageScroll = true;
		
		// 			e.preventDefault();
		// 			e.stopPropagation();
		
		// 			if(isScroll) return;
		// 			isScroll = true;
		// 			var direction = e.deltaY;
		// 			var y = 0;
		// 			if(direction < 0){
		// 				// up
		// 				// console.log('up')
		// 				_pageScrollSection01_infor.c_idx --;
		// 				if(_pageScrollSection01_infor.c_idx < 0){_pageScrollSection01_infor.c_idx = -1;}
		// 				y = _pageScrollSection01_infor.s_p + _pageScrollSection01_infor.c_idx * _pageScrollSection01_infor.p_h - (_pageScrollSection01_infor.s_b/2);
		// 			}else{
		// 				// down
		// 				// console.log('down')
		// 				_pageScrollSection01_infor.c_idx ++;
		// 				if(_pageScrollSection01_infor.c_idx > _pageScrollSection01_infor.idx){
		// 					_pageScrollSection01_infor.c_idx = _pageScrollSection01_infor.idx;
		// 				}
		// 				y = _pageScrollSection01_infor.s_p + _pageScrollSection01_infor.c_idx * _pageScrollSection01_infor.p_h - (_pageScrollSection01_infor.s_b/2);
		// 			}
		// 			// console.log(`스크롤 진행 방향은 ${direction < 0 ? '상' : '하'}
		// 			// // 전체 페이지는 ${_pageScrollSection01_infor.idx} 페이지가 있으며,
		// 			// // 현재 페이지는 ${_pageScrollSection01_infor.c_idx-1} 페이지 입니다.
		// 			// // 이동할 페이지는 ${_pageScrollSection01_infor.c_idx} 페이지 입니다.
		// 			// // 움직임 시작점은 ${_pageScrollSection01_infor.s_p}px 이며
		// 			// // 각 섹션의 높이는 ${_pageScrollSection01_infor.p_h}입니다.
		// 			// // 최종적으로 ${_pageScrollSection01_infor.s_p + _pageScrollSection01_infor.c_idx * _pageScrollSection01_infor.p_h - (_pageScrollSection01_infor.s_b/2)} 위치로 이동합니다.
		// 			// // ${_pageScrollSection01_infor.c_idx == _pageScrollSection01_infor.idx && direction > 0}
		// 			// // `)

		// 			if(_pageScrollSection01_infor.c_idx == _pageScrollSection01_infor.idx && direction > 0){
		// 				// console.log(`마지막 페이지에 도달했습니다. 다음 섹션으로 넘깁니다.`)
		// 				y = _pageScrollSection01_infor.e_p+window.innerHeight + 180;
		// 				getCidx(_pageScrollSection01_infor)
		// 				getCidx(_pageScrollSection02_infor)
		// 				pageScrollSection01 = false;
		// 				pageScrollSection02 = true;
		// 			}

		// 			if(_pageScrollSection01_infor.c_idx == 0){
		// 				y += (_pageScrollSection01_infor.s_b/2)
		// 			}

		// 			$('html').animate({scrollTop: y}, 1500, function(){
		// 				isScroll = false;
		// 				// console.log(y,window.pageYOffset,_pageScrollSection01_infor.c_idx);
		// 				// console.log('이동이 끝났습니다.')
		// 			});
		// 		}

		// 		if(pageScrollSection02){
		// 			pageScroll = false;
		// 			if(pageScroll) return;

		// 			pageScroll = true;
		
		// 			e.preventDefault();
		// 			e.stopPropagation();
		
		// 			if(isScroll) return;
		// 			isScroll = true;
		// 			var direction = e.deltaY;
		// 			var y = 0;
		// 			if(direction < 0){
		// 				// up
		// 				// console.log('up')
		// 				_pageScrollSection02_infor.c_idx --;
		// 				if(_pageScrollSection02_infor.c_idx < 0){_pageScrollSection02_infor.c_idx = -1;}
		// 				y = _pageScrollSection02_infor.s_p + _pageScrollSection02_infor.c_idx * _pageScrollSection02_infor.p_h + _pageScrollSection02_infor.s_b;
		// 			}else{
		// 				// down
		// 				// console.log('down')
		// 				_pageScrollSection02_infor.c_idx ++;
		// 				if(_pageScrollSection02_infor.c_idx > _pageScrollSection02_infor.idx){
		// 					_pageScrollSection02_infor.c_idx = _pageScrollSection02_infor.idx;
		// 				}
		// 				y = _pageScrollSection02_infor.s_p + _pageScrollSection02_infor.c_idx * _pageScrollSection02_infor.p_h + _pageScrollSection02_infor.s_b;
		// 			}
		// 			// console.log(`
		// 			// // 현재 실행중인 풀페이지는 02번 풀페이지입니다.
		// 			// // 스크롤 진행 방향은 ${direction < 0 ? '상' : '하'}
		// 			// // 전체 페이지는 ${_pageScrollSection02_infor.idx} 페이지가 있으며,
		// 			// // 현재 페이지는 ${_pageScrollSection02_infor.c_idx-1} 페이지 입니다.
		// 			// // 이동할 페이지는 ${_pageScrollSection02_infor.c_idx} 페이지 입니다.
		// 			// // 움직임 시작점은 ${_pageScrollSection02_infor.s_p}px 이며
		// 			// // 각 섹션의 높이는 ${_pageScrollSection02_infor.p_h}입니다.
		// 			// // 최종적으로 ${_pageScrollSection02_infor.s_p + _pageScrollSection02_infor.c_idx * _pageScrollSection02_infor.p_h + _pageScrollSection02_infor.s_b} 위치로 이동합니다.
		// 			// // ${_pageScrollSection02_infor.c_idx == _pageScrollSection02_infor.idx && direction > 0}
		// 			// // `)

		// 			if(_pageScrollSection02_infor.c_idx == -1){
		// 				y = _pageScrollSection01_infor.e_p - _pageScrollSection01_infor.p_h + 150;
		// 			}

		// 			if(_pageScrollSection02_infor.c_idx == _pageScrollSection02_infor.idx && direction > 0){
		// 				// console.log(`마지막 페이지에 도달했습니다. 다음 섹션으로 넘깁니다.`)
		// 				getCidx(_pageScrollSection01_infor)
		// 				getCidx(_pageScrollSection02_infor)
		// 				y = _pageScrollSection02_infor.e_p + window.innerHeight - _pageScrollSection02_infor.s_b/2;
						
		// 			}

		// 			$('html').animate({scrollTop: y}, pageSpeed, function(){
		// 				isScroll = false;
		// 				// console.log(y,window.pageYOffset,_pageScrollSection02_infor.c_idx);
		// 				// console.log('이동이 끝났습니다.')
		// 			});
		// 		}
		// 	}, {passive: false}) 
		// }
		// gsap.set('.wave_img', {scale:3})
		// var waveImgScale = gsap.to('.wave_img', 0.5, {scale:1})
		// var waveImgScene = new ScrollMagic.Scene({
		// 	triggerElement: '.wave_container',
		// 	triggerHook:1,
		// 	duration:window.innerHeight
		// })
		// 	// .setTween(waveImgScale)
		// 	.addTo(controller)

		// waveImgScene.on('enter',function(event){
		// 	if(event.scrollDirection == 'FORWARD'){
		// 		$('html').animate({scrollTop: $('.wave_container').offset().top}, 800, function(){})
		// 	}
		// })
	}
}
