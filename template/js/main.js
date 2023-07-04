$(document).ready(function () {

$.fn.serializeObject = function () {
        "use strict";

        var result = {};
        var extend = function (i, element) { 
            var node = result[element.name];
            if ('undefined' !== typeof node && node !== null) {
                if ($.isArray(node)) {
                    node.push(element.value);
                } else {
                    result[element.name] = [node, element.value];
                }
            } else {
                result[element.name] = element.value;
            }
        };
        $.each(this.serializeArray(), extend);

        return result;
        };



        function serializeForm(form) {
            var data = form.serializeObject();
            return data;
        };
	
$('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;
  
    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
  
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
        //if ($this.children('option').eq(i).is(':selected')){
        //  $('li[rel="' + $this.children('option').eq(i).val() + '"]').addClass('is-selected')
        //}
    }
  
    var $listItems = $list.children('li');
  
    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });
  
    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
		
		if( $this.parents('form').hasClass('js-afisha-l-filter') ){
			updateEventList('left');
// 			console.log('update left')
		} else{
			updateEventList('right');
// 			console.log('update right')
		}
		
		
		
        //console.log($this.val());
    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});



var quoteSwiper = new Swiper('.quote-slider-index', {
	direction: "vertical",
	effect: "slide",
	//autoHeight: true,
	loop: false, 
	allowTouchMove: true,
  });
  
  
  var $Speed = 1000;
  
  var imageSwiper = new Swiper('.image-slider-index', {
	mousewheel: true,
	speed: $Speed,
	loop: false, 
	longSwipesRatio: 0.01,
	followFinger: true,
	grabCursor: true, 
	watchSlidesProgress: true,
	parallax: true,
	lazy: {
		  loadPrevNext: true,
	  },
	navigation: {
	  nextEl: '.index-slider .swiper-button-next',
	  prevEl: '.index-slider .swiper-button-prev',
	},
	pagination: {
		el: '.index-slider .swiper-pagination',
		type: 'bullets',
		clickable: true
	  },
	  breakpoints: {
		100: {
			mousewheel: false,
		},
		1024: {
			mousewheel: true,
		},
	},
  });
  
  imageSwiper.controller.control = quoteSwiper;
  quoteSwiper.controller.control = imageSwiper;


	/* Start Cookie */
	function getCookie(e) {
		var i = document.cookie.match(new RegExp("(?:^|; )" + e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
			"=([^;]*)"));
		return i ? decodeURIComponent(i[1]) : void 0
	}

	function setCookie(e, i, t) {
		console.log(111)
		var s = (t = t || {}).expires;
		if ("number" == typeof s && s) {
			var o = new Date;
			o.setTime(o.getTime() + 1e3 * s),
				s = t.expires = o
		}
		s && s.toUTCString && (t.expires = s.toUTCString());
		var r = e + "=" + (i = encodeURIComponent(i));
		for (var n in t) {
			r += "; " + n;
			var a = t[n];
			!0 !== a && (r += "=" + a)
		}
		document.cookie = r
	}

	function deleteCookie(e) {
		setCookie(e, "", {
			expires: -1
		})
	}

	!getCookie('cookie-hide') && $('.cookie-box').delay(1000).slideDown(200);

	$(document).on('touchstart, click', '.cookie-box__btn', function (e) {
		setCookie('cookie-hide', !0, {
			expires: new Date((new Date).getTime() + 2678e9).toUTCString(),
			path: '/'
		});
		$('.cookie-box').slideUp(200);
	});

	/* End Cookie */



    //popups
	function ppShow(dataPp) {
		$('html,body').addClass('noscroll');
		$('.pp').removeClass('show');
		$('.pp[data-pp="' + dataPp + '"]').addClass('show');
		$('.pp[data-pp="' + dataPp + '"]').trigger('click');
	}

	function sidebarShow(dataPp) {
		$('html,body').addClass('noscroll');
		$('.sidebar').removeClass('show');
		$('.sidebar-back').removeClass('show');
		$('.sidebar[data-sb="' + dataPp + '"]').addClass('show');
		$('.sidebar-back').addClass('show');
	}

	$(document).on("click", ".pp_", function (e) {
		e.preventDefault();
		var el = $(this);
		var th_pp = el.attr('data-pp');

		ppShow(th_pp);

	});

	$(document).on("click", ".sb_", function (e) {
		e.preventDefault();
		var el = $(this);
		var th_pp = el.attr('data-sb');

		sidebarShow(th_pp);

	});


	$(document).on('click', ".pp__close, .pp__bg, .close_btn, .js-close-pp, .sidebar-back", function () {
		ppClose();
		sidebarClose();

	});

	document.onkeydown = function (evt) {
		evt = evt || window.event;
		if (evt.keyCode === 27) {
			ppClose();
			sidebarClose();
		}
	};

    function sidebarClose() {
        $('.sidebar-back').removeClass('show');
		$('.sidebar').removeClass('show');
        $('html,body').removeClass('noscroll');
    
    }

	function ppClose() {
        $('.pp').removeClass('show');
        $('html,body').removeClass('noscroll');
    
    }

    
	$(document).on('click', '.js-pageup', function () {
		$('html, body').stop().animate(
			{
				scrollTop: 0, 
			},
			1000
		);
	});




	//burger

	$(document).on('click', '.header-burger', function () {
		$('.mm-wrapper').toggleClass('active');
		$(this).toggleClass('active');
	});
 
	$(document).on('click', '.mm-menu-inner a', function () {
		$('.mm-wrapper').removeClass('active');
		$('.header-burger').removeClass('active');
	});



	//header menu
	function headerscroll() {
		let lastScrollTop = 500;
		$(window).scroll(function() {
			let st = $(this).scrollTop();
			if(st > lastScrollTop) {
				$('.mobile-menu').addClass('show');
				lastScrollTop = st;
			} else {
				if(st <= 200) {
					//$('.mobile-menu').removeClass('show').fadeIn();
				} else {
				// 	$('.header').addClass('hide').fadeOut();
				}
				lastScrollTop = st;
			}
		});
	};
	headerscroll();




	// anchor function
	$("a").click(function (e) {
		try {
			let elementClick = $(this).attr("href");
			let destination = $(elementClick).offset().top;
			if (destination) {

				$('.mm-wrapper').removeClass('active');
				$('.header-burger').removeClass('active');

				let scrollCorrection = 60;
				if (window.innerWidth >= 1024) {
					scrollCorrection = 0
				}
				$('html,body').animate({
					scrollTop: (destination - scrollCorrection)
				}, 1000);

			}
			return false;
		} catch (e) { console.log(e) }

	});
	
	
	$(document).on('click', '.js-l-afisha-more', function () {
		var data = {};
		var th_form = $('.js-afisha-l-filter');
		var th_content_box = $('.js-afisha-l-list');
		var th_more_button = $('.js-l-afisha-more').parent();
		var emptybox = th_content_box.parent().find('.empty-box');
		
		data = serializeForm(th_form);
		data['pak_action'] = 'more-l-events';
// 		console.log(data);
		
		$.ajax({
				url: [
					location.protocol,
					'//', 
					location.host,
					location.pathname
				].join(''),
				data: data,
				type: 'post',
				dataType: 'json',
				beforeSend: function(){
					th_content_box.addClass('loading');
				},
				success: function (response) {
					if (response.success) {
						if( response.nextpage == 2 ){
							th_content_box.html('');
						}
						if( response.elements == '0' ){
							th_content_box.html('');
							th_more_button.hide();
							emptybox.show();
							
							
						} else {
							th_form.find('input[name="page"]').val(response.nextpage);
							th_content_box.append(response.elements);
							emptybox.hide();
							
							var elements_length = th_content_box.find('.afisha-item').length;
							if( elements_length >= response.total){
								th_more_button.hide();
							} else {
								var total_text = response.total-elements_length;
								$('.js-list-total').text('('+ total_text +')')
								th_more_button.show();
							}
						}
		
					} else {
						console.log('error ajax')
					}
				},
				error: function () {
					console.log('error ajax')
				},
				complete: function(){
				th_content_box.removeClass('loading');
				
					
				}
			});
	});
	
	var d1 = new Date();
    d1 = d1.getMonth();
    
    var months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
    
    $('.select-options li[rel='+months[d1]+']').trigger('click');

	
	$('.js-l-afisha-more').trigger('click');
	
	
	
	
	$(document).on('click', '.js-r-afisha-more', function () {
		var data = {};
		var th_form = $('.js-afisha-r-filter');
		var th_content_box = $('.js-afisha-r-list');
		var th_more_button = $('.js-r-afisha-more').parent();
		var emptybox = th_content_box.parent().find('.empty-box');
		
		data = serializeForm(th_form);
		data['pak_action'] = 'more-r-events';
// 		console.log(data);
		
		$.ajax({
				url: [
					location.protocol,
					'//', 
					location.host,
					location.pathname
				].join(''),
				data: data,
				type: 'post',
				dataType: 'json',
				beforeSend: function(){
					th_content_box.addClass('loading');
				},
				success: function (response) {
					if (response.success) {
						if( response.nextpage == 2 ){
							th_content_box.html('');
						}
						if( response.elements == '0' ){
							th_content_box.html('');
							th_more_button.hide();
							emptybox.show();
							
							
						} else {
							th_form.find('input[name="page"]').val(response.nextpage);
							th_content_box.append(response.elements);
							emptybox.hide();
							
							var elements_length = th_content_box.find('.afisha-item').length;
							if( elements_length >= response.total){
								th_more_button.hide();
							} else {
								var total_text = response.total-elements_length;
								$('.js-list-total').text('('+ total_text +')')
								th_more_button.show();
							}
						}
		
					} else {
						console.log('error ajax')
					}
				},
				error: function () {
					console.log('error ajax')
				},
				complete: function(){
				th_content_box.removeClass('loading');
				
					
				}
			});
	});
	
	$('.js-r-afisha-more').trigger('click');
	
	
	
	function updateEventList(who){
		if( who == 'left' ){
			$('.js-afisha-l-filter').find('input[name="page"]').val('1');
			$('.js-l-afisha-more').click();
		}
		
		if( who == 'right' ){
			$('.js-afisha-r-filter').find('input[name="page"]').val('1');
			$('.js-r-afisha-more').click();
		}
	}
	
	
	
