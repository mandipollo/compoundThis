import React from "react";
import VideosPlaylistItem from "./VideosPlaylistItem";

const VideosPlaylist = () => {
	return (
		<div className="flex w-92 ">
			<ul role="list" className="flex flex-col gap-2 overflow-hidden">
				<VideosPlaylistItem />
				<VideosPlaylistItem />
				<VideosPlaylistItem />
				<VideosPlaylistItem />
				<VideosPlaylistItem />
			</ul>
		</div>
	);
};

export default VideosPlaylist;
