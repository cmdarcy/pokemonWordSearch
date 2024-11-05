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

export function generateRandomChoice(
	horizArray,
	vertArray,
	diagArray,
	pokemon
) {
	const options = ["horizontal", "diagonal", "vertical"];
	let chosenOption = options[Math.floor(Math.random() * options.length)];
	if (
		!doesOptionWork(chosenOption, horizArray, vertArray, diagArray, pokemon)
	) {
		// console.log(`${chosenOption} failed`);
		let remainingOptions = options.filter((option) => option !== chosenOption);
		chosenOption =
			remainingOptions[Math.floor(Math.random() * remainingOptions.length)];
		if (
			!doesOptionWork(chosenOption, horizArray, vertArray, diagArray, pokemon)
		) {
			// console.log(`${chosenOption} also failed`);
			remainingOptions = remainingOptions.filter(
				(option) => option !== chosenOption
			);
			chosenOption =
				remainingOptions[Math.floor(Math.random() * remainingOptions.length)];
			if (
				!doesOptionWork(chosenOption, horizArray, vertArray, diagArray, pokemon)
			) {
				// console.log(`${chosenOption} finally failed`);
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
	potentialDiagonal,
	pokemon
) {
	if (option === "horizontal") {
		if (
			!potentialRow.some((square) =>
				square.props.hasOwnProperty("associatedPokemon")
			)
		) {
			return true;
		}
		if (
			potentialRow.some(
				(square, index) =>
					square.props.hasOwnProperty("associatedPokemon") &&
					square.props.letter !== pokemon[index]
			)
		) {
			return false;
		} else {
			return true;
		}
	} else if (option === "diagonal") {
		if (
			!potentialDiagonal.some((square) =>
				square.props.hasOwnProperty("associatedPokemon")
			)
		) {
			return true;
		}
		if (
			potentialDiagonal.some(
				(square, index) =>
					square.props.hasOwnProperty("associatedPokemon") &&
					square.props.letter !== pokemon[index]
			)
		) {
			return false;
		} else {
			return true;
		}
	} else if (option === "vertical") {
		if (
			!potentialColumn.some((square) =>
				square.props.hasOwnProperty("associatedPokemon")
			)
		) {
			return true;
		}
		if (
			potentialColumn.some(
				(square, index) =>
					square.props.hasOwnProperty("associatedPokemon") &&
					square.props.letter !== pokemon[index]
			)
		) {
			return false;
		} else {
			return true;
		}
	}
}
