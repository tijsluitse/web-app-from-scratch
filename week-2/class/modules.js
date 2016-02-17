//in bestand add.js
export function add(a, b) {
	return a + b;
};

//in ander bestand
import { 
	add 
} from './add.js' //de file waar de functie add in staat, tussen de brackets is welke functies je wilt ophalen

add(1, 2);