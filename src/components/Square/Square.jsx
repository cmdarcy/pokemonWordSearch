import styles from "./Square.module.css";

function Square({ letter, associatedPokemon }) {
	return (
		<>
			{associatedPokemon ? (
				<h3 className={styles.pokemonLetterbox}>{letter}</h3>
			) : (
				<h3 className={styles.letterbox}>{letter}</h3>
			)}
		</>
	);
}

export default Square;
