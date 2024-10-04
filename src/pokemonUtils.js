export async function getRandPokemon() {
	let RandomPokemon = Math.floor(Math.random() * 807) + 1;
	const response = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${RandomPokemon}`
	);
	const data = await response.json();
	const { name, id } = data;
	const pokemonObject = { name, id };
	return pokemonObject;
}

export function randomLetter() {
	let RandomLetter = Math.floor(Math.random() * 26) + 97;
	return String.fromCharCode(RandomLetter).toUpperCase();
}

export function randomStartingCoordinate(number) {
	return Math.floor(Math.random() * number);
}
