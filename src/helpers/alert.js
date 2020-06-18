import { Alert } from 'react-native';

export default function mostrarAlerta(titulo, texto) {
	Alert.alert(
		titulo,
		texto,
		[
			{
				text: 'Ok',
				onPress: () => {},
				style: 'cancel',
			},
		],
		{ cancelable: false }
	);
}
