import { createSlice } from '@reduxjs/toolkit';

export const CategorySlice = createSlice({
	name: 'categories',
	initialState: { currentCategory: 'all' },
	reducers: {
		addCategory: (state, action) => {
			state.currentCategory = action.payload;
		}
	}
});

const { actions } = CategorySlice;

export const { addCategory } = actions;

export default CategorySlice;
