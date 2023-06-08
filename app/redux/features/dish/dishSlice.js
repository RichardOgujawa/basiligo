import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: 0,
};

export const dishSlice = createSlice({
	name: 'dish',
	initialState,
	reducers: {
		addDish: (state) => {
			state.value++;
			console.log('Add Dish:', state.value);
		},
		removeDish: (state) => {
			if (state.value > 0) {
				state.value--;
			}
			console.log(state.value);
		},
	},
});

export const { addDish, removeDish } = dishSlice.actions;

export const selectDish = (state) => state.dish.value;

export default dishSlice.reducer;
