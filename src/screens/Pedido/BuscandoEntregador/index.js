import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

import { Container } from './styles';
import * as colors from '../../../styles/colors';
import CustomText from '../../../components/UI/Text';

import api from '../../../services/api';
import mostrarAlerta from '../../../helpers/alert';
import { usuarioStorage } from '../../../helpers/dadosUsuario';

export default function BuscandoEntregador({ navigation, route }) {
	const [animation, setAnimation] = useState();

	async function atualizaStatus() {
		const storage = await usuarioStorage();
		const jwt = storage.token;
		console.log(route.params.id);
		const statusNovo = route.params.etapa === 'entrega' ? 2 : 6;
		await api
			.put(
				`/pedido/atualizar-status-pedido/${route.params.id}?statusNovo=${statusNovo}`,
				{},
				{
					headers: { Authorization: `Bearer ${jwt}` },
				}
			)
			.then((response) => {
				if (response.status === 200) {
					route.params.etapa === 'entrega'
						? navigation.navigate('EntregaDelivery', { id: route.params.id })
						: navigation.navigate('RetiradaDelivery', { id: route.params.id });
				}
			})
			.catch((error) => {
				console.log(error.response);
			});
	}

	useEffect(() => {
		atualizaStatus();
	}, []);

	return (
		<Container>
			<TouchableOpacity>
				<CustomText fontSize="28px" type="bold" align="center" color={colors.cinza}>
					Encontrando entregadores disponíveis...
				</CustomText>
			</TouchableOpacity>

			<LottieView
				ref={(animation) => {
					setAnimation(animation);
				}}
				style={{
					width: 400,
					height: 400,
					backgroundColor: '#fff',
				}}
				autoPlay
				loop
				source={require('../../../../assets/animacoes/7213-lap.json')}
			/>
		</Container>
	);
}
