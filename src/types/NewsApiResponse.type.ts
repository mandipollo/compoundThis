export interface NewsItem {
	id: string;
	publisher: {
		name: string;
		homepage_url: string;
		logo_url: string;
		favicon_url: string;
	};
	title: string;
	author: string;
	published_utc: string;
	article_url: string;
	tickers: string[];
	image_url: string;
	description: string;
	keywords: string[];
	insights: {
		ticker: string;
		sentiment: string;
		sentiment_reasoning: string;
	}[];
}

export interface NewsApiResponse {
	results: NewsItem[];
	status: string;
	request_id: string;
	count: number;
	next_url: string;
}
