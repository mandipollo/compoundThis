export interface Stock {
	buyDate: string;
	buyPrice: number;
	companyName: string;
	currency: string;
	id: number;
	portfolioId: number;
	quantity: number;
	ticker: string;
}

export interface UserPortfolio {
	createdAt: string;
	currency: string;
	id: number;
	portfolioHolderId: number;
	portfolioName: string;
	stocks: Stock[];
}
