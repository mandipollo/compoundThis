import Image from "next/image";
import React from "react";

const SearchBar = () => {
	return (
		<div className="flex flex-row relative h-10 max-w-2xl w-full text-white">
			<input
				placeholder="Search for stocks , ETFs and more"
				className="flex w-full h-full pl-10 rounded-md bg-primary outline-1 outline-[#18312e] focus:outline-green-700 transition-colors duration-300 ease-in"
			></input>
			<Image
				className="absolute top-3 left-4"
				src="/search.svg"
				alt="search icon"
				width={16}
				height={16}
			/>
		</div>
	);
};

export default SearchBar;
