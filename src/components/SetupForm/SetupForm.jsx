import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getRandPokemon } from "../../pokemonUtils";
import styles from "./SetupForm.module.css";

function SetupForm() {
	const [numPokemon, setnumPokemon] = useState(0);
	const navigate = useNavigate();
	let PokemonList = [];
	let PokemonIds = [];
	let longestPokemon = 0;
	async function handleSubmit(event) {
		event.preventDefault();
		for (let index = 0; index < numPokemon; index++) {
			let randPokemon = await getRandPokemon();
			PokemonList.push(randPokemon["name"]);
			PokemonIds.push(randPokemon["id"]);
			longestPokemon = Math.max(longestPokemon, randPokemon["name"].length);
		}
		localStorage.setItem("PokemonList", JSON.stringify(PokemonList));
		localStorage.setItem("PokemonIds", JSON.stringify(PokemonIds));
		longestPokemon += 2;
		localStorage.setItem("longestPokemon", longestPokemon);
		navigate("/game");
	}
	return (
		<>
			<form action="" onSubmit={handleSubmit}>
				<input
					className={styles.input}
					type="number"
					placeholder="Number of Pokemon"
					min="0"
					max="15"
					value={numPokemon}
					onChange={(e) => setnumPokemon(e.target.value)}
				/>
				<button type="submit" className={styles.button}>
					Generate Board
				</button>
			</form>
		</>
	);
}

export default SetupForm;
