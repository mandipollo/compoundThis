"use client";
import { useSelectedInstrumentStore } from "@/store/selectedInstrumentStore";
import React, { useEffect, useState } from "react";
import ChartInstrument from "./ChartInstrument";
import { Separator } from "../ui/separator";
import StockFundamentalOverview from "../Stock/StockFundamentalOverview";
import InstrumentTopNews from "./InstrumentTopNews";
import InstrumentAbout from "./InstrumentAbout";
import NewsCarousel from "../News/NewsCarousel";

const SelectedInstrument = () => {
	const { selectedInstrument } = useSelectedInstrumentStore();

	const [pending, setPending] = useState<boolean>(false);
	const [state, setState] = useState<string>("");

	// useEffect(() => {}, [selectedInstrument]);
	return (
		<section className="flex flex-col gap-4">
			<div className="flex flex-row justify-between py-2">
				<h2 className="text-xl">{selectedInstrument}</h2>
			</div>
			<Separator />
			<div className="grid grid-cols-[2fr_1fr] gap-2">
				<ChartInstrument />
				<StockFundamentalOverview />
			</div>
			<div className="grid grid-cols-[2fr_1fr] gap-2">
				<InstrumentTopNews />
				<InstrumentAbout />
			</div>
		</section>
	);
};

export default SelectedInstrument;
