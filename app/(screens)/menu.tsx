//Imports
import { AxiosError, AxiosResponse } from 'axios';
import { Link, Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
	FlatList,
	Image,
	Modal,
	Pressable,
	SafeAreaView,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Dish from '../components/Dish';

import styles from '../styles/variables';

import { useDispatch, useSelector } from 'react-redux';
import { selectBasketItems } from '../redux/features/basket/basketSlice';
import { addDate, selectOrder } from '../redux/features/order/orderSlice';

const axios = require('axios').default;

//Interfaces & Types
export interface DishProp {
	_id?: string;
	name?: string;
	price?: number;
	image?: string;
	ingredients?: string;
	date?: Date;
}

const Menu = () => {
	//Sanity
	let PROJECT_ID = 'o0jxila9';
	let DATASET = 'production';
	const order = useSelector(selectOrder);
	const dispatch = useDispatch();

	const [counter, setCounter] = useState(0);

	const incrementCounter = () => {
		if (itemAlreadySelected) {
			alert('Please select dishes from the same menu day.');
		} else if (counter < 6) {
			setCounter(counter + 1);
		} else return;
	};

	const decrementCounter = () => {
		if (itemAlreadySelected) {
			alert('Please select dishes from the same menu day.');
		} else if (counter > 0) {
			setCounter(counter - 1);
		} else return;
	};

	//Date
	let currentDate = new Date();
	const [today, setToday] = useState(new Date().toISOString().slice(0, 10));
	const [month, setMonth] = useState('');
	const [day, setDay] = useState('');
	const [year, setYear] = useState('');
	const [serializedDate, setSerializedDate] = useState(
		new Date().toISOString()
	);

	function handlerSetDate(handleCounter: number = 0) {
		currentDate.setDate(currentDate.getDate() + handleCounter);
		const formattedDate = currentDate.toISOString().slice(0, 10);

		setToday(formattedDate);
		setMonth(formattedDate.slice(5, 7));
		setDay(formattedDate.slice(8, 10));
		setYear(formattedDate.slice(0, 4));
	}

	useEffect(() => {
		handlerSetDate();
	}, []);

	useEffect(() => {
		setSerializedDate(`${year}-${month}-${day}`);
	}, [year, month, day]);

	useEffect(() => {
		handlerSetDate(counter);
		dispatch(addDate(serializedDate));
	}, [counter, month, day, year, serializedDate]);

	//Set Dishes
	const [dish, setDish] = useState<DishProp[]>([]);

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

	//Modals
	const [basketModalVisible, setBasketModalVisible] = useState(false);
	const [menuModalVisible, setMenuModalVisible] = useState(false);

	const handlerMenuModal = () => {
		setMenuModalVisible(false);
		router.push('./Settings');
	};

	//Controlling Basket Items
	const basketItems = useSelector(selectBasketItems);
	const [groupedBasketItems, setGroupedBasketItems] = useState([]);

	useEffect(() => {
		const groupedItems = basketItems.reduce(
			(results: any[], item: DishProp) => {
				const existingItem = results.find(
					(result) => result.item._id === item._id
				);
				if (existingItem) {
					existingItem.count += 1;
					existingItem._id = `${item._id}${existingItem.count}`;
				} else {
					results.push({ item, count: 1 });
				}
				// console.log(results);
				return results;
			},
			[]
		);

		setGroupedBasketItems(groupedItems);
	}, [basketItems]);

	//If basket items has anything in it don't let the user go to another day
	const [itemAlreadySelected, setItemAlreadySelected] = useState(false);

	useEffect(() => {
		if (basketItems.length === 0) setItemAlreadySelected(false);
		else setItemAlreadySelected(true);
	}, [basketItems]);

	useEffect(() => {}, [itemAlreadySelected]);

	const router = useRouter();

	const goToPayment = () => {
		if (basketItems.length !== 0) {
			setBasketModalVisible(false);
			router.push('./reservation');
			console.log('Go to Payment');
		} else console.log("Don't go to Payment");
	};

	return (
		<SafeAreaView className="flex-1 items-center">
			<Stack.Screen options={{ headerShown: false }} />

			<Modal
				animationType="slide"
				transparent={true}
				visible={basketModalVisible}
				onRequestClose={() => {
					setBasketModalVisible(!basketModalVisible);
				}}
			>
				<TouchableWithoutFeedback
					className="bg-blue-500 h-full w-full items-center justify-center"
					onPress={() => {
						setBasketModalVisible(!basketModalVisible);
					}}
				>
					<View
						className="bg-gray-400/30 h-full justify-center items-center "
						style={styles.container}
					>
						<Pressable className="w-full">
							<View
								className="bg-white px-7 w-full space-y-4 py-5"
								style={styles.container}
							>
								<View style={{ borderBottomWidth: 0 }}>
									<Text className="text-center font-bold text-lg uppercase">
										CHECKOUT
									</Text>
								</View>

								<FlatList
									className="border-b"
									data={groupedBasketItems}
									keyExtractor={(item) => item.item._id}
									renderItem={({ item }) => (
										<View className="flex-row justify-between py-1">
											<Text className="font-bold flex-[3]" numberOfLines={1}>
												{item.item.name}
											</Text>
											<Text className="text-emerald-600 font-bold flex-[1]">
												{' '}
												x {item.count}
											</Text>
											<Text className="text-xs flex-1 text-right">
												€{item.item.price.toFixed(2)}
											</Text>
										</View>
									)}
								/>

								<View className="text-right font-bold justify-between flex-row">
									<Text>Order Total</Text>
									<Text className="font-bold">
										€
										{basketItems
											.reduce((acc: number, item: any) => acc + item.price, 0)
											.toFixed(2)}
									</Text>
								</View>
								<TouchableOpacity
									className="bg-emerald-400 p-4"
									onPress={goToPayment}
								>
									<Text className="text-center text-white font-bold" font-bold>
										Place Order
									</Text>
								</TouchableOpacity>
							</View>
						</Pressable>
					</View>
				</TouchableWithoutFeedback>
			</Modal>

			<Modal
				animationType="slide"
				transparent={true}
				visible={menuModalVisible}
				onRequestClose={() => {
					setBasketModalVisible(!basketModalVisible);
				}}
			>
				<TouchableWithoutFeedback
					className="bg-blue-500 h-full w-full items-center justify-center"
					onPress={() => {
						setMenuModalVisible(!menuModalVisible);
					}}
				>
					<View
						className="bg-gray-400/30 h-full justify-center items-center "
						style={styles.container}
					>
						<Pressable className="w-full">
							<View
								className="bg-white px-7 w-full space-y-4 pt-7 pb-10 items-center"
								style={styles.container}
							>
								<View className="flex-row justify-end w-full">
									<FeatherIcon
										name="x"
										size={30}
										onPress={() => setMenuModalVisible(false)}
									/>
								</View>
								<Pressable
									className="py-3 flex-row space-x-3 w-full justify-center"
									onPress={handlerMenuModal}
								>
									<FeatherIcon name="settings" size={19} />
									<Text className="">Settings</Text>
								</Pressable>
							</View>
						</Pressable>
					</View>
				</TouchableWithoutFeedback>
			</Modal>

			<View
				className=" w-full flex-row justify-between py-5 items-center"
				style={styles.container}
			>
				<View className="flex-1">
					<View>
						<FeatherIcon
							name="menu"
							size={22}
							color="#9ca3af"
							onPress={() => setMenuModalVisible(true)}
						/>
					</View>
				</View>
				<View className="flex-row justify-center flex-[2] -z-10">
					<Image
						source={require('../assets/images/branding/wordmark.png')}
						resizeMode="contain"
						className="h-10"
					/>
				</View>
				<View className=" flex-row space-x-4 items-center flex-1 justify-end">
					{/* <FeatherIcon name="filter" size={22} color="#9ca3af" /> */}
					<View>
						<FeatherIcon
							name="shopping-cart"
							size={22}
							color="#9ca3af"
							onPress={() => setBasketModalVisible(true)}
						/>
						<View className="bg-yellow-700 absolute left-full rounded-full w-3 aspect-square items-center justify-center">
							<Text className="text-white text-[9px]">
								{basketItems.length}
							</Text>
						</View>
					</View>
				</View>
			</View>

			{/**Line with decoration**/}
			<Image
				source={require('../assets/images/branding/line-with-decoration.png')}
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
						{counter == 0 ? 'Today' : `${month}/${day}`}
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

			{/**Dishes**/}
			<View style={styles.container} className="w-full flex-1">
				<FlatList
					data={dish}
					keyExtractor={(item) => item._id}
					renderItem={({ item }) => <Dish item={item} />}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Menu;
