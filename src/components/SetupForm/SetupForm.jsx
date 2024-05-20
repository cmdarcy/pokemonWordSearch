import { useNavigate } from "react-router-dom";
import styles from "./SetupForm.module.css";

function SetupForm() {
	const navigate = useNavigate();
	function handleSubmit(event) {
		event.preventDefault();
		navigate("/board");
	}
	return (
		<>
			<form action="" onSubmit={handleSubmit}>
				<input type="number" placeholder="Number of Pokemon" />
				<button type="submit">Generate Board</button>
			</form>
		</>
	);
}

export default SetupForm;
