import styles from "./Square.module.css";
import { useState } from "react";

function Square({
	letter,
	associatedPokemon,
	coordinates,
	selectedArray,
	answersArray,
}) {
	const [selected, setSelected] = useState(false);
	function handleClick() {
		setSelected(!selected);
		!selected
			? selectedArray.push(coordinates)
			: selectedArray.splice(selectedArray.indexOf(coordinates), 1);
		//loop through answersArray and check if selectedArray matches any pokemon
		for (const pokemon in answersArray) {
			if (selectedArray.toString() === answersArray[pokemon].toString()) {
				console.log(`You found ${pokemon}`);
				const PokemonName = document.querySelector(`[datatype="${pokemon}"]`);
				PokemonName.dataset.type = "found";
				PokemonName.style.textDecoration = "line-through";
				selectedArray.splice(0, selectedArray.length);
			}
		}
		// check if every pokemon has been found
		if (
			document.querySelectorAll(`[data-type="found"]`).length ===
			document.querySelectorAll(`[datatype]`).length
		) {
			alert("You win! You found all pokemons!");
		}
	}
	return (
		<>
			{associatedPokemon ? (
				<button
					className={
						selected
							? styles.selected + " " + styles.board_button
							: styles.pokemonLetterbox + " " + styles.board_button
					}
					onClick={handleClick}
				>
					{letter}
				</button>
			) : (
				<button
					className={
						selected
							? styles.selected + " " + styles.board_button
							: styles.letterbox + " " + styles.board_button
					}
					onClick={handleClick}
				>
					{letter}
				</button>
			)}
		</>
	);
}

export default Square;
