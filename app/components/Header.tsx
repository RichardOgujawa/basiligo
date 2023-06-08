import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styles from '../styles/variables';

const Header = () => {
	const router = useRouter();
	return (
		<View className="w-full py-4 flex-row items-center">
			<Pressable
				className="flex-1"
				style={styles.container}
				onPress={() => router.back()}
			>
				<FeatherIcon
					name="chevron-left"
					onPress={() => router.back()}
					size={27}
					color={'#0072BC'}
				/>
			</Pressable>
			<View className="flex-[2]">
				<Image
					source={require('../assets/images/branding/wordmark.png')}
					resizeMode="contain"
					className="h-10 w-full"
				/>
			</View>
			<View className="flex-1" style={styles.container}></View>
		</View>
	);
};

export default Header;
