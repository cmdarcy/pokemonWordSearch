import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getRandPokemon } from "../../pokemonUtils";
import styles from "./SetupForm.module.css";

function SetupForm() {
	const [numPokemon, setnumPokemon] = useState(0);
	const [difficulty, setdifficulty] = useState("easy");
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
			<form className={styles.setup_form} action="" onSubmit={handleSubmit}>
				<label className={styles.setup_form__label} htmlFor="numberOfPokemon">
					Number of Pokemon
				</label>
				<input
					className={styles.setup_form__input}
					type="number"
					id="numberOfPokemon"
					placeholder="Number of Pokemon"
					min="0"
					max="15"
					value={numPokemon}
					onChange={(e) => setnumPokemon(e.target.value)}
				/>
				<label className={styles.setup_form__label} htmlFor="difficulty">
					Difficulty
				</label>
				<div>
					<input
						type="radio"
						name="difficulty"
						id="difficulty-easy"
						value="easy"
						defaultChecked
						onChange={(e) => setdifficulty(e.target.value)}
					/>
					<label className={styles.setup_form__label} htmlFor="difficulty-easy">
						Easy
					</label>
					<input
						type="radio"
						name="difficulty"
						id="difficulty-medium"
						value="medium"
						onChange={(e) => setdifficulty(e.target.value)}
					/>
					<label
						className={styles.setup_form__label}
						htmlFor="difficulty-medium"
					>
						Medium
					</label>
					<input
						type="radio"
						name="difficulty"
						id="difficulty-hard"
						value="hard"
						onChange={(e) => setdifficulty(e.target.value)}
					/>
					<label className={styles.setup_form__label} htmlFor="difficulty-hard">
						Hard
					</label>
				</div>
				<button type="submit" className={styles.setup_form__button}>
					Generate Board
				</button>
			</form>
		</>
	);
}

export default SetupForm;
