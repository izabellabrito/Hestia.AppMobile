import React, { useState } from 'react';
import Main from './src';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
	...DefaultTheme,
};

const carregaFonts = () => {
	return Font.loadAsync({
		'balooThambi2-bold': require('./assets/fonts/BalooThambi2-Bold.ttf'),
		'balooThambi2-extraBold': require('./assets/fonts/BalooThambi2-ExtraBold.ttf'),
		'balooThambi2-medium': require('./assets/fonts/BalooThambi2-Medium.ttf'),
		'balooThambi2-regular': require('./assets/fonts/BalooThambi2-Regular.ttf'),
		'balooThambi2-semiBold': require('./assets/fonts/BalooThambi2-SemiBold.ttf'),
	});
};

export default function App() {
	const [fontesCarregadas, setFontesCarregadas] = useState(false);

	if (!fontesCarregadas) {
		return <AppLoading startAsync={carregaFonts} onFinish={() => setFontesCarregadas(true)} />;
	}

	return (
		<PaperProvider theme={theme}>
			<Main />
		</PaperProvider>
	);
}
