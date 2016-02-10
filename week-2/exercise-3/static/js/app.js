(function() {
	'use strict'

	var app = {

		init: function(){
			routes.init();
		}

	};

	var routes = {

		init: function() {

			routie({

			    'landing': function() {
			    	var hashName = this.path;
			    	sections.toggle(hashName);
			    	
			    },

			    'instaPosts': function() {
			    	var hashName = this.path;
			    	sections.toggle(hashName);
			    	photoGallery.init();
			    }			
			});
		}
	}

	var sections = {

		toggle: function(hashName) {

			var allSections = document.querySelectorAll('section');
			var section = document.getElementById(hashName);

			for (var i=0; i < allSections.length; i++) {
				allSections[i].classList.remove('active');
			};

			section.classList.toggle('active');

		}

	}

	var photoGallery = {

		init: function() {

			aja()
				.url('https://api.instagram.com/v1/media/popular?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
			    .type('jsonp')
			    .cache('false')
			    .on('success', function(data){
			      	var photos = {};
			        photos = data;
			       
			        var instagramPhotos = {
					  	title: "Photo Gallery",
					  	{photos: photos}
					};

					Transparency.render(document.getElementById('instaPosts'), instagramPhotos);

					var photos, directives;

						comments = ["That rules", "Great post!"];

						// See section 'Directives' for the details
						directives = {
						  comment: {
						    generatePhotos: function() {
						      	for (var i = 0; i < 20; i++) {
									var li = document.createElement('li');
									li.innerHTML = "<a target='_blank' href='" + data.data[i].link + "'><img src='" + data.data[i].images.low_resolution.url +"'></img></a>;"
									document.querySelector(".popular").appendChild(li);
								}
						    }
						  }
						};

						$('.comments').render(comments, directives);


			    })
				.go();

		}

	}
	app.init();

})();







