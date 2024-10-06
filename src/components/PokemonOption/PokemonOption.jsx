import styles from "./PokemonOption.module.css";
function PokemonOption({ pokemon, id = 1 }) {
	return (
		<div className={styles.flex_container}>
			<p datatype={pokemon}>{pokemon}</p>
			<img
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
				alt=""
			/>
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
