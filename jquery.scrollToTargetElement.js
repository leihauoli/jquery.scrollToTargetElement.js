/*!
 * jquery.scrollToTargetElement.js v1.0 - jQuery plugin for Smooth scroll to target elements.
 * Copyright (c) 2014 Lei Hau'oli Co.,Ltd. - https://github.com/leihauoli/jquery.scrollToTargetElement.js
 * License: MIT
 */
;(function ($) {
	var ScrollToTargetElement = function ($trigger, options) {
		this.$body = $('body');
		this.$win = $(window);
		this.$trigger = $trigger;
		this.$elementTarget = $(options.selector);
		this.duration = options.duration;
		this.easing = options.easing;
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
				_self.scrollToTargetElement(e);
			});
		},
		getScrollTopTarget: function () {
			var
				scrollTopTarget = this.$elementTarget.offset().top,
				offsetTopLargest = this.$body.height() - this.$win.height();

			if (scrollTopTarget > offsetTopLargest) {
				scrollTopTarget = offsetTopLargest;
			}

			return scrollTopTarget;
		},
		scrollToTargetElement: function (e) {
			var
				scrollTopTarget = this.getScrollTopTarget();

			this.$body.stop().animate({
				scrollTop: scrollTopTarget
			}, this.duration, this.easing, this.finish);

			e.preventDefault();
		}
	};
	$.fn.scrollToTargetElement = function (settings) {
		var options = $.extend({
			selector: 'body',
			duration: 500,
			easing: 'swing',
			finish: function () {}
		}, settings);

		return this.each(function () {
			new ScrollToTargetElement($(this), options);
		});
	};
})(jQuery);
