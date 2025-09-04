import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HomeSelectedQuoteInterface {
	selectedQuote: string;
	setSelectedQuote: (quote: string) => void;
	clearSelectedQuote: () => void;
}

export const useHomeSelectedQuoteStore = create<HomeSelectedQuoteInterface>()(
	persist(
		set => ({
			selectedQuote: "AAPL",
			setSelectedQuote: (quote: string) =>
				set(() => ({ selectedQuote: quote })),
			clearSelectedQuote: () => set(() => ({ selectedQuote: "AAPL" })),
		}),
		{
			name: "homeSelectedQuote-storage", // key in localStorage
			partialize: state => ({
				selectedQuote: state.selectedQuote,
			}),
		}
	)
);
