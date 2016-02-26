var sections = (function() {

		var init = function() {

			routie({
			    'popularMedia': function() {	
			    	photos.popular();	    	    				    	
			    	sections.toggle(this.path);
			    },
			    'tagSearch': function() {
			    	sections.toggle(this.path);
			    	search.input();			    	
			    },
			    'photo/:id': function(photoId) {
			    	photos.single(photoId);

			   	 	sections.toggle('singlePhoto');
			   	 	photos.single();	  	 	
			    },
			    'user/:id': function(userId){
			    	user.info(userId);
			    	user.header(userId);
			    	user.feed(userId);
			    	sections.toggle('singleUser');			    	
			    }
			});
		};

		var toggle = function(hashName) {

			// declare all sections and get active section by hashHame
			var section = document.getElementById(hashName);
			var allSections = document.querySelectorAll('section');

			// for all sections remove active class
			for (var i = 0; i < allSections.length; i++) {
				allSections[i].classList.remove('active');
			};

			// toggle active class for active section
			section.classList.toggle('active');

		};

	return {
		init,
		toggle
	}

})();
