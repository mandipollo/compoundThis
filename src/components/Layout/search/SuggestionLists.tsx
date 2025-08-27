import React from "react";

//ui
import {
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandShortcut,
} from "@/components/ui/command";

// types
import { SearchResultItem } from "@/types/Stock.type";

// hooks
import { useSelectedQuoteStore } from "@/store/selectedQuoteStore";

const SuggestionLists = ({ results }: { results: SearchResultItem[] }) => {
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
								setSelectedQuote(item.ticker ?? "");
							}}
							key={item.ticker}
						>
							{item.ticker} - <span className=""> {item.name ?? "N/A"}</span>
							<CommandShortcut>
								{item.type ?? "N/A"}-{item.primary_exchange ?? "N/A"}
							</CommandShortcut>
						</CommandItem>
					);
				})}
			</CommandGroup>
		</CommandList>
	);
};

export default SuggestionLists;
