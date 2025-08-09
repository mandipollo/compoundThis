"use client";
import { useSelectedInstrumentStore } from "@/store/selectedInstrumentStore";
import React, { useEffect, useState } from "react";
import ChartInstrument from "./ChartInstrument";
import { Separator } from "../ui/separator";
import InstrumentTopNews from "./InstrumentTopNews";
import InstrumentAbout from "./InstrumentAbout";
import FinancialAccordion from "./FinancialStatementTables/FinancialAccordion";
import FinancialEndOfDay from "./FinancialFundamental/FinancialEndOfDay";

interface InterfaceConsolidatedData {
	adjClose?: number;
	adjHigh?: number;
	adjLow?: number;
	adjOpen?: number;
	adjVolume?: number;
	close?: number;
	date?: string;
	divCash?: number;
	enterpriseVal?: number;
	high?: number;
	low?: number;
	marketCap?: number;
	open?: number;
	pbRatio?: number;
	peRatio?: number;
	splitFactor?: number;
	trailingPEG1Y?: number;
	volume?: number;
}

const initialData: InterfaceConsolidatedData = {
	adjClose: 0,
	adjHigh: 0,
	adjLow: 0,
	adjOpen: 0,
	adjVolume: 0,
	close: 0,
	date: "",
	divCash: 0,
	enterpriseVal: 0,
	high: 0,
	low: 0,
	marketCap: 0,
	open: 0,
	pbRatio: 0,
	peRatio: 0,
	splitFactor: 0,
	trailingPEG1Y: 0,
	volume: 0,
};

const SelectedInstrument = () => {
	const { selectedInstrument } = useSelectedInstrumentStore();

	const [pending, setPending] = useState<boolean>(false);
	const [state, setState] = useState(initialData);

	// financial overview
	useEffect(() => {
		if (!selectedInstrument) {
			return;
		}

		const fetchData = async () => {
			const response = await fetch(
				`/api/stock/getIndividualStock?ticker=${selectedInstrument}`,
				{
					method: "GET",
					headers: { "Content-Type": "application/json" },
				}
			);

			const data = await response.json();

			if (!data.success) {
				return;
			}
			const { consolidatedData } = data.data;
			console.log(data.data);
			setState(consolidatedData);
		};
		fetchData();
	}, [selectedInstrument]);

	// about

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`/api/stock/getAbout?ticker=${selectedInstrument}`,
				{
					method: "GET",
					headers: { "Content-Type": "application/json" },
				}
			);

			const data = await response.json();
			console.log(data);

			if (!data.success) {
				return;
			}
		};
		fetchData();
	}, [selectedInstrument]);
	return (
		<section className="flex flex-col gap-4">
			<div className="flex flex-row justify-between py-2">
				<h2 className="text-xl">{selectedInstrument}</h2>
			</div>
			<Separator />
			<div className="grid grid-cols-[2fr_1fr] gap-4">
				<div className="flex flex-col gap-2 w-full">
					<ChartInstrument />
					<InstrumentTopNews />
					<FinancialAccordion />
				</div>
				<div className="flex flex-col gap-2">
					<div className=" border rounded-md shadow-md ">
						<FinancialEndOfDay
							divCash={state.divCash}
							date={state.date}
							trailingPeg={state.trailingPEG1Y}
							close={state.close}
							low={state.low}
							high={state.high}
							marketCap={state.marketCap}
							volume={state.volume}
							peRatio={state.peRatio}
							pbRation={state.pbRatio}
						/>
					</div>

					<InstrumentAbout />
				</div>
			</div>
		</section>
	);
};

export default SelectedInstrument;
