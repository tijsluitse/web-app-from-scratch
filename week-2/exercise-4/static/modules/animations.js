var animations = (function() {

	var navigation = document.querySelector('nav');
	
	var scrolling = function() {
	 	
	 	window.onscroll = function() {

		    if (document.body.scrollTop > 100) {
		        navigation.classList.add('fixedNav');
		    }  else {
		    	navigation.classList.remove('fixedNav');
		    }      
 		}

	}

	return {
		scrolling
	}

})();