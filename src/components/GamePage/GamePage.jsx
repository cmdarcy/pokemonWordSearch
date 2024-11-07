import Board from "../Board/Board";
import PokemonOption from "../PokemonOption/PokemonOption";
import { useOutletContext } from "react-router-dom";
import styles from "./GamePage.module.css";
import { Link } from "react-router-dom";

export default function GamePage() {
	const { board, pokemon, difficulty, longestPokemonLength } =
		useOutletContext();
	return (
		<>
			<ul className={styles.pokemon_list}>
				{pokemon.map((pokemon, index) => (
					<PokemonOption
						key={pokemon.name}
						pokemon={pokemon.name}
						id={pokemon.id}
						difficulty={difficulty}
					/>
				))}
			</ul>
			<Board board={board} gridSize={longestPokemonLength} />
			<dialog className="dialog">
				<h2>You won!</h2>
				<p>You caught them all!</p>
				<button
					onClick={() => {
						const dialog = document.querySelector("dialog");
						dialog.classList.remove("dialog_active");
						dialog.close();
					}}
				>
					Close
				</button>
			</dialog>
			<Link to="/">Back to Home</Link>
		</>
	);
}
