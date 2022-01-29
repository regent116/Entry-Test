import { createSlice } from '@reduxjs/toolkit';

export const ProductSlice = createSlice({
	name: 'product',
	initialState: {
		currentProduct: '',
		currentAttributes: [],
		currentImageIndex: 0
	},
	reducers: {
		setCurrentProduct: (state, action) => {
			state.currentProduct = action.payload;
		},
		setCurrentAttributes: (state, action) => {
			state.currentAttributes = action.payload;
		},
		setCurrentImage: (state, action) => {
			state.currentImageIndex = action.payload;
		},
		increment: (state) => {
			state.currentImageIndex += 1;
		},
		decrement: (state) => {
			state.currentImageIndex -= 1;
		},
		reset: (state) => {
			state.currentImageIndex = 0;
		},
		resetAttributes: (state) => {
			state.currentAttributes = [];
		}
	}
});

const { actions } = ProductSlice;

export const {
	setCurrentProduct,
	setCurrentAttributes,
	setCurrentImage,
	increment,
	decrement,
	reset
} = actions;

export default ProductSlice;
