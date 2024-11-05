import Square from "./components/Square/Square";
import {
	generateRandomChoice,
	randomStartingCoordinate,
	randomLetter,
} from "./pokemonUtils";

export default function generateBoard(
	pokemonObjArray,
	longestPokemonLength,
	updatePokemonList
) {
	const pokemonList = pokemonObjArray;
	console.log(pokemonList);
	const longestPokemon = longestPokemonLength + 2;
	const selectedArray = [];
	const answersArray = {};

	//construct board and fill with random letters
	let boardArray = [];
	for (let row = 0; row < longestPokemon; row++) {
		boardArray[row] = [];
		for (let col = 0; col < longestPokemon; col++) {
			boardArray[row][col] = (
				<Square
					key={`row${row}` + `col${col}`}
					letter={randomLetter()}
					coordinates={[col, row]}
					selectedArray={selectedArray}
					answersArray={answersArray}
				/>
			);
		}
	}

	//fill board with pokemon letters
	pokemonList.forEach((pokemon) => {
		let pokemonLetters = pokemon.name.split("");
		let startingCoordinateX;
		let startingCoordinateY;
		let restrictedCoordX;
		let restrictedCoordY;

		//attempt to place pokemon 15 times before giving up
		for (let attempt = 1; attempt <= 15; attempt++) {
			restrictedCoordX = randomStartingCoordinate(
				longestPokemon - pokemon.name.length
			);
			restrictedCoordY = randomStartingCoordinate(
				longestPokemon - pokemon.name.length
			);
			startingCoordinateX = randomStartingCoordinate(longestPokemon);
			startingCoordinateY = randomStartingCoordinate(longestPokemon);

			//create potential row
			const potentialRow = boardArray[startingCoordinateY].slice(
				restrictedCoordX,
				restrictedCoordX + pokemon.name.length
			);
			//create potential column
			const potentialColumn = [];
			for (let index = 0; index < pokemon.name.length; index++) {
				potentialColumn.push(
					boardArray[restrictedCoordY + index][startingCoordinateX]
				);
			}
			//create potential diagonal
			const potentialDiagonal = [];
			for (let index = 0; index < pokemon.name.length; index++) {
				potentialDiagonal.push(
					boardArray[restrictedCoordY + index][restrictedCoordX + index]
				);
			}

			let randomChoice = generateRandomChoice(
				potentialRow,
				potentialColumn,
				potentialDiagonal,
				pokemon.name
			);

			if (randomChoice === "horizontal") {
				//replace row section with pokemon letters
				answersArray[pokemon.name] = [];
				pokemonLetters.forEach((letter, index) => {
					boardArray[startingCoordinateY][restrictedCoordX + index] = (
						<Square
							key={
								`row${startingCoordinateY}` + `col${restrictedCoordX + index}`
							}
							coordinates={[restrictedCoordX + index, startingCoordinateY]}
							letter={letter.toUpperCase()}
							associatedPokemon={pokemon.name}
							selectedArray={selectedArray}
							answersArray={answersArray}
						/>
					);
					//add coordinates of pokemon to answersArray
					answersArray[pokemon.name].push([
						restrictedCoordX + index,
						startingCoordinateY,
					]);
				});
				break;
			} else if (randomChoice === "vertical") {
				//replace column section with pokemon letters
				answersArray[pokemon.name] = [];
				pokemonLetters.forEach((letter, index) => {
					boardArray[restrictedCoordY + index][startingCoordinateX] = (
						<Square
							key={
								`row${restrictedCoordY + index}` + `col${startingCoordinateX}`
							}
							coordinates={[startingCoordinateX, restrictedCoordY + index]}
							letter={letter.toUpperCase()}
							associatedPokemon={pokemon.name}
							selectedArray={selectedArray}
							answersArray={answersArray}
						/>
					);
					//add coordinates of pokemon to answersArray
					answersArray[pokemon.name].push([
						startingCoordinateX,
						restrictedCoordY + index,
					]);
				});
				break;
			} else if (randomChoice === "diagonal") {
				//replace diagonal section with pokemon letters
				answersArray[pokemon.name] = [];
				pokemonLetters.forEach((letter, index) => {
					boardArray[restrictedCoordY + index][restrictedCoordX + index] = (
						<Square
							key={
								`row${restrictedCoordY + index}` +
								`col${restrictedCoordX + index}`
							}
							coordinates={[restrictedCoordX + index, restrictedCoordY + index]}
							letter={letter.toUpperCase()}
							associatedPokemon={pokemon.name}
							selectedArray={selectedArray}
							answersArray={answersArray}
						/>
					);
					//add coordinates of pokemon to answersArray
					answersArray[pokemon.name].push([
						restrictedCoordX + index,
						restrictedCoordY + index,
					]);
				});
				break;
			} else {
				console.log(`Could not place ${pokemon.name} on attempt ${attempt}`);
			}
			if (attempt === 15) {
				console.log(`Could not place ${pokemon.name} after 15 attempts`);
				alert(`Could not place ${pokemon.name}`);
				const updatedPokemonList = pokemonList.slice(0, -1);
				updatePokemonList(updatedPokemonList);
				console.log(updatedPokemonList);
			}
		}
	});
	return boardArray;
}
