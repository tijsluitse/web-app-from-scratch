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
			    	photoGallery.searchFunction();
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

		searchFunction: function(){

			var searchInput = document.getElementById('search');
			var searchSubmit = document.getElementById('submit');

			searchSubmit.onclick = function(){
				var tag = searchInput.value;
				photoGallery.instaFeed(tag);
			}

		},

		instaFeed: function(tag) {

			aja()
				.url('https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
			    .type('jsonp')
			    .cache('false')
			    .on('success', function(data){			    
			    	
			    	var data = data.data;

			    	var filteredData = _.map(data, function(photoInfo){
			    		return _.pick(photoInfo, 'id', 'link', 'likes', 'user', 'images', 'tags');
			    	});

			    	data = filteredData;

			    	console.log(data);

			        var directives = {
			      			       
			        	photoItem: {
			        		id: function(params) {
			        			return this.id;
			        		}
			        	},
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
			        			return 'Likes: ' + this.likes.count;
			        		}
			        	},
			        	photoUser: {
			        		text: function(params) {
			        			return 'User: ' + this.user.username;
			        		}
			        	}
			        	
					}

					Transparency.render(document.getElementById('photoGallery'), data, directives);

			    })

				.go();
			}
		}

	app.init();

})();

