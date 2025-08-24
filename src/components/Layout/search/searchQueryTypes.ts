import { Dispatch, SetStateAction } from "react";

export interface SearchResultItem {
	ticker: string;
	name: string | null;
	market: string | null;
	primary_exchange: string | null;
	type: string | null;
}
export type SearchBarType = {
	setSelectedStock?: Dispatch<SetStateAction<string>>;
};
