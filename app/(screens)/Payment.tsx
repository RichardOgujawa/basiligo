import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
	Image,
	Modal,
	Pressable,
	SafeAreaView,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FlatList } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import {
	emptyBasket,
	selectBasketItems,
} from '../redux/features/basket/basketSlice';
import { selectOrder } from '../redux/features/order/orderSlice';
import styles from '../styles/variables';

const Payment = () => {
	const order = useSelector(selectOrder);
	const basketItems = useSelector(selectBasketItems);
	const [modalVisible, setModalVisible] = useState(false);
	const router = useRouter();
	const dispatch = useDispatch();

	console.log(basketItems);

	useEffect(() => {
		let timeoutId: any;

		if (modalVisible) {
			timeoutId = setTimeout(() => {
				router.push('./menu');
				console.log('inside modal useEffect');
				dispatch(emptyBasket());
			}, 2500);
		}

		return () => {
			clearTimeout(timeoutId);
		};
	}, [modalVisible]);

	const [groupedBasketItems, setGroupedBasketItems] = useState([]);

	useEffect(() => {
		const groupedItems = basketItems.reduce((results: any[], item: any) => {
			const existingItem = results.find(
				(result) => result.item._id === item._id
			);
			if (existingItem) {
				existingItem.count += 1;
				existingItem._id = `${item._id}${existingItem.count}`;
			} else {
				results.push({ item, count: 1 });
			}
			console.log(results);
			return results;
		}, []);

		setGroupedBasketItems(groupedItems);
	}, [basketItems]);

	return (
		<SafeAreaView className="flex-1 items-center justify-center">
			<Header />
			<Modal animationType="slide" transparent={true} visible={modalVisible}>
				<View
					className="bg-emerald-400 flex-1 space-y-5"
					style={[styles.container, styles.center]}
				>
					<Animatable.Image
						animation="slideInUp"
						easing="ease-in-out"
						iterationCount={1}
						style={[styles.center]}
						source={require('../assets/images/branding/logo-no-bg-white.png')}
						resizeMode="contain"
						className="h-12"
					/>
					<Animatable.Text
						className="text-white text-lg"
						animation="slideInUp"
						easing="ease-in-out"
						iterationCount={1}
					>
						Thank you for your order!
					</Animatable.Text>
				</View>
			</Modal>
			<View
				className="flex-1 w-full justify-center items-center"
				style={styles.container}
			>
				<Stack.Screen options={{ headerShown: false }} />
				<View className="border border-gray-300 w-full">
					<View className="border-b border-b-gray-300 p-4 space-y-1 bg-gray-200">
						<Text className="uppercase font-bold text-lg">Summary:</Text>
						<View className="space-y-1">
							<View className="flex-row justify-between">
								<Text className="font-bold">Date: </Text>
								<Text>{order.date}</Text>
							</View>
							<View className="flex-row justify-between">
								<Text className="font-bold">Time:</Text>
								<Text>{order.time}</Text>
							</View>
							<View className="flex-row justify-between">
								<Text className="font-bold">Party Size:</Text>
								<Text>
									<Text>
										{order.tableSize}{' '}
										{order.tableSize > 1 ? 'people' : 'person'}
									</Text>
								</Text>
							</View>
						</View>
					</View>
					<View className="w-full p-4 space-y-1">
						<View>
							{groupedBasketItems.map((item: any, index: any) => (
								<View className="flex-row justify-between w-full pb-3">
									<Text
										className="font-bold flex-[3]"
										key={index}
										numberOfLines={1}
									>
										{item.item.name}
									</Text>
									<Text className="text-emerald-600 flex-1">
										{' '}
										x {item.count}
									</Text>
									<Text key={index} className="flex-1 text-right">
										€{item.item.price.toFixed(2)}
									</Text>
								</View>
							))}
						</View>
						<View className="w-full justify-between flex-row border-t pt-3">
							<Text>Order Total</Text>
							<Text className="text-lg font-bold">
								€
								{basketItems
									.reduce((acc: number, item: any) => acc + item.price, 0)
									.toFixed(2)}
							</Text>
						</View>
					</View>
				</View>

				<TouchableOpacity
					className="bg-emerald-400 w-full py-5 items-center"
					onPress={() => setTimeout(() => setModalVisible(true), 500)}
				>
					<Text className="text-white font-semibold uppercase">
						Confirm Order
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Payment;
