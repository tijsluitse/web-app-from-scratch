//arrow function = kortere notatie van een functie

var total = [1,2,3].reduce(function(a,b){
	return a + b;
});

var total = [1,2,3].reduce((a,b) => a + b); //nieuwe notatie

var Counter = function() {
	this.counter = 0;
	window.setInterval(() => { //giet .this over in deze functie 
		this.counter++;
	}, 1000);
};

new Counter();
