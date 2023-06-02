import { Link, SplashScreen, Stack } from 'expo-router';
import React from 'react';
import { ImageBackground, SafeAreaView, StatusBar, Text } from 'react-native';

const Home = () => {
	const [isReady, setReady] = React.useState(false);

	React.useEffect(() => {
		setTimeout(() => {
			setReady(true);
		}, 1000);
	}, []);

	return (
		<SafeAreaView className="flex-1 items-center">
			<StatusBar barStyle="dark-content" />
			{!isReady && <SplashScreen />}
			<Stack.Screen options={{ headerShown: false }} />

			<ImageBackground
				resizeMode="cover"
				source={require('./assets/images/login-screen.jpg')}
			/>
			<Text className="text-5xl font-bold">My App</Text>
			<Link href="./about">Go to About Page</Link>
		</SafeAreaView>
	);
};

export default Home;
