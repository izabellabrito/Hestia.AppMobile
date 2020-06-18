import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import CustomText from '../../components/UI/Text';
import * as colors from '../../styles/colors';

import { Scroll, Container, Input, Botao } from './styles';

export default function EsqueciSenha({ navigation }) {
	const [usuario, onChangeUsuario] = React.useState('');
	const [senha, onChangeSenha] = React.useState('');

	function alerta() {
		Keyboard.dismiss();
		alert(`Usuário ${usuario}, senha ${senha}`);
	}

	function validaCadastro() {
		navigation.navigate('Home');
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<Scroll>
				<Container>
					<Input
						placeholder="Email"
						placeholderTextColor={colors.cinza}
						onChangeText={(text) => onChangeUsuario(text)}
						value={usuario}
					/>
					<Input
						placeholder="CPF"
						mt="18px"
						placeholderTextColor={colors.cinza}
						onChangeText={(text) => onChangeSenha(text)}
						value={senha}
					/>
					<Input
						placeholder="Senha"
						mt="18px"
						placeholderTextColor={colors.cinza}
						onChangeText={(text) => onChangeSenha(text)}
						value={senha}
					/>
					<Input
						placeholder="Confirme a senha"
						mt="18px"
						placeholderTextColor={colors.cinza}
						onChangeText={(text) => onChangeSenha(text)}
						value={senha}
					/>
					<Botao onPress={() => validaCadastro()}>
						<CustomText fontSize="17px" type="semiBold">
							Alterar senha
						</CustomText>
					</Botao>
				</Container>
			</Scroll>
		</TouchableWithoutFeedback>
	);
}
