(function() {
	'use strict'

	var app = {

		init: function(){
			routes.init();
		}

	};

	var routes = {

		init: function() {

			routie({

			    'landing': function() {
			    	var hashName = this.path;
			    	sections.toggle(hashName);
			    	
			    },

			    'instaPosts': function() {
			    	var hashName = this.path;
			    	sections.toggle(hashName);
			    	photoGallery.init();
			    }			
			});
		}
	}

	var sections = {

		toggle: function(hashName) {

			var allSections = document.querySelectorAll('section');
			var section = document.getElementById(hashName);

			for (var i=0; i < allSections.length; i++) {
				allSections[i].classList.remove('active');
			};

			section.classList.toggle('active');

		}

	}

	var photoGallery = {

		init: function() {

			aja()
				.url('https://api.instagram.com/v1/media/popular?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
			    .type('jsonp')
			    .cache('false')
			    .on('success', function(data){			    
			    	
			    	var data = data.data;

			    	console.log(data);

			        var directives = {
			      			       
			        	photoLink: {
			        		href: function(params) {
			        			return this.link;
			        		}
			        	},
			        	photoImage: {
			        		src: function(params) {
			        			return this.images.low_resolution.url;
			        		}			        	
			        	},
			        	photoLikes: {
			        		text: function(params) {
			        			return this.likes.count;
			        		}
			        	},
			        	photoUser: {
			        		text: function(params) {
			        			return this.user.full_name;
			        		}
			        	}
			        	
					}

					Transparency.render(document.getElementById('photoGallery'), data,  directives);

			    })

				.go();
			}
		}

	app.init();

})();

