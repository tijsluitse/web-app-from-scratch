var Person = {

}

Person.prototype.cry = function() {
	console.log("Mehhh"); //deze cry wordt er dus ingeladen bij pipo
}

var Clown = function (name, shoeSize) {
	this.name = name;
	this.shoeSize = shoeSize;
}

Clown.prototype.laugh = function() {
	console.log("Whoehaha, my shoes are a huge size: " + this.shoeSize);
}

var pipo = new Clown ("Pipo", 80);
var bassie = new Clown ("Bassie", 57);

pipo.laugh(); 
pipo.cry(); //deze bestaat in het Clown object niet dus kijkt naar het object daarboven
