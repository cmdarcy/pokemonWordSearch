import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getRandPokemon } from "../../pokemonUtils";
import styles from "./SetupForm.module.css";

function SetupForm() {
	const [numPokemon, setnumPokemon] = useState(0);
	const navigate = useNavigate();
	let PokemonList = [];
	let longestPokemon = 0;
	async function handleSubmit(event) {
		event.preventDefault();
		for (let index = 0; index < numPokemon; index++) {
			let randPokemon = await getRandPokemon();
			PokemonList.push(randPokemon);
			longestPokemon = Math.max(longestPokemon, randPokemon.length);
		}
		localStorage.setItem("PokemonList", JSON.stringify(PokemonList));
		longestPokemon += 4;
		localStorage.setItem("longestPokemon", longestPokemon);
		navigate("/board");
	}
	return (
		<>
			<form action="" onSubmit={handleSubmit}>
				<input
					type="number"
					placeholder="Number of Pokemon"
					min="0"
					max="15"
					value={numPokemon}
					onChange={(e) => setnumPokemon(e.target.value)}
				/>
				<button type="submit">Generate Board</button>
			</form>
		</>
	);
}

export default SetupForm;
