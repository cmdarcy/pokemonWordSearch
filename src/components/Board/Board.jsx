import styles from "./Board.module.css";
import { Link } from "react-router-dom";

function Board() {
	const pokemon = JSON.parse(localStorage.getItem("PokemonList"));
	return (
		<>
			<ul>
				{pokemon.map((pokemon) => (
					<li>{pokemon}</li>
				))}
			</ul>
			<Link to="/home">Back to Home</Link>
		</>
	);
}

export default Board;
