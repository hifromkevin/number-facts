let fact = document.querySelector('#fact');
let factText = document.querySelector('#factText');
let button = document.querySelector('#submit');

let numberInput = document.querySelector('#numberInput');
numberInput.addEventListener('input', getFactAjax);

function getFactAjax() {
	let number = numberInput.value;
	
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `http://numbersapi.com/${number}`);

	xhr.onload = function() {
		if (this.status === 200 && number !== '') {
			fact.style.display = 'block';
			factText.innerHTML = this.responseText;
		}
	};

	xhr.send();
}

	submit.addEventListener('click', () => {
		let number = numberInput.value;

		let xhr = new XMLHttpRequest();
		xhr.open('GET', `https://pokeapi.co/api/v2/pokemon/${number}`);

		xhr.onload = function() {
			if (this.status === 200 && number !== '') {
				let pokeObj = JSON.parse(this.responseText);
				let pokeName = pokeObj.name[0].toUpperCase().concat(pokeObj.name.slice(1));
				let theMoves = ''
				let moves = pokeObj.moves.map(function(move) {
					theMoves+= `<li>${move.move.name[0].toUpperCase().concat(move.move.name.slice(1))}</li>`
				});
				fact.style.display = 'block';
				console.log('hy',pokeObj.sprites.front_default);
				factText.innerHTML = `<p><strong>Name</strong>: ${pokeName}<br />`;
				factText.innerHTML += `<img src="${pokeObj.sprites.front_default}" alt="${pokeName}" />`;
				factText.innerHTML += `<p><strong>Moves</strong>: <br /> <ul>${theMoves}</ul>`;
			} else {
				console.log('That ain\'t right.')
			}
		}
		xhr.send();
	});