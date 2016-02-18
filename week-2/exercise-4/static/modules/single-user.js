var singleUser = (function(userId) {

		var header = function(userId) {

			loader.spinner().classList.add('spinning'); // show loader till render

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
					loader.spinner().classList.remove('spinning'); // remove loader

			    })

			.go();

		};

		var info = function(userId) {

			loader.spinner().classList.add('spinning'); // show loader till render
			
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
					
					loader.spinner().classList.remove('spinning');

			    })

			.go();

		};

		var feed = function(userId) {

			loader.spinner().classList.add('spinning'); // show loader till render
	
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
					loader.spinner().classList.remove('spinning');

			    })

			.go();			

		};

	return {
		header, 
		info, 
		feed
	}

})();
