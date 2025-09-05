import React from "react";

// components
import SearchBar from "@/components/Layout/search/SearchBar";
import SelectedQuoteComponent from "@/components/QuoteSearch/SelectedQuoteComponent";
import SectionContainer from "@/components/Containers/SectionContainer";

const SearchPage = () => {
	return (
		<SectionContainer>
			<SearchBar />
			<SelectedQuoteComponent />
		</SectionContainer>
	);
};

export default SearchPage;
