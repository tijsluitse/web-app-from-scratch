var photoGallery = (function(photoId) {

	var photoPressTarget = document.querySelector('.photoImage');

	var popularPosts = function(photoId) {

		loader.spinner().classList.add('spinning');

		aja()
			.url('https://api.instagram.com/v1/media/popular?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
		    .type('jsonp')
		    .cache('false')
		    .on('success', function(data){			    
		    	
		    	var data = data.data;
		   
		    	data = _.map(data, function(photoInfo){
		    		return _.pick(photoInfo, 'id', 'images', 'likes');
		    	});

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

		    })

		.go();

		setTimeout(function() {
    	 	gestures.shake();
    	}, 2000);

	};

	var singlePhoto = function(photoId) {

		loader.spinner().classList.add('spinning');	

		aja()
			.url('https://api.instagram.com/v1/media/' +  photoId + '?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
		    .type('jsonp')
		    .cache('false')
		    .on('success', function(data){			    
		    	
		    	var data = data.data;

		    	var viewportWidth = window.outerWidth;

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

		    })

		.go();

		setTimeout(function() {
    	 	gestures.press();
    	}, 2000);

	}

	return {
		popularPosts,
		singlePhoto
	}

})();
