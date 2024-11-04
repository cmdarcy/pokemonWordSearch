import {
	generateRandomChoice,
	randomLetter,
	randomStartingCoordinate,
} from "../../pokemonUtils";
import Square from "../Square/Square";
import PokemonOption from "../PokemonOption/PokemonOption";
import styles from "./Board.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Board() {
	const pokemonList = JSON.parse(localStorage.getItem("PokemonList"));
	const longestPokemon = JSON.parse(localStorage.getItem("longestPokemon"));
	const PokemonIds = JSON.parse(localStorage.getItem("PokemonIds"));
	const selectedArray = [];
	const answersArray = {};
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
					selectedArray={selectedArray}
					answersArray={answersArray}
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

			let randomChoice = generateRandomChoice(
				potentialRow,
				potentialColumn,
				potentialDiagonal,
				pokemon
			);

			console.log(`Attempt ${attempt} for ${pokemon}`);

			if (randomChoice === "horizontal") {
				//replace row section with pokemon letters
				console.log(
					`Placing ${pokemon} at ${restrictedCoordX}, ${startingCoordinateY} horizontally`
				);
				answersArray[pokemon] = [];
				pokemonLetters.forEach((letter, index) => {
					boardArray[startingCoordinateY][restrictedCoordX + index] = (
						<Square
							key={
								`row${startingCoordinateY}` + `col${restrictedCoordX + index}`
							}
							coordinates={[restrictedCoordX + index, startingCoordinateY]}
							letter={letter.toUpperCase()}
							associatedPokemon={pokemon}
							selectedArray={selectedArray}
							answersArray={answersArray}
						/>
					);
					//add coordinates of pokemon to answersArray
					answersArray[pokemon].push([
						restrictedCoordX + index,
						startingCoordinateY,
					]);
				});
				break;
			} else if (randomChoice === "vertical") {
				//replace column section with pokemon letters
				console.log(
					`Placing ${pokemon} at ${startingCoordinateX}, ${restrictedCoordY} vertically`
				);
				answersArray[pokemon] = [];
				pokemonLetters.forEach((letter, index) => {
					boardArray[restrictedCoordY + index][startingCoordinateX] = (
						<Square
							key={
								`row${restrictedCoordY + index}` + `col${startingCoordinateX}`
							}
							coordinates={[startingCoordinateX, restrictedCoordY + index]}
							letter={letter.toUpperCase()}
							associatedPokemon={pokemon}
							selectedArray={selectedArray}
							answersArray={answersArray}
						/>
					);
					//add coordinates of pokemon to answersArray
					answersArray[pokemon].push([
						startingCoordinateX,
						restrictedCoordY + index,
					]);
				});
				break;
			} else if (randomChoice === "diagonal") {
				//replace diagonal section with pokemon letters
				console.log(
					`Placing ${pokemon} at ${restrictedCoordX}, ${restrictedCoordY} diagonally`
				);
				answersArray[pokemon] = [];
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
							selectedArray={selectedArray}
							answersArray={answersArray}
						/>
					);
					//add coordinates of pokemon to answersArray
					answersArray[pokemon].push([
						restrictedCoordX + index,
						restrictedCoordY + index,
					]);
				});
				break;
			} else {
				console.log(`Could not place ${pokemon} on attempt ${attempt}`);
			}
			if (attempt === 15) {
				console.log(`Could not place ${pokemon} after 15 attempts`);
				alert(`Could not place ${pokemon}`);
				//TODO Fix alert logic to remove pokemon from answer key and board if it cannot be placed
			}
		}
	});
	return (
		<>
			<div className={styles.board} style={boardStyles}>
				{boardArray}
			</div>
		</>
	);
}

export default Board;
