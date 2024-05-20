async function getRandPokemon() {
	let RandomPokemon = Math.floor(Math.random() * 807) + 1;
	const response = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${RandomPokemon}`
	);
	const data = await response.json();
	return data.name;
}

export { getRandPokemon };
