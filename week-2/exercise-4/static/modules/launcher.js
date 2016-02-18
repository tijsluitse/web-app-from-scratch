'use strict'

var launcher = (function() {

	var init = function() {
		loader.spinner();
		routes.init();
		search();
		gestures.swipe();
	}

	return {
		init: init
	};

})();

launcher.init();
