"use client";

import React, { useState } from "react";
import SearchBar from "../Layout/search/SearchBar";
import SelectedInstrument from "./SelectedInstrument";

const StockSearch = () => {
	return (
		<section className="flex flex-col gap-2 w-full h-full pt-8 pb-2 pr-2">
			<SearchBar />
			<SelectedInstrument />
		</section>
	);
};

export default StockSearch;
