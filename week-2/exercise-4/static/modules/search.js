var search = (function() {

	var errorMessageTarget = document.getElementById('errorMessage');

	var input = function(){

		console.log("Search function loaded");

		var searchSubmit = document.getElementById('submit');
		var searchInput = document.getElementById('search');

		searchSubmit.addEventListener('click', function(){
			var tag = searchInput.value;
			if (tag.length > 0) {
				search.results(tag);
			} else {
				search.noResults(tag);
			}
		});

	};

	var results = function(tag) {

			loader.spinner().classList.add('spinning');
			
			aja()
				.url(variables.init.tagApi + tag + '/media/recent' + variables.init.accesToken)
			    .type('jsonp')
			    .cache('false')
			    .on('success', function(data){			    
			    	
			    	var data = data.data;
			   
			    	data = _.map(data, function(photoInfo){
			    		return _.pick(photoInfo, 'id', 'likes', 'user', 'images');
			    	});

			    	if (data.length < 1) {

			    		console.log('Tag not found');
			    		search.noResults(tag);

			    	} else {

			    		console.log('Tag found');
			    		errorMessageTarget.classList.add("hide");

			    		
			    		var directives = {	
			    			typedTag: { 
			    				text: function(params) {
			    					return '#' + tag;
			    				}
			    			},		   	       
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
				        	likeIcon: {
				        		src: function(params) {
				        			return 'assets/like-s.svg';
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
					loader.spinner().classList.remove('spinning');
					tag = null;

			    	}

			    })

			.go();


		};

		var noResults = function(tag) {

			console.log('Fire error');

			var directives = {			      			       
	        	error: {
	        		text: function(params) {
	        			return 'There are no photos tagged with: ' + tag + '.';
	        		}
	        	}	
			}

			Transparency.render(errorMessageTarget, tag, directives);
			loader.spinner().classList.remove('spinning');

		};

		return {
			input,
			results,
			noResults

		}

})();
