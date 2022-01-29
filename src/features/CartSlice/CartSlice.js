import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cartOverlayVisible: false,
	currencyOverlayVisible: false,
	products: []
};

export const CartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			let foundMatch = false;

			state.products.forEach((product, i) => {
				if (
					JSON.stringify(product.attributes) === JSON.stringify(action.payload.attributes) &&
					action.payload.product === state.products[i].product &&
					foundMatch === false
				) {
					state.products[i].count += 1;

					foundMatch = true;
				}
			});

			if (foundMatch === true) return;

			state.products.unshift(action.payload);
		},
		increment: (state, action) => {
			const id = action.payload;
			state.products[id].count += 1;
		},
		decrement: (state, action) => {
			const id = action.payload;
			if (state.products[id].count !== 1) state.products[id].count -= 1;
		},
		reset: (state) => {
			state.count = 0;
		},
		resetCart: (state) => {
			state.products = [];
		},
		toggleCartOverlayVisibility: (state) => {
			state.cartOverlayVisible = !state.cartOverlayVisible;
			state.currencyOverlayVisible = false;
		},
		toggleCurrencyOverlayVisibility: (state) => {
			state.currencyOverlayVisible = !state.currencyOverlayVisible;
			state.cartOverlayVisible = false;
		},
		hideOverlays: (state) => {
			state.currencyOverlayVisible = false;
			state.cartOverlayVisible = false;
		}
	}
});

const { actions } = CartSlice;

export const {
	addToCart,
	increment,
	decrement,
	reset,
	resetCart,
	toggleCartOverlayVisibility,
	hideOverlays
} = actions;

export default CartSlice;
