(function() {
	'use strict'

	var app = {

		init: function(){
			routes.init();
		}

	};

	var routes = {
		
		init: function(){
			
			var currentHash = window.location.hash || '#landing';
			document.querySelector(currentHash).classList.add('active');

			window.addEventListener("hashchange", function(){
				
				var newHash = window.location.hash;

				sections.toggle(currentHash,newHash);
				currentHash = newHash;

			});
		}

	};

	var sections = {

		toggle: function(currentHash,newHash){

			document.querySelector(currentHash).classList.remove('active');
			document.querySelector(newHash).classList.add('active');
			
		}

	};

	app.init();

})();