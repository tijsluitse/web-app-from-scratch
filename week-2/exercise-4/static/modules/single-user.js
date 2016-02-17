'use strict'

var singleUser = (function() {
	
	return {

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

					loadingSpinner.classList.remove('spinning');

			    })

			.go();			

		}

	}

})();
