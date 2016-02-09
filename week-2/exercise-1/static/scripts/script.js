(function() {
	"use strict"

	aja()
	    .url('https://api.instagram.com/v1/media/popular?access_token=806401368.5aa13be.4a08df065cbb41469c9cc20041432d3b')
	    .type('jsonp')
	    .cache('false')
	    .on('success', function(data){
	      	var photos = {};
	        photos = data;
	    })
		
		.go();

}());