import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/variables';

const PurchaseTypeBtn = ({
	btnTypeProp,
	btnHandlerProp,
	sizeProp,
	btnTextProp,
	ioniconsProps,
}) => {
	return (
		<TouchableOpacity
			className={`${
				btnTypeProp
					? 'bg-emerald-400 border-emerald-400'
					: 'transparent border-gray-400'
			} border flex-row space-x-2 py-2 px-5 rounded`}
			style={styles.center}
			onPress={btnHandlerProp}
		>
			<Ionicons
				name={ioniconsProps}
				size={sizeProp}
				color={`${btnTypeProp ? 'white' : '#9ca3af'}`}
				className={`${btnTypeProp ? 'text-white' : 'text-gray-400'}`}
			/>
			<Text className={`${btnTypeProp ? 'text-white' : 'text-gray-400'}`}>
				{btnTextProp}
			</Text>
		</TouchableOpacity>
	);
};

export default PurchaseTypeBtn;
