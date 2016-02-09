(function() {
	"use strict"

	var app = {

		init: function(){
			routes.init();
		}

	};

	var routes = {

		init: function() {

			routie({

			    'landing': function() {
			    	document.getElementById("landing").classList.add("active");
			    	document.getElementById("instaPosts").classList.remove("active");
			    },

			    'instaPosts': function() {
			    	document.getElementById("landing").classList.remove("active");
			    	document.getElementById("instaPosts").classList.add("active");
			    }
			});
		}
	}

	var content = {

		// var hello = {
		//   greeting: "Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn",
		//   translation: "In his house at R'lyeh, dead Cthulhu waits dreaming."
		// };

		// Transparency.render(document.getElementById('template'), hello);

	}

	app.init();

	aja()
		.url('https://api.instagram.com/v1/media/popular?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
	    .type('jsonp')
	    .cache('false')
	    .on('success', function(data){
	      	var photos = {};
	        photos = data;
	        console.log(photos);
	    })
		.go();

})();