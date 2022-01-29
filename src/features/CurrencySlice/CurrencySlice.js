import { createSlice } from '@reduxjs/toolkit';

export const CurrencySlice = createSlice({
	name: 'currency',
	initialState: {
		currentCurrency: 'USD',
		currentSymbol: '$'
	},
	reducers: {
		setCurrency: (state, action) => {
			state.currentCurrency = action.payload.code;
			state.currentSymbol = action.payload.symbol;
		}
	}
});

const { actions } = CurrencySlice;

export const { addCategory } = actions;

export default CurrencySlice;
