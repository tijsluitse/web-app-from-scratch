'use strict'

var launcher = (function() {

	var init = function() {
		animations.scrolling();
		loader.spinner();
		routes.init();
		search.searchFunction();
		gestures.swipe();

	}

	return {
		init: init
	};

})();

launcher.init();
