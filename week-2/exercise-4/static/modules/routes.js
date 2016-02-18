var routes = (function() {

		var init = function() {
			// // set default landingpage to popular media
   //          window.location.hash = '#popularMedia';           
   //          var popularMedia = document.querySelector('#popularMedia');
   //          popularMedia.classList.add('active');

			routie({
			    'popularMedia': function() {		    	    				    	
			    	routes.toggle(this.path);
			    	photoGallery.popularPosts();
			    },
			    'searchPhotos': function() {
			    	routes.toggle(this.path);
			    	search();			    	
			    },
			    'single/:id': function(photoId) {
			    	photoGallery.singlePhoto(photoId);
			   	 	routes.toggle('singlePhoto');
			   	 	photoGallery.singlePhoto();	  	 	
			    },
			    // 
			    'user/:username': function(userId){
			    	singleUser.info(userId);
			    	singleUser.header(userId);
			    	singleUser.feed(userId);
			    	routes.toggle('singleUser');			    	
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
