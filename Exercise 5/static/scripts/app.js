(function(){
    "use strict";

	var app = {
		init: function() {
			routes.init();
		}
	}

	var routes = {
		init: function() {
			window.addEventListener("hashchange", function(event){
				var route = window.location.hash;
				sections.toggle(route);
			});
		}
	}

	var sections = {
		toggle: function(route) {
			var sections = document.querySelectorAll(".content");

			[].forEach.call(sections, function(section) {
        		section.classList.remove('show');
      		});

      		document.querySelector(route).classList.add('show');
		}
	}

	app.init();

})();