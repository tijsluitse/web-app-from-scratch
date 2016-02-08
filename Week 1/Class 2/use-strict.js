var doSomething = function() {
	'use strict';
	name = "Henk"; //hij maakt nu een variabele in de global scope aan 
}

var doSomething = function() {
	'use strict';
	var name = "Henk"; //hij maakt nu een variabele in de functie scope aan 
}