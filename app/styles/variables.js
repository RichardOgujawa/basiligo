import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	// if you wanna find actual Tailwind colours: https://tailwindcss.com/docs/customizing-colors
	container: {
		paddingHorizontal: 20,
	},

	//Positioning
	center: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	//Desaturated Orange = bg-yellow-700
	'desaturated-orange': { color: '#B7995E' },
	'bg-desaturated-orange': { color: '#B7995E' },
	'border-desaturated-orange': { color: '#B7995E' },
	//Cyan Green = emerald-500
	cyangreen: { color: '#72BDA3' },
	'bg-cyangreen': { color: '#72BDA3' },
	'border-cyangreen': { color: '#72BDA3' },
	//Deep Green = emerald-700
	cyangreen: { color: '#72BDA3' },
	'bg-cyangreen': { color: '#72BDA3' },
	'border-cyangreen': { color: '#72BDA3' },
	//White
	white: { color: '#FFFFFF' },
	'bg-white': { color: '#FFFFFF' },
	'border-white': { color: '#FFFFFF' },
	//Light Gray = text-gray-400 = #9ca3af
	'light-gray': { color: '#CCCCCC' },
	bgLightGray: { backgroundColor: '#CCCCCC' },
	borderLightGray: { borderColor: '#CCCCCC' },
	//Light Gray Blue
	'light-gray-blue': { color: '#DBDFE4' },
	'bg-light-gray-blue': { color: '#DBDFE4' },
	'border-light-gray-blue': { color: '#DBDFE4' },
	// Black
	black: { color: '#141212' },
	'bg-black': { color: '#141212' },
	'border-black': { color: '#141212' },
	//FB Blue = sky-800
	'fb-blue': { color: '#0072BC' },
	'bg-fb-blue': { color: '#0072BC' },
	'border-fb-blue': { color: '#0072BC' },
	//Twitter Blue = sky-500
	'twitter-blue': { color: '#00BFF3' },
	'bg-twitter-blue': { color: '#00BFF3' },
	'border-twitter-blue': { color: '#00BFF3' },
	//Soft Red
	'soft-red': { color: '#E36565' },
	'bg-soft-red': { color: '#E36565' },
	'border-soft-red': { color: '#E36565' },
});

export default styles;
