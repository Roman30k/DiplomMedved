wideMenu = {
	create : function() {
		let mainBlock = $('.js_wide_menu');

		if (mainBlock.length) {
			let visibleElements = mainBlock.find('.visible-elements'),
				menuElements = mainBlock.find('.visible-elements span'),
				menuExtensionBlock,
				i = 0;

			menuElements.each(function () {

				let thisElement = $(this);

				if (i == 4) {

					visibleElements.after(`
					<div class="hidden-elements">
						<span class="menu-extension-button"><i class="fas fa-bars"></i></span>
						<div class="menu-extension-block"></div>
					</div>
				`);

					menuExtensionBlock = mainBlock.find('.menu-extension-block');
				}

				if (i >= 4) {
					menuExtensionBlock.append(`<span>${thisElement.html()}</span>`);
					thisElement.remove();
				}

				i++;
			});
		}
	},

	showHideMobile : function(params = {}) {

		let menuBlock = $('.js_wide_menu');

		if (menuBlock.length) {
			params.time = params.time ? params.time : 750;

			let elementWidth = menuBlock.outerWidth();

			if (menuBlock.is(':hidden')) {

				if (params.onlyHide != true) {
					menuBlock.css("margin-left", `-${elementWidth}px`).show();

					if (params.withOutAnimation == true) {
						menuBlock.css('marginLeft', "0");
					} else {
						menuBlock.animate(
							{marginLeft: "0"},
							params.time
						);
					}
				}
			} else {
				if (params.onlyShow != true) {
					if (params.withOutAnimation == true) {
						menuBlock.hide().css("margin-left", 0);
					} else {
						menuBlock.animate(
							{marginLeft: `-${elementWidth}px`},
							params.time,
							function () {
								menuBlock.hide().css("margin-left", 0);
							}
						);
					}
				}
			}
		}
	},
};

happyNewYear = {
	showPopup : (param, element) => {

		let main_element	= $('.popup'),
			overlay_element = $('.overlay');

		if (param) {
			let product_element = $(element);

			main_element.find('[name=product-id]').val(product_element.parents('.product-parent').data('id'));

			main_element.show();
			overlay_element.show();
		} else {
			main_element.hide();
			overlay_element.hide();
		}
	},

	sendOrder : () => {

	},
};

document.querySelectorAll('.js_buy').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('specsField').value = btn.dataset.specs;
  });
});

document.getElementById('orderForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  console.log("📨 Відправка форми почалась");

  const form = e.target;
  const data = new FormData(form);

  const response = await fetch('/order', {
    method: 'POST',
    body: fromData
  });

  if (response.ok) {
    console.log("✅ Успішно відправлено");
    document.getElementById('responseMessage').innerText = 'Замовлення надіслано!';
    form.reset();
  } else {
    console.log("❌ Помилка відправки");
    document.getElementById('responseMessage').innerText = 'Помилка при надсиланні.';
  }
});			

$(window).resize(function() {
	let windowWidth = $(window).width();

	if (windowWidth > 768) wideMenu.showHideMobile({onlyShow : true, withOutAnimation: true});
	if (windowWidth <= 768) wideMenu.showHideMobile({onlyHide : true, withOutAnimation: true});
});

$(document)
	.on('click', '.js_mobile_menu_open_button', function() { wideMenu.showHideMobile() })
	.on('click', '.js_close_mobile_menu', function() { wideMenu.showHideMobile() })
	.on('click', '.js_buy', function () { happyNewYear.showPopup(true, this) })
	.on('click', '.js_close-popup', function () { happyNewYear.showPopup(false) })
	.on('click', '.js_overlay', function () { happyNewYear.showPopup(false) })