$(document).on('click', ".js-ajax-get", function () {
   var th_link = $(this).attr('data-link');
   var th_id = $(this).attr('data-id');

	$('.js-sb-content-box').addClass('loading');

	$.ajax({
		url:th_link,
		type:'GET', 
		success: function(data){
			$('.js-sb-content-box').removeClass('loading');
			$('.js-sb-content-box').html(data);

			window.location.hash = "event-"+th_id;

		},
		error: function(){
			$('.js-sb-content-box').removeClass('loading');
			$('.js-sb-content-box').html('<div class="content-error">Странно, но случилась ошибка при получении контента, попробуйте открыть событие еще раз =(</div>');
		},
		complete: function(){
			$('.js-sb-content-box').removeClass('loading');
		},

	});
});






	//history swiper

	var historySwiper1 = new Swiper('.history-l-slider-swiper', {
		effect: "slide",
		//autoHeight: true,
		loop: false, // Not recommended to enable!!!
		allowTouchMove: true,
		navigation: {
		  nextEl: '.history-l-slider .swiper-button-next',
		  prevEl: '.history-l-slider .swiper-button-prev',
		},
	  });
	  
	  
	  var $Speed = 1000;
	  
	  var historySwiper12 = new Swiper('.history-r-slider-swiper', {
		mousewheel: false,
		speed: $Speed,
		loop: false, // Not recommended to enable!!!
		longSwipesRatio: 0.01,
		followFinger: true,
		grabCursor: true, 
		watchSlidesProgress: true,
		parallax: true,
		lazy: {
			  loadPrevNext: true,
		  },
		navigation: {
		  nextEl: '.history-r-slider .swiper-button-next',
		  prevEl: '.history-r-slider .swiper-button-prev',
		},
		on: {
			init: function (swiper) {
			 // console.log(swiper);
			},
			activeIndexChange: function (swiper) {
				console.log(swiper.activeIndex);
				$('.hostory-l-timeline .timeline-item').removeClass('active')
				$('.hostory-l-timeline .timeline-item:eq('+swiper.activeIndex+')').addClass('active')
			  },
		  },

	  });
	  
	  historySwiper12.controller.control = historySwiper1;
	  historySwiper1.controller.control = historySwiper12;

