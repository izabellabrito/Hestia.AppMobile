import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';

import { Container, TituloContainer, Servicos, Item } from './styles';
import * as colors from '../../../styles/colors';
import CustomText from '../../../components/UI/Text';

import { usuarioStorage } from '../../../helpers/dadosUsuario';

export default function NovoPedido({ navigation }) {
	const [nome, setNome] = useState();

	function selecionarItems() {
		navigation.navigate('Items');
	}

	async function obtemDados() {
		const storage = await usuarioStorage();
		setNome(storage.infos.nomeCompleto);
	}

	useEffect(() => {
		obtemDados();
	}, []);

	return (
		<Container>
			<TituloContainer>
				<CustomText fontSize="30px" type="bold" align="center" color={colors.cinza}>
					Qual serviço você deseja solicitar,{' '}
					<CustomText fontSize="30px" type="bold" color={colors.roxo}>
						{nome}?
					</CustomText>
				</CustomText>
			</TituloContainer>

			<Servicos>
				<Item onPress={selecionarItems}>
					<Image
						source={require('../../../../assets/icons/washingclothes.png')}
						style={{ width: 45, height: 45, marginBottom: 15 }}
					/>
					<CustomText fontSize="18px" type="semiBold" align="center" color={colors.cinza}>
						Lavagem comum
					</CustomText>
				</Item>
				<Item ml="10px" mt="15px" onPress={selecionarItems}>
					<Image
						source={require('../../../../assets/icons/dry.png')}
						style={{ width: 45, height: 45, marginBottom: 15 }}
					/>
					<CustomText fontSize="17px" type="semiBold" align="center" color={colors.cinza}>
						Passadoria
					</CustomText>
				</Item>
				<Item onPress={selecionarItems}>
					<Image
						source={require('../../../../assets/icons/washingmachine.png')}
						style={{ width: 45, height: 45, marginBottom: 15 }}
					/>
					<CustomText fontSize="17px" type="semiBold" align="center" color={colors.cinza}>
						Lavagem premium
					</CustomText>
				</Item>
			</Servicos>
		</Container>
	);
}
