import Board from "../Board/Board";
import PokemonOption from "../PokemonOption/PokemonOption";
import styles from "./GamePage.module.css";
import { Link } from "react-router-dom";

export default function GamePage() {
	const pokemonList = JSON.parse(localStorage.getItem("PokemonList"));
	const PokemonIds = JSON.parse(localStorage.getItem("PokemonIds"));
	return (
		<>
			<ul className={styles.pokemon_list}>
				{pokemonList.map((pokemon, index) => (
					<PokemonOption
						key={pokemon}
						pokemon={pokemon}
						id={PokemonIds[index]}
					/>
				))}
			</ul>
			<Board />
			<dialog>
				<h2>You won!</h2>
				<p>You caught them all!</p>
				<button
					onClick={() => {
						const dialog = document.querySelector("dialog");
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
