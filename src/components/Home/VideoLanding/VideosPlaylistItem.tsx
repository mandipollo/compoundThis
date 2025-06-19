import React from "react";
import Image from "next/image";
const VideosPlaylistItem = () => {
	return (
		<li role="listitem" className="flex flex-row gap-4">
			<div className="relative w-32 h-auto">
				<Image
					src="/demo-video-thumbnail.jpg"
					alt="thumbnail"
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</div>

			<div className="flex flex-col gap-1 w-28">
				<span>6/4/2025</span>
				<p>S&P 500 Pauses After Breakout:</p>
			</div>
		</li>
	);
};

export default VideosPlaylistItem;
