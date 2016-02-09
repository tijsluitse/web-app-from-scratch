var pipo = {
	name: 'Pipo',
	shoeSize: 80,
	laugh: function() {
		setTimeout (function() {
			console.log("whoehahaha" + this.shoeSize) //this verwijst nu naar setTimeout, wat native is en dus verwijst naar de window scope
		}, 3000);
	}
}

var pipo = {
	name: 'Pipo',
	shoeSize: 80,
	laugh: function() {
		var self = this; //verwijst naar functie scope van laugh

		setTimeout (function() {
			console.log("whoehahaha" + self.shoeSize) //this word nu vervangen door self en komt uiteindelijk bij de laugh functie scope
		}, 3000);
	}
}