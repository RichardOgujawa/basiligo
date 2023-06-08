import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
};

export const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		addToBasket: (state, action) => {
			state.items = [...state.items, action.payload];
		},
		removeFromBasket: (state, action) => {
			const index = state.items.findIndex(
				(item) => item._id === action.payload
			); //does the item already exist, if it does return it to index. It will return the index of the item if it does exist.

			console.log(action.payload);

			let newBasket = [...state.items]; //this just creates a copy of the basket.

			if (index >= 0)
				//if it already exists in the basket.
				newBasket.splice(index, 1); //remove the item from the basket.
			else console.warn('item not found in basket');

			state.items = newBasket;
		},
		emptyBasket: (state) => {
			state.items = [];
		},
	},
});

export const { addToBasket, removeFromBasket, emptyBasket } =
	basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;
export const selectBasketItemsWithId = (state, id) =>
	state.basket.items.filter((item) => item.id === id);

export default basketSlice.reducer;
