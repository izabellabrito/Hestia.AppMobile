import React, { useState, useEffect } from 'react';
import { View, Linking } from 'react-native';
import LottieView from 'lottie-react-native';
import { RadioButton } from 'react-native-paper';

import { Container, Botao, RadioContainer } from './styles';
import * as colors from '../../../styles/colors';
import CustomText from '../../../components/UI/Text';

import api from '../../../services/api';
import mostrarAlerta from '../../../helpers/alert';
import { usuarioStorage } from '../../../helpers/dadosUsuario';

export default function Avalicao({ navigation, route }) {
	const [animation, setAnimation] = useState();
	const [checked, setChecked] = useState(1);

	async function avaliar() {
		const storage = await usuarioStorage();
		const jwt = storage.token;

		await api
			.post(
				'/usuario-colaborador/avaliar-colaborador',
				{ colaboradorId: '0c151d25-4162-4eb0-ab86-87976344cf6e', valorAvaliacao: parseInt(checked) },
				{ headers: { Authorization: `Bearer ${jwt}` } }
			)
			.then((response) => {
				console.log(response.data);
				if (response.data.success) {
					mostrarAlerta(
						'Obrigado, sua opinião é muito importante para gente!',
						'Prestador avaliado com sucesso!'
					);
					navigation.navigate('Pedidos');
				}
			})
			.catch((error) => {
				console.log(error.response);
			});

		navigation.navigate('Pedidos');
	}

	async function atualizaStatus() {
		const storage = await usuarioStorage();
		const jwt = storage.token;

		await api
			.put(
				`/pedido/atualizar-status-pedido/${route.params.id}?statusNovo=7`,
				{},
				{
					headers: { Authorization: `Bearer ${jwt}` },
				}
			)
			.then((response) => {
			})
			.catch((error) => {
			});
	}

	function ajuda() {
		Linking.openURL('mailto:hestialavagem@gmail.com');
	}

	useEffect(() => {
		atualizaStatus();
	}, []);

	return (
		<Container>
			<View style={{ height: '20%', width: '80%', marginTop: -100 }}>
				<LottieView
					ref={(animation) => {
						setAnimation(animation);
					}}
					style={{ backgroundColor: '#fff' }}
					autoPlay
					source={require('../../../../assets/animacoes/12550-rate-me-5-stars.json')}
				/>
			</View>

			<View style={{ height: '60%', alignItems: 'center' }}>
				<CustomText fontSize="25px" type="semiBold" color={colors.cinza} align="center">
					Queremos saber como foi sua experiência!
				</CustomText>
				<RadioButton.Group onValueChange={(value) => setChecked(value)} value={checked}>
					<RadioContainer>
						<RadioButton.Item
							style={{ borderColor: '#298AFF', borderWidth: 1, borderRadius: 30, margin: 5 }}
							label="1"
							value="1"
						/>
						<RadioButton.Item
							style={{ borderColor: '#298AFF', borderWidth: 1, borderRadius: 30, margin: 5 }}
							label="2"
							value="2"
						/>
						<RadioButton.Item
							style={{ borderColor: '#298AFF', borderWidth: 1, borderRadius: 30, margin: 5 }}
							label="3"
							value="3"
						/>
						<RadioButton.Item
							style={{ borderColor: '#298AFF', borderWidth: 1, borderRadius: 30, margin: 5 }}
							label="4"
							value="4"
						/>
						<RadioButton.Item
							style={{ borderColor: '#298AFF', borderWidth: 1, borderRadius: 30, margin: 5 }}
							label="5"
							value="5"
						/>
					</RadioContainer>
				</RadioButton.Group>
				<CustomText fontSize="17px" color={colors.cinza} align="center" marginTop="50px">
					Aconteceu algum problema?
				</CustomText>
				<Botao onPress={ajuda}>
					<CustomText fontSize="14px">Nos mande um e-mail</CustomText>
				</Botao>
				<Botao roxo onPress={avaliar}>
					<CustomText fontSize="14px">Avaliar</CustomText>
				</Botao>
			</View>
		</Container>
	);
}
