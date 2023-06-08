import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

const Redirect = () => {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => router.push('./menu'), 1000);
	}, []);
	return <View className="items-center flex-1 justify-center"></View>;
};

export default Redirect;
