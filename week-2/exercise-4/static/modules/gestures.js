'use strict'

var gestures = (function() {
	
	return {

		shake: function() {

			console.log('Shake function loaded');

			// listen to shake event
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

})();

