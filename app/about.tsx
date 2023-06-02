import { Stack, useRouter } from 'expo-router';
import { SafeAreaView, Text } from 'react-native';

const About = () => {
	const router = useRouter();
	return (
		<SafeAreaView className="flex-1 items-center">
			<Stack.Screen options={{ headerShown: false }} />
			<Text
				onPress={() => {
					router.back();
				}}
			>
				&lsaquo; Back
			</Text>
			<Text className="font-bold text-5xl">About</Text>
		</SafeAreaView>
	);
};

export default About;
