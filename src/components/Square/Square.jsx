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
				alert(`You win! The pokemon is ${pokemon}`);
				selectedArray.splice(0, selectedArray.length);
			}
		}
	}
	return (
		<>
			{associatedPokemon ? (
				<button
					className={selected ? styles.selected : styles.pokemonLetterbox}
					onClick={handleClick}
				>
					{letter}
				</button>
			) : (
				<button
					className={selected ? styles.selected : styles.letterbox}
					onClick={handleClick}
				>
					{letter}
				</button>
			)}
		</>
	);
}

export default Square;
