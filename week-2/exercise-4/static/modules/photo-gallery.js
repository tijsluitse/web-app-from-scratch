'use strict'

var photoGallery = (function() {
	
	return {

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

					loadingSpinner.classList.remove('spinning');

			    })

			.go();

			setTimeout(function() {
	    	 	gestures.press();
	    	}, 2000);

		}

	}

})();
