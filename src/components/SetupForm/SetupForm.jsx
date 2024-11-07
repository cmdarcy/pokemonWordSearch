import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { getRandPokemon } from "../../pokemonUtils";
import styles from "./SetupForm.module.css";
import generateBoard from "../../generateBoard.jsx";

function SetupForm() {
	const { setBoard, setDifficulty, setPokemon, setLongestPokemonLength } =
		useOutletContext();
	const [numPokemon, setnumPokemon] = useState(0);
	const navigate = useNavigate();
	let PokemonList = [];
	let longestPokemon = 0;
	async function handleSubmit(event) {
		event.preventDefault();
		for (let index = 0; index < numPokemon; index++) {
			let randPokemon = await getRandPokemon();
			PokemonList.push({ name: randPokemon["name"], id: randPokemon["id"] });
			longestPokemon = Math.max(longestPokemon, randPokemon["name"].length);
		}
		setPokemon(PokemonList);
		setLongestPokemonLength(longestPokemon + 2);
		setBoard(generateBoard(PokemonList, longestPokemon, setPokemon));
		navigate("/game");
	}
	return (
		<>
			<p className={styles.setup_form__description}>
				Enter number of Pokemon and choose your difficulty. The difficulty will
				determine how much information you will be give about the pokemon you
				are trying to find. Click the letters of each pokemon's name to capture
				it. Can you catch them all?
			</p>
			<form className={styles.setup_form} action="" onSubmit={handleSubmit}>
				<label className={styles.setup_form__label} htmlFor="numberOfPokemon">
					Number of Pokemon
				</label>
				<input
					className={styles.setup_form__input}
					type="number"
					id="numberOfPokemon"
					placeholder="Number of Pokemon"
					min={1}
					max={15}
					value={numPokemon}
					onChange={(e) => setnumPokemon(e.target.value)}
					autoFocus
				/>
				<label className={styles.setup_form__label}>Difficulty</label>
				<div>
					<input
						type="radio"
						name="difficulty"
						id="difficulty-easy"
						value="easy"
						defaultChecked
						onChange={(e) => setDifficulty(e.target.value)}
					/>
					<label className={styles.setup_form__label} htmlFor="difficulty-easy">
						Easy
					</label>
					<input
						type="radio"
						name="difficulty"
						id="difficulty-medium"
						value="medium"
						onChange={(e) => setDifficulty(e.target.value)}
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
						onChange={(e) => setDifficulty(e.target.value)}
					/>
					<label className={styles.setup_form__label} htmlFor="difficulty-hard">
						Hard
					</label>
				</div>
				<button
					type="submit"
					className={
						numPokemon
							? `${styles.setup_form__button} ${styles.setup_form__button__active}`
							: `${styles.setup_form__button} ${styles.setup_form__button__inactive}`
					}
					disabled={numPokemon === 0}
				>
					Generate Board
				</button>
			</form>
		</>
	);
}

export default SetupForm;
