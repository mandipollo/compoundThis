import SearchBar from "@/components/Layout/search/SearchBar";
import React from "react";
import SelectedQuoteComponent from "@/components/QuoteSearch/SelectedQuoteComponent";

const SearchPage = () => {
	return (
		<section className="flex flex-col gap-2 w-full h-full pt-8 pb-2 pr-2">
			<SearchBar />
			<SelectedQuoteComponent />
		</section>
	);
};

export default SearchPage;
