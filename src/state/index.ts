import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialStateTypes {
	isSideBarCollapsed: boolean;
	isDarkmode: boolean;
}
const initialState = {
	isSideBarCollapsed: false,
	isDarkmode: false,
};

export const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setIsSideBarCollapsed: (state, action: PayloadAction<boolean>) => {
			state.isSideBarCollapsed = action.payload;
		},
		setIsDarkMode: (state, action: PayloadAction<boolean>) => {
			state.isDarkmode = action.payload;
		},
	},
});

export const { setIsDarkMode, setIsSideBarCollapsed } = globalSlice.actions;
export default globalSlice.reducer;
