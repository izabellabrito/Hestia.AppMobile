import React, { useState } from 'react';
import { Keyboard, ActivityIndicator, TouchableWithoutFeedback, AsyncStorage, Image } from 'react-native';
import CustomText from '../../components/UI/Text';

import { Container, Input, Botao, Loading } from './styles';
import * as colors from '../../styles/colors';

import api from '../../services/api';
import mostrarAlerta from '../../helpers/alert';

export default function Login({ navigation }) {
	const [email, onChangeEmail] = React.useState('');
	const [senha, onChangeSenha] = React.useState('');
	const [loading, setLoading] = useState(false);

	async function entrar() {
		Keyboard.dismiss();
		setLoading(true);

		if (email.match(/^\s*$/) || senha.match(/^\s*$/)) {
			mostrarAlerta('Atenção', 'Preencha todos os campos!');
		} else {
			await api
				.post('/entrar', { email, password: senha })
				.then(async (response) => {
					if (response.data.success) {
						console.log(response.data.data.userId);
						obtemDados(response.data.data.userId, response.data.data.accessToken);
					}
				})
				.catch((error) => {
					mostrarAlerta('Atenção', 'Usuário e/ou senhas inválidos.');
					setLoading(false);
				});
		}
	}

	async function obtemDados(id, jwt) {
		await api
			.get(`/usuario-colaborador/obter-informacoes-usuario/${id}`, {
				headers: { Authorization: `Bearer ${jwt}` },
			})
			.then(async (response) => {
				const storage = { token: jwt, infos: response.data.data };
				await AsyncStorage.setItem('usuario-autenticado', JSON.stringify(storage));
				navigation.navigate('Home');
			})
			.catch((error) => {
				mostrarAlerta('Atenção', 'Ocorreu um erro ao realizar sua solicitação. Tente novamente mais tarde.');
			});

		setLoading(false);
	}

	return (
		<>
			{loading && (
				<Loading>
					<ActivityIndicator animating={loading} size="large" color={colors.azul} />
				</Loading>
			)}
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<Container>
					<Image
						source={require('../../../assets/logo.png')}
						style={{ width: 150, height: 130, resizeMode: 'stretch', marginBottom: 60, marginTop: '20%' }}
					/>
					<Input
						placeholder="Email"
						placeholderTextColor={colors.cinza}
						onChangeText={(text) => onChangeEmail(text)}
						value={email}
						autoCompleteType="email"
					/>
					<Input
						placeholder="Senha"
						mt="18px"
						placeholderTextColor={colors.cinza}
						onChangeText={(text) => onChangeSenha(text)}
						value={senha}
						autoCompleteType="password"
						secureTextEntry={true}
					/>

					<Botao onPress={() => entrar()}>
						<CustomText fontSize="17px" type="semiBold">
							Entrar
						</CustomText>
					</Botao>
				</Container>
			</TouchableWithoutFeedback>
		</>
	);
}
