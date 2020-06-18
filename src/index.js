import * as React from 'react';
import Routes from './routes';
import { StatusBar } from 'expo-status-bar';
console.disableYellowBox = true;

export default function App() {
	return (
		<>
			<StatusBar barStyle="dark-content" style="dark" />
			<Routes />
		</>
	);
}
