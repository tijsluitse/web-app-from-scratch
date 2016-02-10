////////////
// Theory //
////////////

function timeout (duration){ //hoelang de timeout erover moet doen
	return new Promise((resolve, reject) => { //een Promise kun je sturen en opvangen, opties zijn succes of mislukt
		window.setTimeout(function(){
			resolve(duration);
		}, duration);
	});	
};

timeout(1000)
	.then(response => { //altijd gelinkt aan resolve
		console.log(response); //nu is response 1000
		return response + 10; //waardes worden aan volgende then meegegeven
	})
	.then(response => {
		console.log(response); //nu is response 1010
	})
	.catch(err => { //altijd gelinkt aan reject
		console.log(err);
	})

Promise.all([timeout(1000), timeout(2000)])
	.then(response => {
		console.log(response); //hier uit komt een erray met twee waardes: 1000 & 2000
	})
	.catch(err => {
		console.log(err);
	})

/////////////
// Example //
/////////////

function getWebsite(url){
	return new Promise(function(resolve, reject) { //promise wordt terug gegeven 
		var request = new XMLHttpRequest();

		request.onloadstart = function() {
			console.log('showLoader');
		};

		request.onload = function(response) {
			console.log('hideLoader');
		};

		request.onerror = reject; //als het mislukt is

		request.open('GET', url, true);
		request.send();
	});
};

getWebsite('http://www.google.nl')
	.then(function(response){
		console.log(response);
	})
	.catch(function(reject){
		console.log('error')
	})