//full height leftside

$(window).scroll(function () {
	if ($('.page-left-content').length && $(window).outerWidth() >= 1280) {
		var th_height = $(window).outerHeight() - $('.page-news-meta').outerHeight();
		var th_header_height_on_screen = $(window).scrollTop() - $('.header').outerHeight();
		console.log(th_header_height_on_screen);

		var header_offset_correct = 0;

		console.log(header_offset_correct);

		if ($(window).scrollTop() - $('.header').outerHeight() < 0) {
			header_offset_correct = th_header_height_on_screen;
		}

		$('.page-left-content').css('height', th_height + header_offset_correct);
	}
});


//news page slider

var newsSlider = new Swiper('.news-page-slider-swiper', {
	mousewheel: false,
	speed: 1000,
	slidesPerView: 1,
  spaceBetween: 100,

	loop: false, // Not recommended to enable!!!
	longSwipesRatio: 0.01,
	followFinger: true,
	grabCursor: true, 
	watchSlidesProgress: true,
	parallax: true,
	navigation: {
	  nextEl: '.news-page-navigation .swiper-button-next',
	  prevEl: '.news-page-navigation .swiper-button-prev',
	},
	pagination: {
		el: ".news-page-pagination",
		type: "fraction",
	  },

  });

$(document).on('click', '.timeline-item', function () {
	var th_index = $(this).index();
	console.log(th_index);
	historySwiper12.slideTo(th_index, 1000)
	
});


	$(document).on('click', '.js-news-more', function () {
		var data = {};
		var th_form = $('.js-news-form');
		var th_content_box = $('.news-list');
		var th_more_button = $('.js-news-more').parent();
		//var emptybox = th_content_box.parent().find('.empty-box');
		
		data = serializeForm(th_form);
		data['pak_action'] = 'more-news';
// 		console.log(data);
		
		$.ajax({
				url: [
					location.protocol,
					'//', 
					location.host,
					location.pathname
				].join(''),
				data: data,
				type: 'post',
				dataType: 'json',
				beforeSend: function(){
					th_content_box.addClass('loading');
				},
				success: function (response) {
					if (response.success) {
						if( response.nextpage == 2 ){
							th_content_box.html('');
						}
						if( response.elements == '0' ){
							th_content_box.html('');
							th_more_button.hide();
						//	emptybox.show();
							
							
						} else {
							th_form.find('input[name="page"]').val(response.nextpage);
							th_content_box.append(response.elements);
							//emptybox.hide();
							
							var elements_length = th_content_box.find('.news-list-item').length;
							if( elements_length >= response.total){
								th_more_button.hide();
							} else {
								var total_text = response.total-elements_length;
								//$('.js-list-total').text('('+ total_text +')')
								th_more_button.show();
							}
						}
		
					} else {
						console.log('error ajax')
					}
				},
				error: function () {
					console.log('error ajax')
				},
				complete: function(){
				th_content_box.removeClass('loading');
				
					
				}
			});
	});
})