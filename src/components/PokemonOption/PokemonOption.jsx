import styles from "./PokemonOption.module.css";
function PokemonOption({ pokemon, id = 1 }) {
	const difficulty = localStorage.getItem("difficulty");

	return (
		<div className={styles.flex_container}>
			{difficulty === "easy" ? (
				<p className={styles.pokemon_name}>{pokemon}</p>
			) : null}
			{difficulty === "easy" || difficulty === "medium" ? (
				<img
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
					alt=""
				/>
			) : null}
			<audio className={styles.audio} controls>
				<source
					src={`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`}
					type="audio/ogg"
				/>
				Your browser does not support the audio element.
			</audio>
		</div>
	);
}

export default PokemonOption;
