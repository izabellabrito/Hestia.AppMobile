import { AsyncStorage } from 'react-native';

export async function usuarioStorage() {
	let values = await AsyncStorage.getItem('usuario-autenticado');
	return JSON.parse(values);
}

export async function limpaUsuarioStorage() {
	await AsyncStorage.removeItem('usuario-autenticado');
}
