(function() {
	'use strict'

	var app = {

		init: function(){
			routes.init();
		}

	};

	var routes = {
		
		init: function(){
			
			var currentHash = window.location.hash || '#landing'; //als ie geen hash heeft krijgt ie landing als waarde en anders pakt hij die hash

			document.querySelector(currentHash).classList.add('active'); //id wat actief is krijgt de class active

			window.addEventListener("hashchange", function(){
				
				var newHash = window.location.hash; //krijgt id van de nieuwe hash/url

				sections.toggle(currentHash, newHash); //geeft variabelen mee
				currentHash = newHash; //omdat er is getoggled wordt de variabele upgedate

			});
		}

	};

	var sections = {

		toggle: function(currentHash, newHash){

			document.querySelector(currentHash).classList.remove('active'); 
			document.querySelector(newHash).classList.add('active'); //nieuwe hash/id krijgt class name active
			
		}

	};

	app.init();

})();