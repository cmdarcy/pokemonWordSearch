import React, { useState, useRef } from "react";
import styles from "./AudioPlayer.module.css";

const AudioPlayer = ({ src }) => {
	const audioRef = useRef(null);

	return (
		<div>
			<audio ref={audioRef} src={src} preload="metadata" />
			<div>
				<button
					className={styles.audioPlayer__button}
					onClick={() => audioRef.current.play()}
					aria-label={"Play"}
				>
					{"Play"}
				</button>
			</div>
		</div>
	);
};

export default AudioPlayer;
