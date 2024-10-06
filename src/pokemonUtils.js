export async function getRandPokemon() {
	let data;
	do {
		let RandomPokemon = Math.floor(Math.random() * 807) + 1;
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${RandomPokemon}`
		);
		data = await response.json();
	} while (data.name.length >= 12);
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

export function generateRandomChoice(horizArray, vertArray, diagArray) {
	const options = ["horizontal", "diagonal", "vertical"];
	let chosenOption = options[Math.floor(Math.random() * options.length)];
	if (!doesOptionWork(chosenOption, horizArray, vertArray, diagArray)) {
		console.log(`${chosenOption} failed`);
		let remainingOptions = options.filter((option) => option !== chosenOption);
		chosenOption =
			remainingOptions[Math.floor(Math.random() * remainingOptions.length)];
		if (!doesOptionWork(chosenOption, horizArray, vertArray, diagArray)) {
			console.log(`${chosenOption} also failed`);
			remainingOptions = remainingOptions.filter(
				(option) => option !== chosenOption
			);
			chosenOption =
				remainingOptions[Math.floor(Math.random() * remainingOptions.length)];
			if (!doesOptionWork(chosenOption, horizArray, vertArray, diagArray)) {
				console.log(`${chosenOption} finally failed`);
				return;
			}
		}
	}
	return chosenOption;
}

function doesOptionWork(
	option,
	potentialRow,
	potentialColumn,
	potentialDiagonal
) {
	if (option === "horizontal") {
		return !potentialRow.some((square) =>
			square.props.hasOwnProperty("associatedPokemon")
		);
	} else if (option === "diagonal") {
		return !potentialDiagonal.some((square) =>
			square.props.hasOwnProperty("associatedPokemon")
		);
	} else if (option === "vertical") {
		return !potentialColumn.some((square) =>
			square.props.hasOwnProperty("associatedPokemon")
		);
	}
}
