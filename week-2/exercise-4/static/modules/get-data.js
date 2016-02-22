var getData = (function(){

	var accesToken = '?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b';

	recentMedia = (function() {

		aja()
			.url('https://api.instagram.com/v1/media/popular/' + accesToken)
		    .type('jsonp')
		    .cache('false')
		    .on('success', function(data){			    
		    	
		    	var data = data.data;
		   
		    	data = _.map(data, function(photoInfo){
		    		return _.pick(photoInfo, 'id', 'images', 'likes');
		    	});

		    	if (data.length < 1) {
		    		alert("Error");
		    	} else {
		    		recentMedia.renderData(data);
		    	}

		    })
			.go();

		renderData = function(data) {
	    		
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
		        	likeIcon: {
		        		src: function(params) {
		        			return 'assets/like-s.svg';
		        		}
		        	}			        	
				}

			var popularPostsTarget = document.getElementById('popularPosts');
			Transparency.render(popularPostsTarget, data, directives);	
			loader.spinner().classList.remove('spinning');

		}

		return {
			recentMedia
		}

	})();

	singlePhoto = (function() {

		aja()
			.url('https://api.instagram.com/v1/media/' +  photoId + accesToken)
		    .type('jsonp')
		    .cache('false')
		    .on('success', function(data){	

		    	var data = data.data;
		    	var viewportWidth = window.outerWidth;

		    	if (data.length < 1) {
					alert("Error");
				} else {
					singlePhoto.renderData(data);
				} 

		    })
			.go();

		renderData = function(data) {

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
	        			if (viewportWidth > 600) {
	        				return this.images.standard_resolution.url;
	        			} else {
	        				return this.images.low_resolution.url;
	        			}
	        		}			        	
	        	},
	        	photoLikes: {
	        		text: function(params) {
	        			return  this.likes.count;
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
			loader.spinner().classList.remove('spinning');
		};

		return {
			singlePhoto
		}

	})();

	user = (function(userId) {

		var header = function(userId) {

			loader.spinner().classList.add('spinning'); // show loader till render

			aja()
				.url('https://api.instagram.com/v1/users/'  +  userId + '/media/recent/' + accesToken)
			    .type('jsonp')
			    .cache('false')
			    .on('success', function(data){			    
			    	
			    	var data = data.data;
			    	var photoNumber = data.length;
			    	var photoChoice = Math.floor(Math.random() * photoNumber) + 0; 

			    	if (data.length < 1) {
			    		alert("Error");
			    	} else {
			    		data = data[photoChoice];
			    		header.renderData(userId, data);
			    	}

			    })
			.go();

			renderData = function(userId, data) {

				var directives = {
		      		headerImage: {
		        		src: function(params) {
		        			return this.images.standard_resolution.url;;
		        		}
		        	}			        	
				}

				var userHeaderTarget = document.getElementById('userHeader');
				Transparency.render(userHeaderTarget, data, directives);
				loader.spinner().classList.remove('spinning'); // remove loader
			}

		};

		var info = function(userId) {

			loader.spinner().classList.add('spinning'); // show loader till render
			
			aja()
				.url('https://api.instagram.com/v1/users/'  +  userId + accesToken)
			    .type('jsonp')
			    .cache('false')
			    .on('success', function(data){			    
			    	
			   		var data = data.data;

			   		if (data.length < 1) {
			   			alert("Error");
			   		} else {
			   			info.renderData(userId, data);
			   		}

			    })
			.go();

			renderData = function(userId, data) {

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
				loader.spinner().classList.remove('spinning');
			}

		};

		var feed = function(userId) {

			loader.spinner().classList.add('spinning'); 
	
			aja()
				.url('https://api.instagram.com/v1/users/'  +  userId + '/media/recent/' + accesToken)
			    .type('jsonp')
			    .cache('false')
			    .on('success', function(data){			    
			    	
			    	var data = data.data;

			    	if (data.length < 1) {
			    		alert("Error");
			    	} else {
			    		feed.renderData(userId, data);
			    	}

			    })
			.go();		

			renderData = function(userId, data) {
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
				loader.spinner().classList.remove('spinning');
			}	

		};

	return {
		header, 
		info, 
		feed
	}

	})();

	
})();