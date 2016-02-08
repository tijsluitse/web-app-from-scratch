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


// for (var i = 0; i < 6; i++) {
	
// 				var li = document.createElement('li');
                
//                 li.innerHTML = "<a target='_blank' href='" + data.data[i].link + "'><img src='" + data.data[i].images.low_resolution.url +"'></img></a>;"
       
//                 document.querySelector(".popular").appendChild(li);
// 	    	}