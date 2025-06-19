import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
	userId: string;
	cognitoId: string;
	userName: string;
	email: string;
}

export interface Portfolio {
	portfolioId: number;
	portfolioName: string;
}

export interface Stock {
	id: number;
	ticker: string;
	price: number;
	companyName: string;
}
export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
	tagTypes: ["Portfolio"],
	endpoints: build => ({
		getPortfolio: build.query<Portfolio[], void>({
			query: () => "portfolio",
			providesTags: ["Portfolio"],
		}),
		createPortfolio: build.mutation<Portfolio, Partial<Portfolio>>({
			query: portfolio => ({
				url: "portfolio",
				method: "POST",
				body: portfolio,
			}),
			invalidatesTags: ["Portfolio"],
		}),
	}),
});

export const { useGetPortfolioQuery, useCreatePortfolioMutation } = api;
