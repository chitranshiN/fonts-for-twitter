jQuery(document).ready(function($){
	/*'use strict';*/

	/*=====  Open side elment  =====*/
	$('[data-scrpt]').on('click', function(){
		var scrpt = $(this).data('scrpt');
		$(this).toggleClass('ns-open');
		$('.' + scrpt).toggleClass('ns-open');
		$('body').toggleClass('sideEl');
		return false;
	});

	/*=====  Close side element  =====*/
	$('.closeSideElement').on('click', function(){
		$('.sideElement').removeClass('ns-open');
		$('[data-scrpt]').removeClass('ns-open');
		return false;
	});

	/*===== Close side element on body click  =====*/
	$(document).on('click', function(e) {
		if (!$(e.target).closest(".ns-open").length) {
			$('body').removeClass('sideEl');
			$('.sideElement').removeClass('ns-open');
			$('[data-scrpt]').removeClass('ns-open');
		}
	  //return false;
	});

	/*=====  Register form  =====*/
	$('.get-register').on('click', function(e){
		e.preventDefault();
		$('.login-el').slideUp();
		$('.forgot-el').slideUp();
		$('.register-el').slideDown();
		return false;
	});

	/*=====  Login form  =====*/
	$('.get-login').on('click', function(e){
		e.preventDefault();
		$('.login-el').slideDown();
		$('.register-el').slideUp();
		$('.forgot-el').slideUp()
		return false;
	});

	/*=====  Forgot form  =====*/
	$('.get-forgot').on('click', function(e){
		e.preventDefault();
		$('.login-el').slideUp();
		$('.register-el').slideUp();
		$('.forgot-el').slideDown();
		return false;
	});

	$('.ns-sideMenu > ul li.drapdown a').on('click', function(){
		$(this).parent().addClass('active').find('ul').slideToggle();
		$(this).parent().siblings('.active').find('ul').slideUp();
	});

	/*=====  Sticky Menu  =====*/
	var innerheight = $('.ns-main-menu').innerHeight();
	$(window).on('scroll', function(){
		if ( $(document).scrollTop() > 71 ) {
			$('.ns-main-menu').addClass('ns-sticky animated slideInDown fast');
			$('.innerheight').css('height', innerheight);
			$('.ns-scroll-up').addClass('ns-active');
		} else {
			$('.ns-main-menu').removeClass('ns-sticky animated slideInDown fast');
			$('.innerheight').css('height', 0);
			$('.ns-scroll-up').removeClass('ns-active');
		}
	});

	/*=====  Poptrox  =====*/
	if ( $.isFunction($.fn.poptrox) ) {
		var foo = $('.poptrox');
		foo.poptrox({
			/*usePopupCaption: true,*/
			usePopupNav: true
		});
	}

	/*=====  Counter Up  =====*/
	if ( $( '.counter' ).length ) {
		var counter = $( '.counter' );
		new Waypoint( {
			element: counter,
			handler: function() { 
				counter.each(function(index, counter){
					counterUp( counter, {
						delay: 10,
						duration: 1000,
						time: 1000
					}) 
				});
				this.destroy()
			},
			offset: 'bottom-in-view',
		} );
	}

	/*=====  Scroll Top  =====*/
	$(".ns-scroll-up").on("click", function(){
		$('html, body').animate({
			scrollTop: $(".ns-wrap").offset().top
		}, 1000);
	});

	/*=====  Team Carousel  =====*/
	$('.ns-team-carousel .owl-carousel').owlCarousel({
		autoplay: false,
		autoplayTimeout: 2500,
		smartSpeed: 2000,
		autoplayHoverPause: true,
		loop: true,
		dots: true,
		nav: false,
		margin: 30,
		mouseDrag: true,
		singleItem: true,
		/*center: true,*/
		items: 2,
		responsive: {
			0: {
				items: 1 
			},
			768: {
				items: 2
			},
			992: {
				items: 2
			}
		}

	});

	/*=====  Client Carousel  =====*/
	$('.ns-client-carousel .owl-carousel').owlCarousel({
		autoplay: false,
		autoplayTimeout: 2500,
		smartSpeed: 2000,
		autoplayHoverPause: true,
		loop: true,
		dots: false,
		nav: false,
		margin: 30,
		mouseDrag: true,
		singleItem: true,
		/*center: true,*/
		items: 2,
		responsive: {
			0: {
				items: 1 
			},
			768: {
				items: 2
			},
			992: {
				items: 2
			}
		}
	});

	/*=====  tabs active  =====*/
	$('.ns-tab li a').on( 'click', function() {
		$(this).parent().addClass('active').siblings().removeClass('active');
	});

	/*=====  Custom tabs active  =====*/
	$('.ns-faq h3').on( 'click', function() {
		if ( $(this).parent().hasClass('faq-active') ) {
			$(this).parent().removeClass('faq-active');
			$(this).parent().find('.ns-faq-meta').slideToggle();
		} else {
			$(this).parent().addClass('faq-active').siblings().removeClass('faq-active');
			$(this).parent().find('.ns-faq-meta').slideDown();
			$(this).parent().siblings().find('.ns-faq-meta').slideUp();
		}
	});

	/*=====  add Competitor url  =====*/
	$('.add-competr').on( 'click', function() {
		$(this).parent().before(`<div class="form-group col-md-12"><span><input type="text" name="name[]" class="form-control" placeholder="Competitor URL"></span></div>`);
	});

	/*=====  Ajax Base Form  =====*/
	var ajax_base = {

		get_index: 0,

		get_msg: function(obj, res, cls = 'success'){

			obj.get_index = $('.ns-msg-wrap .ns-msg').length;
			var delay_count = (obj.get_index) ? obj.get_index + 1 : 3;
			$('.ns-msg-wrap .ns-msg:last-child').addClass('active').prepend('<p class="alert alert-'+ cls +'">'+ res +'</p>');
			$('.ns-msg-wrap').append('<div class="ns-msg index-'+ obj.get_index +'"></div>');
			setTimeout(function(){
				$('.ns-msg-wrap').find('.index-'+ obj.get_index).prev().removeClass('active');
				setTimeout(function(){
					$('.ns-msg-wrap').find('.index-'+ obj.get_index).prev().remove();
				},1000);
			}, delay_count+'900');
		},

		/*=====  Dynamic Form  =====*/
		dynamic_form: function(){

			if ( $('.dynamic-form').length ) {
				var obj = this;

				$('.dynamic-form').on('submit', function(e){
					e.preventDefault();

					var form = $(this);
					var fields = form.serialize();
					var form_subject = form.data('form_subject');

					$.ajax({
						type: form.attr('method'),
						url:  '../php/phpmailer.php',
						data: fields + '&form_subject=' + form_subject,
						beforeSend: function() {
							obj.get_index = $('.ns-msg-wrap .ns-msg').length;
						},
						success: function(res){
							obj.get_msg(obj, res,'success');
							console.log('Your message has been sent.');
						},
						error: function(res) {
							obj.get_msg(obj, res,'danger');
							console.log('Something is going wrong.');
						}
					});			
				});
			}
		},

		/*=====  Newsletter  =====*/
		newsletter: function(){

			if ( $('.ns-newsletter form').length ) {
				var obj = this;

				$('.ns-newsletter form .input-group-append').on('click',function(){
					$('.ns-newsletter form button').trigger('click');
				});

				$('.ns-newsletter form').on('submit', function(e){
					e.preventDefault();

					var form = $(this);
					$.ajax({
						type: form.attr('method'),
						url:  '../php/mailchimp.php',
						data: form.serialize(),
						success: function(res){
							console.log(res);
							obj.get_msg(obj, res, 'success');
							console.log('Newsletter: You have successfully subscribed.');
						},
						error: function(res) {
							obj.get_msg(obj, res, 'danger');
							console.log('Newsletter: Somethings is going wrong');
						}
					});
				});
			}
		}
	};
	
	ajax_base.dynamic_form();
	ajax_base.newsletter();
	
}); /*=====  jQuery end  =====*/
