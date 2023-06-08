import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	tableSize: '',
	date: JSON.stringify(new Date()),
	time: JSON.stringify(new Date()),
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		addTableSize: (state, action) => {
			state.tableSize = action.payload;
		},
		addDate: (state, action) => {
			const year = action.payload.split('').splice(0, 4).join('');
			const initialMonth = action.payload.split('').splice(5, 2).join('');
			const day = action.payload.split('').splice(8, 2).join('');

			let month;
			switch (initialMonth) {
				case '01':
					month = 'Jan';
					break;
				case '02':
					month = 'Feb';
					break;
				case '03':
					month = 'Mar';
					break;
				case '04':
					month = 'Apr';
					break;
				case '05':
					month = 'May';
					break;
				case '06':
					month = 'June';
					break;
				case '07':
					month = 'July';
					break;
				case '08':
					month = 'Aug';
					break;
				case '09':
					month = 'Sept';
					break;
				case '10':
					month = 'Oct';
					break;
				case '11':
					month = 'Nov';
					break;
				case '12':
					month = 'Dec';
					break;
			}
			state.date = `${month} ${day}, ${year}`;
		},
		addTime: (state, action) => {
			d = new Date(JSON.parse(action.payload));
			d.setTime(d.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
			state.time = JSON.stringify(d)
				.split('T')[1]
				.split(':')
				.slice(0, 2)
				.join(':');
		},
	},
});

export const { addTableSize, addDate, addTime } = orderSlice.actions;

export const selectOrder = (state) => state.order;

export default orderSlice.reducer;
