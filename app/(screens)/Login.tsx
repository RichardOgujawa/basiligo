import { Link, SplashScreen, Stack, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
	Image,
	ImageBackground,
	Keyboard,
	Pressable,
	SafeAreaView,
	StatusBar,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
// import LoginForm from './components/login-form';
import {
	FacebookAuthProvider,
	GoogleAuthProvider,
	UserCredential,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	signInWithRedirect,
} from 'firebase/auth';

import { auth } from '../../firebaseConfig';

import GoogleIcon from 'react-native-vector-icons/AntDesign';
import TwitterIcon from 'react-native-vector-icons/EvilIcons';
import styles from '../styles/variables';

const Login = () => {
	const router = useRouter();

	//SplashScreen
	const [isReady, setReady] = React.useState(false);

	React.useEffect(() => {
		setTimeout(() => {
			setReady(true);
		}, 1000);
	}, []);

	//FORM
	//Change text on type
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	//Automatically move to next input on submit
	const passwordRef = useRef<TextInput | null>(null);

	const focusNextInput = (
		nextInputRef: React.MutableRefObject<TextInput | null>
	) => {
		if (nextInputRef.current) {
			nextInputRef.current.focus();
		} else {
			return;
		}
	};

	//Submit Button Animation when pressed
	const [isPressed, setIsPressed] = React.useState(false);

	const handlePressIn = () => {
		setIsPressed(true);
	};

	const handlePressOut = () => {
		setIsPressed(false);
	};

	//FIREBASE
	//Email Register
	const [ownsAccount, setOwnsAccount] = React.useState(true);

	const handleOwnsAccount = () => {
		setOwnsAccount((current: boolean) => !current);
		console.log(ownsAccount);
	};

	const handleSignUp = () => {
		createUserWithEmailAndPassword(auth, email, password) //create user with email and password provided in the form
			.then((userCredentials: UserCredential) => {
				//this will return a promise object
				const user = userCredentials.user; //we will set a constant to the specific part of the user object we want which is the actual user credentials.
				console.log('Registered with', user.email);
				router.push('./RegisterName');
			})
			.catch((error) => {
				switch (error.code) {
					case 'auth/invalid-email':
						alert('Please enter a valid Email.');
						break;
					case 'auth/weak-password':
						alert('Password must be at least 6 characters long.');
						break;

					default:
						alert(error.message);
						break;
				}
			});
	};

	const handleSignIn = () => {
		//check if the user has a displayName then run code
		signInWithEmailAndPassword(auth, email, password) //create user with email and password provided in the form
			.then((userCredentials: UserCredential) => {
				//this will return a promise object
				const user = userCredentials.user; //we will set a constant to the specific part of the user object we want which is the actual user credentials.
				console.log('Logged in with', user.email);

				auth.onAuthStateChanged(() => {
					//authenticate the user variable
					if (auth.currentUser?.displayName) {
						//before going to the Menu, check if the user has a displayName, if not then this is a new user.
						//if we have a user
						router.push('./menu'); //navigate to the about page
					} else {
						return;
					}
				});
			})
			.catch((error) => {
				switch (error.code) {
					case 'auth/user-not-found':
						alert('User not found.');
						break;
					case 'auth/wrong-password':
						alert('Wrong password.');
						break;
					case 'auth/invalid-email':
						alert('Please enter a valid Email.');
						break;

					default:
						alert(error.message);
						break;
				}
			});
	};

	const handlerPasswordReset = () => {
		if (typeof email === 'string') {
			sendPasswordResetEmail(auth, email)
				.then(() => {
					alert('Password reset email sent!');
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

	//Google Sign In
	// const facebookProvider = new FacebookAuthProvider();

	// const handleFacebookSignIn = () => {
	// 	console.log(auth);
	// 	signInWithPopup(auth, facebookProvider)
	// 		.then((result) => {
	// 			// The signed-in user info.
	// 			const user = result.user;

	// 			// This gives you a Facebook Access Token. You can use it to access the Facebook API.
	// 			const credential = FacebookAuthProvider.credentialFromResult(result);
	// 			const accessToken = credential?.accessToken;

	// 			// IdP data available using getAdditionalUserInfo(result)
	// 			// ...
	// 		})
	// 		.catch((error) => {
	// 			// Handle Errors here.
	// 			const errorCode = error.code;
	// 			const errorMessage = error.message;
	// 			// The email of the user's account used.
	// 			const email = error.customData.email;
	// 			// The AuthCredential type that was used.
	// 			const credential = FacebookAuthProvider.credentialFromError(error);

	// 			// ...
	// 		});
	// };

	return (
		<View className="flex-1 items-center">
			<StatusBar barStyle="dark-content" />
			{!isReady && <SplashScreen />}
			<Stack.Screen options={{ headerShown: false }} />

			<ImageBackground
				source={{
					uri: 'https://raw.githubusercontent.com/RichardOgujawa/basiligo/main/app/assets/images/login-screen.jpg',
				}}
				resizeMode="cover"
				className="absolute w-full h-full top-0 left-0"
			/>

			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<SafeAreaView className="flex-1 w-full mt-48">
					<View className=" flex-1" style={styles.center}>
						<Image
							source={require('../assets/images/branding/wordmark-with-underline.png')}
							resizeMode="contain"
							className="h-16"
						/>
					</View>
					<View className="flex-[2]" style={styles.center}>
						<View className="justify-around space-y-6">
							<TextInput
								placeholder="Email Address"
								placeholderTextColor={'#9ca3af'}
								className="border border-gray-400 py-4 w-64 text-center"
								onChangeText={(email: string) => {
									let changingText = email.toLowerCase();
									setEmail(changingText);
								}}
								value={email.toLowerCase()}
								textContentType="emailAddress"
								onSubmitEditing={() => focusNextInput(passwordRef)}
							/>
							<TextInput
								placeholder="Password"
								placeholderTextColor={'#9ca3af'}
								secureTextEntry
								className="border border-gray-400 py-4 w-64 text-center"
								onChangeText={(password: string) => setPassword(password)}
								value={password}
								textContentType="password"
								ref={passwordRef}
							/>
							{ownsAccount ? (
								<Pressable
									onPressIn={handlePressIn}
									onPressOut={handlePressOut}
									onPress={handleSignIn}
									className={`py-4 items-center border-2 border-emerald-900 ${
										isPressed ? 'bg-gray-500' : 'bg-gray-100'
									}`}
								>
									<Text className="text-emerald-900 font-bold uppercase">
										Login
									</Text>
								</Pressable>
							) : (
								<Pressable
									onPressIn={handlePressIn}
									onPressOut={handlePressOut}
									onPress={handleSignUp}
									className={`py-4 items-center border-2 border-emerald-900 ${
										isPressed ? 'bg-emerald-900' : 'bg-emerald-800'
									}`}
								>
									<Text className="text-white uppercase font-semibold">
										Register
									</Text>
								</Pressable>
							)}

							<Pressable
								onPress={handlerPasswordReset}
								className="capitalize text-center text-gray-400"
							>
								<Text className="capitalize text-center text-gray-400 underline">
									Forgot password?
								</Text>
							</Pressable>
						</View>
					</View>
					<View
						className="flex-1 px-6 space-y-7 border-t border-gray-400"
						style={styles.center}
					>
						<View className="flex-row space-x-8">
							<Pressable className="bg-sky-400 flex-1 items-center py-3 rounded-full">
								<TwitterIcon name="sc-twitter" size={32} color="white" />
							</Pressable>
							<Pressable
								// onPress={handleFacebookSignIn}
								className="bg-red-500 flex-1 items-center py-3 rounded-full"
							>
								<GoogleIcon name="google" size={22} color="white" />
							</Pressable>
						</View>
						<Pressable
							className="text-black uppercase font-bold"
							onPress={handleOwnsAccount}
						>
							<Text className="font-bold">Create New Account</Text>
						</Pressable>
					</View>
				</SafeAreaView>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default Login;
