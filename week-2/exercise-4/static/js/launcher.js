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
			    },

			    'single/:id': function(photoId) {
			    	photoGallery.singlePhoto(photoId);
			   	 	sections.toggle('singlePhoto');
			    },

			    'user/:username': function(userId){
			    	single.userInfo(userId);
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
			    		return _.pick(photoInfo, 'id', 'link', 'likes', 'user', 'images', 'tags', 'title');
			    	});

			    	data = filteredData;

			    	console.log(data);

			    	//listen to shake event
				    var myShakeEvent = new Shake ({
				    	threshold: 15
				    });

				    myShakeEvent.start();
				   
				    window.addEventListener('shake', function() {
				        alert('Shaked');
				    }, false);

				    //stop listening
				    function stopShake(){
				        myShakeEvent.stop();
				    }

				    //check if shake is supported or not.
				    if (!('ondevicemotion' in window)){
				    	alert('Not Supported');
				    };

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
			        	photoTags: {
			        		text: function(params) {
			        			return this.tags;
			        		}
			        	}
			        	
					}

					Transparency.render(popularPostsTarget, data, directives);

			    })

			.go();

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
			    		return _.pick(photoInfo, 'id', 'link', 'likes', 'user', 'images', 'tags', 'title');
			    	});

			    	data = filteredData;

			    	console.log(data);

			    	if (data.length < 1) {

			    		console.log('Tag not found');

			    		photoGallery.noResults(tag);

			    	} else {

			    		console.log('Tag found');

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
			        		href: function(params) {
			        			return '#user/' + this.user.id;
			        		},
			        		text: function(params) {
			        			return 'User: ' + this.user.full_name;
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
			      				return this.caption.text;
			      			}
			      		},	       
			        	photoImage: {
			        		src: function(params) {
			        			return this.images.standard_resolution.url;
			        		}			        	
			        	},
			        	photoLikes: {
			        		text: function(params) {
			        			return 'Likes: ' + this.likes.count;
			        		}
			        	},
			        	photoUser: {
			        		href: function(params) {
			        			return '#user/' + this.user.id;
			        		},
			        		text: function(params) {
			        			return 'User: ' + this.user.full_name;
			        		}
			        	}
			        	
					}

					Transparency.render(singlePhotoTarget, data, directives);

			    })

			.go();

		}
	
	}

	var single = {

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
			        	photoTags: {
			        		text: function(params) {
			        			return this.tags;
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