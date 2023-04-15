let container = document.querySelector('.container');

fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
	.then(response => response.json())
	.then(poke => {
		let pokemonList = poke.results;

		pokemonList.forEach(pokemon => {
			fetch(pokemon.url)
				.then(response => response.json())
				.then(poke => {
					let name = poke.name;
					let image = poke.sprites.front_default;
					let stats = poke.stats.map(stat => ({name: stat.stat.name, value: stat.base_stat}));

					let card = document.createElement('div');
					card.classList.add('card');

					let img = document.createElement('img');
					img.src = image;
					card.appendChild(img);

					let nameElement = document.createElement('p');
					nameElement.innerText = name;
					card.appendChild(nameElement);

					stats.forEach(stat => {
						const statElement = document.createElement('p');
						statElement.innerText = `${stat.name}: ${stat.value}`;
						card.appendChild(statElement);
					});

					card.addEventListener('mouseover', () => {
						card.classList.add('scale-up-center');
					});

					card.addEventListener('mouseout', () => {
						card.classList.remove('scale-up-center');
					});

					container.appendChild(card);
				});
		});
	});

