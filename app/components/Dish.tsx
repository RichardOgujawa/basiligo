import { useState } from 'react';
import {
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
import { useSelector } from 'react-redux';
import {
	decrement,
	increment,
	selectCount,
} from '../redux/features/counter/counterSlice';
import styles from '../styles/variables';
import PurchaseTypeBtn from './PurchaseTypeBtn';

const Dish = ({ item }: any) => {
	const count = useSelector(selectCount);

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

	const [shoppingItem, setShoppingItem] = useState(0);

	const shoppingItemIncrement = () => {
		setShoppingItem(shoppingItem + 1);
		console.log(shoppingItem);
	};
	const shoppingItemDecrement = () => {
		if (shoppingItem > 0) {
			setShoppingItem(shoppingItem - 1);
			console.log(shoppingItem);
		}
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
							<View className="bg-white px-3 w-full space-y-3 py-5">
								<View className="flex-row space-x-3">
									<View className="bg-green-500 flex-1">
										<Image source={{ uri: item.image }} className="flex-1" />
									</View>
									<View className="flex-[2] space-y-2">
										<Text className="font-bold">
											{item.name}
											{count}
										</Text>
										<Text className="text-[11px] text-gray-400">
											{item.ingredients}
										</Text>
										<Text>€{item.price.toFixed(2)}</Text>
									</View>
								</View>
								<View className="flex-row justify-between">
									<PurchaseTypeBtn
										btnTypeProp={meBtn}
										btnHandlerProp={meBtnHandler}
										sizeProp={19}
										btnTextProp="Me"
										ioniconsProps="ios-person-outline"
									/>
									<PurchaseTypeBtn
										btnTypeProp={friendBtn}
										btnHandlerProp={friendHandler}
										sizeProp={19}
										btnTextProp="Friend"
										ioniconsProps="ios-person-outline"
									/>
									<PurchaseTypeBtn
										btnTypeProp={groupBtn}
										btnHandlerProp={groupHandler}
										sizeProp={27}
										btnTextProp="Party"
										ioniconsProps="ios-people-outline"
									/>
								</View>
								<View className="flex-row space-x-3"></View>
								<View className=" w-full border-t border-gray-400 py-4 flex-row">
									<View className="flex-row flex-1 items-center justify-start space-x-3">
										<Pressable onPress={shoppingItemDecrement}>
											<EvilIcons name="minus" size={40} color="#9ca3af" />
										</Pressable>
										<Text>{shoppingItem}</Text>
										<Pressable onPress={shoppingItemIncrement}>
											<EvilIcons name="plus" size={40} color="#9ca3af" />
										</Pressable>
									</View>
									<View className=" flex-1">
										<TouchableOpacity className="items-center justify-center py-3 bg-yellow-700 rounded">
											<Text className="text-white"> &#43; Add</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</Pressable>
					</View>
				</TouchableWithoutFeedback>
			</Modal>

			<TouchableOpacity activeOpacity={0.4} className="w-full">
				<View>
					<View>
						<ImageBackground
							source={{ uri: item.image }}
							className="w-full h-40"
						/>
						<Text className="font-bold absolute bottom-0 p-4 bg-yellow-700/60 w-full text-white text-center">
							2 items in Cart
						</Text>
					</View>
				</View>
				<View className="flex-row justify-between items-center px-3 border-b border-b-gray-400">
					<View className="space-y-2 py-3">
						<Text className="font-bold uppercase">{item.name}</Text>
						<Text>€{item.price.toFixed(2)}</Text>
					</View>
					<View>
						<TouchableOpacity
							className="bg-emerald-500 flex-row p-2 items-center space-x-2"
							onPress={() => setModalVisible(true)}
						>
							<FeatherIcon name="plus" size={22} color="white" />
							<Text className="text-white">Add</Text>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
		</>
	);
};

export default Dish;
