import React, { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';

import { Container, Loading, Botao } from './styles';
import * as colors from '../../../styles/colors';
import CustomText from '../../../components/UI/Text';

import api from '../../../services/api';
import mostrarAlerta from '../../../helpers/alert';
import { usuarioStorage } from '../../../helpers/dadosUsuario';

export default function CadastrarCartao({ navigation, route }) {
	const [dadosCartao, setDadosCartao] = useState({});
	const [loading, setLoading] = useState(false);

	async function cadastrar() {
		setLoading(true);
		const storage = await usuarioStorage();
		const { id } = storage.infos;
		const jwt = storage.token;

		if (dadosCartao.valid) {
			const { cvc, expiry, name, number, type } = dadosCartao.values;
			const numeroDoCartao = number.replace(/ /g, '');
			let bandeira = 0;
			switch (type) {
				case 'master-card':
					bandeira = 1;
					break;
				case 'visa':
					bandeira = 2;
					break;
				default:
					break;
			}

			const data = {
				usuarioId: id,
				nomeDoTitular: name,
				dataDeVencimentoString: expiry,
				numeroDoCartao,
				bandeira,
				codigoDeSeguranca: cvc,
			};
			console.log(data);
			await api
				.post('/cartao/cadastrar-cartao', data, { headers: { Authorization: `Bearer ${jwt}` } })
				.then((response) => {
					if (response.data.success) {
						navigation.navigate('Cartoes', { recarregar: true });
					}
				})
				.catch((error) => {
					mostrarAlerta(
						'Atenção',
						`${error.response.data.errors.map((item) => {
							return item + '\n';
						})}`
					);
				});
		} else {
			mostrarAlerta('Atenção', 'Cartão inválido, verifique e tente novamente.');
		}
		setLoading(false);
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<Container>
				{loading && (
					<Loading>
						<ActivityIndicator animating={loading} size="large" color={colors.azul} />
					</Loading>
				)}
				<CreditCardInput
					autoFocus
					requiresName
					allowScroll
					onChange={(value) => setDadosCartao(value)}
					labels={{ number: 'Número', expiry: 'Venc.', cvc: 'CCV', name: 'Nome no cartão' }}
					labelStyle={{ fontSize: 13 }}
					placeholders={{ number: '1234 5678 1234 5678', expiry: 'MM/AA', cvc: '000' }}
					inputContainerStyle={{ borderBottomWidth: 1, borderBottomColor: 'black' }}
				/>

				<Botao onPress={cadastrar}>
					<CustomText fontSize="20px" type="semiBold">
						Finalizar
					</CustomText>
				</Botao>
			</Container>
		</TouchableWithoutFeedback>
	);
}
