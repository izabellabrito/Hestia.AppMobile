import React, { useState, useEffect, useRef } from 'react';
import { TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';

import { Container, Loading, Botao } from './styles';
import CustomText from '../../../components/UI/Text';
import * as colors from '../../../styles/colors';

import api from '../../../services/api';
import mostrarAlerta from '../../../helpers/alert';
import { usuarioStorage } from '../../../helpers/dadosUsuario';

export default function DetalheCartao({ navigation, route }) {
	const [dadosCartao, setDadosCartao] = useState({});
	const [loading, setLoading] = useState(true);
	const CCInput = useRef(null);

	async function obtemDetalhes() {
		const storage = await usuarioStorage();
		const jwt = storage.token;
		await api
			.get(`/cartao/obter-detalhe-cartao/${route.params.id}`, { headers: { Authorization: `Bearer ${jwt}` } })
			.then((response) => {
				if (response.data.success) {
					const {
						codigoDeSeguranca,
						dataDeVencimentoString,
						nomeDoTitular,
						numeroDoCartao,
					} = response.data.data;

					CCInput.current.setValues({
						number: numeroDoCartao,
						expiry: dataDeVencimentoString,
						cvc: codigoDeSeguranca,
						name: nomeDoTitular,
					});
				}
			})
			.catch((error) => {
				console.log(error);
				mostrarAlerta('Atenção', 'Ocorreu um erro ao realizar sua solicitação. Tente novamente mais tarde.');
			});
		setLoading(false);
	}

	async function atualiza() {
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
				id: route.params.id,
				usuarioId: id,
				nomeDoTitular: name,
				dataDeVencimentoString: expiry,
				numeroDoCartao,
				bandeira,
				codigoDeSeguranca: cvc,
			};
			await api
				.put('/cartao/atualizar-cartao', data, { headers: { Authorization: `Bearer ${jwt}` } })
				.then((response) => {
					if (response.data.success) {
						navigation.navigate('Cartoes');
					}
				})
				.catch((error) => {});
		}
		setLoading(false);
	}

	useEffect(() => {
		obtemDetalhes();
	}, []);

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<Container>
				{loading && (
					<Loading>
						<ActivityIndicator animating={loading} size="large" color={colors.azul} />
					</Loading>
				)}
				<CreditCardInput
					ref={CCInput}
					autoFocus
					requiresName
					allowScroll
					onChange={(value) => setDadosCartao(value)}
					labels={{ number: 'Número', expiry: 'Venc.', cvc: 'CCV', name: 'Nome no cartão' }}
					labelStyle={{ fontSize: 13 }}
					placeholders={{ number: '1234 5678 1234 5678', expiry: 'MM/AA', cvc: '000' }}
					inputContainerStyle={{ borderBottomWidth: 1, borderBottomColor: 'black' }}
				/>

				<Botao onPress={atualiza}>
					<CustomText fontSize="20px" type="semiBold">
						Atualizar
					</CustomText>
				</Botao>
			</Container>
		</TouchableWithoutFeedback>
	);
}
