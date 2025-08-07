import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SelectedInstrumentInterface {
	selectedInstrument: string;
	setSelectedInstrument: (instrument: string) => void;
	clearSelectedInstrument: () => void;
}

export const useSelectedInstrumentStore = create<SelectedInstrumentInterface>()(
	persist(
		set => ({
			selectedInstrument: "",
			setSelectedInstrument: (instrument: string) =>
				set(() => ({ selectedInstrument: instrument })),
			clearSelectedInstrument: () => set(() => ({ selectedInstrument: "" })),
		}),
		{
			name: "selectedInstrument-storage", // key in localStorage
			partialize: state => ({
				selectedInstrument: state.selectedInstrument,
			}),
		}
	)
);
