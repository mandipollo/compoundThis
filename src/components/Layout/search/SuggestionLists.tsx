import {
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandShortcut,
} from "@/components/ui/command";
import React from "react";

import { ResultItem } from "./searchQueryTypes";
import { useSelectedQuoteStore } from "@/store/selectedQuoteStore";
const SuggestionLists = ({ results }: { results: ResultItem[] }) => {
	const { setSelectedQuote } = useSelectedQuoteStore();
	if (!results || results.length === 0) {
		return;
	}

	return (
		<CommandList className="flex flex-col h-60">
			<CommandEmpty>No results found.</CommandEmpty>
			<CommandGroup heading="Suggestions...">
				{results.map(item => {
					return (
						<CommandItem
							onMouseDown={() => {
								setSelectedQuote(item.ticker);
							}}
							key={item.ticker}
						>
							{item.ticker} - <span className=""> {item.name}</span>
							<CommandShortcut>
								{item.market}-{item.primary_exchange}
							</CommandShortcut>
						</CommandItem>
					);
				})}
			</CommandGroup>
		</CommandList>
	);
};

export default SuggestionLists;
