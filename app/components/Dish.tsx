import { useEffect, useState } from 'react';
import {
	Alert,
	Image,
	ImageBackground,
	Modal,
	Pressable,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { useDispatch, useSelector } from 'react-redux';
import {
	addToBasket,
	removeFromBasket,
	selectBasketItems,
} from '../redux/features/basket/basketSlice';
import styles from '../styles/variables';
import PurchaseTypeBtn from './PurchaseTypeBtn';

const Dish = ({ item }: any) => {
	const { _id, name, price, ingredients, date, image } = item;

	//Redux
	const dispatch = useDispatch();
	const handleRemoveItemFromBasket = () => {
		dispatch(removeFromBasket(_id));
	};

	const basketItems = useSelector(selectBasketItems);
	const totalItemsWithId = basketItems.filter(
		(item: any) => item._id === _id
	).length;

	//Figuring out whether or not the yellow label should be visible
	const [yellowLabelVisible, setYellowLabelVisible] = useState(false);

	function setYellowLabelDisplay() {
		if (totalItemsWithId > 0) {
			setYellowLabelVisible(true);
		} else {
			setYellowLabelVisible(false);
		}
	}
	useEffect(() => {
		setTimeout(() => setYellowLabelDisplay(), 500);
	}, []);

	useEffect(() => {
		setTimeout(() => setYellowLabelDisplay(), 500);
	}, [totalItemsWithId]);

	const handleAddItemToBasket = () => {
		dispatch(addToBasket({ _id, name, price, ingredients, date, image }));
	};

	//Alert
	const showAlert = () => {
		Alert.alert(
			name,
			'Added to basket.',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
			],
			{
				cancelable: true,
			}
		);
	};

	//Modal
	const [modalVisible, setModalVisible] = useState(false);
	const [meBtn, setMeBtn] = useState(false);

	const meBtnHandler = () => {
		setMeBtn(!meBtn);
		setFriendBtn(false);
		setGroupBtn(false);
	};

	const [friendBtn, setFriendBtn] = useState(false);

	const friendHandler = () => {
		setFriendBtn(!friendBtn);
		setMeBtn(false);
		setGroupBtn(false);
	};

	const [groupBtn, setGroupBtn] = useState(false);

	const groupHandler = () => {
		setGroupBtn(!groupBtn);
		setMeBtn(false);
		setFriendBtn(false);
	};

	return (
		<>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<TouchableWithoutFeedback
					className="bg-blue-500 h-full w-full items-center justify-center"
					onPress={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<View
						className="bg-gray-400/30 h-full justify-center items-center "
						style={styles.container}
					>
						<Pressable>
							<View className="bg-white px-3 w-full space-y-3 pt-5 pb-1">
								<View className="flex-row space-x-3">
									<View className="bg-green-500 flex-1">
										<Image source={{ uri: image }} className="flex-1" />
									</View>
									<View className="flex-[2] space-y-2">
										<Text className="font-bold">{name}</Text>
										<Text className="text-[11px] text-gray-400">
											{ingredients}
										</Text>
										<Text>€{price?.toFixed(2)}</Text>
									</View>
								</View>

								<View className=" w-full border-t border-gray-400 py-4 flex-row">
									<View className="flex-row flex-1 items-center justify-center space-x-3">
										<Pressable onPress={handleRemoveItemFromBasket}>
											<EvilIcons name="minus" size={40} color="#9ca3af" />
										</Pressable>
										<Text>{totalItemsWithId}</Text>
										<Pressable onPress={handleAddItemToBasket}>
											<EvilIcons name="plus" size={40} color="#9ca3af" />
										</Pressable>
									</View>
								</View>
							</View>
						</Pressable>
					</View>
				</TouchableWithoutFeedback>
			</Modal>

			<TouchableOpacity
				activeOpacity={0.4}
				className="w-full"
				onPress={() => setModalVisible(true)}
			>
				<View>
					<View>
						<ImageBackground source={{ uri: image }} className="w-full h-40" />
						{yellowLabelVisible && (
							<Text className="font-bold absolute bottom-0 p-4 bg-yellow-700/60 w-full text-white text-center">
								{totalItemsWithId} {totalItemsWithId > 1 ? 'items' : 'item'} in
								Cart
							</Text>
						)}
					</View>
				</View>
				<View className="flex-row justify-between items-center border-b border-b-gray-400">
					<View className="space-y-2 py-3 flex-[3]">
						<Text className="font-bold uppercase">{name}</Text>
						<Text>€{price?.toFixed(2)}</Text>
					</View>
					<View className="flex-1">
						{totalItemsWithId > 0 ? (
							<View className="bg-emerald-700 flex-row p-2 items-center space-x-1">
								<FeatherIcon name="check" size={22} color="white" />
								<Text className="text-white font-bold">Added</Text>
							</View>
						) : (
							<View className="bg-emerald-400 flex-row p-2 items-center space-x-2">
								<FeatherIcon name="plus" size={22} color="white" />
								<Text className="text-white font-bold">Add</Text>
							</View>
						)}
					</View>
				</View>
			</TouchableOpacity>
		</>
	);
};

export default Dish;
