import React, { useState, useRef } from "react";

const AudioPlayer = ({ src }) => {
	const [isPlaying, setIsPlaying] = useState(false);

	const audioRef = useRef(null);

	const togglePlay = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	return (
		<div>
			<audio ref={audioRef} src={src} preload="metadata" />
			<div>
				<button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
					{isPlaying ? "Pause" : "Play"}
				</button>
			</div>
		</div>
	);
};

export default AudioPlayer;
