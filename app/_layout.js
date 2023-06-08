import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from './redux/store/store';

const Layout = () => {
	return (
		<Provider store={store}>
			<Stack initialRouteName="home" />
		</Provider>
	);
};

export default Layout;
