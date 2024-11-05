import styles from "./Board.module.css";

function Board({ board, gridSize }) {
	const boardStyles = {
		gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
		gridTemplateRows: `repeat(${gridSize}, 1fr)`,
	};
	return (
		<>
			<div className={styles.board} style={boardStyles}>
				{board}
			</div>
		</>
	);
}

export default Board;
