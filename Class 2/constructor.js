var Clown = function (name, shoeSize){ //als een functie met een hoofdletter begint dan is het een constructor
	this.name = name;
	this.shoeSize = shoeSize;

	this.laugh = function(laughType){
		console.log(laughType + ", my shoes are huge size: " + this.shoeSize)
	}
}

var pipo = new Clown("Pipo", 80); //specifieke variabele die nu te gebruiken is verder in de code
var bassie = new Clown("Bassie", 57); 

pipo.laugh("haha"); //parameter wordt meegegeven aan de functie en vervolgens aan de console.log