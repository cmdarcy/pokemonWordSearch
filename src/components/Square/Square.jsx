import styles from "./Square.module.css";
import { useState } from "react";

function Square({ letter, associatedPokemon, coordinates }) {
	const [selected, setSelected] = useState(false);
	function handleClick() {
		setSelected(!selected);
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
