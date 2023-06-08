import DateTimePicker from '@react-native-community/datetimepicker';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
	Pressable,
	SafeAreaView,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

import { Keyboard } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { selectBasketItems } from '../redux/features/basket/basketSlice';
import {
	addDate,
	addTableSize,
	addTime,
	selectOrder,
} from '../redux/features/order/orderSlice';
import styles from '../styles/variables';

const Reservation = () => {
	const router = useRouter();
	const basket = useSelector(selectBasketItems);
	const order = useSelector(selectOrder);

	//Storing order details
	const dispatch = useDispatch();

	const [formReady, setFormReady] = useState(false);

	const [tableSize, setTableSize] = useState('1');
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		if (!tableSize || !time) setFormReady(false);
		else setFormReady(true);
	}, [tableSize, time]);

	const onSubmit = () => {
		if (formReady) {
			router.push('./Payment');
			dispatch(addTableSize(tableSize));
			// dispatch(addDate(JSON.stringify(date))); // Convert the date to timestamp
			dispatch(addTime(JSON.stringify(time))); // Convert the date to timestamp
		} else alert('Please fill out all the information.');
	};

	const handleChangeText = (text: any) => {
		// Convert the text to a number (assuming it represents a numeric value)
		const numericValue = parseFloat(text);

		// Check if the numeric value is within the desired range
		setTableSize(text);
		if (text !== '')
			if (!isNaN(numericValue) && numericValue <= 10) {
				// Update the value state if it's within the range
			} else {
				setTableSize('');
				alert('Party size must be between 0 and 10');
			}
	};

	return (
		<SafeAreaView className="flex-1">
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View className="flex-1">
					<Header />
					<View className="flex-1" style={styles.center}>
						<Stack.Screen options={{ headerShown: false }} />
						<View className="w-full" style={styles.container}>
							<Text className="font-bold text-2xl mb-7 text-center">
								Book Your Table
							</Text>
						</View>
						<View
							className="w-full space-y-5 items-center"
							style={styles.container}
						>
							<View className="flex-row items-center w-full justify-between">
								<Text className="font-bold"> Party Size: </Text>
								<TextInput
									placeholder="2"
									inputMode="numeric"
									className="border border-gray-400 py-3 px-14"
									onChangeText={handleChangeText}
									value={tableSize}
								/>
							</View>
							<View className="flex-row items-center w-full justify-between">
								<Text className="font-bold">Time: </Text>
								<View className="flex-row items-center">
									<Text>{order.date}</Text>
									<DateTimePicker
										value={time}
										onChange={(event, value: any) => setTime(value)}
										mode="time"
									/>
								</View>
							</View>
							<Pressable className="w-full" onPress={onSubmit}>
								<Text className="text-center bg-emerald-400 text-white p-4 font-semibold uppercase">
									Book
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

export default Reservation;
