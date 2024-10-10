import { Outlet } from "react-router-dom";
function App() {
	return (
		<>
			<header>
				<h1>Pokemon Word Search</h1>
			</header>
			<main>
				<Outlet />
			</main>
			<footer>Created by Christopher d'Arcy</footer>
		</>
	);
}

export default App;
