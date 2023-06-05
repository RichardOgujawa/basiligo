import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
	decrement,
	increment,
	selectCount,
} from '../redux/features/counter/counterSlice';

const Counter = () => {
	const count = useSelector(selectCount);
	const dispatch = useDispatch();

	return (
		<View>
			<TouchableOpacity
				className="bg-red-800 p-4 my-5"
				onPress={() => dispatch(increment())}
			>
				<Text className="text-white">CounterRedux+</Text>
			</TouchableOpacity>
			<TouchableOpacity
				className="bg-red-800 p-4 my-5"
				onPress={() => dispatch(decrement())}
			>
				<Text className="text-white">CounterRedux-</Text>
			</TouchableOpacity>
			<Text>{count}</Text>
		</View>
	);
};

export default Counter;
