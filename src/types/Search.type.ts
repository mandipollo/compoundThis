import { Dispatch, SetStateAction } from "react";
// search suggestion types
export interface SearchResultItem {
	ticker: string | null;
	name: string | null;
	market: string | null;
	primary_exchange: string | null;
	type: string | null;
}

interface SearchSuggestionItem {
	ticker: string | null;
	name: string | null;
	market: string | null;
	locale: string | null;
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
	count: number | null;
	next_url: string | null;
	request_id: string | null;
	status: string | null;
	results: SearchSuggestionItem[] | [];
}

export type SearchBarType = {
	setSelectedStock?: Dispatch<SetStateAction<string>>;
};
