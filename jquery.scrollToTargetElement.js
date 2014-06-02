/*!
 * jquery.scrollToTargetElement.js v1.1 - jQuery plugin for Smooth scroll to target elements.
 * Copyright (c) 2014 Lei Hau'oli Co.,Ltd. - https://github.com/leihauoli/jquery.scrollToTargetElement.js
 * License: MIT
 */
;(function ($) {
	var ScrollToTargetElement = function ($trigger, options) {
		this.$body = $('body');
		this.$document = $(document);
		this.$win = $(window);
		this.$trigger = $trigger;
		this.$elementTarget = $(options.selector);
		this.duration = options.duration;
		this.eventHandler = options.eventHandler;
		this.easing = options.easing;
		this.adjust = options.adjust;
		this.$elementAdjust = options.$elementAdjust;
		this.start = options.start;
		this.finish = options.finish;

		if (!this.$elementTarget.length) {
			return;
		}

		this.init();
	};
	ScrollToTargetElement.prototype = {
		init: function () {
			this.bindEvents();
		},
		bindEvents: function () {
			var _self = this;

			this.$trigger.on('click', function (e) {
				e.preventDefault();
			});
			this.$trigger.on(this.eventHandler, function () {
				_self.scrollToTargetElement();
			});
		},
		getScrollTopTarget: function () {
			var
				scrollTopTarget = this.$elementTarget.offset().top + this.adjust - this.$elementAdjust.height(),
				offsetTopLargest = this.$document.height() - this.$win.height();

			if (scrollTopTarget > offsetTopLargest) {
				scrollTopTarget = offsetTopLargest;
			}

			return scrollTopTarget;
		},
		scrollToTargetElement: function () {
			this.start();

			var
				scrollTopTarget = this.getScrollTopTarget();

			this.$body.stop().animate({
				scrollTop: scrollTopTarget
			}, this.duration, this.easing, this.finish);
		}
	};
	$.fn.scrollToTargetElement = function (settings) {
		var options = $.extend({
			selector: 'body',
			eventHandler: 'click',
			duration: 500,
			easing: 'swing',
			adjust: 0,
			$elementAdjust: $(),
			start: function () {},
			finish: function () {}
		}, settings);

		return this.each(function () {
			new ScrollToTargetElement($(this), options);
		});
	};
})(jQuery);
