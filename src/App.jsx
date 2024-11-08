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
			<footer>
				<p>
					<a href="https://github.com/cmdarcy/pokemonWordSearch">
						View source code
					</a>
				</p>
				<p>Created by Christopher d'Arcy</p>
				<p>Found a bug? cmdarcy89@gmail.com</p>
			</footer>
		</>
	);
}

export default App;
