/////////////////
// Information //
/////////////////

// Created by: Tijs Luitse
// Cooperation: Tom Snepvangers
// Minor: Web application from scratch

///////////////
// Variables //
///////////////

var allSections = document.querySelectorAll('section');
var searchInput = document.getElementById('search');
var searchSubmit = document.getElementById('submit');

/////////////////
// Application //
/////////////////

(function() {
	'use strict'

	var launcher = {

		init: function(){
			routes.init();
			photoGallery.searchFunction();
		}

	};

	var routes = {

		init: function() {

			routie({

			    'landing': function() {
			    	sections.toggle(this.path);
			    },

			    'instaPosts': function() {
			    	sections.toggle(this.path);
			    },

			    'single/:id': function(photoId) {
			    	photoGallery.singlePhoto(photoId);
			   	 	sections.toggle('singlePhoto');
			    }

			});
		}
	}

	var sections = {

		toggle: function(hashName) {

			var section = document.getElementById(hashName);

			for (var i=0; i < allSections.length; i++) {
				allSections[i].classList.remove('active');
			};

			section.classList.toggle('active');

		}

	}

	var photoGallery = {

		searchFunction: function(){

			searchSubmit.addEventListener('click', function(){
				var tag = searchInput.value;
				photoGallery.instaFeed(tag);
			});

		},

		instaFeed: function(tag) {
			
			aja()
				.url('https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
			    .type('jsonp')
			    .cache('false')
			    .on('success', function(data){			    
			    	
			    	var data = data.data;
			   
			    	var filteredData = _.map(data, function(photoInfo){
			    		return _.pick(photoInfo, 'id', 'link', 'likes', 'user', 'images', 'tags', 'title');
			    	});

			    	data = filteredData;

			    	console.log(data);

			        var directives = {
			      			       
			        	photoLink: {
			        		href: function(params) {
			        			return '#single/' + this.id;			        		
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
		},

		singlePhoto: function(photoId) {

			aja()
				.url('https://api.instagram.com/v1/media/' +  photoId + '?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
			    .type('jsonp')
			    .cache('false')
			    .on('success', function(data){			    
			    	
			    	var data = data.data;

			    	console.log(data);

			    	// var filteredData = _.map(data, function(photoInfo){
			    	// 	return _.pick(photoInfo, 'id', 'link', 'likes', 'user', 'images', 'tags', 'title');
			    	// });

			    	// data = filteredData;

			    	// console.log('Nieuwe data: ' + filteredData);

			        var directives = {

			      		photoTitle: {
			      			text: function(params) {
			      				return this.caption.text;
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

					Transparency.render(document.getElementById('singlePhoto'), data, directives);

			    })

			.go();

		}
	
	}

	launcher.init();

})();