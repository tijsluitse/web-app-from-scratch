## Functional programming

labda is een functie zonder naam 
- een callback bijvoorbeeld

Wat is functioneel programmeren
- zo weinig mogelijk variabelen
- functies hebben parameters en geen variabelen
- recursie
- er is geen toestand, er is geen state 
- zo abstract mogelijke functies
- pure functions zijn functies met alles binnen de functie scope of meegegeven met paramaters

map = het html genereren van een array
filter = het filteren van de hoeveelheid arrays
reduce = de nieuwe array doorsturen

```
data = data.map(function(movie){
	console.table(movie); 
	return movie;
});

data = data.filter(function(movie){
	return movie.genres.indexOf('Drama') != -1;
});
```