/////////////////
// Information //
/////////////////

// Created by: Tijs Luitse
// Cooperation: Tom Snepvangers
// Minor: Web application from scratch

/////////////////
// Application //
/////////////////

(function() { // Immediately-Invoked Function Expression (IIFE)
	'use strict' // No global variations from functional or object scope

	var loadingSpinner = document.querySelector('.spinner');
	var photoPressTarget = document.querySelector('.photoImage');
	var swipeMenuTarget = document.querySelector('body');

	var launcher = {

		init: function(){
			routes.init();
			photoGallery.popularPosts();	
			search.searchFunction();
			gestures.swipe();
		}

	};

	var routes = {

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
		}
	}

	var sections = {

		toggle: function(hashName) {

			var section = document.getElementById(hashName);
			var allSections = document.querySelectorAll('section');

			for (var i = 0; i < allSections.length; i++) {
				allSections[i].classList.remove('active');
			};

			section.classList.toggle('active');

		}

	}

	var gestures = {

		shake: function() {

			console.log('Shake function loaded');
		    var photoShuffle = new Shake ({
		    	threshold: 15, // shake strength threshold
		    	timeout: 1000 // determines the frequency of event generation
		    });

		    photoShuffle.start();
		   
		    window.addEventListener('shake', function() {

		    	loadingSpinner.classList.add('spinning');
		        
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

						var popularPostsTarget = document.getElementById('popularPosts');

						Transparency.render(popularPostsTarget, data, directives);

						loadingSpinner.classList.remove('spinning');

				    })

				.go();

		    }, false);

		    // check if shake is supported or not.
		    if (!('ondevicemotion' in window)){
		    	alert('Not Supported');
		    };

		},

		swipe: function() {

			console.log('Swipe function loaded');
			var swiping = new Hammer(swipeMenuTarget);

			swiping.on('swiperight', function() {
			    console.log('Swipe right');			   
			    var menuSwipe = document.querySelector('a[href="#popularMedia"]');			   
			    menuSwipe.click();
			});

			swiping.on('swipeleft', function() {
			    console.log('Swipe left');
			    var menuSwipe = document.querySelector('a[href="#searchPhotos"]');			   
			    menuSwipe.click();
			});

		},

		press: function(){

			console.log('Press function loaded');
			var pressLikes = new Hammer(photoPressTarget);

			pressLikes.on('press', function() {
			    console.log('Pressed');
			   	document.querySelector('.photoImage .likeIcon').classList.toggle('visible');
			});

		}

	}

	var photoGallery = {

		popularPosts: function() {

            loadingSpinner.classList.add('spinning');

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

					var popularPostsTarget = document.getElementById('popularPosts');

					Transparency.render(popularPostsTarget, data, directives);
					
					loadingSpinner.classList.remove('spinning');

			    })

			.go();

			setTimeout(function() {
	    	 	gestures.shake();
	    	}, 2000);		

		},

		singlePhoto: function(photoId) {

			loadingSpinner.classList.add('spinning');	

			aja()
				.url('https://api.instagram.com/v1/media/' +  photoId + '?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
			    .type('jsonp')
			    .cache('false')
			    .on('success', function(data){			    
			    	
			    	var data = data.data;

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

					var singlePhotoTarget = document.getElementById('singlePhoto');

					Transparency.render(singlePhotoTarget, data, directives);
					
					loadingSpinner.classList.remove('spinning');

			    })

			.go();

			setTimeout(function() {
	    	 	gestures.press();
	    	}, 2000);

		}
	
	}

	var search = {

		searchFunction: function(){

			var searchSubmit = document.getElementById('submit');
			var searchInput = document.getElementById('search');

			searchSubmit.addEventListener('click', function(){
				var tag = searchInput.value;
				search.results(tag);
			});

		},

		results: function(tag) {

			loadingSpinner.classList.add('spinning');

			var likeIcon = document.querySelector('.likeIcon');
			
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

			    	if (data.length < 1) {

			    		console.log('Tag not found');
			    		search.noResults(tag);

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

					var photoGalleryTarget = document.getElementById('photoGallery');

					Transparency.render(photoGalleryTarget, data, directives);
					
					loadingSpinner.classList.remove('spinning');

			    	}

			    })

			.go();
		},

		noResults: function(tag) {

			console.log('Fire error');
			var errorMessageTarget = document.getElementById('errorMessage');

			var directives = {			      			       
	        	error: {
	        		text: function(params) {
	        			return 'There are no photos tagged with: ' + tag + '.';
	        		}
	        	}	
			}

			Transparency.render(errorMessageTarget, tag, directives);
			loadingSpinner.classList.remove('spinning');

		}

	}

	var singleUser = {

		header: function(userId) {

			loadingSpinner.classList.add('spinning');

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

					var userHeaderTarget = document.getElementById('userHeader');

					Transparency.render(userHeaderTarget, data, directives);
					
					loadingSpinner.classList.remove('spinning');

			    })

			.go();

		},

		info: function(userId) {

			loadingSpinner.classList.add('spinning');
			
			aja()
				.url('https://api.instagram.com/v1/users/'  +  userId + '?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
			    .type('jsonp')
			    .cache('false')
			    .on('success', function(data){			    
			    	
			    	var data = data.data;

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

					var userInfoTarget = document.getElementById('userInfo');
					
					Transparency.render(userInfoTarget, data, directives);
					
					loadingSpinner.classList.remove('spinning');

			    })

			.go();

		},

		feed: function(userId) {

			loadingSpinner.classList.add('spinning');
	
			aja()
				.url('https://api.instagram.com/v1/users/'  +  userId + '/media/recent/?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
			    .type('jsonp')
			    .cache('false')
			    .on('success', function(data){			    
			    	
			    	var data = data.data;

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

					var userFeedTarget = document.getElementById('userFeed');
					var feedItemsTarget = document.getElementById('feedItems');

					Transparency.render(feedItemsTarget, data, directives);
					
					loadingSpinner.classList.remove('spinning');

			    })

			.go();			

		}

	}

	launcher.init();

})();