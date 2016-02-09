var module = (function(){ //krijgt de waarde van de anonieme functie die zichzelf aanroept
	var _private = "This is a module with private and public stuff"; //private variabele beginnen altijd met _

	var publicFunction = function() {
		console.log(_private);
	};

	return { //returned een object met daarin de console.log 
		publicFunction: publicFunction
	};
})();

//nalezen via link in de slides