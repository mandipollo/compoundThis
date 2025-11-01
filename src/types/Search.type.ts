import { Dispatch, SetStateAction } from "react";
// search suggestion types
export interface SearchResultItem {
	ticker: string;
	name: string;
	market: string;
	primary_exchange: string;
	type: string;
}

interface SearchSuggestionItem {
	ticker: string;
	name: string;
	market: string;
	locale: string;
	cik: string | null;
	primary_exchange: string | null;
	type: string | null;
	active: boolean | null;
	currency_name: string | null;
	composite_figi: string | null;
	share_class_figi: string | null;
	last_updated_utc: string | null;
}
export interface SearchSuggestionResponse {
	count: number;
	next_url: string;
	request_id: string;
	status: string;
	results: SearchSuggestionItem[] | [];
}

export type SearchBarType = {
	setSelectedStock?: Dispatch<SetStateAction<string>>;
};
