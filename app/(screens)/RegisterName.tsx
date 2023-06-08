import { Stack, useRouter } from 'expo-router';
import { updateProfile } from 'firebase/auth';
import React, { useEffect } from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { auth } from '../../firebaseConfig';
import Header from '../components/Header';
import styles from '../styles/variables';

const Register = () => {
	const router = useRouter();

	const [displayName, setDisplayName] = React.useState('');
	const user = auth.currentUser;

	const submitName = () => {
		if (user && displayName) {
			updateProfile(user, { displayName })
				.then(() => {
					setDisplayName('');
					console.log('User display name set:', displayName);
					router.push('/menu');
				})
				.catch((error) => {
					console.log('Error setting user display name:', error);
				});
		} else {
			alert('Please enter your name');
		}
	};

	return (
		<SafeAreaView className="flex-1">
			<Header />

			<Stack.Screen options={{ headerShown: false }} />
			<View
				style={[styles.container, styles.center]}
				className="w-full space-y-4 flex-1"
			>
				<Text className="font-bold">Full Name</Text>
				<TextInput
					className="border w-full p-3 text-center"
					placeholder=""
					placeholderTextColor={'#9ca3af'}
					onChangeText={(displayName: string) => setDisplayName(displayName)}
					value={displayName}
					textContentType="name"
				/>
				<View className="w-full">
					<TouchableOpacity
						activeOpacity={0.7}
						className="bg-emerald-400 p-3"
						onPress={submitName}
					>
						<Text className="text-center">Continue</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Register;
