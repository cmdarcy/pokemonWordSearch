import "./App.css";
import { Outlet } from "react-router-dom";
function App() {
	return (
		<>
			<header>Pokemon Word Search</header>
			<main>
				<Outlet />
			</main>
			<footer>Created by Christopher d'Arcy</footer>
		</>
	);
}

export default App;
