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
					coordinates={[col + 1, row + 1]}
				/>
			);
		}
	}

	//fill board with pokemon letters
	pokemonList.forEach((pokemon) => {
		let startingCoordinateX;
		let startingCoordinateY;
		for (let attempt = 1; attempt <= 10; attempt++) {
			startingCoordinateX = randomStartingCoordinate(
				longestPokemon - pokemon.length
			);
			startingCoordinateY = randomStartingCoordinate(
				longestPokemon - pokemon.length
			);
			if (
				!boardArray[startingCoordinateY].some((square) =>
					square.props.hasOwnProperty("associatedPokemon")
				)
			) {
				let pokemonLetters = pokemon.split("");
				pokemonLetters.forEach((letter, index) => {
					boardArray[startingCoordinateY][startingCoordinateX + index] = (
						<Square
							key={index}
							letter={letter.toUpperCase()}
							associatedPokemon={pokemon}
						/>
					);
				});
				break;
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
