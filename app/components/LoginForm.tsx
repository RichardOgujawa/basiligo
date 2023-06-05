import { Link } from 'expo-router';
import React from 'react';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import styles from '../styles/variables';

const LoginForm = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	//Checking which OS we are running on
	const os = Platform.OS;
	return (
		<View className="grid space-y-6">
			<TextInput
				className="w-72 h-5 border-[cyangreen] border p-5 rounded-full text-align"
				style={[styles.black, styles.borderLightGray]}
				placeholder="Email Address"
				placeholderTextColor="gray"
				onChangeText={setEmail}
				value={email}
			/>
			<TextInput
				className="w-72 h-5 border p-5 rounded-full text-align"
				style={[styles.black, styles.borderLightGray]}
				placeholder="Password"
				placeholderTextColor="gray"
				onChangeText={setPassword}
				value={password}
			/>
			{os === 'ios' ? (
				<Pressable className="rounded-full bg-emerald-700 self-center py-4 px-20">
					<Text className="text-white text-center ">Login</Text>
				</Pressable>
			) : (
				<Pressable
					style={(pressed) => {
						return {
							backgroundColor: pressed ? 'white' : 'transparent',
						};
					}}
				>
					<Text className="text-red-500" style={styles.cyangreen}>
						android
					</Text>
				</Pressable>
			)}

			<Link
				href="../forgot-password"
				className="text-gray-400 text-center pb-20"
			>
				Forgot Password
			</Link>

			<View className="border-t-gray-300 border-t-2 pt-3">
				<View className="flex-row justify-between pb-9">
					<Pressable className="bg-sky-800 px-12 py-4 rounded-full">
						<Icon name="sc-facebook" size={30} color="white" />
					</Pressable>
					<Pressable className="bg-sky-500 px-12 py-4 rounded-full">
						<Icon name="sc-twitter" size={30} color="white" />
					</Pressable>
				</View>

				<Link
					href="./create-new-account"
					className="text-center text-black uppercase font-bold"
				>
					Create New Account
				</Link>
			</View>
		</View>
	);
};

export default LoginForm;
