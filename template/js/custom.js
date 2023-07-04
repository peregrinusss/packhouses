$(document).ready(function () {
	var quoteSwiper1 = new Swiper(".quote-slider-first", {
		direction: "vertical",
		effect: "slide",
		//autoHeight: true,
		loop: false,
		allowTouchMove: true,
	});

	var $Speed = 1000;
	
	var imageSwiper1 = new Swiper(".image-slider-first", {
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
			nextEl: ".org-slider-first .swiper-button-next",
			prevEl: ".org-slider-first .swiper-button-prev",
		},
		pagination: {
			el: ".org-slider-first .swiper-pagination",
			type: "bullets",
			clickable: true,
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
	
	imageSwiper1.controller.control = quoteSwiper1;
	quoteSwiper1.controller.control = imageSwiper1;


  var quoteSwiper2 = new Swiper(".quote-slider-second", {
		direction: "vertical",
		effect: "slide",
		//autoHeight: true,
		loop: false,
		allowTouchMove: true,
	});
	
	var $Speed = 1000;
	
	var imageSwiper2 = new Swiper(".image-slider-second", {
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
			nextEl: ".org-slider-second .swiper-button-next",
			prevEl: ".org-slider-second .swiper-button-prev",
		},
		pagination: {
			el: ".org-slider-second .swiper-pagination",
			type: "bullets",
			clickable: true,
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
	
	imageSwiper2.controller.control = quoteSwiper2;
	quoteSwiper2.controller.control = imageSwiper2;


	const schemeTabs = new GraphTabs('scheme-type');


	var schemeSwiper = new Swiper(".scheme-swiper", {
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
		observeParents: true,
		observer: true,
		observeSlideChildren: true,
		navigation: {
			nextEl: " .swiper-button-next",
			prevEl: " .swiper-button-prev",
		},
	});


	class ItcTabs {
		constructor(target, config) {
			const defaultConfig = {};
			this._config = Object.assign(defaultConfig, config);
			this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
			this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
			this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
			this._eventShow = new Event('tab.itc.change');
			this._init();
			this._events();
		}
		_init() {
			this._elTabs.setAttribute('role', 'tablist');
			this._elButtons.forEach((el, index) => {
				el.dataset.index = index;
				el.setAttribute('role', 'tab');
				this._elPanes[index].setAttribute('role', 'tabpanel');
			});
		}
		show(elLinkTarget) {
			const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
			const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
			const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
			if (elLinkTarget === elLinkActive) {
				return;
			}
			elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
			elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
			elLinkTarget.classList.add('tabs__btn_active');
			elPaneTarget.classList.add('tabs__pane_show');
			this._elTabs.dispatchEvent(this._eventShow);
			elLinkTarget.focus();
		}
		showByIndex(index) {
			const elLinkTarget = this._elButtons[index];
			elLinkTarget ? this.show(elLinkTarget) : null;
		};
		_events() {
			this._elTabs.addEventListener('click', (e) => {
				const target = e.target.closest('.tabs__btn');
				if (target) {
					e.preventDefault();
					this.show(target);
				}
			});
		}
	}

	// инициализация .tabs как табов
	new ItcTabs('.tabs-info');
	new ItcTabs('.tabs-info-exp');

	$('.scheme__wrap').scrollLeft(100);

	$('#feedback_tel').inputmask("+7 (999)-999-99-99");
	$('#feedback_date').inputmask("Дата: 99 / 99 / 9999");
	$('#feedback_time').inputmask("Время: 99 : 99");

	$('#feedback_tel_1').inputmask("+7 (999)-999-99-99");
	$('#feedback_date_1').inputmask("Дата: 99 / 99 / 9999");
	$('#feedback_time_1').inputmask("Время: 99 : 99");


	// Input file
	const inputs = document.querySelectorAll('.input__file');
	if (inputs) {
		Array.prototype.forEach.call(inputs, function (input) {
			let label = input.nextElementSibling,
				labelVal = label.querySelector('.input__file-button-text').innerText;
			input.addEventListener('change', function (e) {
				let countFiles = '';
				if (this.files && this.files.length >= 1) countFiles = this.files.length;
				if (countFiles)
					// label.querySelector('.input__file-button-text').innerText = 'Выбрано файлов: ' + countFiles;
					label.querySelector('.input__file-button-text').innerText = this.files[0].name;else label.querySelector('.input__file-button-text').innerText = labelVal;
			});
		});
	}

	const selectedOptions = document.querySelectorAll('.select-options li')

	selectedOptions.forEach((el) => {
		if (!el.getAttribute('rel')) {
			el.style.display = 'none'
		}
	})

	$.validator.addClassRules("input-group", {
		require_from_group: [1, ".input-group"]
	});


	// Добавляем метод проверки, который будет возвращать true, если хотя бы одно из полей заполнено
	$.validator.addMethod('oneFieldRequired', function(value, element) {
		return $('#feedback_prog').val() !== '' || $('#feedback_file').val() !== '';
	}, '! Заполните одно из полей');


	$("#feedback_form").validate({
		errorPlacement: function(error, element) {
      if (element.attr("name") == "feedback_agree") {
        error.insertBefore(element);
      } else {
        error.insertAfter(element);
      }
    },
    rules: {
			feedback_name: "required",
			feedback_comp: "required",
			feedback_email: "required",
			feedback_tel: "required",
			feedback_title: "required",
			feedback_agree: "required",
			// feedback_prog: {
			// 	require_from_group: [1, '.input-group'],
			// },
			// feedback_file: {
			// 	require_from_group: [1, '.input-group'],
			// },
      
      // compound rule
      email: {
        required: true,
        email: true
      },
    },
    submitHandler: function(form) {
      form.reset()
    },
		messages: {
			feedback_name: "! Вы не заполнили это поле",
			feedback_comp: "! Вы не заполнили это поле",
			feedback_tel: "! Вы не заполнили это поле",
			feedback_title: "! Вы не заполнили это поле",
			// feedback_prog: {
			// 	require_from_group: "! Заполните одно из полей"
			// },
			feedback_agree: "! Вы не заполнили это поле",
			// feedback_file: {
			// 	require_from_group: "! Заполните одно из полей"
			// },
			feedback_email: {
				required: "! Вы не заполнили это поле",
				email: "! Введите корректный адрес"
			}
		}
  });



	$("#feedback_form_1").validate({
		errorPlacement: function(error, element) {
      if (element.attr("name") == "feedback_agree_1") {
        error.insertBefore(element);
      } else {
        error.insertAfter(element);
      }
    },
    rules: {
			feedback_name_1: "required",
			feedback_comp_1: "required",
			feedback_email_1: "required",
			feedback_tel_1: "required",
			feedback_title_1: "required",
			feedback_agree_1: "required",
			feedback_prog_1: {
				oneFieldRequired: true
			},
			feedback_file_1: {
				oneFieldRequired: true
			},
      
      // compound rule
      email: {
        required: true,
        email: true
      },
    },
    submitHandler: function(form) {
      form.reset()
    },
		messages: {
			feedback_name_1: "! Вы не заполнили это поле",
			feedback_comp_1: "! Вы не заполнили это поле",
			feedback_tel_1: "! Вы не заполнили это поле",
			feedback_title_1: "! Вы не заполнили это поле",
			// feedback_prog: "! Вы не заполнили это поле",
			feedback_agree_1: "! Вы не заполнили это поле",
			// feedback_file: "! Вы не заполнили это поле",
			feedback_email_1: {
				required: "! Вы не заполнили это поле",
				email: "! Введите корректный адрес"
			}
		}
  });
})
