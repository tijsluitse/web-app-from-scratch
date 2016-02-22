var photos = (function(photoId) {

	var photoPressTarget = document.querySelector('.photoImage');

	var popular = function(photoId) {

		loader.spinner().classList.add('spinning');

		aja()
			.url(variables.init.popularMediaApi + variables.init.accesToken)
		    .type('jsonp')
		    .cache('false')
		    .on('success', function(data){			    
		    	
		    	var data = data.data;
		   
		    	data = _.map(data, function(photoInfo){
		    		return _.pick(photoInfo, 'id', 'images', 'likes');
		    	});

		    	if (data.length < 1) {
		    		alert("Problems with retrieving data from Instagram.");
		    	} else {
		    		var directives = {			      			       
			        	photoLink: {
			        		href: function(params) {
			        			return '#photo/' + this.id;			        		
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

		    })

		.go();

	};

	var single = function(photoId) {

		loader.spinner().classList.add('spinning');	

		aja()
			.url(variables.init.mediaApi +  photoId + variables.init.accesToken)
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
			        			if (window.outerWidth > 600) {
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

	}

	return {
		popular,
		single
	}

})();
