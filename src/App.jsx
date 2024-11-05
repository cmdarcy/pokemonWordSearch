import { useState } from "react";
import { Outlet } from "react-router-dom";
function App() {
	const [board, setBoard] = useState([]);
	const [difficulty, setDifficulty] = useState("easy");
	const [pokemon, setPokemon] = useState([]);
	const [longestPokemonLength, setLongestPokemonLength] = useState(0);

	return (
		<>
			<header>
				<h1>Pokemon Word Search</h1>
			</header>
			<main>
				<Outlet
					context={{
						board,
						setBoard,
						difficulty,
						setDifficulty,
						pokemon,
						setPokemon,
						longestPokemonLength,
						setLongestPokemonLength,
					}}
				/>
			</main>
			<footer>Created by Christopher d'Arcy</footer>
		</>
	);
}

export default App;
