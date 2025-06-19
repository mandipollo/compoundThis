import Image from "next/image";
import React from "react";

const SearchBar = () => {
	return (
		<div className="flex flex-row relative h-8 px-2 max-w-96 w-full">
			<input
				placeholder="Search for stocks , ETFs and more"
				className="flex w-full h-full pl-8 rounded-md border border-gray-400 outline-none"
			></input>
			<Image
				className="absolute top-2 left-4"
				src="/search.svg"
				alt="search icon"
				width={16}
				height={16}
			/>
		</div>
	);
};

export default SearchBar;
