import { Link, Stack, useRouter } from 'expo-router';
import {
	deleteUser,
	getAuth,
	sendPasswordResetEmail,
	updateEmail,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import {
	Image,
	Pressable,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styles from '../styles/variables';

const Settings = () => {
	const router = useRouter();
	const auth = getAuth();
	const user = auth?.currentUser;
	const displayName = user?.displayName;

	const [changeEmail, setChangeEmail] = useState(false);

	//Resetting password
	const userEmail = user?.email;
	const [newEmail, setNewEmail] = useState('');

	const handlerSetNewEmail = () => {
		if (user) {
			updateEmail(user, newEmail)
				.then(() => {
					// Email updated!
					// ...
					alert('email is now: ' + newEmail);
					setNewEmail('');
				})
				.catch((error) => {
					// An error occurred
					// ...
					alert(error.message);
				});
		}
	};

	const handlerPasswordReset = () => {
		if (typeof userEmail === 'string') {
			sendPasswordResetEmail(auth, userEmail)
				.then(() => {
					alert('Password reset email sent!');
					// Password reset email sent!
					// ...
					setNewEmail('');
				})
				.catch((error) => {
					const errorMessage = error.message;

					alert(errorMessage);
					// ...
				});
		} else {
			console.log('No email provided');
		}
	};

	//Email Reset
	const handleSignOut = () => {
		auth
			.signOut()
			.then(() => router.push('./Login'))
			.catch((error) => console.log(error));
	};
	const handleDeleteUser = () => {
		if (user) {
			deleteUser(user)
				.then(() => {
					alert('User deleted!');
					router.push('./Login');
				})
				.catch((error) => {
					alert(error.message);
				});
		} else return;
	};
	return (
		<SafeAreaView className="flex-1">
			<View className=" w-full pt-4 flex-row items-center">
				<Pressable
					className="flex-1"
					style={styles.container}
					onPress={() => router.back()}
				>
					<FeatherIcon name="chevron-left" size={30} />
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
			<View className="flex-1" style={styles.center}>
				<Text className="font-bold text-3xl">Account</Text>
				<View style={styles.container} className="space-y-7 w-full">
					<Stack.Screen options={{ headerShown: false }} />
					<Text className="font-semibold text-xl">👋 Hi {displayName}</Text>
					<TouchableWithoutFeedback>
						<View className="pt-4">
							<Pressable onPress={() => setChangeEmail(!changeEmail)}>
								<Text className="underline">Change Email Address</Text>
							</Pressable>
							{changeEmail ? (
								<View className="mt-4 space-y-7">
									<TextInput
										className="mt-3 border w-full p-3 text-center"
										placeholder=""
										placeholderTextColor={'#9ca3af'}
										onChangeText={(email: string) => {
											let changingText = email.toLowerCase();
											setNewEmail(changingText);
										}}
										value={newEmail.toLowerCase()}
										textContentType="name"
									/>
									<TouchableOpacity
										className="bg-white p-4 items-center"
										onPress={handlerSetNewEmail}
									>
										<Text className="font-semibold text-emerald-700 border-emerald-">
											Change Email
										</Text>
									</TouchableOpacity>

									<TouchableOpacity
										className="bg-red-500 p-4 items-center"
										onPress={() => setChangeEmail(false)}
									>
										<Text className="text-white font-semibold">Cancel</Text>
									</TouchableOpacity>
								</View>
							) : (
								<View className="space-y-7">
									<TouchableOpacity onPress={handlerPasswordReset}>
										<Text className="underline pt-5">Reset Password</Text>
									</TouchableOpacity>
									<TouchableOpacity
										className="bg-emerald-400 w-full items-center p-4"
										onPress={() => router.back()}
									>
										<Text className="font-bold text-white">Go Back</Text>
									</TouchableOpacity>
									<TouchableOpacity
										className="bg-yellow-700 w-full items-center p-4"
										onPress={handleSignOut}
									>
										<Text className="font-bold text-white">Sign Out</Text>
									</TouchableOpacity>
								</View>
							)}
						</View>
					</TouchableWithoutFeedback>

					<View className="border-t border-gray-400 w-full pt-5 ">
						<View className="text-gray">
							<Text>Do you want to delete your Basiligo account?</Text>
							<Pressable onPress={handleDeleteUser}>
								<Text className="text-blue-600 font-bold">
									Delete my account
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Settings;
