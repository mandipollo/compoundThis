import Image from "next/image";
import React from "react";

//TODO:
//implement search for investment instruments
// context overlay box
// navigate link to invesment instruments
const SearchBar = () => {
	return (
		<div className="flex flex-row relative h-10 px-2 max-w-96 w-full">
			<input
				placeholder="Search for stocks , ETFs and more"
				className="flex w-full h-full pl-8 rounded-md bg-[#041f1c] outline-3 outline-[#18312e] focus:outline-green-700 transition-colors duration-300 ease-in"
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
