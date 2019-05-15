let fact = document.querySelector('#fact');
let factText = document.querySelector('#factText');
let pokeButton = document.querySelector('#pokeButton');
let randomUser = document.querySelector('#randomUser');


let numberInput = document.querySelector('#numberInput');
numberInput.addEventListener('input', getFactAjax);

function getFactAjax() {
	let number = numberInput.value;
	
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `http://numbersapi.com/${number}/year`);

	xhr.onload = function() {
		if (this.status === 200 && number !== '') {
			fact.style.display = 'block';
			factText.innerHTML = 	'<h4 class="card-title">Number Fact</h4>' + this.responseText;
		}
	};

	xhr.send();
}

pokeButton.addEventListener('click', () => {
	let pokeNumber = numberInput.value;

	let xhr = new XMLHttpRequest();
	xhr.open('GET', `https://pokeapi.co/api/v2/pokemon/${pokeNumber}`);

	xhr.onload = function() {
		if (this.status === 200 && pokeNumber !== '') {
			let pokeObj = JSON.parse(this.responseText);
			let pokeName = pokeObj.name[0].toUpperCase().concat(pokeObj.name.slice(1));
			let theMoves = ''
			let moves = pokeObj.moves.map(function(move) {
				theMoves+= `<li>${move.move.name[0].toUpperCase().concat(move.move.name.slice(1))}</li>`
			});
			fact.style.display = 'block';
			factText.innerHTML = `<p><strong>Name</strong>: ${pokeName}<br />`;
			factText.innerHTML += `<img src="${pokeObj.sprites.front_default}" alt="${pokeName}" />`;
			factText.innerHTML += `<p><strong>Moves</strong>: <br /> <ul>${theMoves}</ul>`;
		} else {
			console.log('That ain\'t right.')
		}
	}
	xhr.send();
});

// randomUser.addEventListener('click', () => {
// 	fact.style.display = 'block';
// 	let person = '';

// 	let xhr = new XMLHttpRequest();
//   xhr.open('GET', 'https://randomuser.me/api/');
//   xhr.onload = function() {
//   	if(this.status === 200) {
//   		let parsedPerson = JSON.parse(this.responseText);
//   		parsedPerson = parsedPerson.results[0];

//   		let name = parsedPerson.name.first[0].toUpperCase().concat(parsedPerson.name.first.slice(1)) + ' ' + parsedPerson.name.last[0].toUpperCase().concat(parsedPerson.name.last.slice(1));
//   		person += `<h1>${name}</h1>`;
//   		person += `<img src="${parsedPerson.picture.large}" alt="name" class="personPhoto" />`;
//   		person += `<p><strong>Cell Phone</strong>: ${parsedPerson.cell}</p>`;
//   		person += `<p><strong>Email Address</strong>: ${parsedPerson.email}</p>`;
//   		person += `<p><strong>Age</strong>: ${parsedPerson.dob.age}</p>`;
//   	} else {
//   		console.log('That ain\'t right...');
//   	}

//   	factText.innerHTML = person;
//   };
//   xhr.send();
// });

randomUser.addEventListener('click', getRandomUserFetch);

function getRandomUserFetch() {
	fact.style.display = 'block';
	let person = '';
	fetch('https://randomuser.me/api/')
	.then(res => res.json()) // or res.text() if our response was text
	.then(data => {
		let parsedPerson = data.results[0];

		let name = parsedPerson.name.first[0].toUpperCase().concat(parsedPerson.name.first.slice(1)) + ' ' + parsedPerson.name.last[0].toUpperCase().concat(parsedPerson.name.last.slice(1));
		person += `<h1 class="personName mt-3">${name}</h1>`;
		person += `<img src="${parsedPerson.picture.large}" alt="${name}" class="personPhoto" />`;
		person += `<p><strong>Cell Phone</strong>: ${parsedPerson.cell}</p>`;
		person += `<p><strong>Email Address</strong>: ${parsedPerson.email}</p>`;
		person += `<p><strong>Age</strong>: ${parsedPerson.dob.age}</p>`;
		console.log(person);
		factText.innerHTML = person;
	})
	.catch(err => console.log(err));
}


