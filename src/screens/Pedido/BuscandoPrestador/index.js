import React, { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';

import { Container } from './styles';
import * as colors from '../../../styles/colors';
import CustomText from '../../../components/UI/Text';

import api from '../../../services/api';
import mostrarAlerta from '../../../helpers/alert';
import { usuarioStorage } from '../../../helpers/dadosUsuario';

export default function BuscandoPrestador({ navigation, route }) {
	const [animation, setAnimation] = useState();

	async function buscarPrestador() {
		const storage = await usuarioStorage();
		const jwt = storage.token;

		await api
			.get(
				`/usuario-colaborador/obter-colaboradores-proximos?latitude=${121}&longitute=${121}&distancia=${121}`,
				{
					headers: { Authorization: `Bearer ${jwt}` },
				}
			)
			.then((response) => {
				if (response.data.success) {
					navigation.navigate('PedidoAceito', {
						items: route.params.selecionados,
						total: route.params.total,
					});
				}
			})
			.catch((error) => {
				mostrarAlerta('Atenção', 'Não foram encontrados colaboradores próximo da sua localização!');
				navigation.navigate('Items');
			});
	}

	useEffect(() => {
		setTimeout(function () {
			navigation.navigate('PedidoAceito', { selecionados: route.params.selecionados, total: route.params.total });
		}, 1000);
		// buscarPrestador();
	}, []);

	return (
		<Container>
			<CustomText fontSize="28px" type="bold" align="center" color={colors.cinza}>
				Buscando colaboradores mais próximos de você!
			</CustomText>

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
