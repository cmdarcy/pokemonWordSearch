import AudioPlayer from "../AudioPlayer/AudioPlayer";
import styles from "./PokemonOption.module.css";
function PokemonOption({ pokemon, id = 1, difficulty = "easy" }) {
	return (
		<div className={styles.flex_container} datatype={pokemon}>
			{difficulty === "easy" ? (
				<p className={styles.pokemon_name}>{pokemon}</p>
			) : null}
			{difficulty === "easy" || difficulty === "medium" ? (
				<img
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
					alt=""
				/>
			) : null}
			<AudioPlayer
				src={`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`}
			/>
		</div>
	);
}

export default PokemonOption;
