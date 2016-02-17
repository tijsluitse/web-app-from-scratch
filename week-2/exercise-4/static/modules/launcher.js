'use strict'

var launcher = (function() {
	
	return {

		init: function(){
			routes.init();
			photoGallery.popularPosts();	
			search.searchFunction();
			gestures.swipe();
		}

	}

})();
