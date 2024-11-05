import styles from "./PokemonOption.module.css";
function PokemonOption({ pokemon, id = 1, difficulty = "easy" }) {
	return (
		<div className={styles.flex_container}>
			{difficulty === "easy" ? (
				<p className={styles.pokemon_name} datatype={pokemon}>
					{pokemon}
				</p>
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
			//TODO create custom audio player to style controls present
		</div>
	);
}

export default PokemonOption;
