'use strict'

var search = (function() {
	
	return {

		searchFunction: function(){

			searchSubmit.addEventListener('click', function(){
				var tag = searchInput.value;
				search.results(tag);
			});

		},

		results: function(tag) {

			loadingSpinner.classList.add('spinning');
			
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

					Transparency.render(photoGalleryTarget, data, directives);

					loadingSpinner.classList.remove('spinning');

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

			loadingSpinner.classList.remove('spinning');

		}

	}

})();
