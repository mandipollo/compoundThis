import React from "react";
import VideoCategoryListItem from "./VideoCategoryListItem";
import VideosPlaylist from "./VideosPlaylist";

const VideosSection = () => {
	return (
		<section className="flex flex-row items-center justify-center w-full  bg-primary text-white">
			<div className="flex flex-row gap-2 max-w-5xl w-full ">
				<div className="flex flex-col w-full py-10">
					<h5 className="text-2xl py-6">Video</h5>
					<div className="flex flex-row gap-2">
						<div className="flex flex-col gap-2 w-full">
							<video width="440" height="540" controls preload="none">
								<source src="/path/to/video.mp4" type="video/mp4" />
								<track
									src="/path/to/captions.vtt"
									kind="subtitles"
									srcLang="en"
									label="English"
								/>
								Your browser does not support the video tag.
							</video>
							<div className="flex flex-col gap-2">
								<p className="text-gray-400">Investing podcast 6/4/2025</p>
								<p className="text-xl">
									Why Average True Range Is A Bigger Deal Than Ever Before, An..
								</p>
								<p className="text-gray-400">
									Do you like trading high-octane stocks? IBD's Mike Webster
									shares whether or not it's worth investing when the risk is
									high, and how to help determine a stock's risk
								</p>
							</div>
						</div>

						<VideosPlaylist />
					</div>
				</div>
				<div className="flex flex-col w-92 px-4 bg-[#272833] py-10">
					<h6 className="text-lg py-6 px-4">Video Categories</h6>
					<ul className="flex flex-col">
						<VideoCategoryListItem category="Featured Videos" />
						<VideoCategoryListItem category="Investing Podcast" />
						<VideoCategoryListItem category="Stock Market Today" />
						<VideoCategoryListItem category="Investing Strategies" />
						<VideoCategoryListItem category="How To Invest" />
					</ul>
				</div>
			</div>
		</section>
	);
};

export default VideosSection;
