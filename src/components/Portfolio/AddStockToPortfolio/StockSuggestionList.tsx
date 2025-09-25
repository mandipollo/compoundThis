import React, { SetStateAction } from "react";

//ui
import {
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandShortcut,
} from "@/components/ui/command";

// types
import { SearchResultItem } from "@/types/Search.type";

const StockSuggestionLists = ({
	results,
	setSelectedStock,
}: {
	results: SearchResultItem[];
	setSelectedStock: React.Dispatch<SetStateAction<SearchResultItem | null>>;
}) => {
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
								setSelectedStock(item);
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

export default StockSuggestionLists;
