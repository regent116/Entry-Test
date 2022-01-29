import { createSlice } from '@reduxjs/toolkit';

export const ProductRefSlice = createSlice({
	name: 'productRef',
	initialState: { productRef: [] },
	reducers: {
		setRefs: (state, action) => {
			state.productRef = action.payload;
		}
	}
});

const { actions } = ProductRefSlice;

export const { setRefs } = actions;

export default ProductRefSlice;
