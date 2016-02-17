'use strict'

var routes = (function() {
	
	return {

		init: function() {

			routie({

			    'popularMedia': function() {		    	    				    	
			    	sections.toggle(this.path);
			    },

			    'searchPhotos': function() {
			    	sections.toggle(this.path);			    	
			    },

			    'single/:id': function(photoId) {
			    	photoGallery.singlePhoto(photoId);
			   	 	sections.toggle('singlePhoto');			   	 	
			    },

			    'user/:username': function(userId){
			    	singleUser.info(userId);
			    	singleUser.header(userId);
			    	singleUser.feed(userId);
			    	sections.toggle('singleUser');			    	
			    }
			});
		},

		toggle: function(hashName) {

			var section = document.getElementById(hashName);

			for (var i = 0; i < allSections.length; i++) {
				allSections[i].classList.remove('active');
			};

			section.classList.toggle('active');

		}
	}

})();
