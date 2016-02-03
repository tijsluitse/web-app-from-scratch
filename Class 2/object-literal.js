//object literal is een object met maar 1 instantie
//beste design pattern om je code te structureren

var car = {
	wheels: 3, //een property
	color: "green", //color = key, "green" = value
	aesthetics: "ugly",
	accelerate: function() { //een method = een functie in een object
		console.log(this.wheels) //met this hoef je niet als de variabele naam veranderd ook de verwijzing te veranderen
	}
};

car.model = "porsche"; //direct property toevoegen

//context = in het object waarin je je bevindt
//scope = in de functie waarin je je bevindt
//global scope = window
//lexical scope (functie scope) = binnen functie > je voorkomt conflicten en je code wordt leesbaarder


