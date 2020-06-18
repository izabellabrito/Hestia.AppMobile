import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { Container, TextoContainer, BotaoContainer, Botao, Loading } from './styles';
import CustomText from '../../components/UI/Text';
import * as colors from '../../styles/colors';

import { usuarioStorage } from '../../helpers/dadosUsuario';

export default function Inicio({ navigation }) {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// autoLogin();
	}, []);

	return (
		<Container>
			{loading && (
				<Loading>
					<ActivityIndicator animating={loading} size="large" color={colors.azul} />
				</Loading>
			)}
			<TextoContainer>
				<CustomText fontSize="50px">
					Bem vindo à{' '}
					<CustomText fontSize="60px" type="extraBold" color={colors.verde}>
						Hestia
					</CustomText>
				</CustomText>
			</TextoContainer>

			<BotaoContainer>
				<Botao onPress={() => navigation.navigate('Entrar')}>
					<CustomText fontSize="17px" type="semiBold">
						Já sou cadastrado
					</CustomText>
				</Botao>
				<Botao mt={10} onPress={() => navigation.navigate('Cadastrar')}>
					<CustomText fontSize="17px" type="semiBold">
						Ainda não sou cadastrado
					</CustomText>
				</Botao>
			</BotaoContainer>
		</Container>
	);
}
