import { create } from "zustand";
import { persist } from "zustand/middleware";
type State = {
	fxRate: number | null;
	loading: boolean;
	error: string | null;
};

type Action = {
	fetchFxRate: () => Promise<void>;
};

// create store
export const useFxStore = create<State & Action>()(
	persist(
		set => ({
			fxRate: null,
			loading: false,
			error: null,
			fetchFxRate: async () => {
				try {
					set({ loading: true, error: null });
					const res = await fetch("/api/fx");
					const data = await res.json();
					set({
						fxRate: data.rate,
						loading: false,
					});
				} catch (error) {
					set({
						loading: false,
						error: "Failed to load FX rate",
					});
				}
			},
		}),
		{
			name: "fxrate", // key in localStorage
		}
	)
);
