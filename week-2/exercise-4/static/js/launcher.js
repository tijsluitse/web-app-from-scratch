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

var photoGalleryTarget = document.getElementById('photoGallery');
var popularPostsTarget = document.getElementById('popularPosts');
var singlePhotoTarget = document.getElementById('singlePhoto');
var likeIcon = document.querySelector('.likeIcon');

var userHeaderTarget = document.getElementById('userHeader');
var userInfoTarget = document.getElementById('userInfo');
var userFeedTarget = document.getElementById('userFeed');
var feedItemsTarget = document.getElementById('feedItems'); 

var errorMessageTarget = document.getElementById('errorMessage');

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

			    'popularMedia': function() {
			    	photoGallery.popularPosts();			    	    				    	
			    	sections.toggle(this.path);
			    },

			    'searchPhotos': function() {
			    	sections.toggle(this.path);
			    	searchFunction.classList.toggle('active-flex');			    	
			    },

			    'single/:id': function(photoId) {
			    	photoGallery.singlePhoto(photoId);
			   	 	sections.toggle('singlePhoto');			   	 	
			    },

			    'user/:username': function(userId){
			    	single.userInfo(userId);
			    	single.userHeader(userId);
			    	single.userFeed(userId);
			    	sections.toggle('singleUser');			    	
			    }

			});
		}
	}

	var sections = {

		toggle: function(hashName) {

			var section = document.getElementById(hashName);

			for (var i = 0; i < allSections.length; i++) {
				allSections[i].classList.remove('active');
			};

			section.classList.toggle('active');

		}

	}

	var photoGallery = {

		popularPosts: function() {

			aja()
				.url('https://api.instagram.com/v1/media/popular?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
			    .type('jsonp')
			    .cache('false')
			    .on('success', function(data){			    
			    	
			    	var data = data.data;
			   
			    	var filteredData = _.map(data, function(photoInfo){
			    		return _.pick(photoInfo, 'id', 'images', 'likes');
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
			        			return this.likes.count;
			        		}
			        	}
			        	
					}

					Transparency.render(popularPostsTarget, data, directives);

			    })

			.go();

			setTimeout(function() {
	    	 	photoGallery.shake();
	    	}, 2000);		

		},

		shake: function() {

			console.log('Shake function loaded');

			// listen to shake event
		    var photoShuffle = new Shake ({
		    	threshold: 15, // shake strength threshold
		    	timeout: 1000 // determines the frequency of event generation
		    });

		    photoShuffle.start();
		   
		    window.addEventListener('shake', function() {
		        
			    aja()
					.url('https://api.instagram.com/v1/media/popular?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
				    .type('jsonp')
				    .cache('false')
				    .on('success', function(data){			    
				    	
				    	var data = data.data;
				   
				    	var filteredData = _.map(data, function(photoInfo){
				    		return _.pick(photoInfo, 'id', 'images', 'likes');
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
				        			return this.likes.count;
				        		}
				        	}
				        	
						}

						Transparency.render(popularPostsTarget, data, directives);

				    })

				.go();

		    }, false);

		    // check if shake is supported or not.
		    if (!('ondevicemotion' in window)){
		    	alert('Not Supported');
		    };

		},

		searchFunction: function(){

			searchSubmit.addEventListener('click', function(){
				var tag = searchInput.value;
				photoGallery.searchResults(tag);
			});

		},

		searchResults: function(tag) {
			
			aja()
				.url('https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
			    .type('jsonp')
			    .cache('false')
			    .on('success', function(data){			    
			    	
			    	var data = data.data;
			   
			    	var filteredData = _.map(data, function(photoInfo){
			    		return _.pick(photoInfo, 'id', 'likes', 'user', 'images');
			    	});

			    	data = filteredData;

			    	console.log(data);

			    	if (data.length < 1) {

			    		console.log('Tag not found');

			    		photoGallery.noResults(tag);

			    	} else {

			    		console.log('Tag found');

			    		likeIcon.classList.add("show");

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
				        			return this.likes.count;
				        		}
				        	},
				        	photoUser: {
				        		href: function(params) {
				        			return '#user/' + this.user.id;
				        		}
				        	}
			        	
						}

					Transparency.render(photoGalleryTarget, data, directives);

			    	}

			    })

			.go();
		},

		noResults: function(tag) {

			console.log('Fire error');

			var directives = {
			      			       
	        	error: {
	        		text: function(params) {
	        			return 'There are no photos tagged with: ' + tag + '.';
	        		}
	        	}
	        	
			}

			Transparency.render(errorMessageTarget, tag, directives);

		},

		singlePhoto: function(photoId) {

			aja()
				.url('https://api.instagram.com/v1/media/' +  photoId + '?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
			    .type('jsonp')
			    .cache('false')
			    .on('success', function(data){			    
			    	
			    	var data = data.data;

			    	console.log(data);

			        var directives = {

			      		photoTitle: {
			      			text: function(params) {
		                		if (this.caption) {
		                			return this.caption.text
		                		} else {
		                			return null
		                		}
			      			}
			      		},	       
			        	photoImage: {
			        		src: function(params) {
			        			return this.images.standard_resolution.url;
			        		}			        	
			        	},
			        	photoLikes: {
			        		text: function(params) {
			        			return this.likes.count;
			        		}
			        	},
			        	photoUser: {
			        		href: function(params) {
			        			return '#user/' + this.user.id;
			        		}
			        	},
			        	userName: {
			        		text: function(params) {
			        			return  this.user.full_name;
			        		}
			        	}
			        	
					}

					Transparency.render(singlePhotoTarget, data, directives);

			    })

			.go();

		}
	
	}

	var single = {

		userHeader: function(userId) {

			aja()
				.url('https://api.instagram.com/v1/users/'  +  userId + '/media/recent/?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
			    .type('jsonp')
			    .cache('false')
			    .on('success', function(data){			    
			    	
			    	var data = data.data;
			    	var photoNumber = data.length;
			    	var photoChoice = Math.floor(Math.random() * photoNumber) + 0; 

			    	data = data[photoChoice];

			        var directives = {

			      		headerImage: {
			        		src: function(params) {
			        			return this.images.standard_resolution.url;;
			        		}
			        	}
			        	
					}

					Transparency.render(userHeaderTarget, data, directives);

			    })

			.go();

		},

		userInfo: function(userId) {
			
			aja()
				.url('https://api.instagram.com/v1/users/'  +  userId + '?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
			    .type('jsonp')
			    .cache('false')
			    .on('success', function(data){			    
			    	
			    	var data = data.data;

			    	console.log(data);

			        var directives = {

			      		userPicture: {
			      			src: function(params) {
			      				return this.profile_picture;
			      			}
			      		},	       
			        	userName: {
			        		text: function(params) {
			        			return this.full_name;
			        		}			        	
			        	},
			        	userBio: {
			        		text: function(params) {
			        			return this.bio;
			        		}
			        	}
			        	
					}

					Transparency.render(userInfoTarget, data, directives);

			    })

			.go();

		},

		userFeed: function(userId) {
	
			aja()
				.url('https://api.instagram.com/v1/users/'  +  userId + '/media/recent/?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
			    .type('jsonp')
			    .cache('false')
			    .on('success', function(data){			    
			    	
			    	var data = data.data;

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
			        			return this.likes.count;
			        		}
			        	}
			        	
					}

					Transparency.render(feedItemsTarget, data, directives);

			    })

			.go();			

		}

	}

	launcher.init();

})();