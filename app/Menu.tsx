import { AxiosError, AxiosResponse } from 'axios';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, Text, View } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Dish from './components/Dish';

import { Provider } from 'react-redux';

import store from './redux/store/store';

import CounterRedux from './components/CounterRedux';
import styles from './styles/variables';

const axios = require('axios').default;

const Menu = () => {
	//Sanity
	let PROJECT_ID = 'o0jxila9';
	let DATASET = 'production';
	//the encode uri component is used to escape special characters in the query. So for example if opening square brackets are used in the query, the query will be encoded as %5B and closing brackets will be encoded as %5D. If you want to see exactly what the query will look like, you can just console log the query URL.

	const [counter, setCounter] = useState(0);

	const incrementCounter = () => {
		if (counter < 6) setCounter(counter + 1);
		else return;
	};

	const decrementCounter = () => {
		if (counter > 0) setCounter(counter - 1);
		else return;
	};

	//Date
	let currentDate = new Date();
	const [today, setToday] = useState(new Date().toISOString().slice(0, 10));

	const [month, setMonth] = useState('');
	const [day, setDay] = useState('');

	const [dish, setDish] = useState([]);

	useEffect(() => {
		currentDate.setDate(currentDate.getDate() + counter);
		const formattedDate = currentDate.toISOString().slice(0, 10);

		setToday(formattedDate);
		setMonth(formattedDate.slice(5, 7));
		setDay(formattedDate.slice(8, 10));
		console.log(month);
		console.log(day);
		console.log(today);
	}, [counter]);

	function fetchData() {
		let QUERY = encodeURIComponent(
			`*[_type == "dishes" && date == "${today}"]`
		);

		let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

		axios
			.get(URL)
			.then((response: AxiosResponse<any>) => {
				const data = response.data.result;
				setDish(data);
			})
			.catch((error: AxiosError<any>) => {
				console.error(error);
			});
	}

	//This calls the fetchData function when the component mounts
	useEffect(() => {
		fetchData();
	}, []);

	//This calls the fetchData function when the component updates via the today counter variable
	useEffect(() => {
		fetchData();
	}, [today]);

	return (
		<Provider store={store}>
			<SafeAreaView className="flex-1 items-center">
				<Stack.Screen options={{ headerShown: false }} />
				<View
					className=" w-full flex-row justify-between py-5 items-center"
					style={styles.container}
				>
					<View className=" flex-1">
						<FeatherIcon name="menu" size={22} color="#9ca3af" />
					</View>
					<View className=" flex-row justify-center flex-[2]">
						<Image
							source={require('./assets/images/branding/wordmark.png')}
							resizeMode="contain"
							className="h-10"
						/>
					</View>
					<View className=" flex-row space-x-4 items-center flex-1 justify-end">
						<FeatherIcon name="filter" size={22} color="#9ca3af" />
						<View>
							<FeatherIcon name="shopping-cart" size={22} color="#9ca3af" />
							<View className="bg-yellow-700 absolute left-full rounded-full w-3 aspect-square items-center justify-center">
								<Text className="text-white text-[9px]">2</Text>
							</View>
						</View>
					</View>
				</View>

				{/**Line with decoration**/}
				<Image
					source={require('./assets/images/branding/line-with-decoration.png')}
					resizeMode="contain"
					className="w-full -mt-3"
				/>
				{/**Date**/}
				<View className="w-full flex-row items-center py-5 -mb-1 -mt-3">
					<View className=" flex-1 items-center">
						<MCIcon
							onPress={decrementCounter}
							name="arrow-left-bold-box-outline"
							size={25}
							color="#9ca3af"
						/>
					</View>
					<View className=" flex-1 items-center">
						<Text className="font-bold">
							Today {month}/{day}
						</Text>
					</View>
					<View className=" flex-1 items-center">
						<MCIcon
							onPress={incrementCounter}
							name="arrow-right-bold-box-outline"
							size={25}
							color="#9ca3af"
						/>
					</View>
				</View>

				<CounterRedux />
				{/**Dishes**/}
				<View style={styles.container} className="w-full flex-1">
					<FlatList
						data={dish}
						keyExtractor={(item) => item._id}
						renderItem={({ item }) => <Dish item={item} />}
					/>
				</View>
			</SafeAreaView>
		</Provider>
	);
};

export default Menu;
