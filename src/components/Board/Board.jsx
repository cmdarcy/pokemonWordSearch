import { randomLetter, randomStartingCoordinate } from "../../pokemonUtils";
import Square from "../Square/Square";
import styles from "./Board.module.css";
import { Link } from "react-router-dom";

function Board() {
	const pokemonList = JSON.parse(localStorage.getItem("PokemonList"));
	const longestPokemon = JSON.parse(localStorage.getItem("longestPokemon"));
	const boardStyles = {
		gridTemplateColumns: `repeat(${longestPokemon}, 1fr)`,
		gridTemplateRows: `repeat(${longestPokemon}, 1fr)`,
	};

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
				/>
			);
		}
	}

	//fill board with pokemon letters
	pokemonList.forEach((pokemon) => {
		let pokemonLetters = pokemon.split("");
		let startingCoordinateX;
		let startingCoordinateY;
		let restrictedCoordX;
		let restrictedCoordY;
		//attempt to place pokemon 15 times before giving up
		for (let attempt = 1; attempt <= 15; attempt++) {
			restrictedCoordX = randomStartingCoordinate(
				longestPokemon - pokemon.length
			);
			restrictedCoordY = randomStartingCoordinate(
				longestPokemon - pokemon.length
			);
			startingCoordinateX = randomStartingCoordinate(longestPokemon);
			startingCoordinateY = randomStartingCoordinate(longestPokemon);

			//create potential row
			const potentialRow = boardArray[startingCoordinateY].slice(
				restrictedCoordX,
				restrictedCoordX + pokemon.length
			);
			//create potential column
			const potentialColumn = [];
			for (let index = 0; index < pokemon.length; index++) {
				potentialColumn.push(
					boardArray[restrictedCoordY + index][startingCoordinateX]
				);
			}
			//create potential diagonal
			const potentialDiagonal = [];
			for (let index = 0; index < pokemon.length; index++) {
				potentialDiagonal.push(
					boardArray[restrictedCoordY + index][restrictedCoordX + index]
				);
			}
			console.log(`Attempt ${attempt} for ${pokemon}`);
			console.log("Row:", potentialRow);
			console.log("Column:", potentialColumn);
			console.log("Diagonal:", potentialDiagonal);

			//check if row doesn't already contain a pokemon
			if (
				!potentialRow.some((square) =>
					square.props.hasOwnProperty("associatedPokemon")
				)
			) {
				//replace row section with pokemon letters
				console.log(
					`Placing ${pokemon} at ${restrictedCoordX}, ${startingCoordinateY} horizontally`
				);
				pokemonLetters.forEach((letter, index) => {
					boardArray[startingCoordinateY][restrictedCoordX + index] = (
						<Square
							key={
								`row${startingCoordinateY}` + `col${restrictedCoordX + index}`
							}
							coordinates={[restrictedCoordX + index, startingCoordinateY]}
							letter={letter.toUpperCase()}
							associatedPokemon={pokemon}
						/>
					);
				});
				break;
				//check if column doesn't already contain a pokemon
			} else if (
				!potentialColumn.some((square) =>
					square.props.hasOwnProperty("associatedPokemon")
				)
			) {
				//replace column section with pokemon letters
				console.log(
					`Placing ${pokemon} at ${startingCoordinateX}, ${restrictedCoordY} vertically`
				);
				pokemonLetters.forEach((letter, index) => {
					boardArray[restrictedCoordY + index][startingCoordinateX] = (
						<Square
							key={
								`row${restrictedCoordY + index}` + `col${startingCoordinateX}`
							}
							coordinates={[startingCoordinateX, restrictedCoordY + index]}
							letter={letter.toUpperCase()}
							associatedPokemon={pokemon}
						/>
					);
				});
				break;
				//check if diagonal doesn't already contain a pokemon
			} else if (
				!potentialDiagonal.some((square) =>
					square.props.hasOwnProperty("associatedPokemon")
				)
			) {
				//replace diagonal section with pokemon letters
				console.log(
					`Placing ${pokemon} at ${restrictedCoordX}, ${restrictedCoordY} diagonally`
				);
				pokemonLetters.forEach((letter, index) => {
					boardArray[restrictedCoordY + index][restrictedCoordX + index] = (
						<Square
							key={
								`row${restrictedCoordY + index}` +
								`col${restrictedCoordX + index}`
							}
							coordinates={[restrictedCoordX + index, restrictedCoordY + index]}
							letter={letter.toUpperCase()}
							associatedPokemon={pokemon}
						/>
					);
				});
				break;
			}
			if (attempt === 15) {
				console.log(`Could not place ${pokemon}`);
				alert(`Could not place ${pokemon}`);
			}
		}
	});
	return (
		<>
			<ul>
				{pokemonList.map((pokemon) => (
					<li>{pokemon}</li>
				))}
			</ul>
			<div className={styles.board} style={boardStyles}>
				{boardArray}
			</div>
			<Link to="/home">Back to Home</Link>
		</>
	);
}

export default Board;
