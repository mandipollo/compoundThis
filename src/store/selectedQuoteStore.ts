import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SelectedQuoteInterface {
	selectedQuote: string;
	setSelectedQuote: (quote: string) => void;
	clearSelectedQuote: () => void;
}

export const useSelectedQuoteStore = create<SelectedQuoteInterface>()(
	persist(
		set => ({
			selectedQuote: "",
			setSelectedQuote: (quote: string) =>
				set(() => ({ selectedQuote: quote })),
			clearSelectedQuote: () => set(() => ({ selectedQuote: "" })),
		}),
		{
			name: "selectedQuote-storage", // key in localStorage
			partialize: state => ({
				selectedQuote: state.selectedQuote,
			}),
		}
	)
);
