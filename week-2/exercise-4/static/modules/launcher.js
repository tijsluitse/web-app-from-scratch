'use strict'

var launcher = (function() {

	var init = function() {
		animations.scrolling();
		animations.fastClicker();
		
		loader.spinner();
		search.input();
		
		gestures.swipe();
		gestures.shake();
		gestures.press();

		sections.init();
	}

	return {
		init: init
	};

})();

launcher.init();
